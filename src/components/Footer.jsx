"use client"

import { useState } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
             <Link href="/" className="flex items-center gap-2">
          <Image
            src="/arkade-logo-removebg-preview.png"
            alt="Arkade"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-xl font-serif font-semibold text-[#831113]">
            ARKADE
          </span>
        </Link>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Hotline Free 24/7:</p>
                  <a href="tel:+8801814356550" className="font-semibold hover:text-[#7a0002] transition-colors">
                    8801814356550
                  </a>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                  <p>EPZ, Bondortila, Chattogram</p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                  <a href="mailto: arkade@gmail.com" className="hover:text-[#7a0002] transition-colors">
                    arkade@gmail.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                  <a href="tel:+8801814356550" className="hover:text-[#7a0002] transition-colors">
                    +8801814356550
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="w-10 h-10 bg-[#831113] hover:bg-[#7a0002] hover:text-[#7a0002] rounded-full flex items-center justify-center  transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="text-white w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#831113] hover:bg-[#7a0002] text-white rounded-full flex items-center justify-center  transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#831113] hover:bg-[#7a0002] text-white rounded-full flex items-center justify-center  transition-all transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-[#831113] hover:bg-[#7a0002] text-white rounded-full flex items-center justify-center  transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Information & Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Information & Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* My Account & Payments */}
          <div>
            <h3 className="text-lg font-bold mb-6">My Account & Payments</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Community Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-[#7a0002] hover:translate-x-1 inline-block transition-all">
                  Refund and Return Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Sign Up For Newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your Email Address..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
              <button className="w-full bg-[#831113] hover:bg-[#7a0002] text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden space-y-4">
          {/* Brand Section - Always Visible on Mobile */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Arkade</h2>
            
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Hotline Free 24/7:</p>
                <a href="tel:+8809611900372" className="font-semibold hover:text-[#7a0002] transition-colors">
                  +8809611900372
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="border-t border-gray-200 pt-4 space-y-1">
            {/* Information & Services */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("info")}
                className="w-full flex items-center justify-between py-4 text-left font-semibold hover:text-[#7a0002] transition-colors"
              >
                <span>Information & Services</span>
                {expandedSection === "info" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSection === "info" && (
                <ul className="pb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Home</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Blog</a></li>
                </ul>
              )}
            </div>

            {/* My Account & Payments */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("account")}
                className="w-full flex items-center justify-between py-4 text-left font-semibold hover:text-[#7a0002] transition-colors"
              >
                <span>My Account & Payments</span>
                {expandedSection === "account" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSection === "account" && (
                <ul className="pb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Community Guidelines</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Terms and Conditions</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-[#7a0002] transition-colors">Refund and Return Policy</a></li>
                </ul>
              )}
            </div>

            {/* Newsletter */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("newsletter")}
                className="w-full flex items-center justify-between py-4 text-left font-semibold hover:text-[#7a0002] transition-colors"
              >
                <span>Sign Up For Newsletter</span>
                {expandedSection === "newsletter" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSection === "newsletter" && (
                <div className="pb-4 space-y-3 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-gray-600">
                    Get the latest updates on new products and upcoming sales
                  </p>
                  <input
                    type="email"
                    placeholder="Your Email Address..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="w-full bg-gray-400 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all">
                    Subscribe
                  </button>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("contact")}
                className="w-full flex items-center justify-between py-4 text-left font-semibold hover:text-[#7a0002] transition-colors"
              >
                <span>Contact Information</span>
                {expandedSection === "contact" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSection === "contact" && (
                <div className="pb-4 space-y-3 text-sm text-gray-600 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <p>HCPL Tower, Level-4, House-16, Senpara Parbata, Main Road-1, Mirpur -10, Dhaka-1216.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <a href="mailto: arkade@gmail.com" className="hover:text-[#7a0002] transition-colors">
                       arkade@gmail.com
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                    <a href="tel:+8809611900372" className="hover:text-[#7a0002] transition-colors">
                      +8809611900372
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Arkade. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#" className="hover:text-[#7a0002] transition-colors">Privacy</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#7a0002] transition-colors">Terms</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#7a0002] transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}