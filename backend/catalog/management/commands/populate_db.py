import os
from django.core.management.base import BaseCommand
from catalog.models import Category, Product

class Command(BaseCommand):
    help = 'Populates the database with initial Categories and Products mapping to screenshot assets'

    def handle(self, *args, **kwargs):
        self.stdout.write("Populating database...")
        
        # 1. Clear existing entries
        Product.objects.all().delete()
        Category.objects.all().delete()
        
        # 2. Define categories
        categories_data = [
            "Traditional & Pooja Brassware",
            "Divine Idols & Decor",
            "Heavy-Duty & Event Cookware",
            "Everyday Kitchen Essentials"
        ]
        
        categories = {}
        for cat_name in categories_data:
            cat, created = Category.objects.get_or_create(name=cat_name)
            categories[cat_name] = cat
            self.stdout.write(f"Category created: {cat_name}")
            
        # 3. Define products
        products_data = [
            {
                "name": "Traditional Kerala Nilavilakku (കേരള നിലവിളക്ക്)",
                "sku": "AJ-BR-001",
                "category": categories["Traditional & Pooja Brassware"],
                "price": 3450.00,
                "original_price": 3900.00,
                "weight": "4.8 kg",
                "dimensions": "Height: 24 inches",
                "material": "Pure Brass",
                "image_filename": "Screenshot 2026-06-19 180649.png",
                "description": "A classic centerpiece for any auspicious occasion. Handcrafted by master artisans using premium brass, this multi-tiered Nilavilakku features an elegant finish, stable base, and optimal wick placement for a serene, long-lasting flame."
            },
            {
                "name": "Ashtamangalya Pooja Set (അഷ്ടമംഗല്യ സെറ്റ്)",
                "sku": "AJ-BR-002",
                "category": categories["Traditional & Pooja Brassware"],
                "price": 5200.00,
                "original_price": 5800.00,
                "weight": "2.5 kg",
                "dimensions": "Plate Diameter: 12 inches",
                "material": "Premium Bell Metal",
                "image_filename": "Screenshot 2026-06-19 180655.png",
                "description": "An essential collection of eight auspicious items used in traditional Kerala Hindu weddings and ceremonies. Highly polished brass/bell metal includes the Valkannadi (metal mirror), Uruli, Para, and other pooja essentials."
            },
            {
                "name": "Divine Brass Ganesha Idol (ഗണപതി വിഗ്രഹം)",
                "sku": "AJ-ID-001",
                "category": categories["Divine Idols & Decor"],
                "price": 8900.00,
                "original_price": 9800.00,
                "weight": "6.2 kg",
                "dimensions": "14 x 8 x 6 inches",
                "material": "Antique Brass",
                "image_filename": "Screenshot 2026-06-19 180716.png",
                "description": "Invite prosperity and remove obstacles with this intricately detailed brass Lord Ganesha idol. Designed with fine traditional ornamentation and a dark-antique brass patina that highlights every detail of the sculpture."
            },
            {
                "name": "Designer Brass Uruli with Handles (ഡിസൈനർ ഉരുളി)",
                "sku": "AJ-ID-002",
                "category": categories["Divine Idols & Decor"],
                "price": 4100.00,
                "original_price": 4600.00,
                "weight": "3.5 kg",
                "dimensions": "Diameter: 16 inches",
                "material": "Polished Brass",
                "image_filename": "Screenshot 2026-06-19 180722.png",
                "description": "Perfect for floating flowers, candles, or potpourri. Features beautiful hand-carved floral patterns on the rim and heavy brass side handles. An iconic piece of traditional Kerala home decor."
            },
            {
                "name": "Heavy-Duty Bronze Uruli Cookware (വെങ്കല ഉരുളി)",
                "sku": "AJ-CW-001",
                "category": categories["Heavy-Duty & Event Cookware"],
                "price": 12500.00,
                "original_price": 14000.00,
                "weight": "11.2 kg",
                "dimensions": "Capacity: 15 Litres",
                "material": "Traditional Bell Metal (Vengala)",
                "image_filename": "Screenshot 2026-06-19 180734.png",
                "description": "Crafted for high-temperature event cooking, payasam preparation, and traditional feasts. Exceptional heat retention properties of genuine Kayamkulam bell metal guarantee authentic flavor and long-lasting durability."
            },
            {
                "name": "Traditional Brass Vattu Chembu (വട്ടു ചെമ്പ്)",
                "sku": "AJ-CW-002",
                "category": categories["Heavy-Duty & Event Cookware"],
                "price": 7800.00,
                "original_price": 8500.00,
                "weight": "6.5 kg",
                "dimensions": "Capacity: 20 Litres",
                "material": "Heavy-Gauge Copper-Brass Alloy",
                "image_filename": "Screenshot 2026-06-19 180744.png",
                "description": "A classic Kerala water storage and event cooking vessel. Crafted with a broad bottom for stability and heavy-gauge walls for uniform heat conduction. Ideal for traditional kitchens and celebrations."
            },
            {
                "name": "Stainless Steel Kada / Cheena Chatti (ചീനച്ചട്ടി)",
                "sku": "AJ-KE-001",
                "category": categories["Everyday Kitchen Essentials"],
                "price": 1250.00,
                "original_price": 1500.00,
                "weight": "3mm Tri-Ply",
                "dimensions": "Diameter: 12 inches",
                "material": "Food-Grade Stainless Steel",
                "image_filename": "Screenshot 2026-06-19 180751.png",
                "description": "Heavy-duty rust-proof frying pan built for everyday frying, sautéing, and curries. Features a tri-ply sandwich base for even heat distribution without hotspots. Compatible with induction and gas stoves."
            },
            {
                "name": "Premium Brass Puttu Maker (പിത്തള പുട്ടുകുറ്റി)",
                "sku": "AJ-KE-002",
                "category": categories["Everyday Kitchen Essentials"],
                "price": 1850.00,
                "original_price": 2100.00,
                "weight": "1.2 kg",
                "dimensions": "Height: 12 inches",
                "material": "Pure Brass with Tin Lining",
                "image_filename": "Screenshot 2026-06-19 180757.png",
                "description": "Prepare healthy, traditional steamed puttu with this food-safe, tin-lined pure brass Puttu Kutti. It imparts a traditional aroma and flavor to your steamed rice cakes while ensuring absolute safety."
            },
            {
                "name": "Handcrafted Copper Water Carafe & Glass (ചെമ്പ് കുപ്പി)",
                "sku": "AJ-KE-003",
                "category": categories["Everyday Kitchen Essentials"],
                "price": 1450.00,
                "original_price": 1750.00,
                "weight": "1 Litre Bottle + 250ml Glass",
                "dimensions": "Bottle Height: 10 inches",
                "material": "99.9% Pure Copper",
                "image_filename": "Screenshot 2026-06-19 180803.png",
                "description": "Reap the health benefits of water stored overnight in pure copper. Features a leak-proof cap, sleek ergonomic design, and a mirror finish. Set includes one bottle and a matching copper tumbler."
            }
        ]
        
        for p_data in products_data:
            product = Product.objects.create(**p_data)
            # Safe print using SKU only, to avoid CP1252 console encoding errors in Windows
            self.stdout.write(f"Product created: {product.sku}")
            
        self.stdout.write(self.style.SUCCESS("Database populated successfully!"))
