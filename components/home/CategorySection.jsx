'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Coffee, Pizza, Beef, Sandwich, Salad, Soup, Utensils, CupSoda, Flame, Crown, Fish, Wine, Cake } from 'lucide-react';
import { useRouter } from 'next/navigation';

const menuData = {
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

function MenuItemRow({ item }) {
  const Icon = item.icon;
    const router = useRouter();

 
  return (
    <div className="flex items-center gap-4 bg-white border border-[#F0E8DF] 
    text-gray-800 shadow-[0_4px_14px_rgba(199,122,63,0.10)] 
    px-4 py-3.5 cursor-pointer 
    transition-all duration-300 ease-in-out
    hover:border-[#C77A3F] hover:bg-[#C77A3F] hover:text-white 
    hover:shadow-[0_8px_24px_rgba(199,122,63,0.18)] group"   onClick={() => router.push(`/menu/${item.code}`) }
>

      {/* Image Circle */}
      <div className="w-[52px] h-[52px] rounded-full bg-[#F5EDE4] border-2 border-[#F0E8DF] 
      flex items-center justify-center flex-shrink-0 overflow-hidden
      transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">

        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={52}
            height={52}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <Icon className="w-6 h-6 text-[#C77A3F] opacity-60 transition-colors duration-300 group-hover:text-white group-hover:opacity-100" />
        )}
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-playfair text-[14px] font-bold text-[#1C1008] truncate 
          transition-colors duration-300 group-hover:text-white">
            {item.name}
          </p>

          {item.popular && (
            <span className="text-[8px] font-bold bg-[#C77A3F]/10 text-[#C77A3F] 
            px-1.5 py-0.5 rounded-full
            transition-all duration-300 
            group-hover:bg-white/20 group-hover:text-white">
              POPULAR
            </span>
          )}
        </div>

        <p className="text-[11px] text-[#B0A090] font-medium truncate mt-0.5 
        transition-colors duration-300 group-hover:text-white/80">
          {item.description}
        </p>

        {item.large && (
          <p className="text-[9px] text-[#B0A090] mt-0.5 
          transition-colors duration-300 group-hover:text-white/70">
            Large: {item.large} | Family: {item.family}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0 ml-2">
        <p className="font-playfair text-[17px] font-bold text-[#1C1008] 
        transition-colors duration-300 group-hover:text-white">
          {item.price}
        </p>

        {item.large && !item.family && (
          <p className="text-[9px] text-[#B0A090] 
          transition-colors duration-300 group-hover:text-white/70">
            Large: {item.large}
          </p>
        )}
      </div>
    </div>
  );
}
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const router = useRouter();

  const categories = Object.keys(menuData);
  const currentCategory = menuData[activeCategory];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">

         {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C77A3F]/10 px-4 py-2 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-[#C77A3F] rounded-full animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C77A3F] uppercase">Our Menu</span>
          </div>
          
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1208] mb-4">
            Discover Our <span className="text-[#C77A3F]">Culinary Journey</span>
          </h2>
          
         
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
  <div className="flex flex-wrap justify-center gap-2 bg-white border border-[#F0E8DF] rounded-full px-2 py-1.5">
    {categories.map((key) => {
      const category = menuData[key];
      const Icon = category.icon;
      const isActive = activeCategory === key;
      return (
        <button
          key={key}
          onClick={() => setActiveCategory(key)}
          className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold
            transition-all duration-200 whitespace-nowrap border-none outline-none
            focus-visible:ring-2 focus-visible:ring-[#C77A3F] focus-visible:ring-offset-1
            ${isActive
              ? 'bg-[#C77A3F] text-white shadow-[0_4px_14px_rgba(199,122,63,0.30)]'
              : 'bg-transparent text-[#8C7060] hover:bg-[#FFF0E6] hover:text-[#C77A3F]'
            }`}
        >
          <Icon className={`w-[15px] h-[15px] flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
          {category.label}
          {category.count != null && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5  transition-all duration-200 ${
              isActive
                ? 'bg-white/25 text-white'
                : 'bg-[#F5EDE4] text-[#C77A3F]'
            }`}>
              {category.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
</div>

        {/* Items grid - Same UI as original */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-5xl mx-auto">
          {currentCategory.items.map((item, idx) => (
            <MenuItemRow key={idx} item={item} />
          ))}
        </div>

        <div className="text-center mt-12">
  

  <a
    href="/menu-list"
    className="inline-flex items-center gap-2 px-10 py-3  bg-[#C77A3F] text-white text-[13px] font-bold hover:bg-[#1A1208] transition-all"
  >
    Explore Full Menu
  </a>
</div>

      </div>
    </section>
  );
}