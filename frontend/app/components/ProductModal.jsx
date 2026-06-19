"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    const itemDetails = `*Product:* ${product.name}\n*SKU/ID:* ${product.sku}\n*Details/Specs:* ${product.weight} | ${product.dimensions} | ${product.material}\n*Catalog Price:* ₹${product.price}\n\n`;
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
          onTouchStart={images.length > 1 ? onTouchStart : undefined}
          onTouchMove={images.length > 1 ? onTouchMove : undefined}
          onTouchEnd={images.length > 1 ? onTouchEnd : undefined}
        >
          {/* Slides Wrapper */}
          <div className="relative w-full h-full">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  idx === currentIndex ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={`/images/${img}`}
                  alt={`${product.name} - Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows (Desktop/Laptop) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-xs text-primary-navy border border-black/5 flex justify-center items-center shadow-md hover:bg-primary-navy hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-xs text-primary-navy border border-black/5 flex justify-center items-center shadow-md hover:bg-primary-navy hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-black/25 backdrop-blur-xs px-3 py-1.5 rounded-full">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex ? "bg-white scale-120" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[2px] text-brass-gold mb-2 block">
              {product.category_name}
            </span>
            <h2 className="font-serif text-2xl font-black text-primary-navy leading-tight mb-4">
              {product.name}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-2xl font-extrabold text-gold-bright">
                ₹{parseFloat(product.price).toLocaleString()}
              </span>
              {product.original_price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{parseFloat(product.original_price).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specifications Table */}
            <table className="w-full text-xs text-left border-collapse mb-8">
              <tbody>
                <tr className="border-b border-gray-100">
                  <th className="py-2.5 text-gray-400 font-medium w-1/3">Weight/Volume</th>
                  <td className="py-2.5 font-bold text-text-dark">{product.weight}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th className="py-2.5 text-gray-400 font-medium">Dimensions</th>
                  <td className="py-2.5 font-bold text-text-dark">{product.dimensions}</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <th className="py-2.5 text-gray-400 font-medium">Material</th>
                  <td className="py-2.5 font-bold text-text-dark">{product.material}</td>
                </tr>
                <tr>
                  <th className="py-2.5 text-gray-400 font-medium">SKU Code</th>
                  <td className="py-2.5 font-bold text-text-dark">{product.sku}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleWhatsAppOrder}
              disabled={!product.in_stock}
              className={`w-full py-4 rounded-md text-sm font-bold flex justify-center items-center gap-2 shadow-md transition-all duration-300 cursor-pointer ${
                product.in_stock
                  ? "bg-whatsapp-green hover:bg-whatsapp-hover text-white shadow-whatsapp-green/15 hover:shadow-whatsapp-green/25 hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              aria-label="Order this item on WhatsApp"
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
        </div>
      </div>
    </div>
  );
}
