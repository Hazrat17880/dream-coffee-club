"use client";

import React, { useEffect, useRef, useState } from "react";

function AboutPage() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = {};
    
    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.2 }
      );
      
      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]);
      }
    });
    
    return () => {
      Object.keys(observers).forEach((key) => {
        if (observers[key]) observers[key].disconnect();
      });
    };
  }, []);

  // Updated stats for a new restaurant (2026)
  const stats = [
    { number: "2026", label: "Year Established", icon: "📅" },
    { number: "10+", label: "Expert Team Members", icon: "👥" },
    { number: "Fresh", label: "Daily Ingredients", icon: "🌱" },
    { number: "100%", label: "From Scratch", icon: "✨" },
  ];

  // Updated values for a new restaurant
  const values = [
    {
      title: "Fresh from Day One",
      description: "Every ingredient is locally sourced and prepared fresh daily. No shortcuts, no compromises from our very first service.",
      icon: "🌱",
    },
    {
      title: "Passion-Driven",
      description: "We cook because we love it. Every plate reflects our genuine passion for creating memorable experiences.",
      icon: "🔥",
    },
    {
      title: "Community First",
      description: "Building relationships with local farmers, suppliers, and neighbors who share our vision for quality.",
      icon: "🤝",
    },
    {
      title: "Constant Growth",
      description: "Every day we learn, improve, and evolve. We're new, but our ambition to be great is limitless.",
      icon: "✨",
    },
  ];

  // Updated timeline for 2026 startup
  const timeline = [
    { year: "2025", title: "The Dream Begins", description: "A vision took shape over countless conversations, recipe tests, and the shared dream of creating something special." },
    { year: "Early 2026", title: "Finding Our Home", description: "After searching for the perfect location, we found the space that would become our first restaurant." },
    { year: "Spring 2026", title: "Building Our Team", description: "Bringing together passionate chefs and dedicated staff who share our commitment to excellence and hospitality." },
    { year: "2026", title: "Doors Open", description: "Welcome to our very first service. This is where our story truly begins — and we're so glad you're here." },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-slide-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-scale {
          animation: scaleUp 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      {/* HERO SECTION - Updated for 2026 */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/aboutus/hero1.jpeg"
            alt="About Hero"
            className="w-full h-full object-cover scale-110 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Animated particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-glow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Where Passion
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Meets Flavor
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Opening our doors in 2026 to create unforgettable dining experiences through culinary excellence,
            innovation, and genuine hospitality.
          </p>
          
          <div className="flex gap-4 justify-center mt-8">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Explore Our Journey
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300">
              Watch Story
            </button>
          </div>
        </div>
      </section>

      {/* STATS SECTION - Updated for 2026 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">
              Just Getting Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Our Beginning by the Numbers
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center"
                ref={(el) => (sectionRefs.current[`stat-${index}`] = el)}
                style={{
                  opacity: isVisible[`stat-${index}`] ? 1 : 0,
                  transform: isVisible[`stat-${index}`] ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                <div className="text-4xl mb-4 text-amber-500">
                  {stat.icon}
                </div>
                <div className="relative">
                  <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="w-12 h-0.5 bg-amber-400 mx-auto my-3 rounded-full"></div>
                </div>
                <div className="text-gray-500 text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY - Updated for 2026 */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 via-white to-orange-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className="relative"
              ref={(el) => (sectionRefs.current["story-image"] = el)}
              style={{
                opacity: isVisible["story-image"] ? 1 : 0,
                transform: isVisible["story-image"] ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.8s ease-out",
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/aboutus/story.jpeg"
                  alt="Our Story"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full -z-10 opacity-50"></div>
            </div>

            <div
              ref={(el) => (sectionRefs.current["story-content"] = el)}
              style={{
                opacity: isVisible["story-content"] ? 1 : 0,
                transform: isVisible["story-content"] ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.8s ease-out 0.2s",
              }}
            >
              <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Crafting Memories
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                  One Plate at a Time
                </span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Opening our doors in 2026, we're writing the first chapter of what we hope will become 
                a beloved culinary story. Born from a dream and fueled by dedication, we're building 
                something special — one dish, one guest, one memory at a time.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                We may be new, but our standards are not. Every recipe has been tested, perfected, 
                and crafted with love before it reaches your table. Join us at the beginning of 
                our journey — your presence makes our story worth telling.
              </p>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600">⭐</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Coming Soon</div>
                    <div className="text-sm text-gray-500">Opening 2026</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600">🏆</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fresh Start</div>
                    <div className="text-sm text-gray-500">Launching 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION - Modern Cards */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold mb-4">
              Our Purpose
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Guided by our core principles, we strive to make every dining experience extraordinary
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Mission",
                description: "To deliver exceptional culinary experiences that inspire, delight, and create lasting memories for every guest who walks through our doors from day one.",
                icon: "🎯",
                color: "from-amber-500 to-orange-500",
              },
              {
                title: "Our Vision",
                description: "To build a beloved culinary destination that grows with our community, setting new standards of excellence, innovation, and hospitality.",
                icon: "👁️",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
                ref={(el) => (sectionRefs.current[`mission-${index}`] = el)}
                style={{
                  opacity: isVisible[`mission-${index}`] ? 1 : 0,
                  transform: isVisible[`mission-${index}`] ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease-out ${index * 0.2}s`,
                }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {item.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES - For a New Restaurant (2026) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Core Values
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Built on Fresh Beginnings
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The values that will guide us from day one
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                ref={(el) => (sectionRefs.current[`value-${index}`] = el)}
                style={{
                  opacity: isVisible[`value-${index}`] ? 1 : 0,
                  transform: isVisible[`value-${index}`] ? "scale(1)" : "scale(0.9)",
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION - For a New Restaurant Opening 2026 */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Our Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Story We're Writing
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every great restaurant has a beginning. This is ours.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-300 to-orange-300 hidden md:block"></div>
            
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-12 flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                ref={(el) => (sectionRefs.current[`timeline-${index}`] = el)}
                style={{
                  opacity: isVisible[`timeline-${index}`] ? 1 : 0,
                  transform: isVisible[`timeline-${index}`] ? "translateX(0)" : `translateX(${index % 2 === 0 ? "-30px" : "30px"})`,
                  transition: `all 0.8s ease-out ${index * 0.2}s`,
                }}
              >
                <div className="flex-1 md:px-8">
                  <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}>
                    <div className="text-4xl font-bold text-amber-500 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold z-10 my-4 md:my-0">
                  {index + 1}
                </div>
                <div className="flex-1 md:px-8"></div>
              </div>
            ))}
          </div>

          {/* CTA Button - Be Part of the Story */}
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Be Part of Our Story
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Join us from the beginning — reserve your table today
            </p>
          </div>
        </div>
      </section>

      {/* INGREDIENTS STORY - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={(el) => (sectionRefs.current["ingredients-content"] = el)}
              style={{
                opacity: isVisible["ingredients-content"] ? 1 : 0,
                transform: isVisible["ingredients-content"] ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.8s ease-out",
              }}
            >
              <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
                Quality Ingredients
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                From Farm to Table
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                We believe that exceptional food starts with exceptional ingredients. 
                That's why we've built strong relationships with local farmers and 
                trusted suppliers who share our passion for quality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every morning, fresh produce arrives at our kitchen — vegetables harvested at 
                peak ripeness, meats from humanely raised animals, and seafood caught sustainably. 
                This commitment to quality is non-negotiable and is the foundation of every dish we create.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">Locally Sourced</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">Organic Options</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">Sustainable Practices</span>
                </div>
              </div>
            </div>

            <div
              className="relative"
              ref={(el) => (sectionRefs.current["ingredients-image"] = el)}
              style={{
                opacity: isVisible["ingredients-image"] ? 1 : 0,
                transform: isVisible["ingredients-image"] ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.8s ease-out 0.2s",
              }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/aboutus/g6.jpeg"
                  alt="Fresh Ingredients"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full -z-10 opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Magic?
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Join us for a culinary journey that will tantalize your taste buds and create memories to last a lifetime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-amber-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Book a Table
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              View Our Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;