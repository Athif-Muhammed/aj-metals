"use client";

import Image from "next/image";
import { Scale } from "lucide-react";

export default function ProductCard({ product, onSelectProduct }) {
  const STORE_PHONE = "919446571575";

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation(); // Avoid opening quick-view modal on CTA click
    
    const greeting = `Hello AJ Metals Kayamkulam, I am interested in ordering/inquiring about this item from your online catalog:\n\n`;
    const itemDetails = `*Product:* ${product.name}\n*SKU/ID:* ${product.sku}\n*Details/Specs:* ${product.weight} | ${product.dimensions} | ${product.material}\n*Catalog Price:* ₹${product.price}\n\n`;
    const footer = `Please let me know if it is currently in stock, the daily metal rate, and delivery/pickup options. Thank you!`;
    
    const fullMessage = greeting + itemDetails + footer;
    const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(waUrl, "_blank");
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-md hover:border-brass-gold cursor-pointer"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden bg-bg-light">
        <Image
          src={`/images/${product.image_filename}`}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-106"
        />
        
        {/* Dynamic Tag */}
        <span className="absolute top-4 left-4 bg-primary-navy border-l-3 border-gold-bright text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow">
          {product.sku.startsWith("AJ-BR") ? "Pooja Brass" : product.sku.startsWith("AJ-ID") ? "Divine" : "Premium"}
        </span>

        {/* Stock Status overlay if out of stock */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-primary-navy/70 flex justify-center items-center backdrop-blur-xs">
            <span className="text-white text-xs font-bold tracking-wider uppercase border-2 border-brass-gold px-4 py-2 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] tracking-[1.5px] uppercase font-bold text-gray-400 mb-1">
          {product.category_name}
        </span>
        <h3 className="font-sans text-base font-extrabold text-primary-navy leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Specs snippet */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 mt-auto">
          <Scale size={14} className="text-brass-gold" />
          <span>{product.weight} | {product.dimensions}</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-serif text-lg font-extrabold text-gold-bright">
            ₹{parseFloat(product.price).toLocaleString()}
          </span>
          {product.original_price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{parseFloat(product.original_price).toLocaleString()}
            </span>
          )}
        </div>

        {/* WhatsApp CTA */}
        <button
          onClick={handleWhatsAppOrder}
          disabled={!product.in_stock}
          className={`w-full py-3 rounded-md text-xs font-bold flex justify-center items-center gap-2 shadow-sm transition-all duration-300 cursor-pointer ${
            product.in_stock
              ? "bg-whatsapp-green hover:bg-whatsapp-hover text-white shadow-whatsapp-green/10 hover:shadow-whatsapp-green/20 hover:-translate-y-0.5"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          aria-label={`Order ${product.name} on WhatsApp`}
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.022-.08-.06-.154-.109-.217l-1.556-2.006c-.198-.255-.549-.333-.831-.184l-.872.463c-.156.083-.342.062-.477-.053l-2.455-2.073c-.106-.09-.153-.23-.119-.364l.261-.99c.079-.3.003-.623-.198-.856l-1.423-1.65c-.244-.282-.647-.333-.948-.12L8.28 6.945c-.255.18-.396.48-.372.793.18 2.378 1.139 4.606 2.7 6.386a11.137 11.137 0 0 0 7.828 4.298c.328.024.636-.118.816-.373l1.109-1.57c.214-.303.162-.716-.123-.96l-1.767-1.537z" />
            <path d="M12.004 2c-5.514 0-10 4.486-10 10 0 1.944.563 3.76 1.537 5.305L2.03 21.97a.5.5 0 0 0 .616.616l4.665-1.511A9.92 9.92 0 0 0 12.004 22c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.5c-1.745 0-3.376-.532-4.743-1.442a.5.5 0 0 0-.411-.061l-3.21 1.04 1.04-3.21c.045-.141.021-.295-.067-.417a8.437 8.437 0 0 1-1.613-4.91c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
          </svg>
          Order on WhatsApp
        </button>
      </div>
    </article>
  );
}
