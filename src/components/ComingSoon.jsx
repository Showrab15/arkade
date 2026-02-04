"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";

export default function ComingSoon() {
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
        className="absolute top-16 left-[-20%] z-20"
        initial={{ x: "-20%", opacity: 0 }}
        animate={{ x: "120%", opacity: 1 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M2 16l20-8-20-8 5 8-5 8z" />
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
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="font-[cursive] text-[2.8rem] tracking-wide text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] mb-4"
        >
          Dropping Soon
        </motion.h1>

        {/* Sub text */}
        <p className="text-sm uppercase tracking-[0.3em] text-[#8e1b1b] mb-6">
          For the Few
        </p>

        {/* Divider */}
        <div className="flex justify-center mb-6">
          <span className="h-px w-24 bg-[#8e1b1b]/50" />
        </div>

        {/* Footer socials */}
        <div className="flex justify-center gap-5">
          <a
            href="https://instagram.com/yourbrand"
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
