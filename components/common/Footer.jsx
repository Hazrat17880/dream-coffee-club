"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaUtensils,
  FaPizzaSlice,
  FaHamburger,
  FaMugHot
} from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

const FooterSimple = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Gallery", href: "/gallery" },
    { name: "Offers", href: "/offers" },
    { name: "Reservation", href: "/reservation" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "FAQs", href: "/faqs" },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "123 Food Street, Lahore, Pakistan" },
    { icon: FaPhone, text: "+92 300 1234567" },
    { icon: FaEnvelope, text: "info@dreamrestaurant.com" },
    { icon: FaClock, text: "Mon-Sun: 11:00 AM - 12:00 AM" },
  ];

  const popularItems = [
    { name: "Wood Fired Pizza", icon: FaPizzaSlice },
    { name: "Signature Burgers", icon: FaHamburger },
    { name: "Grilled Steaks", icon: FaUtensils },
    { name: "Specialty Coffee", icon: FaMugHot },
  ];

  const socialLinks = [
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-gradient-to-tr from-purple-500 to-pink-500" },
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", color: "hover:bg-[#1877f2]" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-[#1da1f2]" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-[#ff0000]" },
    { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok", color: "hover:bg-gradient-to-r from-black to-[#00f2ea]" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      {/* Subtle Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Brand Section - 4 columns */}
          <div className="md:col-span-4">
            <div className="flex items-center justify-center space-x-3 md:justify-start">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-amber-500/10 p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full animate-pulse opacity-50" />
                <Image
                  src="/logo/logo1.jpeg"
                  alt="Dream Restaurant Logo"
                  width={40}
                  height={40}
                  className="object-contain relative z-10"
                />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-amber-400 bg-clip-text text-transparent">
                  Dream Coffee Club
                </span>
                <p className="text-[10px] text-amber-500/70 tracking-wider">EST. 2012</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-gray-400 leading-relaxed text-center md:text-left">
              Where every meal is a dream. Serving delicious pizzas, juicy burgers, 
              grilled steaks, fresh pasta, and premium coffee since 2012.
            </p>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <div className="flex items-center gap-1 text-amber-500">
                <HiOutlineHeart className="w-4 h-4 fill-amber-500" />
                <span className="text-xs">100% Fresh</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-1 text-amber-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Halal Certified</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-1 text-amber-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500 text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition-all duration-300 hover:text-amber-500 hover:pl-1 block text-center md:text-left"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Items - 3 columns */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500 text-center md:text-left">
              Popular Dishes
            </h3>
            <ul className="space-y-2 text-sm">
              {popularItems.map((item, index) => (
                <li key={index} className="flex items-center justify-center md:justify-start gap-2 text-gray-400">
                  <item.icon className="w-4 h-4 text-amber-500" />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social - 3 columns */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500 text-center md:text-left">
              Contact Info
            </h3>
            <ul className="space-y-2 mb-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                  <item.icon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-xs md:text-sm">{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Social Icons */}
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-amber-500 text-center md:text-left">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-white ${social.color} hover:bg-opacity-100 group`}
                >
                  <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              Subscribe to get exclusive offers & updates
            </p>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-white placeholder:text-gray-500 min-w-[200px]"
              />
              <button className="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 rounded-r-lg transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 pt-4 border-t border-gray-800/50">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-500 hover:text-amber-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} Dream Coffee Club. All rights reserved. 
            Crafted with <span className="text-red-500">❤</span> for food lovers.
          </p>
          <p className="text-[10px] text-gray-600 mt-1">
            Pizza • Burgers • Steaks • Pasta • Coffee • Desserts
          </p>
        </div>

      </div>
    </footer>
  );
};

export default FooterSimple;