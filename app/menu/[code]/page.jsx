'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { menuData } from '@/data/menuData';
import Image from 'next/image';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, useGLTF, Html, Center, Bounds } from '@react-three/drei';

// ─── Fonts ─────────────────────────────────────────────────────────────────────
const C = { fontFamily: "'Cormorant Garamond', serif" };
const J = { fontFamily: "'Jost', sans-serif" };

// ─── Icon components ──────────────────────────────────────────────────────────
const Pizza = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
const Beef = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M4 6h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/></svg>;
const Sandwich = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M5 6v10a2 2 0 002 2h10a2 2 0 002-2V6"/></svg>;
const Flame = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c0 4-4 6-4 10 0 4 4 6 4 6s4-2 4-6c0-4-4-6-4-10z"/><path d="M12 18v4"/></svg>;
const Crown = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4l3 12h14l3-12-5 2-5-2-5 2-5-2z"/><path d="M5 16v4h14v-4"/></svg>;
const Utensils = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 2v6a3 3 0 006 0V2M7 2v8a3 3 0 006 0V2M3 14h3M3 18h3M12 14h3M12 18h3"/></svg>;
const Soup = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11h16a4 4 0 01-4 4H8a4 4 0 01-4-4z"/><path d="M8 4v4M12 4v4M16 4v4"/></svg>;
const Fish = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4c-4 0-8 3-8 7s4 7 8 7 8-3 8-7-4-7-8-7z"/><path d="M12 11l2 2"/></svg>;
const Salad = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l2-2 2 2-2 2-2-2zM8 4v6M3 8h10M6 11v3M14 8v10a2 2 0 01-2 2H8a2 2 0 01-2-2V11"/></svg>;

// ─── newMenuData (for related items) ──────────────────────────────────────────
const newMenuData = {
  pizzas: {
    label: 'Pizzas',
    icon: Pizza,
    items: [
      { id: 'dream-special-pizza', code: "p1", name: 'Dream Special Pizza', description: 'Signature premium pizza with special sauce', price: 'Rs. 750', large: 'Rs. 1,599', family: 'Rs. 2,299', popular: true, image: '/ourMenu/pizza/sp1.jpg' },
      { id: 'chicken-tikka-pizza', code: "p2", name: 'Chicken Tikka Pizza', description: 'Spicy chicken tikka with cheese', price: 'Rs. 650', large: 'Rs. 1,499', family: 'Rs. 1,899', image: '/ourMenu/pizza/sp5.jpg' },
      { id: 'fajita-pizza', code: "p3", name: 'Fajita Pizza', description: 'Grilled fajita chicken with bell peppers', price: 'Rs. 650', large: 'Rs. 1,499', family: 'Rs. 1,899', image: '/ourMenu/pizza/sp2.jpg' },
      { id: 'crown-crust-pizza', code: "p4", name: 'Crown Crust Pizza', description: 'Premium pizza with crown crust', price: 'Rs. 699', large: 'Rs. 1,550', family: 'Rs. 1,999', image: '/ourMenu/pizza/sp6.jpg' },
      { id: 'kabab-crust-pizza', code: "p5", name: 'Kabab Crust Pizza', description: 'Pizza with kabab crust edge', price: 'Rs. 600', large: 'Rs. 1,499', family: 'Rs. 1,999', image: '/ourMenu/pizza/sp3.jpg' },
      { id: 'pepperoni-pizza', code: "p6", name: 'Pepperoni Pizza', description: 'Classic pepperoni with cheese', price: 'Rs. 500', large: 'Rs. 1,399', family: 'Rs. 1,799', image: '/ourMenu/pizza/sp7.jpg' },
      { id: 'cheese-lover-pizza', code: "p7", name: 'Cheese Lover Pizza', description: 'Triple cheese blend', price: 'Rs. 500', large: 'Rs. 1,399', family: 'Rs. 1,799', image: '/ourMenu/pizza/sp4.jpg' },
      { id: 'four-season-pizza', code: "p8", name: 'Four Season Pizza', description: 'Four different toppings', price: 'Rs. 749', large: 'Rs. 1,599', family: 'Rs. 2,199', image: '/ourMenu/pizza/sp8.jpg' },
    ]
  },
  burgers: {
    label: 'Burgers',
    icon: Beef,
    items: [
      { id: 'dream-special-burger', code: "b1", name: 'Dream Special Burger', description: 'Signature premium beef burger', price: 'Rs. 599', popular: true, image: '/ourMenu/burger/sb1.jpg' },
      { id: 'zinger-burger', code: "b2", name: 'Zinger Burger', description: 'Crispy fried chicken burger', price: 'Rs. 449', image: '/ourMenu/burger/sb2.jpg' },
      { id: 'cheese-mushroom-burger', code: "b3", name: 'Cheese Mushroom Burger', description: 'Juicy beef with mushrooms & cheese', price: 'Rs. 499', image: '/ourMenu/burger/sb3.jpg' },
      { id: 'roast-beef-burger', code: "b4", name: 'Roast Beef Burger', description: 'Tender roast beef patty', price: 'Rs. 599', image: '/ourMenu/burger/sb4.jpg' },
      { id: 'smoked-chicken-burger', code: "b5", name: 'Smoked Chicken Burger', description: 'Smoked chicken breast', price: 'Rs. 499', image: '/ourMenu/burger/sb5.jpg' },
    ]
  },
  sandwiches: {
    label: 'Sandwiches',
    icon: Sandwich,
    items: [
      { id: 'special-club-sandwich', code: "s1", name: 'Special Club Sandwich', description: 'Triple layer club sandwich', price: 'Rs. 599', image: '/ourMenu/sandwich/ss1.jpg' },
      { id: 'crispy-chicken-sandwich', code: "s2", name: 'Crispy Chicken Sandwich', description: 'Crunchy fried chicken sandwich', price: 'Rs. 449', image: '/ourMenu/sandwich/ss2.jpg' },
      { id: 'roast-beef-panini', code: "s3", name: 'Roast Beef Panini', description: 'Grilled panini with roast beef', price: 'Rs. 599', image: '/ourMenu/sandwich/ss3.jpg' },
      { id: 'grill-chicken-sandwich', code: "s4", name: 'Grill Chicken Sandwich', description: 'Grilled chicken breast sandwich', price: 'Rs. 449', image: '/ourMenu/sandwich/ss4.jpg' },
      { id: 'smoked-chicken-panini', code: "s5", name: 'Smoked Chicken Panini', description: 'Smoked chicken in pressed panini', price: 'Rs. 499', image: '/ourMenu/sandwich/ss5.jpg' },
    ]
  },
  steaks: {
    label: 'Steaks',
    icon: Flame,
    items: [
      { id: 'dream-special-steak', code: "st1", name: 'Dream Special Steak', description: 'Premium steak with mushroom sauce', price: 'Rs. 1,299', large: 'Rs. 1,899', image: '/ourMenu/steak/st1.jpg' },
      { id: 'american-steak', code: "st2", name: 'American Steak', description: 'Classic American style steak', price: 'Rs. 1,199', large: 'Rs. 1,799', image: '/ourMenu/steak/st2.jpg' },
      { id: 'mushroom-steak', code: "st3", name: 'Mushroom Steak', description: 'Steak with creamy mushroom sauce', price: 'Rs. 1,199', large: 'Rs. 1,799', image: '/ourMenu/steak/st3.jpg' },
      { id: 'jalapeno-steak', code: "st4", name: 'Jalapeno Steak', description: 'Spicy jalapeno infused steak', price: 'Rs. 1,199', large: 'Rs. 1,799', image: '/ourMenu/steak/st4.jpg' },
      { id: 'mexican-steak', code: "st5", name: 'Mexican Steak', description: 'Mexican spiced steak', price: 'Rs. 1,199', large: 'Rs. 1,799', image: '/ourMenu/steak/st5.jpg' },
    ]
  },
  chicken: {
    label: 'Chicken',
    icon: Crown,
    items: [
      { id: 'dream-special-chicken', code: "c1", name: 'Dream Special Chicken', description: 'Signature chicken dish', price: 'Rs. 1,199', image: '/ourMenu/chicken/sc1.jpg' },
      { id: 'moroccan-chicken', code: "c2", name: 'Moroccan Chicken', description: 'Moroccan spiced chicken', price: 'Rs. 899', image: '/ourMenu/chicken/sc2.jpg' },
      { id: 'parmesan-chicken', code: "c3", name: 'Parmesan Chicken', description: 'Chicken breast with parmesan crust', price: 'Rs. 666', image: '/ourMenu/chicken/sc3.jpg' },
      { id: 'tarragon-chicken', code: "c4", name: 'Tarragon Chicken', description: 'Chicken with tarragon sauce', price: 'Rs. 668', image: '/ourMenu/chicken/sc4.jpg' },
    ]
  },
  pasta: {
    label: 'Pasta',
    icon: Utensils,
    items: [
      { id: 'alfredo-pasta', code: "pa1", name: 'Alfredo Pasta', description: 'Creamy alfredo sauce with chicken', price: 'Rs. 699', image: '/ourMenu/pasta/sp1.jpg' },
      { id: 'dream-special-pasta', code: "pa2", name: 'Dream Special Pasta', description: 'Signature pasta blend', price: 'Rs. 999', image: '/ourMenu/pasta/sp2.jpg' },
      { id: 'oven-baked-pasta', code: "pa3", name: 'Oven Baked Pasta', description: 'Baked pasta with cheese', price: 'Rs. 799', image: '/ourMenu/pasta/sp3.jpg' },
      { id: 'chicken-lasagna', code: "pa4", name: 'Chicken Lasagna', description: 'Layered lasagna with chicken', price: 'Rs. 799', image: '/ourMenu/pasta/sp4.jpg' },
    ]
  },
  appetizers: {
    label: 'Appetizers',
    icon: Soup,
    items: [
      { id: 'hot-wings', code: "a1", name: 'Hot Wings', description: 'Spicy chicken wings', price: 'Rs. 599', image: '/ourMenu/appar/ap1.jpg' },
      { id: 'bbq-wings', code: "a2", name: 'B.B.Q Wings', description: 'Barbecue glazed wings', price: 'Rs. 599', image: '/ourMenu/appar/ap2.jpg' },
      { id: 'honey-wings', code: "a3", name: 'Honey Wings', description: 'Sweet honey glazed wings', price: 'Rs. 599', image: '/ourMenu/appar/ap3.jpg' },
      { id: 'zinger-wings', code: "a4", name: 'Zinger Wings', description: 'Crispy zinger style wings', price: 'Rs. 599', image: '/ourMenu/appar/ap4.jpg' },
      { id: 'garlic-mayo-fries', code: "a5", name: 'Garlic Mayo Fries', description: 'Fries with garlic mayo', price: 'Rs. 399', image: '/ourMenu/appar/ap5.jpg' },
    ]
  },
  chinese: {
    label: 'Chinese',
    icon: Fish,
    items: [
      { id: 'chicken-manchurian', code: "ch1", name: 'Chicken Manchurian', description: 'Chicken balls in manchurian sauce', price: 'Rs. 849', image: '/ourMenu/chines/ch1.jpg' },
      { id: 'chicken-chili-dry', code: "ch2", name: 'Chicken Chili Dry', description: 'Dry chili chicken', price: 'Rs. 1,199', image: '/ourMenu/chines/ch2.jpg' },
      { id: 'beef-chili-dry', code: "ch3", name: 'Beef Chili Dry', description: 'Dry chili beef', price: 'Rs. 899', image: '/ourMenu/chines/ch3.jpg' },
      { id: 'vegetable-fried-rice', code: "ch4", name: 'Vegetable Fried Rice', description: 'Classic veg fried rice', price: 'Rs. 349', image: '/ourMenu/chines/ch4.jpg' },
      { id: 'masala-rice', code: "ch5", name: 'Masala Rice', description: 'Spiced masala rice', price: 'Rs. 349', image: '/ourMenu/chines/ch4.jpg' },
    ]
  },
  soups: {
    label: 'Soups',
    icon: Salad,
    items: [
      { id: 'hot-sour-soup', code: "so1", name: 'Hot & Sour Soup', description: 'Spicy and tangy soup', price: 'Rs. 199', large: 'Rs. 799', image: '/ourMenu/soup/s1.jpg' },
      { id: 'chicken-corn-soup', code: "so2", name: 'Chicken Corn Soup', description: 'Sweet corn with chicken', price: 'Rs. 199', large: 'Rs. 799', image: '/ourMenu/soup/s2.jpg' },
      { id: 'dream-special-salad', code: "so3", name: 'Dream Special Salad', description: 'Signature house salad', price: 'Rs. 450', image: '/ourMenu/soup/s3.jpg' },
    ]
  },
  wraps: {
    label: 'Wraps',
    icon: Sandwich,
    items: [
      { id: 'bbq-chicken-wrap', code: "w1", name: 'B.B.Q Chicken Wrap', description: 'BBQ chicken in tortilla', price: 'Rs. 349', image: '/ourMenu/wrap/w1.jpg' },
      { id: 'grill-chicken-wrap', code: "w2", name: 'Grill Chicken Wrap', description: 'Grilled chicken wrap', price: 'Rs. 349', image: '/ourMenu/wrap/w2.jpg' },
      { id: 'zinger-chicken-wrap', code: "w3", name: 'Zinger Chicken Wrap', description: 'Crispy zinger wrap', price: 'Rs. 349', image: '/ourMenu/wrap/w3.jpg' },
      { id: 'chicken-shawarma', code: "w4", name: 'Chicken Shawarma', description: 'Classic chicken shawarma', price: 'Rs. 200', image: '/ourMenu/wrap/w4.jpg' },
    ]
  }
};

// ─── 3D Model — auto-fits ANY size model into view ────────────────────────────
function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return (
    <Bounds fit clip observe margin={1.1}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
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
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-3, 2, 4]} intensity={0.6} color="#C9913A" />
      <pointLight position={[0, 3, 3]} intensity={0.8} />
      <pointLight position={[0, -2, -2]} intensity={0.3} />

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
        minDistance={0.5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Canvas>
  );
}

// ─── CSS 3D tilt image on pure white ──────────────────────────────────────────
function ImagePanel({ imageUrl, altText, onError, is3DModel, modelPath }) {
  const cardRef = useRef(null);
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
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
    setIsHovering(false);
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: '#FFFFFF', padding: '36px 28px 24px', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #E8E0D8 1px, transparent 1px)',
        backgroundSize: '28px 28px', opacity: 0.45,
      }} />

      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%', height: '55%',
        background: 'radial-gradient(ellipse, rgba(201,145,58,0.07) 0%, transparent 70%)',
        filter: 'blur(32px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: '460px', zIndex: 1 }}>
        <div style={{
          position: 'absolute', bottom: '-18px', left: '5%', right: '5%',
          height: '22px',
          background: 'radial-gradient(ellipse, rgba(30,26,22,0.15) 0%, transparent 70%)',
          filter: 'blur(14px)', borderRadius: '50%', zIndex: 0,
          transform: isHovering ? 'scaleX(1.06) translateY(4px)' : 'scaleX(1) translateY(0)',
          transition: 'transform 0.3s ease',
        }} />

        <div
          ref={cardRef}
          onMouseMove={!is3DModel ? onMove : undefined}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={onLeave}
          style={{
            position: 'relative',
            width: '100%',
            transformStyle: 'preserve-3d',
            cursor: is3DModel ? 'grab' : 'crosshair',
            zIndex: 1,
            border: '1px solid rgba(201,145,58,0.28)',
            padding: '10px',
            background: '#FFFFFF',
            boxShadow: isHovering
              ? '0 24px 52px rgba(30,26,22,0.12), 0 6px 18px rgba(30,26,22,0.07), 0 0 0 3px rgba(201,145,58,0.1)'
              : '0 14px 38px rgba(30,26,22,0.08), 0 3px 10px rgba(30,26,22,0.05)',
            transition: 'transform 0.18s cubic-bezier(0.2,0.9,0.4,1), box-shadow 0.35s ease',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9913A 30%, #F4C542 50%, #C9913A 70%, transparent)', zIndex: 4, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, #C9913A 0%, transparent 65%)', zIndex: 4, pointerEvents: 'none' }} />

          {[
            { top: '-1px',    left: '-1px',    borderTop: '2px solid #C9913A', borderLeft: '2px solid #C9913A'    },
            { top: '-1px',    right: '-1px',   borderTop: '2px solid #C9913A', borderRight: '2px solid #C9913A'   },
            { bottom: '-1px', left: '-1px',    borderBottom: '2px solid #C9913A', borderLeft: '2px solid #C9913A' },
            { bottom: '-1px', right: '-1px',   borderBottom: '2px solid #C9913A', borderRight: '2px solid #C9913A'},
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: isHovering ? '24px' : '18px',
              height: isHovering ? '24px' : '18px',
              zIndex: 6, pointerEvents: 'none',
              transition: 'all 0.3s ease',
              ...s,
            }} />
          ))}

          <div style={{
            position: 'relative',
            width: '100%',
            ...(is3DModel ? { height: '420px' } : { aspectRatio: '4/3' }),
            overflow: 'hidden',
            outline: '1px solid rgba(201,145,58,0.08)',
            background: '#FAFAF9',
          }}>
            {is3DModel ? (
              <Model3DViewer modelPath={modelPath} />
            ) : (
              <>
                {!loaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#FAFAF9]">
                    <div style={{ width: '30px', height: '30px', border: '2px solid #C9913A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
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

            {!is3DModel && (
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,145,58,0.08) 0%, transparent 55%)`,
                pointerEvents: 'none', zIndex: 3,
                opacity: isHovering ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }} />
            )}
          </div>
        </div>

        <p className="text-center mt-4" style={{
          ...J, fontWeight: 300, fontSize: '10px', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(201,145,58,0.5)',
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

// ─── Related items — using newMenuData ────────────────────────────────────────
function getRelatedItems(newMenuData, currentId, currentCode, currentCategoryKey) {
  const allItems = [];

  // Same category first (excluding current)
  if (newMenuData[currentCategoryKey]) {
    newMenuData[currentCategoryKey].items
      .filter(item => item.id !== currentId && item.code !== currentCode)
      .forEach(item => allItems.push({ ...item, categoryKey: currentCategoryKey }));
  }

  // Other categories next
  Object.entries(newMenuData).forEach(([key, cat]) => {
    if (key === currentCategoryKey) return;
    cat.items.forEach(item => allItems.push({ ...item, categoryKey: key }));
  });

  return allItems.slice(0, 4);
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

  useEffect(() => { setSelectedSize(0); setImageError(false); }, [id]);

  // Find item from menuData (imported)
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
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M12 7H2M6 3l-4 4 4 4"/>
            </svg>
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

  // FIXED: Using newMenuData for related items
  const relatedItems = getRelatedItems(newMenuData, selectedItem.id, selectedItem.code, categoryKey);

  return (
    <div style={{ background: '#F7F5F2', minHeight: '100vh' }}>
      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>

      {/* Breadcrumb */}
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
            <span style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9B8A4', letterSpacing: '0.08em', textTransform: 'capitalize' }}>
              {categoryKey}
            </span>
            <span style={{ color: '#E5DED5', fontSize: '10px' }}>›</span>
            <span style={{ ...J, fontWeight: 400, fontSize: '11px', color: '#8A8078', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedItem.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main card */}
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
          {/* LEFT */}
          <div style={{ position: 'relative', minHeight: '460px' }}>
            {selectedItem.popular && (
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5"
                style={{ background: 'linear-gradient(135deg, #A06A20, #C9913A)', animation: 'floatBadge 3s ease-in-out infinite' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="#0C0A09">
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

          {/* RIGHT */}
          <div className="flex flex-col" style={{ borderLeft: '1px solid #F0EBE4' }}>
            <div className="px-8 pt-8 pb-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div style={{ width: '24px', height: '1.5px', background: '#C9913A' }} />
                <span style={{ ...J, fontWeight: 400, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9913A' }}>
                  {categoryKey}
                </span>
              </div>
              <h1 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)', color: '#1E1A16', lineHeight: 1.15, marginBottom: '14px' }}>
                {selectedItem.name}
              </h1>
              <p style={{ ...J, fontWeight: 300, fontSize: '13.5px', color: '#9CA3AF', lineHeight: 1.85 }}>
                {selectedItem.description}
              </p>
            </div>

            <div style={{ height: '1px', background: 'linear-gradient(90deg, #C9913A20, #C9913A40, #C9913A20)', margin: '0 32px' }} />

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

            <div className="px-8 pb-0 flex items-baseline gap-3">
              <span style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '2.6rem', color: '#C9913A', lineHeight: 1 }}>
                {sizes[selectedSize]?.value || selectedItem.price}
              </span>
              <span style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9B8A4', letterSpacing: '0.1em' }}>
                {sizes[selectedSize]?.label || ''}
              </span>
            </div>

            <div className="px-8 py-6">
              <div className="grid grid-cols-3 gap-px" style={{ background: '#F0EBE4' }}>
                {[
                  { label: 'Fresh Daily', icon: <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#C9913A" strokeWidth="1.3"><path d="M8 2C8 2 3 5 3 9a5 5 0 0010 0c0-4-5-7-5-7z"/><path d="M8 9v4"/></svg> },
                  { label: 'Chef Special', icon: <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#C9913A" strokeWidth="1.3"><path d="M8 2l1.5 3.5L13 6l-2.5 2.5.6 3.5L8 10.3 4.9 12l.6-3.5L3 6l3.5-.5z"/></svg> },
                  { label: 'Dine-in Ready', icon: <svg width="17" height="17" viewBox="0 0 16 16" fill="none" stroke="#C9913A" strokeWidth="1.3"><path d="M3 7c0-3 2-5 5-5s5 2 5 5"/><path d="M1 7h14"/><path d="M8 7v6"/><path d="M5 13h6"/></svg> },
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

            <div className="px-8 pb-6 mt-auto flex flex-col sm:flex-row gap-3">
              <button
                 onClick={() => window.open(`https://wa.me/923151966852`, '_blank')}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 text-white hover:opacity-90 active:scale-[0.98] transition-all duration-300"
                style={{ ...J, fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#1E1A16' }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 2h3l1.5 3.5-2 1.5a9 9 0 004 4l1.5-2L13.5 11v2a1 1 0 01-1 1C6.5 14 0 7.5 0 1.5A1 1 0 011 .5h1z"/>
                </svg>
                Call to Order
              </button>
              <Link
                // href="/reservations"
                href="#"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 border hover:bg-[#C9913A] hover:border-[#C9913A] hover:text-white active:scale-[0.98] transition-all duration-300"
                style={{ ...J, fontWeight: 500, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9913A', borderColor: '#C9913A' }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="1" y="2" width="12" height="11" rx="1"/>
                  <path d="M1 6h12M4 2V1M10 2V1"/>
                </svg>
                Book a Table
              </Link>
            </div>

            <div style={{ borderTop: '1px solid #F0EBE4', padding: '12px 32px' }} className="flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#C9913A" strokeWidth="1.3">
                <circle cx="6" cy="6" r="5"/><path d="M6 4v2l1.5 1.5"/>
              </svg>
              <p style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#C9B8A4' }}>
                Prefer to call?{' '}
                <a href="tel:923151966852" style={{ color: '#1E1A16', fontWeight: 500 }}
                  className="hover:text-[#C9913A] transition-colors duration-200">
                  +923151966852
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* ── You May Also Like - FIXED: using newMenuData ──────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: '32px', height: '1.5px', background: '#C9913A' }} />
            <span style={{ ...J, fontWeight: 400, fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9913A' }}>
              You May Also Like
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedItems.map((item, i) => (
              <Link
                key={`${item.id}-${i}`}
                href={`/menu/${item.code || item.id}`}
                className="group block bg-white hover:bg-[#1E1A16] transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(14px)',
                  transition: `opacity 0.55s ease ${i * 90}ms, transform 0.55s ease ${i * 90}ms`,
                }}
              >
                <div className="relative w-full bg-[#F7F5F2]" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={item.image || '/ourMenu/placeholder.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    onError={(e) => { e.currentTarget.src = '/ourMenu/placeholder.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9913A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>

                <div className="p-4 min-h-[85px] flex flex-col justify-between">
                  <h4 className="line-clamp-2 group-hover:text-white transition-colors duration-300 text-center"
                    style={{ ...C, fontWeight: 600, fontStyle: 'italic', fontSize: '0.95rem', color: '#1E1A16', lineHeight: 1.4 }}>
                    {item.name}
                  </h4>
                  <p className="mt-2 text-center group-hover:text-[#C9913A] transition-colors duration-300" 
                     style={{ ...J, fontWeight: 500, fontSize: '12px', color: '#C9913A' }}>
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