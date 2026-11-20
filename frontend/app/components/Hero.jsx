"use client";

import Image from "next/image";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero({ heroImage }) {
  return (
    <section className="relative w-full py-20 bg-primary-navy overflow-hidden z-1 text-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`/images/${heroImage}`}
          alt="AJ Metals Storefront in Kayamkulam"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/80 via-primary-navy/95 to-primary-navy" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">
        <span className="inline-block bg-brass-gold/15 border border-brass-gold/30 text-brass-gold px-4 py-1.5 text-[10px] font-bold tracking-[3px] uppercase rounded-full mb-6 shadow-xs backdrop-blur-xs">
          Est. 2006 • Gold Bazar, Kayamkulam
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-md">
          A Legacy of Pure <span className="shimmer-text italic font-bold">Craftsmanship</span>
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-brass-light/80 leading-relaxed mb-12">
          For over two decades, AJ Metals has supplied premium traditional Kerala brassware, divine idols, heavy-duty event cookware, and everyday kitchen essentials directly from Kayamkulam&apos;s famous Gold Bazar.
        </p>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 mt-2 w-full sm:w-auto">
          <button
            onClick={() => {
              const catalogElement = document.getElementById("catalog-section");
              if (catalogElement) {
                catalogElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center justify-center h-12 px-8 bg-gold-bright hover:bg-white text-primary-navy text-xs font-extrabold uppercase tracking-[1.5px] rounded-md shadow-lg shadow-gold-bright/10 hover:shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto box-border"
          >
            Explore Collection
          </button>
          <a
            href="https://wa.me/919446571575"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-brass-gold/40 text-brass-light hover:border-gold-bright hover:text-gold-bright text-xs font-extrabold uppercase tracking-[1.5px] rounded-md transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto box-border"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
            <span>Consult via WhatsApp</span>
          </a>
        </div>
        {/* Store Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16 mt-4 w-full">
          <div className="flex flex-col items-center border-r border-brass-gold/20 pr-6 sm:pr-12 last:border-none last:pr-0">
            <span className="font-serif text-3xl sm:text-4xl font-black text-gold-bright mb-1">
              20+
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-brass-light/60 font-bold">
              Years Legacy
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-brass-gold/20 pr-6 sm:pr-12 last:border-none last:pr-0">
            <span className="font-serif text-3xl sm:text-4xl font-black text-gold-bright mb-1">
              100%
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-brass-light/60 font-bold">
              Pure Metals
            </span>
          </div>
          <div className="flex flex-col items-center last:border-none last:pr-0">
            <span className="font-serif text-3xl sm:text-4xl font-black text-gold-bright mb-1">
              1000+
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-brass-light/60 font-bold">
              Happy Families
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
