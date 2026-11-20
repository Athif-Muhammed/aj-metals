"use client";

import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppFAB() {
  const STORE_PHONE = "919446571575";

  const handleGeneralInquiry = () => {
    const message = "Hello AJ Metals Kayamkulam, I am looking for something specific. I have a general inquiry about your traditional brass and cookware catalog.";
    const waUrl = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-[900]">
      <button
        onClick={handleGeneralInquiry}
        className="group relative flex justify-center items-center w-16 h-16 bg-whatsapp-green rounded-full text-white shadow-xl shadow-whatsapp-green/30 cursor-pointer animate-pulse-fab hover:bg-whatsapp-hover hover:scale-110 hover:rotate-[5deg] transition-all duration-300"
        aria-label="Contact AJ Metals on WhatsApp"
      >
        {/* SVG WhatsApp Icon */}
        <WhatsAppIcon className="w-8 h-8 fill-current" />

        {/* Hover Tooltip */}
        <span className="absolute right-20 bg-primary-navy border border-brass-gold text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </button>
    </div>
  );
}
