from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    sku = models.CharField(max_length=50, unique=True, verbose_name="SKU Code")
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='products', on_delete=models.SET_NULL, null=True)
    
    # Metal specifications
    weight = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 4.8 kg or 250 grams")
    dimensions = models.CharField(max_length=100, blank=True, null=True, help_text="e.g. 24 inches or 12 x 8 inches")
    material = models.CharField(max_length=100, blank=True, default="Pure Brass", help_text="e.g. Pure Brass, Bell Metal, Copper")
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Optional strike-through price")
    
    # Assets & Availability
    image_filename = models.ImageField(upload_to='', max_length=255, help_text="Upload the primary product image, e.g. Poojabrass.jpg")
    in_stock = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.sku})"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='additional_images', on_delete=models.CASCADE)
    image_filename = models.ImageField(upload_to='', max_length=255, help_text="Upload an additional product image")
    order = models.PositiveIntegerField(default=0, help_text="Order in which this image is displayed")

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.sku} - Image {self.order} ({self.image_filename})"
