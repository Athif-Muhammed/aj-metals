"use client";

import { useState, useEffect } from "react";
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
  // Fallback automatically to production backend if deployed (not running on localhost)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname !== "localhost" && hostname !== "127.0.0.1" && !hostname.startsWith("192.168.")) {
      return "https://aj-metals.onrender.com";
    }
  }
  return "http://127.0.0.1:8000";
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products and categories from Django backend REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const backendUrl = getBackendUrl();
        
        // Fetch Categories
        const catRes = await fetch(`${backendUrl}/api/categories/`, { cache: 'no-store' });
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        const catData = await catRes.json();
        setCategories(catData);
        
        // Fetch Products
        const prodRes = await fetch(`${backendUrl}/api/products/`, { cache: 'no-store' });
        if (!prodRes.ok) throw new Error("Failed to fetch products");
        const prodData = await prodRes.json();
        setProducts(prodData);
        
        setLoading(false);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Could not connect to the AJ Metals product database. Please ensure the Django backend server is running.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

      {/* Hero Banner (Hero image is Screenshot 2026-06-19 180642.png) */}
      <Hero heroImage="Screenshot 2026-06-19 180642.png" />

      {/* Main Catalog Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-12">
        
        {/* Controls: Search and Filters */}
        <section className="relative z-20 -mt-24 mb-12">
          <div className="bg-white rounded-xl border border-brass-gold/30 shadow-md p-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </section>

        {/* Showcase Header */}
        <section className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h2 className="font-serif text-3xl font-black text-primary-navy mb-1">Our Showcase</h2>
            <p className="text-xs text-gray-500">
              Click on any product to view detailed specifications and full descriptions.
            </p>
          </div>
          <div className="bg-brass-gold/10 text-brass-gold text-xs font-bold px-3 py-1.5 rounded-full shrink-0">
            {loading ? "..." : `${filteredProducts.length} ${filteredProducts.length === 1 ? "Product" : "Products"}`}
          </div>
        </section>

        {/* Catalog Grid / Loading State / Error State */}
        <section className="mb-16">
          {loading ? (
            /* Loading Skeleton Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-black/5 p-5 animate-pulse flex flex-col gap-4">
                  <div className="bg-gray-200 aspect-square w-full rounded-md" />
                  <div className="h-4 bg-gray-200 w-1/3 rounded-sm" />
                  <div className="h-6 bg-gray-200 w-3/4 rounded-sm" />
                  <div className="h-4 bg-gray-200 w-1/2 rounded-sm" />
                  <div className="h-10 bg-gray-200 w-full rounded-md mt-auto" />
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
                onClick={() => window.location.reload()}
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
      </main>

      {/* Heritage Story Section */}
      <section className="w-full bg-primary-navy text-white py-20 border-t border-b-3 border-brass-gold relative z-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-light/40 to-navy-dark/90 -z-1" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white mb-6">
              Legacy of Trust in <span className="text-gold-bright">Gold Bazar</span>
            </h2>
            <p className="text-sm text-brass-light leading-relaxed mb-4">
              AJ Metals has stood as a hallmark of quality for over two decades in Kayamkulam. We specialize in authentic alloy works, high-grade brass cast items, bell metal, and household cookware designed to last generations.
            </p>
            <p className="text-sm text-brass-light leading-relaxed">
              We pride ourselves on offering products at competitive rates reflecting genuine material quality, while providing personal assistance via our direct WhatsApp checkout experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-brass-gold/15 p-5 rounded-lg flex gap-4 items-start">
              <span className="text-gold-bright text-xl bg-brass-gold/10 w-10 h-10 shrink-0 rounded flex justify-center items-center font-bold">✓</span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Guaranteed Purity</h4>
                <p className="text-brass-light/80 text-[11px] leading-relaxed">All items are cast from top-grade raw metals like copper, tin, and zinc.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-brass-gold/15 p-5 rounded-lg flex gap-4 items-start">
              <span className="text-gold-bright text-xl bg-brass-gold/10 w-10 h-10 shrink-0 rounded flex justify-center items-center font-bold">✓</span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Custom Orders</h4>
                <p className="text-brass-light/80 text-[11px] leading-relaxed">We undertake custom orders for traditional Kerala weddings and temples.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-brass-gold/15 p-5 rounded-lg flex gap-4 items-start">
              <span className="text-gold-bright text-xl bg-brass-gold/10 w-10 h-10 shrink-0 rounded flex justify-center items-center font-bold">✓</span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Safe Shipping</h4>
                <p className="text-brass-light/80 text-[11px] leading-relaxed">Safe packaging and shipping services directly to your home in Kerala.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-brass-gold/15 p-5 rounded-lg flex gap-4 items-start">
              <span className="text-gold-bright text-xl bg-brass-gold/10 w-10 h-10 shrink-0 rounded flex justify-center items-center font-bold">✓</span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">Instant Consult</h4>
                <p className="text-brass-light/80 text-[11px] leading-relaxed">Get instant updates on daily metal rates and stock availability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
