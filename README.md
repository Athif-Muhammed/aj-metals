# AJ Metals - Premium Headless E-Commerce Showroom

This project is the upgraded, production-ready headless showroom for **AJ Metals** (Gold Bazar, Kayamkulam, Kerala). It features a decoupled architecture with:
- **Backend (Admin Panel & REST API)**: Django + Django REST Framework (DRF)
- **Frontend (Storefront Catalog)**: Next.js (React) + Tailwind CSS (v4)

---

## Folder Structure

```
e:/AJ-Metals/
├── backend/                   # Django Backend Project (Port 8000)
│   ├── manage.py
│   ├── backend/               # Project Configurations
│   └── catalog/               # Catalog Django App (Models, Views, Admin)
│
└── frontend/                  # Next.js Frontend Project (Port 3000)
    ├── package.json
    ├── app/                   # App Router Layout & Pages
    └── public/                # Static assets (including screenshots)
```

---

## 1. Backend Setup & Run (Django)

The backend runs on **Python 3** and exposes endpoints under `http://127.0.0.1:8000/api/`.

### Prerequisites
Make sure dependencies are installed in your Python environment:
```powershell
pip install django djangorestframework django-cors-headers Pillow
```

### Steps to Run
Navigate to `/backend` in your terminal:
```powershell
# Change directory
cd backend

# Apply Migrations
python manage.py migrate

# Seed catalog database with mock products
python manage.py populate_db

# Start the Django Backend server
python manage.py runserver 127.0.0.1:8000
```

### Admin Credentials
You can log into the Django Admin panel at `http://127.0.0.1:8000/admin/` to manage categories and products.
- **Username**: `admin`
- **Password**: `admin123`

---

## 2. Frontend Setup & Run (Next.js)

The frontend is powered by **Next.js**, **React 19**, and **Tailwind CSS v4**.

### Steps to Run
Open a new terminal window, navigate to `/frontend`, and execute:
```powershell
# Change directory
cd frontend

# Install package dependencies
npm install

# Start Next.js dev server
npm run dev
```

The Next.js storefront will start running at **`http://localhost:3000`**.

---

## How to Test Both Servers Simultaneously

To run both servers at the same time on Windows, open two separate PowerShell/cmd terminal tabs:

* **Terminal 1 (Backend)**:
  ```powershell
  cd E:\AJ-Metals\backend
  python manage.py runserver 127.0.0.1:8000
  ```
* **Terminal 2 (Frontend)**:
  ```powershell
  cd E:\AJ-Metals\frontend
  npm run dev
  ```

Once both are running, open:
- **Customer Storefront**: `http://localhost:3000`
- **Store Owner Admin Panel**: `http://localhost:8000/admin`
- **API View**: `http://localhost:8000/api/products/`
