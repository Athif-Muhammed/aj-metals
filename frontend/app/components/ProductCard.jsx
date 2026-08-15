"use client";

import Image from "next/image";
import { Scale } from "lucide-react";

export default function ProductCard({ product, onSelectProduct }) {
  const STORE_PHONE = "919446571575";

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation(); // Avoid opening quick-view modal on CTA click
    
    const greeting = `Hello AJ Metals Kayamkulam, I am interested in ordering/inquiring about this item from your online catalog:\n\n`;
    
    const specs = [product.weight, product.dimensions, product.material].filter(Boolean).join(" | ");
    const specsLine = specs ? `*Details/Specs:* ${specs}\n` : '';
    
    const itemDetails = `*Product:* ${product.name}\n*SKU/ID:* ${product.sku}\n${specsLine}*Catalog Price:* ₹${product.price}\n\n`;
    const footer = `Please let me know if it is currently in stock, the daily metal rate, and delivery/pickup options. Thank you!`;
    
    const fullMessage = greeting + itemDetails + footer;
    const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(waUrl, "_blank");
  };

  const getImgSrc = (img) => {
    if (!img) return "/images/placeholder.png";
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `/images/${img}`;
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="luxury-card rounded-xl overflow-hidden flex flex-col cursor-pointer group"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden bg-bg-light">
        <Image
          src={getImgSrc(product.image_filename)}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
        />
        
        {/* Purity & Material Badge */}
        <span className="absolute top-3 left-3 bg-primary-navy/95 backdrop-blur-xs border-l-2 border-gold-bright text-white text-[9px] font-extrabold tracking-[1px] uppercase px-2.5 py-1.5 rounded-xs shadow-md z-10">
          {product.material}
        </span>

        {/* Stock Status overlay if out of stock */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-primary-navy/80 flex justify-center items-center backdrop-blur-xs z-10">
            <span className="text-white text-xs font-black tracking-widest uppercase border border-brass-gold px-4 py-2 rounded-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <span className="text-[9px] tracking-[2px] uppercase font-bold text-brass-gold mb-1.5">
          {product.category_name}
        </span>
        <h3 className="font-serif text-base font-bold text-primary-navy leading-snug mb-2 line-clamp-2 group-hover:text-gold-bright transition-colors duration-300">
          {product.name}
        </h3>

        {/* Specs snippet */}
        {(product.weight || product.dimensions) && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4 mt-auto">
            <Scale size={13} className="text-brass-gold shrink-0" />
            <span className="truncate">{[product.weight, product.dimensions].filter(Boolean).join(" • ")}</span>
          </div>
        )}

        {/* Pricing & CTA Row */}
        <div className="flex justify-between items-center gap-2 mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            {product.original_price && (
              <span className="text-[10px] text-gray-400 line-through leading-none mb-1">
                ₹{parseFloat(product.original_price).toLocaleString()}
              </span>
            )}
            <span className="font-serif text-lg font-black text-primary-navy leading-none">
              ₹{parseFloat(product.price).toLocaleString()}
            </span>
          </div>
          
          <button
            onClick={handleWhatsAppOrder}
            disabled={!product.in_stock}
            className={`px-4 py-2.5 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
              product.in_stock
                ? "bg-whatsapp-green text-white hover:bg-whatsapp-hover hover:scale-102"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            aria-label={`Inquire about ${product.name} on WhatsApp`}
          >
            {product.in_stock && (
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping shrink-0" />
            )}
            Inquire
          </button>
        </div>
      </div>
    </article>
  );
}
