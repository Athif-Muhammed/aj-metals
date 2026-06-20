from rest_framework import serializers
from .models import Category, Product, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductImageSerializer(serializers.ModelSerializer):
    image_filename = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'image_filename', 'order']

    def get_image_filename(self, obj):
        if obj.image_filename:
            try:
                url = obj.image_filename.url
                # If it's a Cloudinary URL, return it directly
                if url.startswith('http'):
                    return url
                # Otherwise, return just the filename (basename) for local public folder mapping
                import os
                return os.path.basename(obj.image_filename.name)
            except ValueError:
                return ""
        return ""


class ProductSerializer(serializers.ModelSerializer):
    # Dynamically resolve Category details in Product serialization
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    additional_images = ProductImageSerializer(many=True, read_only=True)
    image_filename = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'sku', 'description', 
            'category', 'category_name', 'category_slug',
            'weight', 'dimensions', 'material', 
            'price', 'original_price', 'image_filename', 
            'additional_images', 'in_stock', 'created_at', 'updated_at'
        ]

    def get_image_filename(self, obj):
        if obj.image_filename:
            try:
                url = obj.image_filename.url
                # If it's a Cloudinary URL, return it directly
                if url.startswith('http'):
                    return url
                # Otherwise, return just the filename (basename) for local public folder mapping
                import os
                return os.path.basename(obj.image_filename.name)
            except ValueError:
                return ""
        return ""
