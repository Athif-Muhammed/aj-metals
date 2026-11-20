"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import ProductIllustration from "./ProductIllustration";
import WhatsAppIcon from "./WhatsAppIcon";

export default function ProductModal({ product, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);

  // Reset image error state when navigating between images (React 19 recommended pattern)
  if (currentIndex !== prevIndex) {
    setPrevIndex(currentIndex);
    setImageError(false);
  }

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const STORE_PHONE = "919446571575";

  const handleWhatsAppOrder = () => {
    const greeting = `Hello AJ Metals Kayamkulam, I am interested in ordering/inquiring about this item from your online catalog:\n\n`;
    
    const specs = [product.weight, product.dimensions, product.material].filter(Boolean).join(" | ");
    const specsLine = specs ? `*Details/Specs:* ${specs}\n` : '';
    
    const itemDetails = `*Product:* ${product.name}\n*SKU/ID:* ${product.sku}\n${specsLine}*Catalog Price:* ₹${product.price}\n\n`;
    const footer = `Please let me know if it is currently in stock, the daily metal rate, and delivery/pickup options. Thank you!`;
    
    const fullMessage = greeting + itemDetails + footer;
    const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(waUrl, "_blank");
  };

  // Compile list of image filenames: first is primary cover image, followed by any additional images
  const images = [
    product.image_filename,
    ...(product.additional_images || []).map((img) => img.image_filename)
  ].filter(Boolean);

  const getImgSrc = (img) => {
    if (!img) return "/images/placeholder.png";
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `/images/${img}`;
  };

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] bg-primary-navy/85 backdrop-blur-xs flex justify-center items-center p-4 transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking content
        className="relative bg-white rounded-2xl border border-brass-gold w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:grid md:grid-cols-2 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg-light border border-black/5 text-primary-navy flex justify-center items-center shadow-md hover:bg-primary-navy hover:text-white hover:rotate-90 transition-all duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Side: Product Image Carousel */}
        <div 
          className="relative aspect-square md:aspect-auto md:h-full min-h-[350px] bg-bg-light overflow-hidden group/carousel"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.length > 0 ? (
            !imageError ? (
              <Image
                src={getImgSrc(images[currentIndex])}
                alt={`${product.name} - View ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentIndex === 0}
                className="object-cover transition-transform duration-500 ease-out"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 p-8 flex items-center justify-center bg-brass-light/20">
                <ProductIllustration sku={product.sku} className="w-4/5 h-4/5 text-primary-navy/40" />
              </div>
            )
          ) : (
            <div className="absolute inset-0 p-8 flex items-center justify-center bg-brass-light/20">
              <ProductIllustration sku={product.sku} className="w-4/5 h-4/5 text-primary-navy/40" />
            </div>
          )}

          {/* Carousel Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-primary-navy flex justify-center items-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-primary-navy flex justify-center items-center shadow-md opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Carousel Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/25 px-2.5 py-1 rounded-full backdrop-blur-xs">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? "bg-white scale-110" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[2.5px] text-brass-gold">
                {product.category_name}
              </span>
              <span className="bg-brass-light border border-brass-gold/20 text-primary-navy text-[9px] font-bold px-2 py-0.5 rounded-sm">
                {product.material}
              </span>
            </div>
            
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary-navy leading-tight mb-3">
              {product.name}
            </h2>

            {/* Price Section with Savings Info */}
            <div className="flex items-center gap-3 mb-5 bg-brass-light/30 border border-brass-gold/10 p-3 rounded-lg">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-black text-gold-bright">
                  ₹{parseFloat(product.price).toLocaleString()}
                </span>
                {product.original_price && (
                  <span className="text-[11px] text-gray-400 line-through">
                    Original: ₹{parseFloat(product.original_price).toLocaleString()}
                  </span>
                )}
              </div>
              {product.original_price && (
                <span className="ml-auto text-[10px] bg-gold-bright/15 text-gold-bright font-black uppercase tracking-wider px-2 py-1 rounded-sm">
                  Save ₹{(parseFloat(product.original_price) - parseFloat(product.price)).toLocaleString()}
                </span>
              )}
            </div>

            {/* Product Description */}
            <div 
              className="text-xs text-gray-600 leading-relaxed mb-6 space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 font-sans" 
              dangerouslySetInnerHTML={{ __html: product.description }} 
            />

            {/* Ayurvedic Health / Material Tip (Consumer Psychology Hook) */}
            {(() => {
              const mat = product.material.toLowerCase();
              let healthTip = null;
              if (mat.includes("copper")) {
                healthTip = "Ayurvedic practice suggests storing water in copper containers (Tamra Jal) balances body systems, boosts digestion, and acts as a natural antioxidant.";
              } else if (mat.includes("brass")) {
                healthTip = "Cooking in traditional brass cookware preserves up to 93% of natural food nutrients and releases healthy trace elements into your daily meals.";
              } else if (mat.includes("bell metal") || mat.includes("bronze") || mat.includes("vengala")) {
                healthTip = "Traditional bell metal (Venkalam) is alkaline, meaning it naturally purifies cooked dishes, balances pH levels, and enhances digestability.";
              }
              
              if (!healthTip) return null;
              return (
                <div className="mb-6 p-4 rounded-lg bg-brass-gold/5 border-l-3 border-brass-gold flex gap-3 items-start">
                  <span className="text-brass-gold text-lg leading-none mt-0.5">✨</span>
                  <div>
                    <h5 className="text-[10px] uppercase tracking-[1px] font-black text-primary-navy mb-0.5">Ayurvedic Purity Tip</h5>
                    <p className="text-[11px] leading-normal text-primary-navy/80">{healthTip}</p>
                  </div>
                </div>
              );
            })()}

            {/* Specifications Table */}
            <div className="border border-brass-gold/20 rounded-lg overflow-hidden mb-6">
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  {product.weight && (
                    <tr className="border-b border-brass-gold/10 bg-brass-light/10">
                      <th className="py-2.5 px-3 text-gray-400 font-medium w-1/3">Weight/Volume</th>
                      <td className="py-2.5 px-3 font-bold text-primary-navy">{product.weight}</td>
                    </tr>
                  )}
                  {product.dimensions && (
                    <tr className="border-b border-brass-gold/10">
                      <th className="py-2.5 px-3 text-gray-400 font-medium">Dimensions</th>
                      <td className="py-2.5 px-3 font-bold text-primary-navy">{product.dimensions}</td>
                    </tr>
                  )}
                  {product.material && (
                    <tr className="border-b border-brass-gold/10 bg-brass-light/10">
                      <th className="py-2.5 px-3 text-gray-400 font-medium">Material</th>
                      <td className="py-2.5 px-3 font-bold text-primary-navy">{product.material}</td>
                    </tr>
                  )}
                  <tr>
                    <th className="py-2.5 px-3 text-gray-400 font-medium">SKU ID</th>
                    <td className="py-2.5 px-3 font-mono font-bold text-primary-navy">{product.sku}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={handleWhatsAppOrder}
              disabled={!product.in_stock}
              className={`w-full py-3.5 rounded-md text-xs font-black uppercase tracking-wider flex justify-center items-center gap-2 shadow-md transition-all duration-300 cursor-pointer ${
                product.in_stock
                  ? "bg-whatsapp-green hover:bg-whatsapp-hover text-white shadow-whatsapp-green/10 hover:-translate-y-0.5"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Inquire about this item on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
              Inquire on WhatsApp
            </button>
            <p className="text-[10px] text-center text-gray-400">
              AJ Metals is a physical showroom in Kayamkulam. Tap above to check stock or reserve for in-store pickup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
