"use client";

import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full mb-5">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for products (e.g. Nilavilakku, Uruli, Chembu)..."
        className="w-full pl-11 pr-4 py-4 bg-bg-light border border-gray-200 rounded-md text-sm font-sans text-text-dark transition-all duration-300 focus:outline-none focus:border-brass-gold focus:bg-white focus:ring-3 focus:ring-gold-bright/10"
        aria-label="Search catalog"
      />
    </div>
  );
}
