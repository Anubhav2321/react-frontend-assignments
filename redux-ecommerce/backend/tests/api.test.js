import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import { connectTestDB, clearTestDB, closeTestDB } from './setup.js';
import { User } from '../models/User.js';

describe('ShopSphere Backend API Integration Tests', () => {
  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test_jwt_secret_key_1234567890_super_safe';
    await connectTestDB();
  }, 30000);

  afterAll(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe('Authentication Endpoints', () => {
    const validUser = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'SecurePassword123!',
    };

    it('should register a new user successfully with hashed password', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(validUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe(validUser.email);
      expect(res.body.user.name).toBe(validUser.name);
      expect(res.body.user.passwordHash).toBeUndefined();
      expect(res.body.token).toBeDefined();

      // Verify in DB that password was hashed
      const dbUser = await User.findOne({ email: validUser.email }).select('+passwordHash');
      expect(dbUser).not.toBeNull();
      expect(dbUser.passwordHash).not.toBe(validUser.password);
      expect(dbUser.passwordHash.startsWith('$2')).toBe(true);
    });

    it('should reject registration with duplicate email (409 Conflict)', async () => {
      // First registration
      await request(app).post('/api/auth/register').send(validUser);

      // Duplicate registration attempt
      const res = await request(app).post('/api/auth/register').send(validUser);

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/already exists/i);
    });

    it('should reject registration with invalid fields (400 Bad Request)', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'J',
        email: 'invalid-email',
        password: '123',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });

    it('should log in existing user with correct credentials and set cookie', async () => {
      await request(app).post('/api/auth/register').send(validUser);

      const res = await request(app).post('/api/auth/login').send({
        email: validUser.email,
        password: validUser.password,
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe(validUser.email);
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should reject login with incorrect password (401 Unauthorized)', async () => {
      await request(app).post('/api/auth/register').send(validUser);

      const res = await request(app).post('/api/auth/login').send({
        email: validUser.email,
        password: 'WrongPassword!',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toMatch(/invalid email or password/i);
    });

    it('should return current authenticated user via /api/auth/me', async () => {
      const reg = await request(app).post('/api/auth/register').send(validUser);
      const token = reg.body.token;

      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.user.email).toBe(validUser.email);
    });

    it('should reject unauthenticated request to /api/auth/me', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Order Processing & Security Endpoints', () => {
    let userAToken;
    let userBToken;

    const shippingInfo = {
      fullName: 'John Smith',
      street: '123 Market St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      phone: '+1-555-0199',
    };

    beforeEach(async () => {
      // Register User A
      const resA = await request(app).post('/api/auth/register').send({
        name: 'User A',
        email: 'usera@example.com',
        password: 'Password123!',
      });
      userAToken = resA.body.token;

      // Register User B
      const resB = await request(app).post('/api/auth/register').send({
        name: 'User B',
        email: 'userb@example.com',
        password: 'Password123!',
      });
      userBToken = resB.body.token;
    });

    it('should reject unauthenticated order creation (401)', async () => {
      const res = await request(app).post('/api/orders').send({
        items: [{ productId: 1, quantity: 1 }],
        shippingAddress: shippingInfo,
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should create order and recalculate authoritative totals on server side', async () => {
      // Client attempts to pass fake price ₹1.00 for Product 1 (which actually costs ₹9,345.75)
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          items: [{ productId: 1, quantity: 2, price: 1.00 }], // Client fake price
          shippingAddress: shippingInfo,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      const order = res.body.order;

      // Authoritative product 1 unit price is 9345.75 INR
      // 2 * 9345.75 = 18691.50
      expect(order.items[0].price).toBe(9345.75);
      expect(order.subtotal).toBe(18691.50);
      // Free delivery over ₹999
      expect(order.shippingCost).toBe(0.00);
      // Tax: 18691.50 * 0.05 = 934.58
      expect(order.tax).toBe(934.58);
      // Total: 18691.50 + 0 + 934.58 = 19626.08
      expect(order.total).toBe(19626.08);
      expect(order.status).toBe('Processing');
    });

    it('should reject order creation with invalid quantity or empty cart', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          items: [],
          shippingAddress: shippingInfo,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should allow user to list only their own orders', async () => {
      // User A creates an order
      await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          items: [{ productId: 2, quantity: 1 }],
          shippingAddress: shippingInfo,
        });

      // User A retrieves orders
      const resA = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userAToken}`);

      expect(resA.status).toBe(200);
      expect(resA.body.count).toBe(1);

      // User B retrieves orders -> should have 0 orders
      const resB = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userBToken}`);

      expect(resB.status).toBe(200);
      expect(resB.body.count).toBe(0);
    });

    it('should PREVENT User B from accessing User A order by ID (403 Forbidden)', async () => {
      // User A creates an order
      const createRes = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          items: [{ productId: 2, quantity: 1 }],
          shippingAddress: shippingInfo,
        });

      const orderId = createRes.body.order._id;

      // User A can access it
      const resA = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${userAToken}`);
      expect(resA.status).toBe(200);

      // User B attempts to access User A's order -> MUST BE REJECTED with 403 Forbidden
      const resB = await request(app)
        .get(`/api/orders/${orderId}`)
        .set('Authorization', `Bearer ${userBToken}`);

      expect(resB.status).toBe(403);
      expect(resB.body.success).toBe(false);
      expect(resB.body.message).toMatch(/not authorized/i);
    });
  });

  describe('Catalog & Health Endpoints', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
    });

    it('should return catalog products and categories', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.products.length).toBeGreaterThan(0);

      const catRes = await request(app).get('/api/products/categories');
      expect(catRes.status).toBe(200);
      expect(Array.isArray(catRes.body.categories)).toBe(true);
    });
  });
});

