"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, Award } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryTabs from "./components/CategoryTabs";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import WhatsAppFAB from "./components/WhatsAppFAB";
import Footer from "./components/Footer";

const getBackendUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname !== "localhost" && hostname !== "127.0.0.1" && !hostname.startsWith("192.168.")) {
      return "https://aj-metals.onrender.com";
    }
  }
  return "http://127.0.0.1:8000";
};

// Sub-component for FAQ Accordion (reduces cognitive load and answers buyer queries)
const FAQSection = () => {
  const faqs = [
    {
      question: "Are your metalware products made of 100% pure metals?",
      answer: "Yes, absolutely. Every piece in our showroom is cast from premium, high-grade raw metals like pure copper, tin, zinc, and authentic bell metal (vengala). We strictly do not sell cheap composite alloys or plated items."
    },
    {
      question: "How do I purchase items shown on this website?",
      answer: "This website serves as our digital catalog showcase—we do not take direct online payments. You can browse our collection online and click 'Inquire' on any item to connect with us on WhatsApp. We will confirm availability and current rates, then you can visit our store to buy or request courier shipping."
    },
    {
      question: "Can I visit your Kayamkulam showroom to buy in person?",
      answer: "Yes, we highly encourage all customers to visit our store in Gold Bazar, Kayamkulam. It allows you to feel the heavy weight, check the material quality, and browse our complete wedding and temple collections in person."
    },
    {
      question: "Do you offer shipping if I cannot visit the store?",
      answer: "Yes! If you are unable to visit our Kayamkulam showroom, you can message us on WhatsApp. We will verify stock, share actual product photos/videos, and ship the items securely wrapped in protective packaging directly to your home."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mb-20">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-brass-gold text-[10px] font-black uppercase tracking-[3px] block mb-2">
          Got Questions?
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-navy">
          Frequently Asked Questions
        </h2>
        <div className="w-12 h-0.5 bg-brass-gold mx-auto mt-3" />
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-brass-gold/15 overflow-hidden transition-all duration-300 shadow-xs hover:border-brass-gold/45">
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left p-5 flex justify-between items-center hover:bg-brass-light/10 transition-colors cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-bold text-primary-navy pr-4">{faq.question}</span>
              <span className="text-brass-gold text-lg shrink-0 font-bold">{openIndex === idx ? "−" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 pt-1 border-t border-gray-50 text-[11px] sm:text-xs text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories from Django backend REST API in parallel
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const backendUrl = getBackendUrl();
      
      const [catRes, prodRes] = await Promise.all([
        fetch(`${backendUrl}/api/categories/`, { cache: 'no-store' }),
        fetch(`${backendUrl}/api/products/`, { cache: 'no-store' })
      ]);

      if (!catRes.ok || !prodRes.ok) {
        throw new Error("Failed to fetch catalog from backend");
      }

      const [catData, prodData] = await Promise.all([
        catRes.json(),
        prodRes.json()
      ]);

      setCategories(catData);
      setProducts(prodData);
      setLoading(false);
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Could not connect to the AJ Metals product database. If the backend is waking up, please tap Retry below.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter products locally during render for zero-latency DOM updates
  const filteredProducts = products.filter((p) => {
    // 1. Filter by category slug
    if (activeCategory !== "All" && p.category_slug !== activeCategory) {
      return false;
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-light font-sans antialiased selection:bg-gold-bright/20 selection:text-primary-navy">
      {/* Navbar */}
      <Navbar />

      {/* Hero Banner (Background image is Screenshot 2026-06-19 180642.png) */}
      <Hero heroImage="Screenshot 2026-06-19 180642.png" />

      {/* Main Catalog Area */}
      <main id="catalog-section" className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-4 py-8 sm:py-12 scroll-mt-24">
        
        {/* Controls: Search and Filters */}
        <section className="relative z-20 -mt-20 sm:-mt-24 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl border border-brass-gold/30 shadow-md p-4 sm:p-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </section>

        {/* Trust Pillars Section (Establishes instant authority & social safety) */}
        <section className="bg-white border border-brass-gold/15 rounded-xl py-4 sm:py-6 px-4 sm:px-6 mb-8 sm:mb-12 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <div className="flex gap-4 items-center">
            <span className="text-gold-bright text-xl bg-brass-light w-12 h-12 rounded-full flex justify-center items-center shrink-0 border border-brass-gold/20">🏆</span>
            <div>
              <h4 className="text-primary-navy font-bold text-xs sm:text-sm">20+ Years Legacy</h4>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Serving Kayamkulam&apos;s Gold Bazar since 2006 with trust.</p>
            </div>
          </div>
          <div className="flex gap-4 items-center border-t md:border-t-0 md:border-x border-gray-100 py-4 md:py-0 md:px-8">
            <span className="text-gold-bright text-xl bg-brass-light w-12 h-12 rounded-full flex justify-center items-center shrink-0 border border-brass-gold/20">🛡️</span>
            <div>
              <h4 className="text-primary-navy font-bold text-xs sm:text-sm">100% Purity Certified</h4>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">High-grade brass cast items, authentic bell metal, and pure copper.</p>
            </div>
          </div>
          <div className="flex gap-4 items-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
            <span className="text-gold-bright text-xl bg-brass-light w-12 h-12 rounded-full flex justify-center items-center shrink-0 border border-brass-gold/20">🏪</span>
            <div>
              <h4 className="text-primary-navy font-bold text-xs sm:text-sm">Showroom & Pickup</h4>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Browse the catalog online, reserve on WhatsApp, and pick up in store.</p>
            </div>
          </div>
        </section>

        {/* Showcase Header */}
        <section className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-navy mb-1">Our Showcase</h2>
            <p className="text-xs text-gray-500">
              Click on any product to view detailed specifications and full descriptions.
            </p>
          </div>
          <div className="bg-brass-gold/10 text-brass-gold text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
            {loading ? "..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? "Product" : "Products"}`}
          </div>
        </section>

        {/* Catalog Grid / Loading State / Error State */}
        <section className="mb-24">
          {loading ? (
            /* Loading Skeleton Grid */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg sm:rounded-xl border border-black/5 p-3 sm:p-5 animate-pulse flex flex-col gap-2 sm:gap-4">
                  <div className="bg-gray-200 aspect-square w-full rounded-md" />
                  <div className="h-3 sm:h-4 bg-gray-200 w-1/3 rounded-sm" />
                  <div className="h-4 sm:h-6 bg-gray-200 w-3/4 rounded-sm" />
                  <div className="h-3 sm:h-4 bg-gray-200 w-1/2 rounded-sm" />
                  <div className="h-8 sm:h-10 bg-gray-200 w-full rounded-md mt-auto" />
                </div>
              ))}
            </div>
          ) : error ? (
            /* Error Display */
            <div className="text-center py-16 px-4 bg-white border border-red-100 rounded-xl shadow-xs">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="font-serif text-lg font-bold text-red-800 mb-2">Connection Error</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-6">{error}</p>
              <button
                onClick={fetchData}
                className="px-6 py-2.5 bg-primary-navy text-white text-xs font-bold rounded-md hover:bg-navy-light transition-all duration-300 shadow cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          ) : (
            /* Product Showcase Grid */
            <ProductGrid
              products={filteredProducts}
              onSelectProduct={setSelectedProduct}
              activeCategory={activeCategory}
            />
          )}
        </section>

        {/* Showroom Showcase Section (Brings the brick-and-mortar storefront online) */}
        <section className="mb-24 bg-white border border-brass-gold/15 p-6 sm:p-10 rounded-2xl shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Showroom Image Showcase */}
            <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden border border-brass-gold/25 shadow-md bg-navy-dark flex items-center justify-center group p-1">
              <Image
                src="/images/Screenshot 2026-06-19 180642.png"
                alt="AJ Metals Storefront in Gold Bazar, Kayamkulam"
                fill
                priority
                className="object-contain transition-transform duration-700 group-hover:scale-101"
              />
            </div>

            {/* Address and Store Details */}
            <div className="flex flex-col justify-center">
              <span className="text-brass-gold text-[10px] font-black uppercase tracking-[3px] block mb-4">
                Experience in Person
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-navy mb-6">
                Visit Us in Gold Bazar
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-10">
                Step into our physical showroom to touch, feel, and inspect the heavy, premium weight of our traditional cookware, pooja sets, and custom items. We&apos;ve been serving local families, wedding groups, and temple committees since 2006.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mb-12">
                <div className="flex gap-3.5 items-start">
                  <MapPin size={18} className="text-gold-bright shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-wider mb-0.5">Showroom Address</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Gold Bazar, Kayamkulam, Alappuzha, Kerala - 690502</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <Clock size={18} className="text-gold-bright shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-wider mb-0.5">Showroom Hours</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Mon - Sat: 9:00 AM - 8:00 PM<br/>(Sunday Closed)</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <Phone size={18} className="text-gold-bright shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-wider mb-0.5">Inquiries Phone</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">+91 94465 71575<br/>+91 479 244 5566</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <Award size={18} className="text-gold-bright shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-primary-navy uppercase tracking-wider mb-0.5">Custom Orders</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Available for traditional weddings, temples, and large events.</p>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=AJ+Metals+Gold+Bazar+Kayamkulam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-12 px-6 bg-primary-navy hover:bg-navy-light text-white text-xs font-black uppercase tracking-[1.5px] rounded-md transition-all duration-300 shadow-md hover:-translate-y-0.5"
                >
                  Get Directions on Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ayurvedic Health & Wellness Educational Banner */}
        <section className="mb-24 bg-gradient-to-r from-primary-navy to-navy-light text-white rounded-2xl p-8 sm:p-12 shadow-lg border border-brass-gold/20 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 text-8xl font-black select-none pointer-events-none transform translate-y-1/4 translate-x-1/4">
            HEALING
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="text-gold-bright text-[10px] font-black uppercase tracking-[3px] block mb-3">
              Traditional Wellness Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-white">
              The Healing Power of Traditional Metals
            </h2>
            <p className="text-xs sm:text-sm text-brass-light/80 leading-relaxed mb-8">
              In traditional Indian kitchens, copper, brass, and bronze are prized not just for their heavy durability, but for their Ayurvedic health benefits. Modern cooking science confirms these metals enhance food nutrition and provide purifying elements.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                <span className="text-xl block mb-2">🍶</span>
                <h4 className="text-gold-bright font-black text-[10px] mb-1.5 uppercase tracking-wider">Copper (Tamra)</h4>
                <p className="text-[11px] text-brass-light/70 leading-relaxed">Antimicrobial alloy. Storing water overnight in copper naturally purifies it and helps balance digestion.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                <span className="text-xl block mb-2">🍳</span>
                <h4 className="text-gold-bright font-black text-[10px] mb-1.5 uppercase tracking-wider">Brass (Pital)</h4>
                <p className="text-[11px] text-brass-light/70 leading-relaxed">Unlike aluminum, brass preserves up to 93% of natural food nutrition during cooking while imparting rich flavor.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
                <span className="text-xl block mb-2">🥣</span>
                <h4 className="text-gold-bright font-black text-[10px] mb-1.5 uppercase tracking-wider">Bronze (Kansa)</h4>
                <p className="text-[11px] text-brass-light/70 leading-relaxed">An alkaline metal alloy that aids in balancing acidity, soothing the gut, and supporting brain health.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section (Social Validation) */}
        <section className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-brass-gold text-[10px] font-black uppercase tracking-[3px] block mb-2">
              Patron Reviews
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary-navy">
              Trusted by Generations
            </h2>
            <div className="w-12 h-0.5 bg-brass-gold mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-brass-gold/15 p-6 rounded-xl shadow-xs hover:border-brass-gold/30 transition-all duration-300">
              <span className="text-gold-bright text-base block mb-3">★★★★★</span>
              <p className="text-xs text-gray-500 italic leading-relaxed mb-6">
                &quot;Bought a heavy Vengala Uruli and brass Nilavilakku for my daughter&apos;s wedding. The weight and polishing were exceptional. Ordering via WhatsApp was simple and fast.&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="bg-brass-light w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold text-primary-navy">RP</div>
                <div>
                  <h4 className="text-xs font-bold text-primary-navy">Radhika Pillai</h4>
                  <p className="text-[9px] text-gray-400">Kochi, Kerala</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-brass-gold/15 p-6 rounded-xl shadow-xs hover:border-brass-gold/30 transition-all duration-300">
              <span className="text-gold-bright text-base block mb-3">★★★★★</span>
              <p className="text-xs text-gray-500 italic leading-relaxed mb-6">
                &quot;We use AJ Metals&apos; cookware for catering events in Kayamkulam. Their copper Vattu Chembu and heavy bronze vessels distribute heat perfectly. Unmatched quality at very fair rates.&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="bg-brass-light w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold text-primary-navy">MK</div>
                <div>
                  <h4 className="text-xs font-bold text-primary-navy">Chef Manoj Kumar</h4>
                  <p className="text-[9px] text-gray-400">Catering Owner, Haripad</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-brass-gold/15 p-6 rounded-xl shadow-xs hover:border-brass-gold/30 transition-all duration-300">
              <span className="text-gold-bright text-base block mb-3">★★★★★</span>
              <p className="text-xs text-gray-500 italic leading-relaxed mb-6">
                &quot;I ordered a copper bottle and brass puttu maker. The tin coating inside the puttu maker is clean and food-safe. It makes our breakfast taste traditional and healthy.&quot;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="bg-brass-light w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold text-primary-navy">AN</div>
                <div>
                  <h4 className="text-xs font-bold text-primary-navy">Anjali Nair</h4>
                  <p className="text-[9px] text-gray-400">Trivandrum</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs accordion */}
        <FAQSection />

      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Details Modal */}
      {selectedProduct && (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Sticky Floating WhatsApp Icon */}
      <WhatsAppFAB />
    </div>
  );
}

