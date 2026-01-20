
"use client"
import { useState, useEffect } from 'react';
import { ArrowLeft, Package, Tag, Heart, Share2, Truck, ShieldCheck, RotateCcw, X, ZoomIn } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useProducts } from '@/context/useProducts';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getProductById, incrementProductView, products } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  const product = getProductById(id || '');

  useEffect(() => {
    if (id) {
      incrementProductView(id);
      window.scrollTo(0, 0);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <button
            onClick={() => router.push('/')}
            className="text-sm underline hover:no-underline"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const getAvailabilityInfo = () => {
    switch (product.availability) {
      case 'in-stock':
        return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-50', icon: '✓' };
      case 'low-stock':
        return { text: 'Low Stock - Order Soon', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '!' };
      case 'out-of-stock':
        return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-50', icon: '✕' };
      default:
        return { text: 'Unknown', color: 'text-gray-600', bg: 'bg-gray-50', icon: '?' };
    }
  };

  const availabilityInfo = getAvailabilityInfo();

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={() => router.push('/')} className="hover:text-black transition-colors">
              Home
            </button>
            <span>/</span>
            <button onClick={() => router.push('/')} className="hover:text-black transition-colors">
              {product.category}
            </button>
            <span>/</span>
            <span className="text-black">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Back Button - Mobile Only */}
        <button
          onClick={() => router('/')}
          className="md:hidden flex items-center space-x-2 text-gray-600 hover:text-black mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery - Left Side */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
                onClick={() => setIsZoomed(true)}
              />
              
              {/* Zoom Indicator */}
              <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-5 h-5" />
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-black ring-2 ring-black ring-offset-2'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information - Right Side */}
          <div className="flex flex-col">
            {/* Category Badge */}
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 uppercase tracking-wide">{product.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Rating & Reviews (Mock) */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">(127 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-4xl md:text-5xl mb-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">Tax included. Shipping calculated at checkout.</p>
            </div>

            {/* Availability Status */}
            <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${availabilityInfo.bg} mb-6 w-fit`}>
              <Package className={`w-5 h-5 ${availabilityInfo.color}`} />
              <span className={`text-sm ${availabilityInfo.color}`}>
                {availabilityInfo.icon} {availabilityInfo.text}
              </span>
            </div>

            {/* Size Selection (Mock) */}
            <div className="mb-6">
              <label className="block text-sm mb-3">Size</label>
              <div className="grid grid-cols-4 gap-2">
                {['XS', 'S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-all text-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm mb-3">Quantity</label>
              <div className="flex items-center space-x-3 w-fit">
                <button className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-black transition-all">
                  −
                </button>
                <span className="w-12 text-center">1</span>
                <button className="w-10 h-10 border-2 border-gray-200 rounded-lg hover:border-black transition-all">
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                disabled={product.availability === 'out-of-stock'}
                className={`w-full py-4 rounded-lg transition-all text-base ${
                  product.availability === 'out-of-stock'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]'
                }`}
              >
                {product.availability === 'out-of-stock' ? 'Currently Unavailable' : 'Add to Cart'}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`py-3 border-2 rounded-lg transition-all flex items-center justify-center space-x-2 ${
                    isFavorite ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 hover:border-black'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-600' : ''}`} />
                  <span className="text-sm">Wishlist</span>
                </button>
                <button
                  onClick={handleShare}
                  className="py-3 border-2 border-gray-300 rounded-lg hover:border-black transition-all flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm">Free shipping on orders over $100</p>
                  <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm">30-day return policy</p>
                  <p className="text-xs text-gray-500">Easy returns and exchanges</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm">Secure checkout</p>
                  <p className="text-xs text-gray-500">Your payment information is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Information Section */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          {/* Tabs */}
          <div className="flex space-x-8 border-b border-gray-200 mb-6 overflow-x-auto">
            {['description', 'details', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm uppercase tracking-wide transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed text-base mb-4">{product.description}</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Premium quality materials sourced responsibly</li>
                  <li>• Designed for comfort and durability</li>
                  <li>• Perfect for everyday wear or special occasions</li>
                  <li>• Available in multiple sizes and colors</li>
                </ul>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm uppercase tracking-wide mb-3 text-gray-500">Product Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Category:</span>
                      <span>{product.category}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Product ID:</span>
                      <span className="font-mono text-xs">{product.id}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Views:</span>
                      <span>{product.views || 0}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-600">Availability:</span>
                      <span className={availabilityInfo.color}>{availabilityInfo.text}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wide mb-3 text-gray-500">Care Instructions</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Machine wash cold with like colors</li>
                    <li>• Tumble dry low</li>
                    <li>• Do not bleach</li>
                    <li>• Iron on low heat if needed</li>
                    <li>• Do not dry clean</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl mb-1">Customer Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">4.8 out of 5 (127 reviews)</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all">
                    Write a Review
                  </button>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">Customer Name</p>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 weeks ago</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Great quality product! Exactly as described. Highly recommend.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl md:text-3xl mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <button
                  key={relatedProduct.id}
                  onClick={() => router(`/product/${relatedProduct.id}`)}
                  className="group text-left"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-sm mb-1 line-clamp-1 group-hover:underline">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-sm">${relatedProduct.price.toFixed(2)}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all"
            onClick={() => setIsZoomed(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl w-full">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <div className="flex justify-center space-x-2 mt-4">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index ? 'bg-white w-8' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-xl">${product.price.toFixed(2)}</p>
          </div>
          <button
            disabled={product.availability === 'out-of-stock'}
            className={`flex-1 py-3 rounded-lg transition-all ${
              product.availability === 'out-of-stock'
                ? 'bg-gray-300 text-gray-500'
                : 'bg-black text-white active:scale-95'
            }`}
          >
            {product.availability === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

    </div>
  );
}