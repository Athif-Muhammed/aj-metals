from django.contrib import admin
from .models import Category, Product, ProductImage

admin.site.site_header = "AJ Metals Admin"
admin.site.site_title = "AJ Metals Catalog"
admin.site.index_title = "AJ Metals Catalog Management"

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('image_filename', 'order')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
    list_display = ('sku', 'name', 'category', 'price', 'material', 'in_stock')
    list_filter = ('category', 'in_stock', 'material')
    search_fields = ('sku', 'name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('sku', 'name', 'slug', 'description', 'category')
        }),
        ('Specifications', {
            'fields': ('weight', 'dimensions', 'material')
        }),
        ('Pricing & Availability', {
            'fields': ('price', 'original_price', 'in_stock')
        }),
        ('Assets', {
            'fields': ('image_filename',)
        }),
    )

# Unregister Groups and Users from Admin index to keep it minimal (only 1 admin user accesses the panel)
from django.contrib.auth.models import Group, User

try:
    admin.site.unregister(Group)
except admin.sites.NotRegistered:
    pass

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass
