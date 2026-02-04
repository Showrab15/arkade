"use client"
import { useState, useEffect } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '@/context/useProducts';
import FeaturedProduct from './FeaturedProduct';
import { Shirt, Sparkles, Flame } from "lucide-react";
import NewArrivalCard from './NewArrivalCard';

export default function Products() {
  const { products, categories, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');



  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter(p => p.featured);

  const CATEGORY_META = {
    All: { icon: Sparkles },
    Casual: { icon: Shirt, badge: "NEW" },
    Formal: { icon: Shirt },
    Oversized: { icon: Shirt, badge: "HOT" },
  };
  const newArrivals = products
  .filter(p => p.new_arrival)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="px-6 pt-20 ">


      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Categories Section */}
        <div className="mb-14">
          {/* Title */}
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-xl md:text-2xl font-medium tracking-tight">
              Shop by Category
            </h2>
            <span className="text-sm text-gray-400 hidden sm:block">
              Curated styles
            </span>
          </div>

          {/* Tabs */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="relative flex gap-8 min-w-max border-b border-gray-200 px-2">
                {categories.map((category, index) => {
                  const isActive = selectedCategory === category;
                  const Icon = CATEGORY_META[category]?.icon;

                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="relative pb-4 group"
                    >
                      {/* Content */}
                      <div
                        className={`flex items-center gap-2 text-sm md:text-base transition-colors
                  ${isActive
                            ? "text-black font-medium"
                            : "text-gray-500 group-hover:text-gray-800"
                          }`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {category}

                        {/* Badge */}
                        {CATEGORY_META[category]?.badge && (
                          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full tracking-wider
                    bg-black text-white">
                            {CATEGORY_META[category].badge}
                          </span>
                        )}
                      </div>

                      {/* Sliding underline anchor */}
                      {isActive && (
                        <span
                          className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-black rounded-full"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>



        {/* Product Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} products
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* Featured Section - Editor's Picks */}
        {featuredProducts.length > 0 && (
          <div className=" mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="text-yellow-500 w-6 h-6" />
              <h2 className="text-2xl md:text-3xl">Editors Picks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(0, 3).map((product) => (
                <FeaturedProduct
                  key={product.id}
                  product={product}
                />

              ))}
            </div>
          </div>
        )}

        {/* New Arrivals Section */}
{newArrivals.length > 0 && (
  <div className="mb-24">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          New Arrivals
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Fresh drops, just landed
        </p>
      </div>

      <span className="text-xs uppercase tracking-widest text-gray-400">
        Latest
      </span>
    </div>

    {/* Products */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {newArrivals.slice(0, 4).map((product) => (
       <NewArrivalCard key={product.id} product={product} />

      ))}
    </div>
  </div>
)}
      </div>


    </div>
  );
}









