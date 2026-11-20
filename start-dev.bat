@echo off
echo ===================================================
echo Starting AJ Metals Local Development Environment
echo ===================================================

echo [1/2] Starting Django Backend on http://127.0.0.1:8000 ...
start "AJ Metals - Django Backend" cmd /k "cd /d %~dp0 && .venv\Scripts\activate && cd backend && python manage.py runserver 127.0.0.1:8000"

echo [2/2] Starting Next.js Frontend on http://localhost:3000 ...
start "AJ Metals - Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers have been launched in separate terminal windows.
echo - Storefront: http://localhost:3000
echo - Admin Panel: http://127.0.0.1:8000/admin/
echo ===================================================
