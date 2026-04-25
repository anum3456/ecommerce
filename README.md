# Atelier — Full Stack Mini eCommerce

## Prerequisites: Install MongoDB (Windows)

**Option A — MongoDB Community Server (recommended)**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer — check "Install MongoDB as a Service" ✅
3. MongoDB will start automatically

**Verify / start MongoDB:**
```powershell
net start MongoDB
```

**Option B — MongoDB Atlas (cloud, no install)**
1. Free account at https://cloud.mongodb.com
2. Create free M0 cluster, get your connection string
3. Edit backend/.env → set MONGO_URI to your Atlas URI

---

## Setup & Run

### Step 1 — Install all dependencies
```powershell
npm install          # installs concurrently in root
npm run install:all  # installs backend + frontend deps
```

### Step 2 — Seed the database (MongoDB must be running)
```powershell
npm run seed
```

### Step 3 — Start both servers

**Option A — Single command (after npm install in root)**
```powershell
npm run dev
```

**Option B — Two separate terminals (always works)**
```powershell
# Terminal 1
.\start-backend.bat

# Terminal 2
.\start-frontend.bat
```

### Step 4 — Open browser
```
http://localhost:5173
```

---

## Troubleshooting

**MongoDB connection refused**
```powershell
net start MongoDB
# or open services.msc and start MongoDB manually
```

**concurrently not found**
```powershell
npm install    # run this in the ecommerce/ root folder first
```

**Port 5000 in use**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (?category= ?search=) |
| GET | /api/products/:id | Single product |
| POST | /api/products | Create product |
| GET | /api/cart | Get cart |
| POST | /api/cart | Add to cart |
| PATCH | /api/cart/:id | Update quantity |
| DELETE | /api/cart/:id | Remove item |
| DELETE | /api/cart | Clear cart |
| GET | /api/orders | List orders |
| POST | /api/orders | Place order (clears cart) |
