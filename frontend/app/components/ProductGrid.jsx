"use client";

import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onSelectProduct, activeCategory }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white border border-dashed border-gray-200 rounded-xl shadow-xs">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="font-serif text-lg font-bold text-primary-navy mb-2">
          No matching metalware found
        </h3>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Try resetting the category filter or searching for another item like &quot;Nilavilakku&quot; or &quot;Uruli&quot;.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}
