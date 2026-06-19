"use client";

import Image from "next/image";

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
        <span className="inline-block bg-brass-gold/15 border border-brass-gold text-brass-light px-4 py-1.5 text-xs font-bold tracking-[2px] uppercase rounded-full mb-6 shadow-md">
          Est. 2006
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-lg">
          A Legacy of Pure <span className="italic text-gold-bright">Craftsmanship</span>
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-brass-light/90 leading-relaxed mb-10">
          For over 20 years, AJ Metals has supplied premium traditional Kerala brassware, divine idols, heavy-duty event cookware, and everyday kitchen essentials directly from the heart of Gold Bazar, Kayamkulam.
        </p>

        {/* Store Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16 mt-4">
          <div className="flex flex-col items-center border-r border-brass-gold/30 pr-8 last:border-none last:pr-0">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-bright mb-1">
              20+
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[1.5px] text-white/80">
              Years Legacy
            </span>
          </div>
          <div className="flex flex-col items-center border-r border-brass-gold/30 pr-8 last:border-none last:pr-0">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-bright mb-1">
              100%
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[1.5px] text-white/80">
              Pure Metals
            </span>
          </div>
          <div className="flex flex-col items-center last:border-none last:pr-0">
            <span className="font-serif text-3xl sm:text-4xl font-extrabold text-gold-bright mb-1">
              1000+
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[1.5px] text-white/80">
              Happy Families
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
