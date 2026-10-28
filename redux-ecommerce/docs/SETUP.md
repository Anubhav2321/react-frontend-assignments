# ShopSphere Setup & Execution Guide (Windows / PowerShell)

This guide walks you through setting up and running **ShopSphere** on Windows using VS Code and PowerShell.

---

## 1. Prerequisites

Verify that the following tools are installed on your machine:

1. **Node.js** (v18.x, v20.x, or v22+ recommended; v24 is also supported)
   ```powershell
   node -v
   npm -v
   ```
2. **MongoDB**:
   * **Option A (Local)**: MongoDB Community Server installed locally on port `27017`.
   * **Option B (Cloud)**: Free MongoDB Atlas cluster URI (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/shopsphere`).

---

## 2. Environment Configuration

### Backend Configuration
Navigate to `backend/` and verify or copy `.env.example` to `.env`:

```powershell
cd backend
Copy-Item .env.example .env
```

Ensure `backend/.env` contains:
```ini
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/shopsphere
JWT_SECRET=shopsphere_dev_jwt_secret_key_super_secure_2026!
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```
> **Tip:** If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### Frontend Configuration
Navigate to `frontend/` and verify or copy `.env.example` to `.env`:

```powershell
cd ..\frontend
Copy-Item .env.example .env
```

Ensure `frontend/.env` contains:
```ini
VITE_API_URL=http://localhost:5000/api
VITE_FAKESTORE_URL=https://fakestoreapi.com
```

---

## 3. Dependency Installation

Open a PowerShell terminal in the project root:

```powershell
# 1. Install Backend Dependencies
cd backend
npm install

# 2. Install Frontend Dependencies
cd ..\frontend
npm install
```

---

## 4. Starting the Application

For a complete local development experience, start the backend and frontend in **two separate PowerShell terminals**.

### Terminal 1: Start Backend (Express API & MongoDB)
```powershell
cd backend
npm run dev
```
* The backend will connect to MongoDB and start on **`http://localhost:5000`**.
* Health check: verify by opening `http://localhost:5000/api/health` in your browser.

> **Note on MongoDB**:
> If MongoDB is installed as a Windows Service, ensure it is running:
> ```powershell
> Start-Service MongoDB
> ```
> Or run `mongod.exe` directly from PowerShell:
> ```powershell
> & "C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath "C:\data\db"
> ```

### Terminal 2: Start Frontend (Vite & React)
```powershell
cd frontend
npm run dev
```
* The Vite dev server will start instantly at **`http://localhost:5173`**.
* Open your browser and navigate to `http://localhost:5173`.

---

## 5. Running Automated Tests

Both frontend and backend include automated test suites powered by **Vitest**.

### Run Backend Integration Tests
Tests authentication, password hashing, user registration, server-side order total calculations, and 403 order isolation:
```powershell
cd backend
npm test
```
*(Runs 14 integration test specs with isolated in-memory MongoDB environment).*

### Run Frontend Unit & Component Tests
Tests Redux slices, memoized selectors, cart recalculations, UI components, and protected routes:
```powershell
cd frontend
npm test
```
*(Runs 23 frontend unit/component tests in jsdom environment).*

### Production Build Verification
To test frontend production bundling:
```powershell
cd frontend
npm run build
```

---

## 6. Troubleshooting Common Windows Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `connect ECONNREFUSED 127.0.0.1:27017` | Local MongoDB server is not running | Start the MongoDB Windows service (`net start MongoDB`) or use a MongoDB Atlas cloud URI in `backend/.env`. |
| `EADDRINUSE: address already in use :::5000` | Another process is using port 5000 | Find and terminate the process with `Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess \| Stop-Process` or change `PORT=5001` in `backend/.env` and `VITE_API_URL` in `frontend/.env`. |
| `EPERM: operation not permitted` on Windows | Antivirus or file lock in `node_modules` | Close VS Code, reopen PowerShell as Administrator, or re-run the command. |
| CORS errors in browser console | Frontend and backend ports mismatched | Ensure `FRONTEND_URL=http://localhost:5173` in `backend/.env` matches your browser URL. |

