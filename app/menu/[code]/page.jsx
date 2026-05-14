'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { menuData } from '@/data/menuData';
import Image from 'next/image';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, useGLTF, Html, Center } from '@react-three/drei';

// ─── Fonts ─────────────────────────────────────────────────────────────────────
// Add to layout.tsx <head>:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />

const C = { fontFamily: "'Cormorant Garamond', serif" };
const J = { fontFamily: "'Jost', sans-serif" };

// ─── 3D GLB Model ─────────────────────────────────────────────────────────────
function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function Model3DViewer({ modelPath }) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <p style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#9CA3AF' }}>
          3D model unavailable
        </p>
      </div>
    );
  }
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#C9913A" />
      <pointLight position={[0, 2, 3]} intensity={0.9} />
      <Suspense fallback={
        <Html center>
          <div style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9913A', letterSpacing: '0.15em' }}>
            Loading model...
          </div>
        </Html>
      }>
        <Model modelPath={modelPath} />
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        zoomSpeed={0.8}
        rotateSpeed={1.2}
        minDistance={1.5}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </Canvas>
  );
}

// ─── Pure CSS 3D tilt image on WHITE background ────────────────────────────────
function ImagePanel({ imageUrl, altText, onError, is3DModel, modelPath }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const ry = ((x - cx) / cx) * 10;
    const rx = ((y - cy) / cy) * -8;
    card.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.015,1.015,1.015)`;
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    setIsHovering(false);
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: '#FFFFFF', padding: '40px 32px 28px', position: 'relative' }}
    >
      {/* Subtle dot-grid texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #E8E0D8 1px, transparent 1px)',
        backgroundSize: '28px 28px', opacity: 0.5,
      }} />

      {/* Ambient gold glow behind card */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(201,145,58,0.08) 0%, transparent 70%)',
        filter: 'blur(30px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: '480px', zIndex: 1 }}>

        {/* Ground shadow */}
        <div style={{
          position: 'absolute', bottom: '-20px', left: '5%', right: '5%',
          height: '24px',
          background: 'radial-gradient(ellipse, rgba(30,26,22,0.18) 0%, transparent 70%)',
          filter: 'blur(16px)', borderRadius: '50%', zIndex: 0,
          transform: isHovering ? 'scaleX(1.06) translateY(4px)' : 'scaleX(1) translateY(0)',
          transition: 'transform 0.3s ease',
        }} />

        {/* Outer frame — border + padding creates space around image */}
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={onLeave}
          style={{
            position: 'relative',
            width: '100%',
            transformStyle: 'preserve-3d',
            cursor: 'crosshair',
            zIndex: 1,
            // Border on the frame, padding = breathing room between border & image
            border: '1px solid rgba(201,145,58,0.3)',
            padding: '10px',
            background: '#FFFFFF',
            boxShadow: isHovering
              ? '0 28px 56px rgba(30,26,22,0.12), 0 8px 20px rgba(30,26,22,0.08), 0 0 0 3px rgba(201,145,58,0.12)'
              : '0 16px 40px rgba(30,26,22,0.08), 0 4px 12px rgba(30,26,22,0.05)',
            transition: 'transform 0.18s cubic-bezier(0.2,0.9,0.4,1), box-shadow 0.35s ease',
          }}
        >
          {/* Top gold shimmer line on outer frame */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, #C9913A 30%, #F4C542 50%, #C9913A 70%, transparent 100%)', zIndex: 4, pointerEvents: 'none' }} />
          {/* Left gold accent line on outer frame */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #C9913A 0%, transparent 65%)', zIndex: 4, pointerEvents: 'none' }} />

          {/* Corner brackets sit on the outer frame corners */}
          {[
            { top: '-1px',    left: '-1px',    borderTop: '2px solid #C9913A', borderLeft: '2px solid #C9913A'    },
            { top: '-1px',    right: '-1px',   borderTop: '2px solid #C9913A', borderRight: '2px solid #C9913A'   },
            { bottom: '-1px', left: '-1px',    borderBottom: '2px solid #C9913A', borderLeft: '2px solid #C9913A' },
            { bottom: '-1px', right: '-1px',   borderBottom: '2px solid #C9913A', borderRight: '2px solid #C9913A'},
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: isHovering ? '24px' : '20px',
              height: isHovering ? '24px' : '20px',
              zIndex: 6, pointerEvents: 'none',
              transition: 'all 0.3s ease',
              ...s,
            }} />
          ))}

          {/* Inner image container — clipped, fills padded area */}
          <div style={{
            position: 'relative',
            width: '100%',
            // 3D model: fixed tall height so model shows completely with air around it
            // Image: keep natural aspect ratio
            ...(is3DModel ? { height: '480px' } : { aspectRatio: '4/3' }),
            overflow: 'hidden',
            outline: '1px solid rgba(201,145,58,0.1)',
          }}>
            {/* Image or 3D viewer */}
            {is3DModel ? (
              // Canvas fills the full inner container — fov + camera distance controls how much model is visible
              <div style={{ width: '100%', height: '100%', background: '#FAFAF9' }}>
                <Model3DViewer modelPath={modelPath} />
              </div>
            ) : (
              <>
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF9]">
                    <div style={{ width: '32px', height: '32px', border: '2px solid #C9913A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  </div>
                )}
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  className="object-cover"
                  onError={onError}
                  onLoad={() => setLoaded(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
                />
              </>
            )}

            {/* Mouse follow glow inside the image */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,145,58,0.09) 0%, transparent 55%)`,
              pointerEvents: 'none', zIndex: 3,
              opacity: isHovering ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }} />
          </div>
        </div>

        {/* Hint */}
        <p className="text-center mt-5" style={{
          ...J, fontWeight: 300, fontSize: '10px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(201,145,58,0.55)',
        }}>
          {is3DModel ? 'Drag to rotate · Scroll to zoom' : 'Move cursor to tilt'}
        </p>
      </div>
    </div>
  );
}

// ─── Error Boundary ────────────────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return (
      <div className="flex items-center justify-center h-full bg-white">
        <p style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#9CA3AF' }}>Failed to load 3D model</p>
      </div>
    );
    return this.props.children;
  }
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function MenuDetailPage() {
  const params = useParams();
  const id = params?.code;
  const [imageError, setImageError] = useState(false);
  const [inView, setInView] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    if (contentRef.current) obs.observe(contentRef.current);
    return () => obs.disconnect();
  }, []);

  // Find item
  let selectedItem = null;
  let categoryKey = null;
  for (const [key, category] of Object.entries(menuData)) {
    const found = category.items.find(item => item.id === id || item.code === id);
    if (found) { selectedItem = found; categoryKey = key; break; }
  }

  if (!selectedItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <div className="w-10 h-[2px] bg-[#C9913A] mx-auto mb-6" />
          <h2 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '2.2rem', color: '#1E1A16', marginBottom: '12px' }}>
            Item Not Found
          </h2>
          <p style={{ ...J, fontWeight: 300, fontSize: '13px', color: '#9CA3AF', marginBottom: '28px', lineHeight: 1.7 }}>
            The menu item you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-7 py-3 text-white"
            style={{ ...J, fontWeight: 500, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#1E1A16' }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 7H2M6 3l-4 4 4 4"/></svg>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = imageError || !selectedItem.image ? '/ourMenu/placeholder.jpg' : selectedItem.image;
  const has3DModel = selectedItem.is3DModel === true;
  const modelPath = selectedItem.modelPath || '/menupage/burger/burger.glb';

  const sizes = [
    selectedItem.price  && { label: 'Regular', value: selectedItem.price  },
    selectedItem.large  && { label: 'Large',   value: selectedItem.large  },
    selectedItem.family && { label: 'Family',  value: selectedItem.family },
  ].filter(Boolean);

  return (
    <div style={{ background: '#F7F5F2', minHeight: '100vh' }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>

      {/* ── Breadcrumb nav ──────────────────────────────────────────────────── */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #F0EBE4' }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group"
            style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8AFA6' }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="#C9913A" strokeWidth="1.7" strokeLinecap="round"
              className="group-hover:-translate-x-1 transition-transform duration-200">
              <path d="M12 7H2M6 3l-4 4 4 4"/>
            </svg>
            <span className="group-hover:text-[#C9913A] transition-colors duration-200">Menu</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <span style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9B8A4', letterSpacing: '0.08em' }}>{categoryKey}</span>
            <span style={{ color: '#E5DED5', fontSize: '10px' }}>›</span>
            <span style={{ ...J, fontWeight: 400, fontSize: '11px', color: '#8A8078', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedItem.name}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main card ───────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16" ref={contentRef}>
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 2px 40px rgba(30,26,22,0.07), 0 1px 6px rgba(30,26,22,0.04)',
            border: '1px solid #EDE8E2',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >

          {/* ── LEFT: Full image on pure white ──────────────────────────────── */}
          <div style={{ position: 'relative', minHeight: '460px' }}>
            {selectedItem.popular && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5"
                style={{ background: 'linear-gradient(135deg, #A06A20, #C9913A)', animation: 'floatBadge 3s ease-in-out infinite' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#0C0A09" stroke="none">
                  <path d="M5 1l.9 2.6H8.5L6.3 5.1l.8 2.6L5 6.2 2.9 7.7l.8-2.6L1.5 3.6H4.1z"/>
                </svg>
                <span style={{ ...J, fontWeight: 600, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#0C0A09' }}>
                  Most Popular
                </span>
              </div>
            )}

            <ErrorBoundary>
              <ImagePanel
                imageUrl={imageUrl}
                altText={selectedItem.name}
                onError={() => setImageError(true)}
                is3DModel={has3DModel}
                modelPath={modelPath}
              />
            </ErrorBoundary>
          </div>

          {/* ── RIGHT: Details ───────────────────────────────────────────────── */}
          <div className="flex flex-col" style={{ borderLeft: '1px solid #F0EBE4' }}>

            {/* Header block */}
            <div className="px-8 pt-8 pb-6">
              {/* Category + gold rule */}
              <div className="flex items-center gap-2.5 mb-5">
                <div style={{ width: '24px', height: '1.5px', background: '#C9913A' }} />
                <span style={{ ...J, fontWeight: 400, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9913A' }}>
                  {categoryKey}
                </span>
              </div>

              {/* Name */}
              <h1 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)', color: '#1E1A16', lineHeight: 1.15, marginBottom: '14px' }}>
                {selectedItem.name}
              </h1>

              {/* Description */}
              <p style={{ ...J, fontWeight: 300, fontSize: '13.5px', color: '#9CA3AF', lineHeight: 1.85, marginBottom: '0' }}>
                {selectedItem.description}
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'linear-gradient(90deg, #C9913A20, #C9913A40, #C9913A20)', margin: '0 32px' }} />

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="px-8 py-6">
                <p style={{ ...J, fontWeight: 400, fontSize: '9.5px', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#C9B8A4', marginBottom: '12px' }}>
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(i)}
                      className="flex flex-col items-start px-5 py-3 transition-all duration-200"
                      style={{
                        border: `1px solid ${selectedSize === i ? '#C9913A' : '#E8E0D8'}`,
                        background: selectedSize === i ? 'rgba(201,145,58,0.05)' : '#FAFAF9',
                        minWidth: '86px',
                      }}
                    >
                      <span style={{ ...J, fontWeight: 300, fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: selectedSize === i ? '#C9913A' : '#B8AFA6' }}>
                        {s.label}
                      </span>
                      <span style={{ ...C, fontWeight: 700, fontSize: '1.1rem', color: selectedSize === i ? '#C9913A' : '#1E1A16', lineHeight: 1.2, marginTop: '2px' }}>
                        {s.value}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price display */}
            <div className="px-8 pb-0 flex items-baseline gap-3">
              <span style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '2.6rem', color: '#C9913A', lineHeight: 1 }}>
                {sizes[selectedSize]?.value || selectedItem.price}
              </span>
              <span style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9B8A4', letterSpacing: '0.1em' }}>
                {sizes[selectedSize]?.label || ''}
              </span>
            </div>

            {/* Highlights */}
            <div className="px-8 py-6">
              <div className="grid grid-cols-3 gap-px" style={{ background: '#F0EBE4' }}>
                {[
                  {
                    label: 'Fresh Daily',
                    icon: <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round"><path d="M8 2C8 2 3 5 3 9a5 5 0 0010 0c0-4-5-7-5-7z"/><path d="M8 9v4"/></svg>
                  },
                  {
                    label: 'Chef Special',
                    icon: <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round"><path d="M8 2l1.5 3.5L13 6l-2.5 2.5.6 3.5L8 10.3 4.9 12l.6-3.5L3 6l3.5-.5z"/></svg>
                  },
                  {
                    label: 'Dine-in Ready',
                    icon: <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round"><path d="M3 7c0-3 2-5 5-5s5 2 5 5"/><path d="M1 7h14"/><path d="M8 7v6"/><path d="M5 13h6"/></svg>
                  },
                ].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 py-3.5" style={{ background: '#FFFFFF' }}>
                    {h.icon}
                    <span style={{ ...J, fontWeight: 300, fontSize: '9.5px', letterSpacing: '0.1em', color: '#B8AFA6', textAlign: 'center', textTransform: 'uppercase' }}>
                      {h.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="px-8 pb-6 mt-auto flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { window.location.href = 'tel:03151966852'; }}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
                style={{ ...J, fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#1E1A16' }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M2 2h3l1.5 3.5-2 1.5a9 9 0 004 4l1.5-2L13.5 11v2a1 1 0 01-1 1C6.5 14 0 7.5 0 1.5A1 1 0 011 .5h1z"/>
                </svg>
                Call to Order
              </button>
              <Link
                href="/reservations"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 border transition-all duration-300 group hover:bg-[#C9913A] hover:border-[#C9913A] hover:text-white active:scale-[0.98]"
                style={{ ...J, fontWeight: 500, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9913A', borderColor: '#C9913A' }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <rect x="1" y="2" width="12" height="11" rx="1"/>
                  <path d="M1 6h12M4 2V1M10 2V1"/>
                </svg>
                Book a Table
              </Link>
            </div>

            {/* Phone strip */}
            <div style={{ borderTop: '1px solid #F0EBE4', padding: '12px 32px' }} className="flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
                <circle cx="6" cy="6" r="5"/><path d="M6 4v2l1.5 1.5"/>
              </svg>
              <p style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9B8A4' }}>
                Prefer to call?{' '}
                <a href="tel:03151966852" style={{ color: '#1E1A16', fontWeight: 500 }}
                  className="hover:text-[#C9913A] transition-colors duration-200">
                  0315-1966852
                </a>
              </p>
            </div>

          </div>
        </div>

        {/* ── You May Also Like ───────────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: '32px', height: '1.5px', background: '#C9913A' }} />
            <span style={{ ...J, fontWeight: 400, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9913A' }}>
              You May Also Like
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: '#E8E0D8' }}>
            {Object.values(menuData)
              .flatMap(cat => cat.items)
              .filter(item => item.id !== id && item.code !== id)
              .slice(0, 4)
              .map((item, i) => (
                <Link
                  key={item.id}
                  href={`/menu/${item.code || item.id}`}
                  className="group block bg-white hover:bg-[#1E1A16] transition-colors duration-300"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(14px)',
                    transition: `opacity 0.55s ease ${i * 90}ms, transform 0.55s ease ${i * 90}ms, background-color 0.3s ease`,
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-[#F7F5F2]" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={item.image || '/ourMenu/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300" />
                    {/* top line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9913A] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                  </div>

                  {/* Text */}
                  <div className="p-4">
                    <h4 className="line-clamp-1 group-hover:text-white transition-colors duration-300"
                      style={{ ...C, fontWeight: 600, fontStyle: 'italic', fontSize: '1rem', color: '#1E1A16' }}>
                      {item.name}
                    </h4>
                    <p className="mt-1" style={{ ...J, fontWeight: 500, fontSize: '12px', color: '#C9913A' }}>
                      {item.price}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}