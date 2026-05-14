'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  {
    id: 'dream-special-burger',
    name: 'Dream Special Burger',
    description: 'Signature burger with premium beef, special sauce, and fresh veggies.',
    price: 449,
    image: '/fevorit/burger.jpg',
    category: 'burger',
  },
  {
    id: 'dream-special-pizza',
    name: 'Dream Special Pizza',
    description: 'Loaded with premium toppings, triple cheese, and signature sauce.',
    price: 750,
    image: '/fevorit/pizza.jpg',
    category: 'pizza',
  },
  {
    id: 'crispy-chicken-sandwich',
    name: 'Crispy Chicken Sandwich',
    description: 'Crunchy fried chicken with lettuce, mayo, and toasted brioche bun.',
    price: 449,
    image: '/fevorit/sandwich.jpg',
    category: 'sandwich',
  },
  {
    id: 'dream-special-steak',
    name: 'Dream Special Steak',
    description: 'Juicy grilled steak with mushroom sauce and seasoned fries.',
    price: 1299,
    image: '/fevorit/steak.jpg',
    category: 'steak',
  },
  {
    id: 'alfredo-pasta',
    name: 'Alfredo Pasta',
    description: 'Creamy parmesan sauce with grilled chicken and herbs.',
    price: 699,
    image: '/fevorit/pasta.jpg',
    category: 'pasta',
  },
  {
    id: 'hot-wings',
    name: 'Hot Wings',
    description: 'Spicy, crispy chicken wings with house special sauce.',
    price: 599,
    image: '/fevorit/wings.jpg',
    category: 'appetizer',
  },
];

const formatPrice = (price) => {
  return `Rs. ${price.toLocaleString()}`;
};

// Pattern per row of 4:
// Row 1: text, image, text, image
// Row 2: image, text, image, text
// Row 3: text, image, text, image
// Row 4: image, text, image, text

const gridPattern = [
  // row 1
  { type: 'text', itemIndex: 0 },
  { type: 'image', itemIndex: 1 },
  { type: 'text', itemIndex: 2 },
  { type: 'image', itemIndex: 3 },
  // row 2
  { type: 'image', itemIndex: 4 },
  { type: 'text', itemIndex: 5 },
  { type: 'image', itemIndex: 0 },
  { type: 'text', itemIndex: 1 },
  // row 3
  { type: 'text', itemIndex: 2 },
  { type: 'image', itemIndex: 3 },
  { type: 'text', itemIndex: 4 },
  { type: 'image', itemIndex: 5 },
  // row 4
  { type: 'image', itemIndex: 0 },
  { type: 'text', itemIndex: 1 },
  { type: 'image', itemIndex: 2 },
  { type: 'text', itemIndex: 3 },
];

function TextCard({ item, isPriority = false }) {
  return (
    <Link href={`/menu/${item.id}`} className="block w-full group focus:outline-none focus:ring-2 focus:ring-[#C9913A] focus:ring-offset-2">
      <div className="bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-64 flex flex-col justify-center gap-3 border-l-2 border-transparent group-hover:border-[#C9913A] group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-amber-50/30">
        {/* Decorative top rule */}
        <div className="w-8 h-[2px] bg-[#C9913A] group-hover:w-12 transition-all duration-300" />

        <h3 className="font-playfair text-xl font-bold text-[#1E1A16] leading-snug group-hover:text-[#C9913A] transition-colors duration-200">
          {item.name}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[#C9913A] font-bold text-lg tracking-wide">
            {formatPrice(item.price)}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-gray-400 group-hover:text-[#C9913A] group-hover:translate-x-1 transition-all duration-300 font-semibold">
            Order →
          </span>
        </div>
      </div>
    </Link>
  );
}

function ImageCard({ item, isPriority = false }) {
  return (
    <Link href={`/menu/${item.id}`} className="block w-full group focus:outline-none focus:ring-2 focus:ring-[#C9913A] focus:ring-offset-2">
      <div className="bg-white shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-64 relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          loading={isPriority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Subtle dark overlay with name */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white text-sm font-semibold tracking-wide drop-shadow-lg block">
              {item.name}
            </span>
            <span className="text-[#C9913A] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Badge component for categories
function CategoryBadge({ category }) {
  const categories = {
    burger: '🍔 Burger',
    pizza: '🍕 Pizza',
    sandwich: '🥪 Sandwich',
    steak: '🥩 Steak',
    pasta: '🍝 Pasta',
    appetizer: '🍗 Appetizer',
  };
  
  return (
    <span className="inline-block px-2 py-1 bg-[#C9913A]/10 text-[#C9913A] text-[10px] font-semibold rounded-full uppercase tracking-wider">
      {categories[category] || category}
    </span>
  );
}

export default function MenuSection() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-gray-100 ">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header with enhanced styling */}
        <div className="text-center mb-16">
         
          
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1A16] tracking-tight mb-4">
            Our Customer Favorites
          </h2>
          
        
        </div>

        {/* Alternating grid with improved responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
          {gridPattern.map((cell, index) => {
            const item = menuItems[cell.itemIndex];
            // Prioritize loading first 4 images
            const isPriority = index < 4 && cell.type === 'image';
            
            return cell.type === 'text'
              ? <TextCard key={`${item.id}-text-${index}`} item={item} />
              : <ImageCard key={`${item.id}-img-${index}`} item={item} isPriority={isPriority} />;
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-16">
         <Link
  href="/menu-list"
  className="inline-flex items-center gap-2 px-10 py-3 bg-[#e85a2a] text-white text-[14px] font-semibold hover:bg-[#FF6B35] transition-all hover:shadow-lg"
>
  View Full Menu
</Link>
        </div>

      

      </div>
    </section>
  );
}