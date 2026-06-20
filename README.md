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
│   ├── backend/               # Project Configurations (settings, urls)
│   └── catalog/               # Catalog Django App (Models, Views, Admin, Commands)
│
└── frontend/                  # Next.js Frontend Project (Port 3000)
    ├── package.json
    ├── app/                   # App Router Pages, Styles, and Carousel Components
    └── public/                # Static assets & dynamic uploaded product media
```

---

## Key Upgraded Features

1. **Integrated Image Upload Storage**:
   - Django settings route uploaded product image files (`MEDIA_ROOT`) directly to `frontend/public/images/`. 
   - When you upload product photos via the Django Admin, they are immediately available on the Next.js storefront without manual copy-pasting.
2. **Multi-Image Carousel**:
   - Supports uploading multiple additional images per product in Django Admin (`ProductImage` inline).
   - The storefront quick-view modal (`ProductModal.jsx`) dynamically renders a fully responsive swipable carousel with arrow controls and dot indicators.
3. **Heritage Luxury Aesthetic**:
   - Standardized to the selected **Heritage Luxury** color scheme: Deep Midnight Navy (`#0D1B2A`), Warm Gold/Champagne (`#C5A880`), and Polished Brass (`#D4AF37`) for high-end catalog cataloguing.
4. **4-Column Responsive Layout**:
   - Card catalog displays on an optimized 4-column grid (`lg:grid-cols-4`) on large desktop displays, collapsing to 1-column on mobile.
5. **Environment Configurability**:
   - Settings fetch `DATABASE_URL` (supports production PostgreSQL with `dj-database-url`), `SECRET_KEY`, `DEBUG`, and `ALLOWED_HOSTS` dynamically from the environment.
   - Next.js fetches `NEXT_PUBLIC_API_URL` dynamically.

---

## 1. Backend Setup & Run (Django)

The backend runs on **Python 3** and exposes endpoints under `http://127.0.0.1:8000/api/`.

### Prerequisites
Make sure dependencies are installed in your Python environment:
```powershell
pip install django djangorestframework django-cors-headers Pillow dj-database-url whitenoise
```

### Steps to Run
Navigate to `/backend` in your terminal:
```powershell
# Change directory
cd backend

# Apply Database Migrations
python manage.py migrate

# Seed catalog database with mock products
python manage.py populate_db

# Start the Django Backend server
python manage.py runserver 127.0.0.1:8000
```

### Admin Credentials
You can log into the Django Admin panel at `http://127.0.0.1:8000/admin/` to manage categories, products, and additional images.
- **Username**: `manager`
- **Password**: `AJMetals2026!`

---

## 2. Frontend Setup & Run (Next.js)

The frontend is powered by **Next.js**, **React 19**, **Tailwind CSS v4**, and **Lucide React**.

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

## How to Run Both Servers Simultaneously

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
- **API Endpoint View**: `http://localhost:8000/api/products/`
