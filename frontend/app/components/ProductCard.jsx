"use client";

import Image from "next/image";
import { Scale } from "lucide-react";
import { useState } from "react";
import ProductIllustration from "./ProductIllustration";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductCard({ product, onSelectProduct }) {
  const [imageError, setImageError] = useState(false);
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
      className="luxury-card rounded-lg sm:rounded-xl overflow-hidden flex flex-col cursor-pointer group"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full overflow-hidden bg-bg-light flex items-center justify-center">
        {!imageError && product.image_filename ? (
          <Image
            src={getImgSrc(product.image_filename)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-108"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-4/5 h-4/5 p-2 sm:p-4 flex items-center justify-center opacity-70 group-hover:scale-105 transition-transform duration-700">
            <ProductIllustration sku={product.sku} className="w-full h-full text-primary-navy/40" />
          </div>
        )}
        
        {/* Purity & Material Badge */}
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary-navy/95 backdrop-blur-xs border-l-2 border-gold-bright text-white text-[8px] sm:text-[9px] font-extrabold tracking-[0.5px] sm:tracking-[1px] uppercase px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-xs shadow-md z-10">
          {product.material}
        </span>

        {/* Stock Status overlay if out of stock */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-primary-navy/80 flex justify-center items-center backdrop-blur-xs z-10">
            <span className="text-white text-[10px] sm:text-xs font-black tracking-wider sm:tracking-widest uppercase border border-brass-gold px-2 py-1 sm:px-4 sm:py-2 rounded-xs">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow bg-white">
        <span className="text-[8px] sm:text-[9px] tracking-[1.5px] uppercase font-bold text-brass-gold mb-1 sm:mb-1.5">
          {product.category_name}
        </span>
        <h3 className="font-serif text-xs sm:text-base font-bold text-primary-navy leading-snug mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-gold-bright transition-colors duration-300">
          {product.name}
        </h3>

        {/* Specs snippet */}
        {(product.weight || product.dimensions) && (
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-4 mt-auto">
            <Scale size={12} className="text-brass-gold shrink-0 sm:w-[13px] sm:h-[13px]" />
            <span className="truncate">{[product.weight, product.dimensions].filter(Boolean).join(" • ")}</span>
          </div>
        )}

        {/* Pricing & CTA Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2 mt-auto pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            {product.original_price && (
              <span className="text-[9px] sm:text-[10px] text-gray-400 line-through leading-none mb-0.5">
                ₹{parseFloat(product.original_price).toLocaleString()}
              </span>
            )}
            <span className="font-serif text-sm sm:text-lg font-black text-primary-navy leading-none">
              ₹{parseFloat(product.price).toLocaleString()}
            </span>
          </div>
          
          <button
            onClick={handleWhatsAppOrder}
            disabled={!product.in_stock}
            className={`w-full sm:w-auto px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
              product.in_stock
                ? "bg-whatsapp-green text-white hover:bg-whatsapp-hover hover:scale-102"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
            aria-label={`Inquire about ${product.name} on WhatsApp`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </article>
  );
}
