'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Add to layout.tsx <head>:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />

const C = { fontFamily: "'Cormorant Garamond', serif" };
const J = { fontFamily: "'Jost', sans-serif" };

// ─── MENU DATA ─────────────────────────────────────────────────────────────────────
const sandwiches = [
  { id: 1, name: "Special-Club-Sandwich", displayName: "Special Club Sandwich", price: 599, description: "Triple-layer sandwich with grilled chicken, crispy bacon, fresh lettuce, tomato, and mayo served with fries", image: "/menupage/sandwich/s5.jpg" },
  { id: 2, name: "Crispy-Chicken-Sandwich", displayName: "Crispy Chicken Sandwich", price: 449, description: "Golden fried chicken breast with lettuce, pickles, and signature sauce on a toasted bun", image: "/menupage/sandwich/s2.jpg" },
  { id: 3, name: "Roast-Beef-Panini", displayName: "Roast Beef Panini", price: 499, description: "Slow-roasted beef with caramelized onions, melted provolone cheese, and horseradish sauce", image: "/menupage/sandwich/s6.jpg" },
  { id: 4, name: "Grill-Chicken-Sandwich", displayName: "Grill Chicken Sandwich", price: 449, description: "Grilled chicken breast with avocado, lettuce, tomato, and garlic aioli on multigrain bread", image: "/menupage/sandwich/s4.jpg" },
  { id: 5, name: "Smoked-Chicken-Panini", displayName: "Smoked Chicken Panini", price: 499, description: "Smoked chicken with sun-dried tomatoes, fresh mozzarella, and pesto sauce pressed to perfection", image: "/menupage/sandwich/s1.jpg" },
  { id: 6, name: "Coffee-Club", displayName: "Coffee Club", price: 499, description: "Classic club sandwich with turkey, ham, bacon, lettuce, tomato, and cheese served with coffee", image: "/menupage/sandwich/s3.jpg" },
];

const soups = [
  { id: 1, name: "Hot-Sour-Soup", displayName: "Hot & Sour Soup", small: 199, large: 799, description: "Spicy and tangy Chinese soup with tofu, mushrooms, bamboo shoots, and eggs", image: "/menupage/soup/s1.jpg" },
  { id: 2, name: "Chicken-Corn-Soup", displayName: "Chicken Corn Soup", small: 199, large: 799, description: "Creamy soup with sweet corn, shredded chicken, and egg drops", image: "/menupage/soup/s2.jpg" },
  { id: 3, name: "Dream-Special-Soup", displayName: "Dream Special Soup", small: 199, large: 799, description: "Rich and creamy soup with mixed vegetables and herbs", image: "/menupage/soup/s3.jpg" },
];

const salads = [
  { id: 1, name: "Dream-Special-Salad", displayName: "Dream Special Salad", price: 450, description: "Mixed greens with grilled chicken, avocado, cherry tomatoes, cucumber, and house vinaigrette", image: "/menupage/salad/s1.jpg" },
  { id: 2, name: "Russian-Salad", displayName: "Russian Salad", price: 399, description: "Classic potato salad with peas, carrots, pickles, and mayonnaise", image: "/menupage/salad/s2.jpg" },
  { id: 3, name: "Caesar-Salad", displayName: "Caesar Salad", price: 399, description: "Crisp romaine lettuce with parmesan cheese, croutons, and creamy Caesar dressing", image: "/menupage/salad/s3.jpg" },
];

const pizzas = [
  { id: 1, name: "Dream-Special-Pizza", displayName: "Dream Special Pizza", small: 750, medium: 1199, large: 1599, family: 2299, description: "Signature pizza with pepperoni, mushrooms, bell peppers, olives, and extra cheese", image: "/menupage/pizza/p1.jpg" },
  { id: 2, name: "Chicken-Tikka-Pizza", displayName: "Chicken Tikka Pizza", small: 650, medium: 850, large: 1499, family: 1899, description: "Spicy chicken tikka, onions, capsicum, and mozzarella with tikka sauce", image: "/menupage/pizza/p2.jpg" },
  { id: 3, name: "Fajita-Pizza", displayName: "Fajita Pizza", small: 650, medium: 850, large: 1499, family: 1899, description: "Grilled chicken, bell peppers, onions, and fajita seasoning", image: "/menupage/pizza/p3.jpg" },
  { id: 4, name: "Crown-Crust-Pizza", displayName: "Crown Crust Pizza", small: 699, medium: 899, large: 1550, family: 1999, description: "Stuffed crust pizza with cheese-filled edges and your choice of toppings", image: "/menupage/pizza/p4.jpg" },
  { id: 5, name: "Kabab-Crust-Pizza", displayName: "Kabab Crust Pizza", small: 600, medium: 799, large: 1499, family: 1999, description: "Pizza topped with seasoned kabab pieces, onions, and special sauce", image: "/menupage/pizza/p5.jpg" },
  { id: 6, name: "Pepperoni-Pizza", displayName: "Pepperoni Pizza", small: 500, medium: 699, large: 1399, family: 1799, description: "Classic pepperoni with mozzarella cheese and tomato sauce", image: "/menupage/pizza/p6.jpg" },
  { id: 7, name: "Cheese-Lover-Pizza", displayName: "Cheese Lover Pizza", small: 500, medium: 699, large: 1399, family: 1799, description: "Four cheese blend with mozzarella, cheddar, parmesan, and cream cheese", image: "/menupage/pizza/p7.jpg" },
  { id: 8, name: "Four-Season-Pizza", displayName: "Four Season Pizza", small: 749, medium: 899, large: 1599, family: 2199, description: "Four sections with mushrooms, artichokes, ham, and olives", image: "/menupage/pizza/p8.jpg" },
];

const pastas = [
  { id: 1, name: "Alfredo-Pasta", displayName: "Alfredo Pasta", price: 699, description: "Creamy parmesan sauce with fettuccine pasta, garlic, and fresh parsley", image: "/menupage/pasta/p1.jpg" },
  { id: 2, name: "Dream-Special-Pasta", displayName: "Dream Special Pasta", price: 999, description: "Signature pasta with grilled chicken, mushrooms, bell peppers in creamy tomato sauce", image: "/menupage/pasta/p2.jpg" },
  { id: 3, name: "Oven-Baked-Pasta", displayName: "Oven Baked Pasta", price: 799, description: "Penne pasta baked with marinara sauce, mozzarella, and parmesan cheese", image: "/menupage/pasta/p3.jpg" },
  { id: 4, name: "Chicken-Lasagna", displayName: "Chicken Lasagna", price: 799, description: "Layered pasta with chicken, ricotta, mozzarella, and meat sauce", image: "/menupage/pasta/p4.jpg" },
];

const appetizers = [
  { id: 1, name: "Hot-Wings", displayName: "Hot Wings", price: 599, description: "Spicy chicken wings tossed in hot sauce served with ranch dressing", image: "/menupage/appar/p1.jpg" },
  { id: 2, name: "Garlic-Mayo-Fries", displayName: "Garlic Mayo Fries", price: 399, description: "Crispy french fries tossed in garlic butter and served with creamy mayo", image: "/menupage/appar/p2.jpg" },
  { id: 3, name: "BBQ-Wings", displayName: "BBQ Wings", price: 599, description: "Chicken wings glazed with sweet and smoky BBQ sauce", image: "/menupage/appar/p3.jpg" },
  { id: 4, name: "Honey-Wings", displayName: "Honey Wings", price: 599, description: "Crispy wings coated in sweet honey glaze with a hint of spice", image: "/menupage/appar/p4.jpg" },
  { id: 5, name: "Zinger-Wings", displayName: "Zinger Wings", price: 599, description: "Extra spicy crispy chicken wings with zinger seasoning", image: "/menupage/appar/p5.jpg" },
  { id: 6, name: "Regular-Fries", displayName: "Regular Fries", price: 249, description: "Classic golden crispy french fries with salt", image: "/menupage/appar/p6.jpg" },
  { id: 7, name: "Cheese-Loaded-Fries", displayName: "Cheese Loaded Fries", price: 444, description: "Fries topped with melted cheddar cheese sauce and bacon bits", image: "/menupage/appar/p7.jpg" },
  { id: 8, name: "Supreme-Nachos", displayName: "Supreme Nachos", price: 441, description: "Tortilla chips loaded with cheese, jalapenos, olives, and salsa", image: "/menupage/appar/p8.jpg" },
  { id: 9, name: "Chicken-Strips", displayName: "Chicken Strips", price: 444, description: "Golden fried chicken tenders served with honey mustard sauce", image: "/menupage/appar/p0.jpg" },
];

const chinese = [
  { id: 1, name: "Chicken-Manchurian", displayName: "Chicken Manchurian", price: 849, description: "Fried chicken balls in spicy, tangy manchurian sauce with bell peppers", image: "/menupage/chines/c1.jpg" },
  { id: 2, name: "Chicken-Chili-Dry", displayName: "Chicken Chili Dry", price: 1199, description: "Stir-fried chicken with chili sauce, bell peppers, and onions", image: "/menupage/chines/c2.jpg" },
  { id: 3, name: "Beef-Chili-Dry", displayName: "Beef Chili Dry", price: 899, description: "Tender beef strips stir-fried with chili, garlic, and mixed vegetables", image: "/menupage/chines/c3.jpg" },
  { id: 4, name: "Vegetable-Fried-Rice", displayName: "Vegetable Fried Rice", price: 349, description: "Wok-tossed rice with mixed vegetables, eggs, and soy sauce", image: "/menupage/chines/c4.jpg" },
  { id: 5, name: "Masala-Rice", displayName: "Masala Rice", price: 349, description: "Fragrant rice cooked with Indian spices, peas, and carrots", image: "/menupage/chines/c5.jpg" },
];

const burgers = [
  { id: 1, name: "Dream-Special-Burger", displayName: "Dream Special Burger", price: 599, description: "Double patty burger with cheese, lettuce, tomato, onion rings, and special sauce", image: "/menupage/burger/b1.jpg" },
  { id: 2, name: "Zinger-Burger", displayName: "Zinger Burger", price: 449, description: "Crispy spicy chicken fillet with lettuce and mayo", image: "/menupage/burger/b2.jpg" },
  { id: 3, name: "Cheese-Mushroom-Burger", displayName: "Cheese Mushroom Burger", price: 499, description: "Beef patty topped with sauteed mushrooms and melted Swiss cheese", image: "/menupage/burger/b3.jpg" },
  { id: 4, name: "Roast-Beef-Burger", displayName: "Roast Beef Burger", price: 599, description: "Slow-roasted beef with caramelized onions and BBQ sauce", image: "/menupage/burger/b4.jpg" },
  { id: 5, name: "Smoked-Chicken-Burger", displayName: "Smoked Chicken Burger", price: 499, description: "Smoked chicken patty with avocado, bacon, and chipotle sauce", image: "/menupage/burger/b5.jpg" },
];

const steaks = [
  { id: 1, name: "Dream-Special-Steak", displayName: "Dream Special Steak", small: 1299, large: 1899, description: "Premium cut steak with garlic mash, grilled vegetables, and red wine sauce", image: "/menupage/steak/s1.jpg" },
  { id: 2, name: "American-Steak", displayName: "American Steak", small: 1199, large: 1799, description: "Classic American-style steak with fries, coleslaw, and peppercorn sauce", image: "/menupage/steak/s2.jpg" },
  { id: 3, name: "Mushroom-Steak", displayName: "Mushroom Steak", small: 1199, large: 1799, description: "Juicy steak smothered in creamy mushroom sauce with mashed potatoes", image: "/menupage/steak/s3.jpg" },
  { id: 4, name: "Jalapeno-Steak", displayName: "Jalapeno Steak", small: 1199, large: 1799, description: "Spicy steak with jalapenos, pepper jack cheese, and chipotle sauce", image: "/menupage/steak/s4.jpg" },
  { id: 5, name: "Mexican-Steak", displayName: "Mexican Steak", small: 1199, large: 1799, description: "Steak topped with salsa, guacamole, sour cream, and cheddar cheese", image: "/menupage/steak/s5.jpg" },
];

const wraps = [
  { id: 1, name: "BBQ-Chicken-Wrap", displayName: "BBQ Chicken Wrap", price: 349, description: "Grilled chicken, BBQ sauce, lettuce, corn, and cheese wrapped in tortilla", image: "/menupage/wraps/w1.jpg" },
  { id: 2, name: "Grill-Chicken-Wrap", displayName: "Grill Chicken Wrap", price: 349, description: "Grilled chicken with fresh vegetables and garlic sauce", image: "/menupage/wraps/w2.jpg" },
  { id: 3, name: "Zinger-Chicken-Wrap", displayName: "Zinger Chicken Wrap", price: 349, description: "Crispy zinger chicken with spicy mayo, lettuce, and pickles", image: "/menupage/wraps/w3.jpg" },
  { id: 4, name: "Chicken-Shawarma", displayName: "Chicken Shawarma", price: 200, description: "Slow-roasted shawarma chicken with garlic paste and pickles", image: "/menupage/wraps/w4.jpg" },
];

const chickenPortions = [
  { id: 1, name: "Dream-Special-Chicken", displayName: "Dream Special Chicken", price: 1199, description: "Signature grilled chicken breast with herb butter and roasted vegetables", image: "/menupage/chicken/c1.jpg" },
  { id: 2, name: "Moroccan-Chicken", displayName: "Moroccan Chicken", price: 899, description: "Spiced Moroccan chicken with apricot, almond, and couscous", image: "/menupage/chicken/c2.jpg" },
  { id: 3, name: "Parmesan-Chicken", displayName: "Parmesan Chicken", price: 666, description: "Breaded chicken breast topped with marinara sauce and melted parmesan", image: "/menupage/chicken/c3.jpg" },
  { id: 4, name: "Tarragon-Chicken", displayName: "Tarragon Chicken", price: 668, description: "Chicken breast in creamy tarragon sauce with mushrooms", image: "/menupage/chicken/c4.jpg" },
];

// Combine all menu items for featured offer cards
const allMenuItems = [
  ...sandwiches.map(item => ({ ...item, type: 'Sandwich', category: 'meal' })),
  ...soups.map(item => ({ ...item, type: 'Soup', category: 'meal' })),
  ...salads.map(item => ({ ...item, type: 'Salad', category: 'meal' })),
  ...pizzas.map(item => ({ ...item, type: 'Pizza', category: 'meal' })),
  ...pastas.map(item => ({ ...item, type: 'Pasta', category: 'meal' })),
  ...appetizers.map(item => ({ ...item, type: 'Appetizer', category: 'meal' })),
  ...chinese.map(item => ({ ...item, type: 'Chinese', category: 'meal' })),
  ...burgers.map(item => ({ ...item, type: 'Burger', category: 'meal' })),
  ...steaks.map(item => ({ ...item, type: 'Steak', category: 'meal' })),
  ...wraps.map(item => ({ ...item, type: 'Wrap', category: 'meal' })),
  ...chickenPortions.map(item => ({ ...item, type: 'Chicken', category: 'meal' })),
];

// ─── OFFERS DATA (with menu item references) ─────────────────────────────────────────────────────
const categories = [
  { id: 'all',     label: 'All Offers' },
  { id: 'meal',    label: 'Meal Deals' },
  { id: 'drinks',  label: 'Beverages' },
  { id: 'family',  label: 'Family Packs' },
  { id: 'weekend', label: 'Weekend Special' },
];

const offers = [
  {
    id: 1, category: 'meal', featured: true,
    tag: 'Grand Opening',
    title: 'Opening Special',
    description: 'Enjoy 20% off your first visit. Welcome to our family!',
    discount: '20% OFF',
    originalPrice: 'Rs. 500',
    offerPrice: 'Rs. 400',
    validUntil: 'Opening Month Only',
    accent: '#C9913A',
    featuredItems: [allMenuItems[0], allMenuItems[10], allMenuItems[20]],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
        <path d="M12 2l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z"/>
      </svg>
    ),
  },
  {
    id: 2, category: 'meal', featured: false,
    tag: 'Mon – Fri',
    title: 'Weekday Lunch Combo',
    description: 'Soup + Salad + Main Course + Dessert at a special price.',
    discount: 'Flat Rs. 299',
    originalPrice: 'Rs. 599',
    offerPrice: 'Rs. 299',
    validUntil: '12 PM – 4 PM',
    accent: '#5B9E7B',
    comboItems: [soups[0], salads[0], burgers[0]],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B9E7B" strokeWidth="1.3" strokeLinecap="round">
        <rect x="3" y="6" width="18" height="13" rx="2"/>
        <path d="M3 10h18M8 6V4M16 6V4"/>
      </svg>
    ),
  },
  {
    id: 3, category: 'drinks', featured: false,
    tag: 'Every Friday',
    title: 'Buy 1 Get 1 Free',
    description: 'On selected beverages — perfect for date nights.',
    discount: 'BOGO',
    originalPrice: 'Rs. 250',
    offerPrice: 'Rs. 250 (2 items)',
    validUntil: 'Fri 6 PM – 9 PM',
    accent: '#9B72C8',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9B72C8" strokeWidth="1.3" strokeLinecap="round">
        <path d="M8 2h8l1 7H7L8 2z"/>
        <path d="M7 9c0 5 2 9 5 9s5-4 5-9"/>
        <path d="M5 22h14"/>
      </svg>
    ),
  },
  {
    id: 4, category: 'family', featured: true,
    tag: 'Limited Time',
    title: 'Family Feast Pack',
    description: '4 Mains + 4 Garlic Breads + 4 Desserts + Soft Drinks.',
    discount: 'Save Rs. 500',
    originalPrice: 'Rs. 1,999',
    offerPrice: 'Rs. 1,499',
    validUntil: 'While Stocks Last',
    accent: '#4E8EC4',
    familyItems: [pizzas[0], pastas[0], chickenPortions[0], burgers[0]],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4E8EC4" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="9" cy="7" r="3"/><circle cx="15" cy="7" r="3"/>
        <path d="M3 21v-2a6 6 0 016-6h6a6 6 0 016 6v2"/>
      </svg>
    ),
  },
  {
    id: 5, category: 'weekend', featured: false,
    tag: 'Sat – Sun',
    title: 'Weekend Brunch Buffet',
    description: 'Unlimited food & drinks with live counters included.',
    discount: '30% OFF',
    originalPrice: 'Rs. 999',
    offerPrice: 'Rs. 699',
    validUntil: '11 AM – 3 PM',
    accent: '#C9703A',
    buffetItems: [sandwiches[0], pizzas[2], pastas[0], wraps[0], salads[1]],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9703A" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    id: 6, category: 'drinks', featured: false,
    tag: 'Daily',
    title: 'Happy Hours',
    description: 'All mocktails and shakes at half price — every weekday.',
    discount: '50% OFF',
    originalPrice: 'Rs. 200',
    offerPrice: 'Rs. 100',
    validUntil: 'Mon – Thu, 4 PM – 7 PM',
    accent: '#6B94C8',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B94C8" strokeWidth="1.3" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3 3"/>
      </svg>
    ),
  },
  {
    id: 7, category: 'meal', featured: false,
    tag: 'Always On',
    title: 'Student Special',
    description: 'Show your student ID and get an extra 15% off all meals.',
    discount: '15% OFF',
    originalPrice: 'Any Meal',
    offerPrice: '15% Less',
    validUntil: 'With Valid Student ID',
    accent: '#5BA8C4',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5BA8C4" strokeWidth="1.3" strokeLinecap="round">
        <path d="M12 3L2 9l10 6 10-6-10-6z"/>
        <path d="M2 9v7M22 9v7M6 11v5a6 6 0 0012 0v-5"/>
      </svg>
    ),
  },
  {
    id: 8, category: 'meal', featured: false,
    tag: 'Birthday',
    title: 'Birthday Bash',
    description: 'Celebrate with us — complimentary dessert on your birthday.',
    discount: 'Free Dessert',
    originalPrice: 'Rs. 299',
    offerPrice: 'FREE',
    validUntil: 'On Your Birthday',
    accent: '#C96B8A',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C96B8A" strokeWidth="1.3" strokeLinecap="round">
        <path d="M4 18h16a2 2 0 002-2v-4H2v4a2 2 0 002 2z"/>
        <path d="M2 12V9a2 2 0 012-2h16a2 2 0 012 2v3"/>
        <path d="M12 7V3M8 7V4M16 7V4"/>
      </svg>
    ),
  },
  {
    id: 9, category: 'meal', featured: false,
    tag: 'Night Owl',
    title: 'Late Night Craving',
    description: 'Special discount after 9 PM — perfect for night owls.',
    discount: '25% OFF',
    originalPrice: 'All Items',
    offerPrice: '25% Less',
    validUntil: 'Daily after 9 PM',
    accent: '#7B7BC8',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7B7BC8" strokeWidth="1.3" strokeLinecap="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    ),
  },
];

const steps = [
  {
    number: '01',
    title: 'Choose Your Deal',
    description: 'Browse our exclusive offers and pick the one that excites you most.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
        <path d="M5 4h16a1 1 0 011 1v2l-2 10H8L6 7V5a1 1 0 011-1z"/>
        <circle cx="10" cy="22" r="1.5"/><circle cx="18" cy="22" r="1.5"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Book a Table',
    description: 'Reserve your table online or simply walk in to our restaurant.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
        <rect x="4" y="5" width="20" height="18" rx="2"/>
        <path d="M4 11h20M9 5V3M19 5V3"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Show & Enjoy',
    description: 'Present the offer at the counter and enjoy your meal at a great price.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
        <path d="M5 14c0-5 4-9 9-9s9 4 9 9"/>
        <path d="M3 14h22"/><path d="M14 14v7"/>
        <circle cx="14" cy="23" r="1"/>
      </svg>
    ),
  },
];

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ eyebrow, title, subtitle, light = false, inView }) {
  return (
    <div
      className="text-center mb-14"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 h-px bg-[#C9913A]" />
        <span style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9913A' }}>
          {eyebrow}
        </span>
        <div className="w-8 h-px bg-[#C9913A]" />
      </div>
      <h2 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 3rem)', color: light ? '#FAFAF9' : '#1E1A16', lineHeight: 1.2 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ ...J, fontWeight: 300, fontSize: '13px', color: light ? '#A8A29E' : '#9CA3AF', marginTop: '10px', maxWidth: '480px', margin: '10px auto 0' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function OfferCard({ offer, index, inView }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
      style={{
        background: '#FFFFFF',
        borderColor: '#F0EDEA',
        borderRadius: '2px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${offer.accent}40`}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#F0EDEA'}
    >
      {/* Top accent bar */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${offer.accent}, transparent)` }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${offer.accent}12`, borderRadius: '3px', border: `1px solid ${offer.accent}20` }}
            >
              {offer.icon}
            </div>
            <div>
              <span
                className="block"
                style={{ ...J, fontWeight: 400, fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: offer.accent }}
              >
                {offer.tag}
              </span>
              <h3
                style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '1.2rem', color: '#1E1A16', lineHeight: 1.2 }}
              >
                {offer.title}
              </h3>
            </div>
          </div>

          {/* Discount badge */}
          <span
            className="flex-shrink-0 ml-2 px-2.5 py-1 text-white text-[10px] font-semibold"
            style={{ ...J, background: offer.accent, borderRadius: '2px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
          >
            {offer.discount}
          </span>
        </div>

        {/* Description */}
        <p
          className="mb-5 flex-1"
          style={{ ...J, fontWeight: 300, fontSize: '12.5px', color: '#9CA3AF', lineHeight: 1.7 }}
        >
          {offer.description}
        </p>

        {/* Featured items preview (if any) */}
        {offer.featuredItems && (
          <div className="mb-4 flex flex-wrap gap-1">
            {offer.featuredItems.slice(0, 3).map((item, i) => (
              <span key={i} className="text-[9px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded" style={{ ...J }}>
                {item.displayName}
              </span>
            ))}
            {offer.featuredItems.length > 3 && (
              <span className="text-[9px] text-gray-400">+{offer.featuredItems.length - 3} more</span>
            )}
          </div>
        )}

        {/* Gold rule */}
        <div className="w-6 h-px mb-4" style={{ background: '#C9913A' }} />

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span style={{ ...C, fontWeight: 700, fontSize: '1.6rem', color: offer.accent, lineHeight: 1 }}>
            {offer.offerPrice}
          </span>
          <span style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#D1D5DB', textDecoration: 'line-through' }}>
            {offer.originalPrice}
          </span>
        </div>

        {/* Valid until */}
        <div className="flex items-center gap-2 mb-5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
            <circle cx="6" cy="6" r="5"/><path d="M6 3v3l2 2"/>
          </svg>
          <span style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#9CA3AF', letterSpacing: '0.05em' }}>
            {offer.validUntil}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            className="flex-1 py-2.5 text-white transition-all duration-300 group/btn"
            style={{ ...J, fontWeight: 500, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', background: offer.accent, borderRadius: '2px' }}
          >
            Grab Deal
          </button>
          <button
            className="px-4 py-2.5 border transition-all duration-300"
            style={{
              ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: offer.accent, borderColor: `${offer.accent}40`, borderRadius: '2px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${offer.accent}10`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const heroRef = useRef(null);
  const offersRef = useRef(null);
  const stepsRef = useRef(null);
  const newsletterRef = useRef(null);
  const ctaRef = useRef(null);

  const offersInView = useInView(offersRef);
  const stepsInView = useInView(stepsRef);
  const newsletterInView = useInView(newsletterRef);
  const ctaInView = useInView(ctaRef);

  const filtered = activeCategory === 'all'
    ? offers
    : offers.filter(o => o.category === activeCategory);

  const handleSubscribe = () => {
    if (email.includes('@')) { setSubscribed(true); }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.2; } }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[480px] md:h-[560px] flex items-center justify-center overflow-hidden"
        style={{ background: '#0C0A09' }}
      >
        {/* Dark texture overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,145,58,0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 75% 60%, rgba(201,145,58,0.04) 0%, transparent 55%)' }} />

        {/* Decorative watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(100px, 18vw, 200px)', color: 'rgba(255,255,255,0.025)', whiteSpace: 'nowrap' }}
          aria-hidden
        >
          OFFERS
        </div>

        <div className="relative z-10 px-4 text-center max-w-3xl mx-auto" style={{ animation: 'fadeUp 0.8s ease both' }}>
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9913A]" />
            <span style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9913A' }}>
              Limited Time
            </span>
            <div className="w-8 h-px bg-[#C9913A]" />
          </div>

          {/* Heading */}
          <h1 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(2.8rem, 7vw, 5rem)', color: '#FAFAF9', lineHeight: 1.1, marginBottom: '20px' }}>
            Exclusive Deals<br />
            <span style={{ color: '#C9913A' }}>&amp; Special Offers</span>
          </h1>

          <p style={{ ...J, fontWeight: 300, fontSize: '14px', color: '#A8A29E', maxWidth: '420px', margin: '0 auto 36px', lineHeight: 1.8 }}>
            Great food at even greater prices. Explore our handpicked deals and save on your favourite meals.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="#offers"
              className="flex items-center gap-2 px-7 py-3 text-[#0C0A09] transition-all duration-300 hover:opacity-90"
              style={{ ...J, fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#C9913A', borderRadius: '2px' }}
            >
              Browse Offers
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 7h10M7 3l4 4-4 4"/></svg>
            </Link>
            <Link
              href="/menu"
              className="flex items-center gap-2 px-7 py-3 border border-white/15 text-white transition-all duration-300 hover:border-[#C9913A] hover:text-[#C9913A]"
              style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '2px' }}
            >
              View Full Menu
            </Link>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #FFFFFF)' }} />
      </section>

      {/* ── ANNOUNCEMENT STRIP ───────────────────────────────────────────────── */}
      <div className="py-4 overflow-hidden" style={{ background: '#1E1A16' }}>
        <div className="flex items-center justify-center gap-6 px-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9913A]" style={{ animation: 'blink 1.5s infinite' }} />
            <span style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9913A' }}>
              Hot Deal
            </span>
          </div>
          <span style={{ ...C, fontWeight: 600, fontStyle: 'italic', fontSize: '1.1rem', color: '#FAFAF9' }}>
            Grand Opening Special — 20% off on your first visit!
          </span>
          <button
            className="border border-[#C9913A]/40 text-[#C9913A] px-5 py-1.5 text-[10px] uppercase tracking-widest hover:bg-[#C9913A] hover:text-[#0C0A09] transition-all duration-300"
            style={{ ...J, fontWeight: 500, borderRadius: '2px' }}
          >
            Claim Now
          </button>
        </div>
      </div>

      {/* ── CATEGORY FILTER ───────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex-shrink-0 px-5 py-2 transition-all duration-300"
              style={{
                ...J,
                fontWeight: activeCategory === cat.id ? 500 : 300,
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: activeCategory === cat.id ? '#FAFAF9' : '#9CA3AF',
                background: activeCategory === cat.id ? '#1E1A16' : 'transparent',
                border: activeCategory === cat.id ? '1px solid #1E1A16' : '1px solid #E5E7EB',
                borderRadius: '2px',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── OFFERS GRID ───────────────────────────────────────────────────────── */}
      <section id="offers" className="py-20 bg-[#F9F7F5]" ref={offersRef}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow="Available Now"
            title={activeCategory === 'all' ? 'All Special Offers' : categories.find(c => c.id === activeCategory)?.label}
            subtitle="Handpicked deals for discerning guests — available for a limited time only."
            inView={offersInView}
          />

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ ...C, fontWeight: 600, fontStyle: 'italic', fontSize: '1.5rem', color: '#9CA3AF' }}>
                No offers in this category right now.
              </p>
              <p style={{ ...J, fontWeight: 300, fontSize: '13px', color: '#C9B8A4', marginTop: '8px' }}>
                Check back soon — new deals are added weekly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {filtered.map((offer, i) => (
                <OfferCard key={offer.id} offer={offer} index={i} inView={offersInView} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden" ref={stepsRef}>
        {/* Watermark */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '160px', lineHeight: 1, color: '#F5F3F0', whiteSpace: 'nowrap' }}
          aria-hidden
        >
          HOW
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader
            eyebrow="Simple Steps"
            title="How to Avail Offers"
            subtitle="Getting your favourite deals is effortless — just three simple steps."
            inView={stepsInView}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white p-10 group hover:bg-[#1E1A16] transition-colors duration-400 cursor-default"
                style={{
                  opacity: stepsInView ? 1 : 0,
                  transform: stepsInView ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
                }}
              >
                {/* Number + icon */}
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="leading-none text-gray-100 group-hover:text-[#2e2822] transition-colors duration-300"
                    style={{ ...C, fontWeight: 700, fontSize: '4rem', lineHeight: 1 }}
                  >
                    {step.number}
                  </span>
                  <div className="mt-1">{step.icon}</div>
                </div>
                <div className="w-6 h-px bg-[#C9913A] mb-5" />
                <h3
                  className="mb-3 group-hover:text-white transition-colors duration-300"
                  style={{ ...C, fontWeight: 600, fontStyle: 'italic', fontSize: '1.3rem', color: '#1E1A16' }}
                >
                  {step.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ ...J, fontWeight: 300, fontSize: '12.5px', color: '#9CA3AF' }}
                >
                  {step.description}
                </p>
                <div className="w-0 group-hover:w-8 h-px bg-[#C9913A] mt-6 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMS ────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-[#F9F7F5]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="border border-gray-200 bg-white p-8">
            <div className="flex items-center gap-3 mb-5">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C9913A" strokeWidth="1.3" strokeLinecap="round">
                <rect x="3" y="2" width="12" height="14" rx="1.5"/>
                <path d="M6 6h6M6 9h6M6 12h4"/>
              </svg>
              <h3 style={{ ...C, fontWeight: 600, fontStyle: 'italic', fontSize: '1.15rem', color: '#1E1A16' }}>
                Terms & Conditions
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
              {[
                'Offers valid for a limited time only.',
                'Cannot be combined with any other promotion.',
                'Valid for dine-in only unless specified.',
                'GST and taxes applicable as per rules.',
                'Management may modify or withdraw anytime.',
                'One offer per table per visit.',
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C9913A' }} />
                  <p style={{ ...J, fontWeight: 300, fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" ref={newsletterRef} style={{ background: '#1E1A16' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,145,58,0.07) 0%, transparent 65%)' }} />

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <SectionHeader
            eyebrow="Stay in the Loop"
            title="Get Exclusive Offers First"
            subtitle="Subscribe and be the first to know about new deals, discounts, and events."
            light
            inView={newsletterInView}
          />

          {subscribed ? (
            <div
              style={{
                ...J, fontWeight: 400, fontSize: '13px', color: '#C9913A',
                border: '1px solid rgba(201,145,58,0.3)', padding: '16px 32px',
                opacity: newsletterInView ? 1 : 0, transition: 'opacity 0.5s ease',
              }}
            >
              ✓ You're subscribed! Watch your inbox for exclusive offers.
            </div>
          ) : (
            <div
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              style={{
                opacity: newsletterInView ? 1 : 0,
                transform: newsletterInView ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C9913A]/50 transition-colors"
                style={{ ...J, fontWeight: 300, fontSize: '13px', borderRadius: '2px' }}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
              />
              <button
                onClick={handleSubscribe}
                className="px-7 py-3 text-[#0C0A09] hover:opacity-90 transition-opacity flex-shrink-0"
                style={{ ...J, fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#C9913A', borderRadius: '2px' }}
              >
                Subscribe
              </button>
            </div>
          )}
          <p style={{ ...J, fontWeight: 300, fontSize: '11px', color: '#52504E', marginTop: '14px' }}>
            No spam. Quality offers only. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#F9F7F5] relative overflow-hidden" ref={ctaRef}>
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: '140px', lineHeight: 1, color: '#F0EDEA', whiteSpace: 'nowrap' }}
          aria-hidden
        >
          RESERVE
        </div>

        <div
          className="max-w-3xl mx-auto px-4 text-center relative z-10"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="w-10 h-[2px] bg-[#C9913A] mx-auto mb-5" />
          <h2 style={{ ...C, fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#1E1A16', lineHeight: 1.2, marginBottom: '12px' }}>
            Ready to Save on Your Next Meal?
          </h2>
          <p style={{ ...J, fontWeight: 300, fontSize: '13px', color: '#9CA3AF', marginBottom: '32px' }}>
            Book your table now and enjoy these amazing discounts in person.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/reservations"
              className="flex items-center gap-2 px-8 py-3 text-white hover:opacity-90 transition-opacity"
              style={{ ...J, fontWeight: 600, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: '#1E1A16', borderRadius: '2px' }}
            >
              Book a Table
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 7h10M7 3l4 4-4 4"/></svg>
            </Link>
            <a
              href="tel:03151966852"
              className="flex items-center gap-2 px-8 py-3 border border-[#1E1A16] text-[#1E1A16] hover:bg-[#1E1A16] hover:text-white transition-all duration-300"
              style={{ ...J, fontWeight: 400, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', borderRadius: '2px' }}
            >
              Call Us: 0315-1966852
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}