"use client";

export default function CategoryTabs({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
      <button
        onClick={() => setActiveCategory("All")}
        className={`px-5 py-2.5 text-xs font-bold whitespace-nowrap rounded-full border transition-all duration-300 cursor-pointer ${
          activeCategory === "All"
            ? "bg-primary-navy border-primary-navy text-white shadow-md shadow-primary-navy/15"
            : "bg-transparent border-gray-200 text-gray-500 hover:border-brass-gold hover:text-primary-navy hover:bg-brass-gold/5"
        }`}
      >
        All Categories
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.slug)}
          className={`px-5 py-2.5 text-xs font-bold whitespace-nowrap rounded-full border transition-all duration-300 cursor-pointer ${
            activeCategory === cat.slug
              ? "bg-primary-navy border-primary-navy text-white shadow-md shadow-primary-navy/15"
              : "bg-transparent border-gray-200 text-gray-500 hover:border-brass-gold hover:text-primary-navy hover:bg-brass-gold/5"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
