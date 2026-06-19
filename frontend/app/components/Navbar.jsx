"use client";

import { Phone, MapPin, Clock } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary-navy text-white shadow-lg border-b-2 border-brass-gold">
      {/* Top Utility Bar */}
      <div className="w-full bg-navy-dark text-brass-light text-xs py-2 px-4 border-b border-brass-gold/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-gold-bright" />
              Gold Bazar, Kayamkulam, Kerala
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold-bright" />
              Mon - Sat: 9:00 AM - 8:00 PM
            </span>
          </div>
          <div>
            <a
              href="tel:+919446571575"
              className="text-brass-gold font-semibold hover:text-white transition-colors"
            >
              Call Store: +91 94465 71575
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <a href="#" className="font-serif text-2xl font-black tracking-wider text-white">
            AJ <span className="text-gold-bright">METALS</span>
          </a>
          <span className="text-[10px] tracking-[2px] uppercase text-brass-gold font-semibold -mt-1">
            Traditional Metalware Showroom
          </span>
        </div>

        <a
          href="tel:+919446571575"
          className="flex items-center gap-2 border border-brass-gold text-brass-light px-4 py-2 text-sm font-semibold rounded-md hover:bg-brass-gold hover:text-primary-navy transition-all duration-300 shadow-md hover:-translate-y-0.5"
        >
          <Phone size={16} />
          <span className="hidden sm:inline">Contact Store</span>
        </a>
      </div>
    </header>
  );
}
