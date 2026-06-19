"use client";

import { MapPin, Phone, Mail, ChevronRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-navy-dark text-brass-light pt-16 pb-6 border-t border-brass-gold/10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Column */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-white mb-4">
            AJ <span className="text-gold-bright">METALS</span>
          </h3>
          <p className="text-xs opacity-85 leading-relaxed mb-6 max-w-xs">
            A trusted name in Kayamkulam for legacy brassware, divine idols, heavy event cookware, and kitchen essentials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b-2 border-brass-gold inline-block">
            Categories
          </h4>
          <ul className="space-y-3 text-xs">
            <li>
              <a href="#" className="flex items-center gap-1.5 hover:text-gold-bright transition-all hover:translate-x-1">
                <ChevronRight size={12} className="text-gold-bright" />
                Pooja Brassware
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 hover:text-gold-bright transition-all hover:translate-x-1">
                <ChevronRight size={12} className="text-gold-bright" />
                Idols & Home Decor
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 hover:text-gold-bright transition-all hover:translate-x-1">
                <ChevronRight size={12} className="text-gold-bright" />
                Heavy Cookware
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1.5 hover:text-gold-bright transition-all hover:translate-x-1">
                <ChevronRight size={12} className="text-gold-bright" />
                Kitchen Essentials
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b-2 border-brass-gold inline-block">
            Visit Store
          </h4>
          <div className="space-y-4 text-xs opacity-85">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-gold-bright shrink-0 mt-0.5" />
              <span>Gold Bazar, Kayamkulam,<br />Alappuzha, Kerala - 690502</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-gold-bright shrink-0" />
              <a href="tel:+919446571575" className="hover:text-gold-bright">+91 94465 71575</a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-gold-bright shrink-0" />
              <span>info@ajmetals.com</span>
            </div>
          </div>
        </div>

        {/* Map Column */}
        <div>
          <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6 pb-2 border-b-2 border-brass-gold inline-block">
            Store Location
          </h4>
          <div className="w-full h-44 rounded-lg overflow-hidden border border-brass-gold/20 shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.9056262947113!2d76.5029314757833!3d9.163013289945115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b061036f04f2f45%3A0xe54d24f0c8fa21fd!2sGold%20Bazar%2C%20Kayamkulam!5e0!3m2!1sen!2sin!4v1718790000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location of AJ Metals"
              className="w-full h-full border-none"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 text-center text-[10px] opacity-60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} AJ Metals. All Rights Reserved. | Legacy of 20 Years</p>
          <p className="flex items-center justify-center gap-1">
            Crafted with <Heart size={10} className="fill-gold-bright text-gold-bright" /> in Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}
