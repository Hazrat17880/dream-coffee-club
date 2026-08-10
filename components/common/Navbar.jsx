"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu-list" },
  { name: "About", path: "/about-us" },
  { name: "Offers", path: "/offers" },
  { name: "Contact", path: "/contact" }
];
  return (
    <>
      {/* ── Navbar ── */}
      <nav className="h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 border-b border-[#F0EDE8] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/logo1.png"
              alt="Dream Coffee Club Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#2B1B12] leading-tight">
              Dream <span className="text-[#FF6B35]">Coffee</span> Club
            </span>
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] text-[#888] uppercase">
              Fine Fast Food & Bistro
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
   {menuItems.map((item) => {
  const isActive = pathname === item.path;

  return (
    <Link
      key={item.name}
      href={item.path}
      className={`text-[14px] font-medium transition-all duration-300 relative group ${
        isActive
          ? "text-[#FF6B35] font-semibold"
          : "text-[#6B6B6B] hover:text-[#2B1B12]"
      }`}
    >
      {item.name}

      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF6B35] transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
})}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Reserve Button */}
          <Link
            href="/menu"
            className="hidden sm:block bg-[#FF6B35] hover:bg-[#e85a2a] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Reserve Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-[#2B1B12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[#2B1B12]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#F0EDE8] shadow-lg z-40 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col py-4 px-4 sm:px-6">
   {menuItems.map((item) => {
  const isActive = pathname === item.path;

  return (
    <Link
      key={item.name}
      href={item.path}
      onClick={() => setIsMobileMenuOpen(false)}
      className={`text-[15px] font-medium py-3 border-b border-[#F0EDE8] last:border-0 transition ${
        isActive
          ? "text-[#FF6B35]"
          : "text-[#6B6B6B] hover:text-[#FF6B35]"
      }`}
    >
      {item.name}
    </Link>
  );
})}

          {/* Mobile Button */}
          <Link
            href="/menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="sm:hidden bg-[#FF6B35] text-white text-center text-[14px] font-semibold px-6 py-3 rounded-full mt-4"
          >
            Reserve Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;