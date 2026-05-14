'use client';

import React, { useState, useRef, useEffect } from 'react';

// Fonts: Cormorant Garamond + Jost
const cormorant = { fontFamily: "'Playfair Display', serif" };
const jost = { fontFamily: "'Poppins', sans-serif" };
const reasons = [
  {
    number: '01',
    question: 'Do you use fresh ingredients in every dish?',
    title: 'Farm-Fresh Ingredients',
    answer:
      'Absolutely. Every dish is crafted using locally sourced, seasonal produce — delivered fresh to our kitchen every single morning. No frozen shortcuts, ever.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3C14 3 6 8 6 15a8 8 0 0016 0c0-7-8-12-8-12z" />
        <path d="M14 15v6" />
      </svg>
    ),
  },
  {
    number: '02',
    question: 'How quickly will my order be ready?',
    title: 'Ready in Minutes',
    answer:
      'We believe great food shouldn\'t make you wait. Most orders are prepared and ready within 10–15 minutes — fast service without ever compromising on taste or quality.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <path d="M14 9v5l3 3" />
      </svg>
    ),
  },
  {
    number: '03',
    question: 'Who is behind the food at Dream Restaurant?',
    title: 'Master Chefs',
    answer:
      'Our culinary team brings decades of combined experience and genuine passion. Each chef is handpicked for their craft, turning every plate into an art form you can taste.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4l2.5 5.5L23 10.5l-4.5 4.5 1 6.5L14 18.5 8.5 21.5l1-6.5L5 10.5l6.5-1L14 4z" />
      </svg>
    ),
  },
  {
    number: '04',
    question: 'What kind of food options do you offer?',
    title: 'Diverse Menu',
    answer:
      'From hearty burgers and crispy wings to elegant steaks and creamy pastas — our wide-ranging menu ensures every craving finds its perfect match, whatever your mood.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 14h18M5 9h18M5 19h12" />
      </svg>
    ),
  },
  {
    number: '05',
    question: 'Can I get food delivered to my door?',
    title: 'Dine-in & Delivery',
    answer:
      'Yes! Enjoy a warm, welcoming dine-in experience at our restaurant or get your favorites delivered hot straight to your doorstep. The choice is always yours.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12c0 5-6 10-6 10s-6-5-6-10a6 6 0 0112 0z" />
        <circle cx="14" cy="12" r="2" />
      </svg>
    ),
  },
  {
    number: '06',
    question: 'How do you maintain hygiene and food safety?',
    title: 'Hygiene Guaranteed',
    answer:
      'We follow the highest standards of kitchen cleanliness and food safety protocols — every surface, every tool, every hand. You dine with us in total peace of mind.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21C12 21 5 16 5 10a7 7 0 0114 0" />
        <path d="M17 14l2 2 4-4" />
      </svg>
    ),
  },
];

// Animated answer panel with enhanced transitions
function AccordionItem({ item, isOpen, onClick, animateIn, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className="border-b border-gray-100 last:border-b-0 transition-all duration-300"
      style={{
        opacity: animateIn ? 1 : 0,
        transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 100}ms, 
                     transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${index * 100}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Question row — clickable */}
      <button
        onClick={onClick}
        className="w-full flex items-center gap-5 py-5 px-0 text-left group focus:outline-none relative overflow-hidden"
      >
        {/* Ripple effect background */}
        <span 
          className="absolute inset-0 bg-gradient-to-r from-[#C9913A]/0 via-[#C9913A]/0 to-transparent transition-all duration-500"
          style={{ 
            opacity: isHovered ? 0.03 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(-100%)'
          }}
        />
        
        {/* Number with bounce effect */}
        <span
          className="flex-shrink-0 transition-all duration-300"
          style={{
            ...cormorant,
            fontWeight: 700,
            fontSize: '1.6rem',
            lineHeight: 1,
            color: isOpen ? '#C9913A' : isHovered ? '#C9913A' : '#e5e7eb',
            transform: isOpen ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
        >
          {item.number}
        </span>

        {/* Icon with spin effect */}
        <span
          className="flex-shrink-0 transition-all duration-300"
          style={{ 
            color: isOpen ? '#C9913A' : isHovered ? '#C9913A' : '#d1d5db',
transform: isOpen ? 'scale(1.05)' : 'scale(1)',            transition: 'all 0.3s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
        >
          {item.icon}
        </span>

        {/* Question text with slide effect */}
        <span
          className="flex-1 transition-all duration-300"
          style={{
            ...cormorant,
            fontWeight: isOpen ? 600 : 400,
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: isOpen ? '#1E1A16' : isHovered ? '#374151' : '#6b7280',
            letterSpacing: isOpen ? '0.01em' : '0',
            transform: isOpen ? 'translateX(2px)' : 'translateX(0)',
          }}
        >
          {item.question}
        </span>

        {/* Plus / Minus toggle with pulse animation */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? '#C9913A' : isHovered ? '#C9913A' : '#e5e7eb',
            backgroundColor: isOpen ? '#C9913A' : 'transparent',
            color: isOpen ? 'white' : isHovered ? '#C9913A' : '#9ca3af',
            boxShadow: isOpen ? '0 0 0 4px rgba(201, 145, 58, 0.1)' : 'none',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)',
            }}
          >
            <path d="M6 1v10M1 6h10" />
          </svg>
        </span>
      </button>

      {/* Answer panel — folds open with elastic effect */}
      <div
        style={{
          maxHeight: isOpen ? `${height}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.55s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      >
        <div ref={contentRef}>
          <div className="flex gap-5 pb-6 pl-0">
            {/* Left indent */}
            <div className="flex-shrink-0" style={{ width: '22px + 22px + 40px' }} />
            <div className="pl-[4.5rem]">
              {/* Title with slide animation */}
              <div
                style={{
                  transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                  opacity: isOpen ? 1 : 0,
                  transition: 'transform 0.4s ease 0.1s, opacity 0.3s ease 0.1s',
                }}
              >
                <p
                  className="text-[#C9913A] mb-2"
                  style={{ ...jost, fontWeight: 500, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}
                >
                  {item.title}
                </p>
              </div>
              
              {/* Answer with fade in */}
              <div
                style={{
                  transform: isOpen ? 'translateX(0)' : 'translateX(-15px)',
                  opacity: isOpen ? 1 : 0,
                  transition: 'transform 0.4s ease 0.15s, opacity 0.3s ease 0.15s',
                }}
              >
                <p
                  className="text-gray-500 leading-relaxed"
                  style={{ ...jost, fontWeight: 300, fontSize: '13.5px', maxWidth: '560px' }}
                >
                  {item.answer}
                </p>
              </div>
              
              {/* Gold rule with width animation */}
              <div 
                className="h-[1.5px] bg-[#C9913A] mt-4 transition-all duration-500 ease-out"
                style={{ 
                  width: isOpen ? '32px' : '0px',
                  transitionDelay: isOpen ? '0.2s' : '0s'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChoose() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [headerAnimate, setHeaderAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          setTimeout(() => setHeaderAnimate(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">

      {/* Decorative watermark with float animation */}
      <div
        className="absolute -right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none transition-all duration-1000"
        style={{
          ...cormorant,
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: '200px',
          lineHeight: 1,
          color: '#F7F7F7',
          opacity: animateIn ? 0.4 : 0,
          transform: animateIn ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
        aria-hidden
      >
        WHY
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">

        {/* ── Header with staggered animations ── */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
          }}
        >
          <div>
            {/* Animated gold bar */}
            <div 
              className="h-[2px] bg-[#C9913A] mb-5 transition-all duration-700 ease-out"
              style={{ 
                width: headerAnimate ? '40px' : '0px',
                transitionDelay: '0.1s'
              }} 
            />
            
            {/* Tagline with slide */}
            <div
              style={{
                transform: headerAnimate ? 'translateX(0)' : 'translateX(-20px)',
                opacity: headerAnimate ? 1 : 0,
                transition: 'transform 0.5s ease 0.2s, opacity 0.5s ease 0.2s',
              }}
            >
              <p
                style={{ ...jost, fontWeight: 400, fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9913A', marginBottom: '8px' }}
              >
                Our Promise
              </p>
            </div>
            
            {/* Main heading with letter spacing animation */}
            <div
              style={{
                transform: headerAnimate ? 'translateX(0)' : 'translateX(-30px)',
                opacity: headerAnimate ? 1 : 0,
                transition: 'transform 0.6s ease 0.3s, opacity 0.6s ease 0.3s',
              }}
            >
              <h2
                style={{
                  ...cormorant,
                  fontWeight: 700,
                  fontStyle: 'italic',
fontSize: 'clamp(2.2rem, 4.5vw, 3rem)',
                  color: '#1E1A16',
                  lineHeight: 1.2,
                }}
              >
                Why Choose<br />Dream Coffee Club?
              </h2>
            </div>
          </div>
          
          {/* Right text with slide from right */}
          <div
            style={{
              transform: headerAnimate ? 'translateX(0)' : 'translateX(30px)',
              opacity: headerAnimate ? 1 : 0,
              transition: 'transform 0.6s ease 0.4s, opacity 0.6s ease 0.4s',
            }}
          >
            {/* <p
              className="text-gray-400 max-w-xs leading-relaxed md:text-right"
              style={{ ...jost, fontWeight: 300, fontSize: '13px' }}
            >
              We don't just serve food — we create moments. Every visit is designed to delight your senses and warm your heart.
            </p> */}
          </div>
        </div>

        {/* ── Accordion with container animation ── */}
        <div 
          className="divide-y divide-gray-100 border-t border-gray-100"
          style={{
            opacity: animateIn ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
          }}
        >
          {reasons.map((item, index) => (
            <AccordionItem
              key={item.number}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onClick={() => toggle(index)}
              animateIn={animateIn}
            />
          ))}
        </div>

        {/* Decorative bottom element */}
        <div 
          className="flex justify-center mt-12 transition-all duration-700"
          style={{
            opacity: animateIn ? 0.6 : 0,
            transform: animateIn ? 'scale(1)' : 'scale(0.8)',
            transitionDelay: '0.6s',
          }}
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9913A] to-transparent" />
        </div>

      </div>
    </section>
  );
}