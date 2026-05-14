'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Heart, Star, ChevronRight, Sparkles, Award, TrendingUp } from 'lucide-react';

const favoritesData = [
  {
    id: 1,
    slug: 'dream-special-burger',
    name: 'Dream Special Burger',
    image: '/fevorit/burger.jpg',
    category: 'Burgers',
    rating: 4.8,
    reviews: 124,
    user: 'Ali Khan',
    review: 'Best burger in town! Highly recommended 🔥',
    price: '$12.99',
    isTopRated: true,
  },
  {
    id: 2,
    slug: 'dream-special-pizza',
    name: 'Dream Special Pizza',
    image: '/fevorit/pizza.jpg',
    category: 'Pizza',
    rating: 4.9,
    reviews: 210,
    user: 'Sara Ahmed',
    review: 'Absolutely delicious and super cheesy 😍',
    price: '$18.99',
    isTopRated: true,
  },
  {
    id: 3,
    slug: 'crispy-chicken-sandwich',
    name: 'Crispy Chicken Sandwich',
    image: '/fevorit/sandwich.jpg',
    category: 'Sandwich',
    rating: 4.7,
    reviews: 98,
    user: 'Hassan Raza',
    review: 'Perfect crunch and flavor balance 👌',
    price: '$10.99',
    isTopRated: false,
  },
];

export default function FeaturedProducts() {
  const [visible, setVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [rippleEffect, setRippleEffect] = useState({ show: false, x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, triggerOnce: true }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFavorite = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    setRippleEffect({
      show: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setRippleEffect({ show: false, x: 0, y: 0 }), 500);

    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-400 text-yellow-400 half-star'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#F9F5F1] to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C77A3F]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C77A3F]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">

        {/* HEADER with enhanced design */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C77A3F]/10 to-[#C77A3F]/20 text-[#C77A3F] px-6 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Customer Love</span>
            <TrendingUp className="w-4 h-4" />
          </div>

          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-[#2E241F] mb-4 relative inline-block">
            Customer Favorites
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#C77A3F] rounded-full"></div>
          </h2>

          <p className="text-[#6B4E3A] text-lg max-w-2xl mx-auto mt-6">
            Real reviews from our happy customers — the dishes everyone is talking about
          </p>
        </div>

        {/* GRID with enhanced cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {favoritesData.map((item, index) => (
            <Link
              key={item.id}
              href={`/menu/${item.slug}`}
              className={`group block relative transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                hoveredCard === item.id 
                  ? 'shadow-2xl -translate-y-3 shadow-[#C77A3F]/20' 
                  : 'shadow-md'
              }`}>
                
                {/* Top Rated Badge */}
                {item.isTopRated && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                    <Award className="w-3 h-3" />
                    <span>Top Rated</span>
                  </div>
                )}

                {/* IMAGE CONTAINER */}
                <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-all duration-700 ${
                      hoveredCard === item.id ? 'scale-110 rotate-1' : 'scale-100'
                    }`}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* FAVORITE BUTTON with ripple effect */}
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-20 group/fav"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.includes(item.id)
                          ? 'fill-red-500 text-red-500 scale-110'
                          : 'text-gray-600 group-hover/fav:text-red-500'
                      }`}
                    />
                    {rippleEffect.show && (
                      <span 
                        className="absolute inset-0 rounded-full bg-red-500 animate-ping"
                        style={{
                          left: rippleEffect.x,
                          top: rippleEffect.y,
                          transform: 'translate(-50%, -50%)',
                          width: '100px',
                          height: '100px',
                        }}
                      />
                    )}
                  </button>

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-[#C77A3F] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                    {item.price}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  {/* Category */}
                  <div className="text-xs text-[#C77A3F] font-semibold mb-2 uppercase tracking-wider">
                    {item.category}
                  </div>

                  {/* TITLE */}
                  <h3 className="font-playfair text-xl font-bold text-[#2E241F] mb-3 group-hover:text-[#C77A3F] transition-colors duration-300 line-clamp-1">
                    {item.name}
                  </h3>

                  {/* RATING */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {renderStars(item.rating)}
                      <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
                  </div>

                  {/* REVIEW with enhanced styling */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4 relative">
                    <div className="absolute -top-2 left-4 text-4xl text-gray-300">"</div>
                    <p className="text-sm text-gray-700 italic line-clamp-2 pl-3">
                      {item.review}
                    </p>
                  </div>

                  {/* USER */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#C77A3F] to-[#A55E2A] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {item.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.user}</p>
                        <p className="text-xs text-gray-500">Verified Customer</p>
                      </div>
                    </div>
                    <div className="text-green-500 text-xs font-semibold">✓ Verified Purchase</div>
                  </div>

                  {/* CTA with animation */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-[#C77A3F] group/cta">
                      <span className="text-sm font-semibold">View Details</span>
                      <ChevronRight className="w-4 h-4 transform transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-[#C77A3F] transition-all duration-500 pointer-events-none ${
                  hoveredCard === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`} />
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link
            href="/menu-list"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] hover:from-[#A55E2A] hover:to-[#8B4A1E] text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Explore Full Menu</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
        </div>

      </div>

      {/* Add custom CSS for half-star effect */}
      <style jsx>{`
        .half-star {
          position: relative;
          overflow: hidden;
        }
        .half-star::before {
          content: '★';
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          overflow: hidden;
          color: #fbbf24;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
}