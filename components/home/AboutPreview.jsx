'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function AboutPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const [imageErrors, setImageErrors] = useState({
    main: false,
    pizza: false,
    burger: false
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '10+', label: 'Years of Excellence', suffix: '+' },
    { value: '50+', label: 'Signature Dishes', suffix: '+' },
    { value: '20k+', label: 'Happy Customers', suffix: '+' }
  ];

  

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-[#F1EAE1] to-[#FEF9F0] overflow-hidden relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#C77A3F]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C77A3F]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-20 items-center">
          
          {/* Left Content - Text Section */}
          <div className={`flex-1 order-2 lg:order-1 transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
          }`}>
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-[#C77A3F]/10 px-4 py-2 rounded-full mb-6 hover:bg-[#C77A3F]/20 transition-all duration-300">
              <span className="w-2 h-2 bg-[#C77A3F] rounded-full animate-pulse"></span>
              <span className="text-[#C77A3F] text-xs font-semibold tracking-wider uppercase">Our Story</span>
            </div>

            <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#2E241F] mb-6 leading-tight">
              More than just a meal,
              <br />
              <span className="text-[#C77A3F] relative inline-block">
                an experience to remember
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#C77A3F]/20" preserveAspectRatio="none" viewBox="0 0 200 6">
                  <path d="M0 3 L200 3" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
                </svg>
              </span>
            </h3>
            
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                Founded with a passion for quality food and warm hospitality, 
                we've been serving the community with delicious pizzas, juicy burgers, 
                and mouth-watering steaks since <span className="text-[#C77A3F] font-semibold">2012</span>.
              </p>
              
              <p>
                Every dish is crafted with premium ingredients, secret family recipes, 
                and a whole lot of love. Whether you're dining in or ordering out, 
                we promise a meal that will keep you coming back for more.
              </p>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 my-8 py-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-2xl md:text-3xl font-bold text-[#C77A3F] mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </div>
                  {index !== stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-8 bg-gray-300"></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Testimonial Quote */}
            <div className="border-l-4 border-[#C77A3F] pl-4 md:pl-6 py-2 bg-white/50 rounded-r-xl mb-8">
              <p className="text-sm md:text-base italic text-gray-600">
                "Great food is made with passion, served with love, and shared with joy."
              </p>
              <p className="text-xs md:text-sm text-[#C77A3F] mt-2 font-semibold">
                — Owner & Head Chef
              </p>
            </div>
            
            {/* CTA Button */}
            <Link 
              href="/about" 
              className="group inline-flex items-center gap-3 bg-[#C77A3F] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#A55E2A] transition-all duration-300 hover:gap-4 hover:shadow-xl text-sm md:text-base shadow-md"
            >
              Discover Our Story
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right Content - Image Gallery */}
          <div className={`flex-1 w-full order-1 lg:order-2 transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
          }`}>
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                {!imageErrors.main ? (
                  <Image
                    src="/aboutPreview/aboutpre.jpeg"
                    alt="Dream Restaurant cozy interior with warm lighting"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 45vw"
                    priority
                    onError={() => setImageErrors(prev => ({ ...prev, main: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-6xl">🍽️</span>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
              </div>

              {/* Floating Card 1 - Top Right */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl animate-bounce-slow hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C77A3F]/10 rounded-full flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-medium">Rated</p>
                    <p className="text-base sm:text-lg font-bold text-[#2E241F]">4.9 ★</p>
                    <p className="text-[9px] sm:text-xs text-gray-400">500+ reviews</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl animate-float hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#C77A3F]/10 rounded-full flex items-center justify-center text-2xl">
                    🍕
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-500">Most Ordered</p>
                    <p className="text-xs sm:text-sm font-bold text-[#2E241F]">Dream Special Pizza</p>
                    <p className="text-[9px] sm:text-xs text-[#C77A3F] font-semibold">#1 Bestseller</p>
                  </div>
                </div>
              </div>

              {/* Small Decorative Images Grid - Desktop only */}
              <div className="absolute -bottom-8 -right-8 hidden lg:block">
                <div className="flex gap-3">
                  {['pizza', 'burger'].map((item, idx) => (
                    <div 
                      key={item}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      {!imageErrors[item] ? (
                        <Image 
                          src={`/aboutPreview/${item}.jpg`}
                          alt={`Delicious ${item}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                          onError={() => setImageErrors(prev => ({ ...prev, [item]: true }))}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl">
                          {item === 'pizza' ? '🍕' : '🍔'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(6px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}