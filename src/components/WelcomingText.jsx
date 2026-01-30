"use client";

import { useEffect, useState } from "react";

const text = "Wear Confidence. Define Your Style.";

export default function WelcomeTypingSection() {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 70);
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
      <section className="flex justify-center py-20 bg-white">
      <div className="relative text-center">

        {/* Text */}
        <h2 className="relative z-10 text-4xl  font-semibold tracking-tight text-gray-900 leading-tight">
         Welcome To Arkade
        </h2>

        {/* Subtitle */}
        <p className="relative z-10 text-base md:text-lg tracking-wide text-gray-600">
          Minimal pieces. Maximum impact.
        </p>

        {/* Double Curved Lines */}
        <svg
          className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-[120%] h-14"
          viewBox="0 0 400 80"
          fill="none"
        >
          {/* Line 1 */}
          <path
            d="M20 30 C 100 60, 300 10, 380 35"
            stroke="#831113"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Line 2 */}
          <path
            d="M30 50 C 120 80, 280 30, 370 55"
            stroke="#831110"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </div>
    </section>
  );
}
