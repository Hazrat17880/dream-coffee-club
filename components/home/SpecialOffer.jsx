'use client';

import React, { useState, useEffect, useRef } from 'react';

// Fonts: Cormorant Garamond + Jost (site-wide)
// Add to layout.tsx <head>:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
const C = { fontFamily: "'Playfair Display', serif" };
const J = { fontFamily: "'Poppins', sans-serif" };
/* ─── Data ─────────────────────────────────────────────────────────────────── */
const offers = [
  {
    id: 1,
    featured: true,
    tag: 'Most Popular',
    title: 'Pizza Mania',
    description: 'Any large pizza with garlic bread — our signature deal that keeps guests coming back.',
    discount: '30%',
    suffix: 'OFF',
    code: 'PIZZA30',
    accentColor: '#C9913A',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 3v11l7 5" />
        <circle cx="10" cy="11" r="1.2" fill="#C9913A" stroke="none" />
        <circle cx="16" cy="16" r="1.2" fill="#C9913A" stroke="none" />
        <circle cx="11" cy="17" r="0.9" fill="#C9913A" stroke="none" />
      </svg>
    ),
  },
  {
    id: 2,
    featured: false,
    tag: 'Save Big',
    title: 'Combo Feast',
    description: 'Burger + Fries + Soft Drink — the complete satisfaction trio.',
    discount: 'Rs. 1,299',
    originalPrice: 'Rs. 1,999',
    code: 'COMBO99',
    accentColor: '#D97B4F',
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#D97B4F" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 16c0-5 4-9 9-9s9 4 9 9" />
        <rect x="3" y="16" width="22" height="3" rx="1.5" />
        <path d="M7 19v4M21 19v4M11 19v4M17 19v4" />
      </svg>
    ),
  },
  {
    id: 3,
    featured: false,
    tag: 'Daily Deal',
    title: 'Happy Hours',
    description: '4 PM – 7 PM every day. Your evening ritual, elevated.',
    discount: 'Buy 1',
    suffix: 'Get 1 Free',
    code: 'HAPPY7',
    accentColor: '#7BAFD4',
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="#7BAFD4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="10" />
        <path d="M14 8v6l4 3" />
      </svg>
    ),
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-16 h-16 flex items-center justify-center border border-[#C9913A]/20 bg-[#C9913A]/5 relative"
        style={{ borderRadius: '3px' }}
      >
        {/* flip line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/30 z-10" />
        <span style={{ ...C, fontWeight: 700, fontSize: '2rem', color: '#FAFAF9', position: 'relative', zIndex: 11 }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{ ...J, fontWeight: 300, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#78716C' }}>
        {label}
      </span>
    </div>
  );
}

function CopyCode({ code, accent }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-3 px-4 py-2.5 border border-dashed transition-all duration-300 group"
      style={{
        borderColor: copied ? accent : 'rgba(255,255,255,0.1)',
        background: copied ? `${accent}15` : 'rgba(255,255,255,0.03)',
        borderRadius: '4px',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke={accent} strokeWidth="1.4" strokeLinecap="round" style={{ transform: 'rotate(-45deg)' }}>
        <path d="M2 7h10M7 2l5 5-5 5" />
      </svg>
      <span style={{ ...J, fontWeight: 500, fontSize: '12px', letterSpacing: '0.2em', color: '#FAFAF9' }}>
        {code}
      </span>
      <span style={{ ...J, fontWeight: 300, fontSize: '10px', letterSpacing: '0.1em', color: copied ? accent : '#78716C', marginLeft: 'auto', transition: 'color 0.2s' }}>
        {copied ? '✓ Copied' : 'Copy'}
      </span>
    </button>
  );
}

function FeaturedCard({ offer, inView }) {
  return (
    <div
      className="relative flex flex-col h-full p-8 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1C1917 0%, #0C0A09 100%)',
        border: '1px solid rgba(201,145,58,0.2)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.6s ease 0s, transform 0.6s ease 0s',
      }}
    >
      {/* Rotating conic glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg at 50% 0%, transparent 70%, rgba(201,145,58,0.04) 85%, transparent 100%)',
          animation: 'spin 12s linear infinite',
        }}
      />

      {/* Top row */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <span
          className="px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
          style={{ ...J, fontWeight: 500, background: 'linear-gradient(135deg, #A06A20, #C9913A)', color: '#0C0A09', borderRadius: '2px' }}
        >
          {offer.tag}
        </span>
        <div>{offer.icon}</div>
      </div>

      {/* Title */}
      <h3
        className="mb-3 relative z-10"
        style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '2rem', color: '#FAFAF9', lineHeight: 1.15 }}
      >
        {offer.title}
      </h3>

      {/* Description */}
      <p
        className="mb-7 relative z-10"
        style={{ ...J, fontWeight: 300, fontSize: '13px', color: '#A8A29E', lineHeight: 1.7, maxWidth: '280px' }}
      >
        {offer.description}
      </p>

      {/* Gold rule */}
      <div className="w-8 h-[1.5px] bg-[#C9913A] mb-7 relative z-10" />

      {/* Discount */}
      <div className="mb-8 relative z-10 flex items-baseline gap-3">
        <span style={{ ...C, fontWeight: 700, fontSize: '4rem', color: '#C9913A', lineHeight: 1, textShadow: '0 0 30px rgba(201,145,58,0.25)' }}>
          {offer.discount}
        </span>
        {offer.suffix && (
          <span style={{ ...C, fontWeight: 600, fontSize: '1.5rem', color: '#E8C97A' }}>
            {offer.suffix}
          </span>
        )}
      </div>

      <div className="flex-1" />

      {/* Copy code */}
      <div className="mb-4 relative z-10">
        <CopyCode code={offer.code} accent={offer.accentColor} />
      </div>

      {/* CTA */}
      <button
        className="relative z-10 w-full py-3.5 flex items-center justify-center gap-2 group overflow-hidden transition-all duration-300"
        style={{ background: 'linear-gradient(135deg, #A06A20, #C9913A)', borderRadius: '3px' }}
      >
        {/* shimmer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', transform: 'translateX(-100%)', animation: 'shimmer 3s infinite' }}
        />
        <span style={{ ...J, fontWeight: 600, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0C0A09' }}>
          Claim This Offer
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#0C0A09" strokeWidth="1.8" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform duration-300">
          <path d="M2 7h10M7 3l4 4-4 4" />
        </svg>
      </button>
    </div>
  );
}

function SmallCard({ offer, index, inView }) {
  return (
    <div
      className="flex gap-5 p-6 relative overflow-hidden group transition-all duration-500"
      style={{
        background: 'linear-gradient(160deg, #1C1917 0%, #141210 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 150}ms, transform 0.6s ease ${index * 150}ms`,
      }}
    >
      {/* hover border glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ border: `1px solid ${offer.accentColor}30` }}
      />
      {/* Top line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${offer.accentColor}, transparent)` }}
      />

      {/* Icon box */}
      <div
        className="flex-shrink-0 w-14 h-14 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
        style={{ background: `${offer.accentColor}10`, borderRadius: '4px', border: `1px solid ${offer.accentColor}20` }}
      >
        {offer.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <h3 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '1.25rem', color: '#FAFAF9' }}>
            {offer.title}
          </h3>
          <span
            className="px-2 py-0.5 text-[10px] rounded-full"
            style={{ ...J, fontWeight: 400, letterSpacing: '0.1em', background: `${offer.accentColor}15`, color: offer.accentColor }}
          >
            {offer.tag}
          </span>
        </div>

        <p style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#78716C', lineHeight: 1.6, marginBottom: '12px' }}>
          {offer.description}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span style={{ ...C, fontWeight: 700, fontSize: '1.8rem', color: offer.accentColor, lineHeight: 1 }}>
            {offer.discount}
          </span>
          {offer.suffix && (
            <span style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#A8A29E' }}>{offer.suffix}</span>
          )}
          {offer.originalPrice && (
            <span style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#52504E', textDecoration: 'line-through' }}>
              {offer.originalPrice}
            </span>
          )}
        </div>

        <CopyCode code={offer.code} accent={offer.accentColor} />
      </div>

      {/* Order btn */}
      <div className="flex-shrink-0 self-end">
        <button
          className="flex items-center gap-1.5 px-5 py-2.5 border transition-all duration-300 group/btn"
          style={{
            ...J,
            fontWeight: 500,
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#FAFAF9',
            borderColor: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = offer.accentColor;
            e.currentTarget.style.color = offer.accentColor;
            e.currentTarget.style.background = `${offer.accentColor}08`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = '#FAFAF9';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Order
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function SpecialOffer() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 22 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(p => {
        if (p.seconds > 0) return { ...p, seconds: p.seconds - 1 };
        if (p.minutes > 0) return { ...p, minutes: p.minutes - 1, seconds: 59 };
        if (p.hours > 0) return { ...p, hours: p.hours - 1, minutes: 59, seconds: 59 };
        if (p.days > 0) return { days: p.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: '#0C0A09' }}
    >
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
      `}</style>

      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,145,58,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(201,145,58,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* ── Header ── */}
        <div
          className="mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            {/* Left: title */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-[2px] bg-[#C9913A]" />
                <span style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9913A' }}>
                  Exclusive Deals
                </span>
              </div>
              <h2 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#FAFAF9', lineHeight: 1.15 }}>
                Today's Special<br />
                <span style={{ color: '#C9913A' }}>Offers</span>
              </h2>
              {/* <p style={{ ...J, fontWeight: 300, fontSize: '13px', color: '#78716C', marginTop: '12px', maxWidth: '340px', lineHeight: 1.7 }}>
                Curated deals for a limited time only — grab them before they're gone.
              </p> */}
            </div>

            {/* Right: countdown */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9913A]" style={{ animation: 'blink 1.5s infinite' }} />
                <span style={{ ...J, fontWeight: 300, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#78716C' }}>
                  Offer expires in
                </span>
              </div>
              <div className="flex items-end gap-2">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <span style={{ ...C, fontWeight: 300, fontSize: '1.8rem', color: '#C9913A', paddingBottom: '20px', animation: 'blink 1s infinite' }}>:</span>
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <span style={{ ...C, fontWeight: 300, fontSize: '1.8rem', color: '#C9913A', paddingBottom: '20px', animation: 'blink 1s infinite' }}>:</span>
                <CountdownUnit value={timeLeft.minutes} label="Mins" />
                <span style={{ ...C, fontWeight: 300, fontSize: '1.8rem', color: '#C9913A', paddingBottom: '20px', animation: 'blink 1s infinite' }}>:</span>
                <CountdownUnit value={timeLeft.seconds} label="Secs" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Featured — left 5 cols */}
          <div className="lg:col-span-5">
            <FeaturedCard offer={offers[0]} inView={inView} />
          </div>

          {/* Stacked small cards — right 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {offers.slice(1).map((offer, i) => (
              <SmallCard key={offer.id} offer={offer} index={i + 1} inView={inView} />
            ))}
          </div>
        </div>

        {/* Fine print */}
        <p
          className="text-center mt-10"
          style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#52504E', letterSpacing: '0.05em' }}
        >
          * Terms apply. Valid for dine-in and online orders. Cannot be combined with other promotions.
        </p>

      </div>

      {/* Toast */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '50%',
          transform: toast.show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(80px)',
          background: 'linear-gradient(135deg, #A06A20, #C9913A)',
          color: '#0C0A09',
          padding: '12px 24px',
          borderRadius: '4px',
          ...J,
          fontWeight: 600,
          fontSize: '13px',
          zIndex: 1000,
          opacity: toast.show ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: 'none',
          boxShadow: '0 8px 32px rgba(201,145,58,0.3)',
        }}
      >
        ✓ {toast.message}
      </div>
    </section>
  );
}