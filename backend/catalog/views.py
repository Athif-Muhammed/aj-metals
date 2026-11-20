from rest_framework import viewsets, filters
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows categories to be viewed.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows products to be viewed, searched, and filtered.
    Uses select_related and prefetch_related to eliminate N+1 database queries.
    """
    queryset = Product.objects.select_related('category').prefetch_related('additional_images').all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'sku', 'description', 'material']

    def get_queryset(self):
        queryset = Product.objects.select_related('category').prefetch_related('additional_images').all()
        # Safe parameterized category filter: /api/products/?category=slug
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug.strip())
        return queryset
