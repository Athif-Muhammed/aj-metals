FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies for build tools and postgres
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy application files
COPY . /app/

# Make build.sh executable
RUN chmod +x /app/build.sh

EXPOSE 8000

# Start command: collect static files, run migrations, and start server
CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:8000"]
