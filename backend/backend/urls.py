from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        "status": "online",
        "service": "AJ Metals Backend API",
        "admin_panel": "/admin/",
        "api_products": "/api/products/",
        "api_categories": "/api/categories/"
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('catalog.urls')),
]

