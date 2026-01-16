"use client"
import { useState, useEffect } from 'react';
import { Star, TrendingUp } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProducts } from '@/context/useProducts';
import FeaturedProduct from './FeaturedProduct';

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

  return (
    <div className="px-6 py-10 md:pb-0">


      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div id="search" className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full  px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#831113]"
          />
        </div>

        {/* Categories Section */}
        <div id="categories" className="mb-8">
          <h2 className="text-xl md:text-2xl mb-4">Shop by Category</h2>

          {/* Horizontal scrollable categories */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 md:space-x-4 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mb-16">
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
          <div className="py-20 mb-8">
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
      </div>

    </div>
  );
}









