# ShopSphere — Production-Style MERN E-Commerce Application

ShopSphere is a full-featured, modern e-commerce web platform engineered with the complete **MERN Stack (MongoDB, Express.js, React 19, Node.js)** and **Redux Toolkit**.

Built to reflect modern retail web applications, ShopSphere pairs a refined, responsive storefront UI with a secure backend API that enforces authoritative price verification, HTTP-only cookie authentication, and MongoDB order persistence.

---

## Key Highlights & Core Features

* **Visual Design & Theming**: Premium typography, warm off-white tones with indigo accents in Light Mode, deep navy/slate in Dark Mode (interactive toggle in header), smooth micro-interactions, accessible keyboard navigation, and loading skeleton states.
* **Indian Currency (INR / ₹)**: All catalogue pricing, line items, and totals are formatted in Indian Rupees (₹) using `Intl.NumberFormat('en-IN')` (e.g., `₹18,691.50`), with free delivery for orders $\ge ₹999$ and 5% GST.
* **Real Payment UI with Audio Animation**: High-fidelity Indian payment gateway interface featuring:
  * **UPI Apps**: Google Pay, PhonePe, Paytm, BHIM, CRED Pay, and Amazon Pay with branded SVG badges, quick VPA suffix chips, and an interactive scanning QR code with laser beam animation.
  * **Debit / Credit Cards**: Visual ATM/Credit card preview updating live with card number, cardholder name, expiry, and CVV, supporting Visa, Mastercard, and RuPay.
  * **Net Banking**: HDFC Bank, State Bank of India (SBI), ICICI Bank, Axis Bank, and Kotak Bank logos.
  * **Audio Chime & Processing Animation**: Built-in Web Audio API synthesizer that plays the authentic multi-note UPI payment success chime with a 3-step security verification overlay.
* **Secure Authentication**: Password hashing with `bcryptjs`, JWT stored in secure HTTP-only cookies, session check via `/api/auth/me`, and rate-limiting against brute force attacks.
* **Order Isolation & Data Protection**: Strict authorization ensures customers can only inspect and retrieve their own orders (`403 Forbidden` on unauthorized access).
* **Comprehensive Automated Tests**: 14 backend integration test cases (Supertest + Vitest) and 23 frontend unit/component test cases (React Testing Library + Vitest).

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 6, Redux Toolkit, React Redux, React Router DOM v7, Redux Persist, Axios, Lucide React, React Hot Toast |
| **Backend** | Node.js (ES modules), Express.js, MongoDB, Mongoose, bcryptjs, jsonwebtoken, cookie-parser, express-validator, Helmet, CORS, express-rate-limit |
| **External Catalogue** | Fake Store API (`https://fakestoreapi.com`) with caching and resilient fallback |
| **Testing** | Vitest, React Testing Library, Supertest, MongoDB Memory Server |

---

## Project Structure

```
ShopSphere/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/                   # Centralized Axios client & API endpoints
│   │   ├── app/                   # Redux store configuration, hooks & custom middleware
│   │   ├── components/            # Reusable UI primitives, cards, skeletons, layout
│   │   ├── features/              # Redux slices (products, cart, auth, orders, prefs)
│   │   ├── pages/                 # Full application pages (Home, Catalog, Detail, Cart, Checkout, Auth, Orders)
│   │   ├── routes/                # Route definitions & ProtectedRoute wrapper
│   │   ├── styles/                # Design tokens, variables & responsive CSS
│   │   ├── tests/                 # RTL + Vitest automated test specs
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/                    # Mongoose database connection
│   ├── controllers/               # Auth, Order, and Product catalog controllers
│   ├── middleware/                # JWT auth protector, error handler & 404 handler
│   ├── models/                    # Mongoose User and Order schemas
│   ├── routes/                    # API route definitions & rate-limiter bindings
│   ├── services/                  # Catalog service with authoritative pricing recalculation
│   ├── tests/                     # Supertest + Vitest integration test suite
│   ├── validators/                # express-validator request schemas
│   ├── app.js                     # Express app instance & middleware configuration
│   ├── server.js                  # HTTP server listener & graceful shutdown handlers
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── API.md                     # Complete REST API reference
│   ├── SETUP.md                   # Step-by-step Windows PowerShell guide
│   └── ARCHITECTURE.md            # Architecture diagrams, Redux data flow & security
│
├── .gitignore
└── README.md
```

---

## Quick Start Guide (Windows / PowerShell)

### 1. Prerequisites
* **Node.js** v18+ installed.
* **MongoDB** (local service on `mongodb://127.0.0.1:27017` or MongoDB Atlas cloud cluster).

### 2. Environment Variables Setup
Copy the example files in both directories:

```powershell
# In backend
cd backend
Copy-Item .env.example .env

# In frontend
cd ..\frontend
Copy-Item .env.example .env
```

### 3. Install Dependencies
```powershell
# Install backend packages
cd backend
npm install

# Install frontend packages
cd ..\frontend
npm install
```

### 4. Run the Application
Open two separate PowerShell terminals:

**Terminal 1 (Backend API):**
```powershell
cd backend
npm run dev
# Running on http://localhost:5000 (Health check: http://localhost:5000/api/health)
```

**Terminal 2 (Frontend React App):**
```powershell
cd frontend
npm run dev
# Running on http://localhost:5173
```

Navigate your browser to **`http://localhost:5173`**.

---

## Running Automated Tests

All automated tests have been executed and verified:

```powershell
# 1. Run Backend Integration Tests (14 tests passed)
cd backend
npm test

# 2. Run Frontend Component & Redux Tests (23 tests passed)
cd ..\frontend
npm test

# 3. Production Build Check (Zero errors)
cd ..\frontend
npm run build
```

---

## REST API Summary

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account with hashed password |
| `POST` | `/api/auth/login` | Public | Authenticate user & set HTTP-only cookie |
| `POST` | `/api/auth/logout` | Public | Clear HTTP-only cookie session |
| `GET` | `/api/auth/me` | Private | Retrieve current authenticated user |
| `POST` | `/api/orders` | Private | Place order with authoritative price recalculation |
| `GET` | `/api/orders` | Private | Retrieve authenticated user's order history |
| `GET` | `/api/orders/:orderId` | Private | Retrieve order detail (rejects unauthorized users with 403) |
| `GET` | `/api/products` | Public | List catalog products (with caching and fallback) |
| `GET` | `/api/products/categories` | Public | List catalog categories |
| `GET` | `/api/products/:id` | Public | Get single product detail |
| `GET` | `/api/health` | Public | Server uptime and health verification |

For full payload details and response schemas, see [docs/API.md](docs/API.md).

---

## Security Model

1. **Password Hashing**: Bcrypt with salt rounds = 10; plaintext passwords are never stored.
2. **HTTP-Only Cookies**: Authentication tokens are transmitted in HTTP-only, SameSite cookies to protect against cross-site scripting (XSS) credential theft.
3. **Price Recalculation**: The backend rejects client-submitted prices, fetching authoritative product prices from the catalog service.
4. **Rate Limiting**: Authentication endpoints are rate-limited to mitigate brute-force attacks.
5. **Security Headers**: Helmet middleware automatically sets security headers including HSTS, frame protection, and content type options.
6. **Authorization Isolation**: Orders are linked to user ObjectIds in MongoDB and verified on every query.

---

## Documentation

* [API Reference](docs/API.md)
* [Windows Setup & Troubleshooting](docs/SETUP.md)
* [Architectural Design & Diagrams](docs/ARCHITECTURE.md)

