import { TrendingUp } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function FeaturedProduct({ product }) {
    const [popupVisible, setPopupVisible] = useState(false)

    const togglePopup = () => {
        setPopupVisible(!popupVisible)
    }
    const pageUsername = 'weararkade'; // e.g., "Meta" or "facebook"
    // Build pre-filled message
    const message = `Hello, I have a question about "${product.title}" - ${window.location.origin}/product/${product.id}`;
    const messengerLink = `https://m.me/${pageUsername}?ref=${encodeURIComponent(message)}`;
    return (
        <div
            key={product.id}
            className="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
            {/* Product Image */}
            <div className="relative">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    onClick={togglePopup} // toggle popup on click
                />

                {/* Popup (Desktop: hover, Mobile: click) */}
                <div
                    className={`
                        absolute top-3 right-3 z-20
                        transform transition-all duration-300
                        ${popupVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                        group-hover:opacity-100 group-hover:scale-100
                    `}
                >
                    <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs md:text-sm px-4 py-2 rounded-lg shadow-lg">
                        {/* Small arrow */}
                        <div className="absolute top-1 right-2 w-0 h-0 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-blue-600 transform rotate-45"></div>

                        <p className="font-medium">Have a question?</p>
                        <button

                        >
                            <Link href={`https://m.me/${pageUsername}?ref=product${product.id}`} target="_blank" rel="noopener noreferrer">
                                Message us on Messenger
                            </Link>

                        </button>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
                <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <span className="text-xs text-gray-600 uppercase tracking-wide">
                        Featured
                    </span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">
                        ${product.price.toFixed(2)}
                    </span>
                    <a
                        href={`/product/${product.id}`}
                        className="text-sm text-blue-600 font-medium underline hover:no-underline"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    )
}
