"use client";

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
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.022-.08-.06-.154-.109-.217l-1.556-2.006c-.198-.255-.549-.333-.831-.184l-.872.463c-.156.083-.342.062-.477-.053l-2.455-2.073c-.106-.09-.153-.23-.119-.364l.261-.99c.079-.3.003-.623-.198-.856l-1.423-1.65c-.244-.282-.647-.333-.948-.12L8.28 6.945c-.255.18-.396.48-.372.793.18 2.378 1.139 4.606 2.7 6.386a11.137 11.137 0 0 0 7.828 4.298c.328.024.636-.118.816-.373l1.109-1.57c.214-.303.162-.716-.123-.96l-1.767-1.537z" />
          <path d="M12.004 2c-5.514 0-10 4.486-10 10 0 1.944.563 3.76 1.537 5.305L2.03 21.97a.5.5 0 0 0 .616.616l4.665-1.511A9.92 9.92 0 0 0 12.004 22c5.514 0 10-4.486 10-10s-4.486-10-10-10zm0 18.5c-1.745 0-3.376-.532-4.743-1.442a.5.5 0 0 0-.411-.061l-3.21 1.04 1.04-3.21c.045-.141.021-.295-.067-.417a8.437 8.437 0 0 1-1.613-4.91c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-20 bg-primary-navy border border-brass-gold text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 whitespace-nowrap">
          Chat with us
        </span>
      </button>
    </div>
  );
}
