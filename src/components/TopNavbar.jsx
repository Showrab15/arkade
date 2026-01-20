"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  User,
  Heart,
  ShoppingCart
} from "lucide-react"

export default function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  // 🔁 Replace with real auth later
  const isLoggedIn = false
  const user = {
    name: "John Doe",
    photo: "/user-avatar.jpg"
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* LEFT NAV */}
   <nav className="hidden md:flex gap-6 text-sm text-[#831113] font-medium">
  {[
    { name: "Home", href: "/" },
    { name: "Punjabi", href: "/punjabi" },
    { name: "Shirt", href: "/shirts" },
  ].map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="relative py-1 after:absolute after:left-0 after:-bottom-1 
after:h-[2px] after:w-full after:origin-left
after:scale-x-0 after:bg-[#831113]
after:transition-transform after:duration-300
hover:after:scale-x-100"
    >
      {item.name}
    </Link>
  ))}
</nav>


        {/* LOGO (Modern sizing) */}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* SEARCH */}
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#831113]"
            />
          </div>

          {/* PROFILE */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfileMenu(true)}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            {isLoggedIn ? (
              <Image
                src={user.photo}
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
              />
            ) : (
              <User className="w-5 h-5 cursor-pointer" />
            )}

            {/* DROPDOWN */}
            {!isLoggedIn && showProfileMenu && (
              <div className="absolute right-0 top-8 w-40 rounded-lg bg-white shadow-lg border text-sm">
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* WISHLIST */}
          <Link href="/wishlist" className="relative">
            <Heart className="w-5 h-5" />
          </Link>

          {/* CART */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {/* badge example */}
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}
