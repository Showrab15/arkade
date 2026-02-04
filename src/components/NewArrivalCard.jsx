"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function NewArrivalCard({ product }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">

            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">

                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* NEW badge */}
                {product.new_arrival && (
                    <span className="absolute top-3 left-3 text-[10px] tracking-widest bg-black/80 text-white px-2 py-1 rounded-full">
                        NEW
                    </span>
                )}

                {/* Wishlist */}
                <button
                    onClick={() => setLiked(!liked)}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
                >
                    <Heart
                        className={`w-4 h-4 ${liked ? "fill-black text-black" : "text-gray-700"
                            }`}
                    />
                </button>

                {/* Quick Add */}
                <button className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white text-sm px-5 py-2 rounded-full flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                    {product.category}
                </p>

                <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-semibold">
                        ${product.price}
                    </span>

                    <span className="text-xs text-gray-400">
                        {product.availability === "in-stock"
                            ? "In stock"
                            : product.availability === "low-stock"
                                ? "Low stock"
                                : "Out of stock"}
                    </span>
                </div>
            </div>
        </div>
    );
}
