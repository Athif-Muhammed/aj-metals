#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Running database migrations..."
python manage.py migrate

# Automatically configure superuser (create or update password)
if [ -n "${DJANGO_SUPERUSER_USERNAME}" ] && [ -n "${DJANGO_SUPERUSER_PASSWORD}" ]; then
    echo "Configuring superuser..."
    python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
user, created = User.objects.get_or_create(username='${DJANGO_SUPERUSER_USERNAME}', defaults={'email': 'admin@example.com'})
user.set_password('${DJANGO_SUPERUSER_PASSWORD}')
user.is_staff = True
user.is_superuser = True
user.save()
print(f'Superuser {user.username} configured successfully.')
"
fi
