'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Hazrat Usman',
    role: 'Regular Customer',
    content: 'The Dream Special Pizza is absolutely fantastic! Best pizza in town. Every bite tells a story of passion and quality. Highly recommended for anyone who appreciates authentic flavors!',
    rating: 5,
    avatar: '/images/avatar-usman.jpg',
    location: 'Lahore, Pakistan',
    visits: '12+ visits',
    tag: 'Food Enthusiast'
  },
  {
    id: 2,
    name: 'Dr. Zubair Zahir',
    role: 'Food Critic',
    content: 'Exceptional quality and taste. The Dream Special Burger and Alfredo Pasta are masterpieces. Finally, a restaurant that understands what fine dining means.',
    rating: 5,
    avatar: '/images/avatar-zubair.jpg',
    location: 'Islamabad, Pakistan',
    visits: '8+ visits',
    tag: 'Critic Choice'
  },
  {
    id: 3,
    name: 'Jamal Ashraf',
    role: 'Loyal Customer',
    content: 'Best place for family dinners! Great food, cozy ambiance, and friendly staff. The attention to detail makes every visit special.',
    rating: 5,
    avatar: '/images/avatar-jamal.jpg',
    location: 'Karachi, Pakistan',
    visits: '25+ visits',
    tag: 'Family Favorite'
  },
];

// Add more testimonials for carousel
const extendedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)'
      }}
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#C77A3F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C77A3F]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C77A3F]/3 rounded-full blur-3xl" />
        
        {/* Diagonal Lines Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="40" y2="0" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        
        {/* Header - Editorial Style */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-[#C77A3F]" />
            <span className="text-[#C77A3F] text-xs tracking-[0.3em] uppercase font-light">Voices of Trust</span>
            <span className="w-12 h-px bg-[#C77A3F]" />
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white mb-4">
            What They <span className="font-semibold text-[#C77A3F]">Say</span>
          </h2>
          
         
        </div>

        {/* Main Carousel - Cinematic Style */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 rounded-full border border-white/20 hover:border-[#C77A3F] hover:bg-[#C77A3F]/10 transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 rounded-full border border-white/20 hover:border-[#C77A3F] hover:bg-[#C77A3F]/10 transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white group"
          >
            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* Active Testimonial */}
          <div className="relative overflow-hidden">
            <div 
              className="transition-all duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                display: 'flex',
              }}
            >
              {testimonials.map((testimonial, idx) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                    {/* Large Quote Icon */}
                    <div className="absolute top-8 right-8 opacity-10">
                      <Quote className="w-20 h-20 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#C77A3F] text-[#C77A3F]" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                      "{testimonial.content}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C77A3F] to-[#A55E2A] flex items-center justify-center text-white font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-400 text-sm">{testimonial.role}</div>
                          <div className="text-gray-500 text-xs mt-1">{testimonial.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#C77A3F] text-sm font-semibold">{testimonial.tag}</div>
                        <div className="text-gray-500 text-xs">{testimonial.visits}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 ${
                  currentIndex === idx 
                    ? 'w-8 h-1.5 bg-[#C77A3F]' 
                    : 'w-4 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

    

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-[#C77A3F]/10 rounded-full animate-pulse" />
        <div className="absolute top-20 right-20 w-24 h-24 border border-[#C77A3F]/10 rounded-full animate-pulse delay-1000" />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}