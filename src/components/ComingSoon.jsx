"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";

export default function ComingSoon() {
     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Plane flight path animation
  const planeVariants = {
    initial: { 
      x: '-100%', 
      y: '50%',
      rotate: -15,
      opacity: 0 
    },
    animate: { 
      x: ['120%'],
      y: ['-50%'],
      rotate: 15,
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  };

  // Logo glow animation
  const logoGlowVariants = {
    animate: {
      filter: [
        'drop-shadow(0 0 8px rgba(220, 38, 38, 0.5))',
        'drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))',
        'drop-shadow(0 0 8px rgba(220, 38, 38, 0.5))',
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Text reveal animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#8e1b1b] flex items-center justify-center px-4">
      {/* Film grain / noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.15]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Flying plane animation */}
       <motion.div
        className="absolute top-20 left-0 z-10 pointer-events-none"
        variants={planeVariants}
        initial="initial"
        animate="animate"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white/80 drop-shadow-lg"
        >
          <path
            d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Main card */}
      <div className="relative z-20 w-full max-w-md bg-[#efe2cf] rounded-xl shadow-2xl p-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/arkade-logo-removebg-preview.png"
            alt="Brand Logo"
            width={160}
            height={110}
            className="object-contain"
          />
        </div>

        {/* Script typography like reference */}
     <motion.div
              className="relative"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center drop-shadow-lg"
                  style={{
                    fontFamily: 'cursive',
                    WebkitTextStroke: '1px rgba(0,0,0,0.3)',
                  }}>
                Dropping Soon
              </h2>
            </motion.div>

        {/* Sub text */}
        <p className="text-sm uppercase tracking-[0.3em] text-[#8e1b1b] mt-4  mb-2">
          For the Few
        </p>

        {/* Divider */}
        <div className="flex justify-center mb-6">
          <span className="h-px w-24 bg-[#8e1b1b]/50" />
        </div>

        {/* Footer socials */}
        <div className="flex justify-center gap-5">
          <a
            href="https://www.instagram.com/weararkade?igsh=MXN2Y2VqbTk1dGZ5Yw=="
            target="_blank"
            className="text-[#8e1b1b] hover:scale-110 transition"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.facebook.com/weararkade"
            target="_blank"
            className="text-[#8e1b1b] hover:scale-110 transition"
          >
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
