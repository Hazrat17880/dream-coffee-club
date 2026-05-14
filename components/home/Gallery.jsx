"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ZoomIn, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/gallery/g3.jpeg",
    title: "Fresh Burgers",
    category: "Mains",
    description: "Juicy grass-fed beef burgers with artisanal brioche buns",
    chef: "Chef Marco",
    featured: true
  },
  {
    id: 2,
    src: "/gallery/g5.jpeg",
    title: "Wood Fired Pizza",
    category: "Italian",
    description: "Authentic Neapolitan-style pizza baked in our custom stone oven",
    chef: "Chef Antonio",
    featured: false
  },
  {
    id: 3,
    src: "/gallery/g6.jpeg",
    title: "Creamy Pasta",
    category: "Pasta",
    description: "House-made pasta with wild mushrooms and truffle cream",
    chef: "Chef Lucia",
    featured: false
  },
  {
    id: 4,
    src: "/gallery/g7.jpeg",
    title: "Grilled Steaks",
    category: "Mains",
    description: "Premium cuts aged 28 days, grilled to perfection",
    chef: "Chef Marco",
    featured: true
  },
  {
    id: 5,
    src: "/gallery/g8.jpeg",
    title: "Cold Drinks",
    category: "Beverages",
    description: "Signature cocktails and artisanal mocktails",
    chef: "Mixologist Sarah",
    featured: false
  },
  {
    id: 6,
    src: "/gallery/g9.jpeg",
    title: "Desserts",
    category: "Sweet",
    description: "Decadent desserts crafted by our award-winning pastry team",
    chef: "Chef Pierre",
    featured: false
  },
];

// Modal Component
const ImageModal = ({ image, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg"
      onClick={onClose}
    >
      <div 
        className={`relative max-w-5xl w-full mx-4 transition-all duration-500 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-[#C77A3F] transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden">
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-contain"
            sizes="90vw"
          />
        </div>

        {/* Info Panel */}
        <div className="mt-6 text-white">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-2">
            {image.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base mb-3">
            {image.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#C77A3F] font-semibold">{image.category}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">{image.chef}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [likedImages, setLikedImages] = useState({});
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll animation
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setLikedImages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleShare = async (image, e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this delicious ${image.title} at Dream Restaurant!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${image.title} - Dream Restaurant`);
      // Show toast notification
      const toast = document.createElement('div');
      toast.textContent = '✓ Link copied to clipboard!';
      toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm z-50 animate-fade-in-up';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-[#FDF9F5] via-white to-[#F7F2EC] overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#C77A3F]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C77A3F]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-[#C77A3F]/10 px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#C77A3F] rounded-full animate-pulse" />
            <span className="text-[#C77A3F] text-xs font-semibold tracking-wider uppercase">
              Our Gallery
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#2E241F] mb-4">
            Delicious <span className="text-[#C77A3F]">Moments</span>
          </h2>


          
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min">
          {galleryImages.map((img, index) => (
            <div
              key={img.id}
              className={`group relative cursor-pointer transition-all duration-500 ${
                img.featured ? 'md:col-span-2 md:row-span-2' : ''
              } ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedImage(img)}
            >
              {/* Image Container */}
              <div className="relative w-full h-full min-h-[200px] md:min-h-[250px] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0 md:opacity-0'
                }`} />

                {/* Action Buttons */}
                <div className={`absolute top-4 right-4 flex gap-2 transition-all duration-300 ${
                  hoveredId === img.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}>
                  <button
                    onClick={(e) => handleLike(img.id, e)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#C77A3F] hover:text-white transition-all duration-300"
                  >
                    <Heart className={`w-4 h-4 ${likedImages[img.id] ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => handleShare(img, e)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#C77A3F] hover:text-white transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(img);
                    }}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#C77A3F] hover:text-white transition-all duration-300"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
                  hoveredId === img.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <div className="space-y-1">
                    <p className="text-[#C77A3F] text-xs font-semibold uppercase tracking-wider">
                      {img.category}
                    </p>
                    <h3 className="text-white font-playfair text-lg md:text-xl font-bold">
                      {img.title}
                    </h3>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {img.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-white/60 text-xs">👨‍🍳 {img.chef}</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/30 rounded-tl-2xl transition-opacity duration-300 ${
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0'
                }`} />
                <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/30 rounded-br-2xl transition-opacity duration-300 ${
                  hoveredId === img.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>

              {/* Minimal View Count */}
              <div className="absolute bottom-3 left-3 text-white/60 text-[10px] font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {img.featured && '🔥 Featured'}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <a
            href="/menu"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] text-white px-10 py-4  font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-sm md:text-base"
          >
            <span>Explore Full Menu</span>
            <svg 
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}

      {/* Animation Keyframes */}
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
        
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}