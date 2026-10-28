# ShopSphere REST API Documentation

Comprehensive API reference for the **ShopSphere** e-commerce backend service.

Base URL (Local Development): `http://localhost:5000/api`

---

## 1. Authentication Endpoints

### Register User
* **Method & Path:** `POST /api/auth/register`
* **Access:** Public (Rate limited: 30 requests / 15 minutes)
* **Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "SecurePassword123!"
}
```

**Responses:**
* `201 Created`: User created and authenticated. Sets HTTP-only `token` cookie and returns user object and token.
  ```json
  {
    "success": true,
    "message": "Account created successfully",
    "user": {
      "id": "6720f4b39178cb9d5a123456",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user",
      "createdAt": "2026-10-28T19:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```
* `400 Bad Request`: Field validation error (invalid email, password under 6 characters, name missing).
* `409 Conflict`: An account with that email address already exists.

---

### Login User
* **Method & Path:** `POST /api/auth/login`
* **Access:** Public (Rate limited: 30 requests / 15 minutes)
* **Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "SecurePassword123!"
}
```

**Responses:**
* `200 OK`: Successful authentication. Sets HTTP-only `token` cookie.
  ```json
  {
    "success": true,
    "message": "Welcome back!",
    "user": {
      "id": "6720f4b39178cb9d5a123456",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user",
      "createdAt": "2026-10-28T19:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
  ```
* `401 Unauthorized`: Generic `"Invalid email or password"` (prevents account enumeration).

---

### Logout User
* **Method & Path:** `POST /api/auth/logout`
* **Access:** Public
* **Responses:**
* `200 OK`: Clears HTTP-only `token` cookie.
  ```json
  {
    "success": true,
    "message": "Signed out successfully"
  }
  ```

---

### Get Current Session User
* **Method & Path:** `GET /api/auth/me`
* **Access:** Private (Requires HTTP-only cookie `token` or header `Authorization: Bearer <token>`)
* **Responses:**
* `200 OK`:
  ```json
  {
    "success": true,
    "user": {
      "id": "6720f4b39178cb9d5a123456",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user",
      "createdAt": "2026-10-28T19:30:00.000Z"
    }
  }
  ```
* `401 Unauthorized`: Session missing or expired.

---

## 2. Order Endpoints

### Create Order (Authoritative Recalculation)
* **Method & Path:** `POST /api/orders`
* **Access:** Private
* **Behavior:** Backend strictly validates each product ID against the catalog, ignores client-submitted prices or totals, authoritatively recalculates line items, subtotal, shipping charge, tax, and total, then saves the order to MongoDB.

**Request Body:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 5,
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "fullName": "Jane Doe",
    "street": "123 Market St",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94105",
    "country": "United States",
    "phone": "+1 (555) 019-2834"
  },
  "paymentMethod": "Simulated Card (Demo)"
}
```

**Responses:**
* `201 Created`:
  ```json
  {
    "success": true,
    "message": "Order created successfully",
    "order": {
      "_id": "6720f7194f29ac0012345678",
      "user": "6720f4b39178cb9d5a123456",
      "items": [
        {
          "productId": 1,
          "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price": 109.95,
          "quantity": 2,
          "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "category": "men's clothing",
          "itemTotal": 219.90
        }
      ],
      "shippingAddress": {
        "fullName": "Jane Doe",
        "street": "123 Market St",
        "city": "San Francisco",
        "state": "CA",
        "postalCode": "94105",
        "country": "United States",
        "phone": "+1 (555) 019-2834"
      },
      "subtotal": 18691.50,
      "shippingCost": 0.00,
      "tax": 934.58,
      "total": 19626.08,
      "status": "Processing",
      "paymentMethod": "UPI (Google Pay)",
      "createdAt": "2026-10-28T19:35:00.000Z"
    }
  }
  ```
* `400 Bad Request`: Empty items list, invalid quantity, or missing shipping address fields.
* `401 Unauthorized`: Authentication required.

---

### Get Authenticated User's Orders
* **Method & Path:** `GET /api/orders`
* **Access:** Private
* **Responses:**
* `200 OK`: Returns only orders belonging to the authenticated user.
  ```json
  {
    "success": true,
    "count": 1,
    "orders": [
      {
        "_id": "6720f7194f29ac0012345678",
        "items": [...],
        "total": 19626.08,
        "status": "Processing",
        "createdAt": "2026-10-28T19:35:00.000Z"
      }
    ]
  }
  ```

---

### Get Order by ID (Authorization Protected)
* **Method & Path:** `GET /api/orders/:orderId`
* **Access:** Private
* **Security Rule:** Users can only retrieve their own orders. Attempting to view another user's order yields `403 Forbidden`.
* **Responses:**
* `200 OK`: Returns full order details.
* `403 Forbidden`: `{"success": false, "message": "Access denied: You are not authorized to view this order"}`
* `404 Not Found`: Order ID format invalid or order does not exist.

---

## 3. Product Catalog Endpoints

### List Products
* **Method & Path:** `GET /api/products`
* **Access:** Public
* **Responses:** `200 OK` with 20 catalog items (cached with fallback resilience).

### List Categories
* **Method & Path:** `GET /api/products/categories`
* **Access:** Public
* **Responses:** `200 OK` with array of unique category names.

### Get Product by ID
* **Method & Path:** `GET /api/products/:id`
* **Access:** Public
* **Responses:** `200 OK` with product object, or `404 Not Found`.

---

## 4. System Health Check

### Health Status
* **Method & Path:** `GET /api/health`
* **Access:** Public
* **Response:**
```json
{
  "status": "healthy",
  "application": "ShopSphere API",
  "environment": "development",
  "timestamp": "2026-10-28T19:45:00.000Z"
}
```

