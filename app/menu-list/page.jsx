"use client"
import React from "react";
import { useRouter } from "next/navigation";

function MenuPage() {
  const router = useRouter();

  // SANDWICHES
  const sandwiches = [
    { id: 1, name: "Special-Club-Sandwich", displayName: "Special Club Sandwich", price: 599, description: "Triple-layer sandwich with grilled chicken, crispy bacon, fresh lettuce, tomato, and mayo served with fries", image: "/menupage/sandwich/s5.jpg" },
    { id: 2, name: "Crispy-Chicken-Sandwich", displayName: "Crispy Chicken Sandwich", price: 449, description: "Golden fried chicken breast with lettuce, pickles, and signature sauce on a toasted bun", image: "/menupage/sandwich/s2.jpg" },
    { id: 3, name: "Roast-Beef-Panini", displayName: "Roast Beef Panini", price: 499, description: "Slow-roasted beef with caramelized onions, melted provolone cheese, and horseradish sauce", image: "/menupage/sandwich/s6.jpg" },
    { id: 4, name: "Grill-Chicken-Sandwich", displayName: "Grill Chicken Sandwich", price: 449, description: "Grilled chicken breast with avocado, lettuce, tomato, and garlic aioli on multigrain bread", image: "/menupage/sandwich/s4.jpg" },
    { id: 5, name: "Smoked-Chicken-Panini", displayName: "Smoked Chicken Panini", price: 499, description: "Smoked chicken with sun-dried tomatoes, fresh mozzarella, and pesto sauce pressed to perfection", image: "/menupage/sandwich/s1.jpg" },
    { id: 6, name: "Coffee-Club", displayName: "Coffee Club", price: 499, description: "Classic club sandwich with turkey, ham, bacon, lettuce, tomato, and cheese served with coffee", image: "/menupage/sandwich/s3.jpg" }, // Fixed price from 0 to 499
  ];

  // SOUPS
  const soups = [
    { id: 1, name: "Hot-Sour-Soup", displayName: "Hot & Sour Soup", small: 199, large: 799, description: "Spicy and tangy Chinese soup with tofu, mushrooms, bamboo shoots, and eggs", image: "/menupage/soup/s1.jpg" },
    { id: 2, name: "Chicken-Corn-Soup", displayName: "Chicken Corn Soup", small: 199, large: 799, description: "Creamy soup with sweet corn, shredded chicken, and egg drops", image: "/menupage/soup/s2.jpg" },
    { id: 3, name: "Dream-Special-Soup", displayName: "Dream Special Soup", small: 199, large: 799, description: "Rich and creamy soup with mixed vegetables and herbs", image: "/menupage/soup/s3.jpg" }, // Fixed description
  ];

  // SALADS
  const salads = [
    { id: 1, name: "Dream-Special-Salad", displayName: "Dream Special Salad", price: 450, description: "Mixed greens with grilled chicken, avocado, cherry tomatoes, cucumber, and house vinaigrette", image: "/menupage/salad/s1.jpg" },
    { id: 2, name: "Russian-Salad", displayName: "Russian Salad", price: 399, description: "Classic potato salad with peas, carrots, pickles, and mayonnaise", image: "/menupage/salad/s2.jpg" },
    { id: 3, name: "Caesar-Salad", displayName: "Caesar Salad", price: 399, description: "Crisp romaine lettuce with parmesan cheese, croutons, and creamy Caesar dressing", image: "/menupage/salad/s3.jpg" },
  ];

  // PIZZAS
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

  // PASTAS
  const pastas = [
    { id: 1, name: "Alfredo-Pasta", displayName: "Alfredo Pasta", price: 699, description: "Creamy parmesan sauce with fettuccine pasta, garlic, and fresh parsley", image: "/menupage/pasta/p1.jpg" },
    { id: 2, name: "Dream-Special-Pasta", displayName: "Dream Special Pasta", price: 999, description: "Signature pasta with grilled chicken, mushrooms, bell peppers in creamy tomato sauce", image: "/menupage/pasta/p2.jpg" },
    { id: 3, name: "Oven-Baked-Pasta", displayName: "Oven Baked Pasta", price: 799, description: "Penne pasta baked with marinara sauce, mozzarella, and parmesan cheese", image: "/menupage/pasta/p3.jpg" },
    { id: 4, name: "Chicken-Lasagna", displayName: "Chicken Lasagna", price: 799, description: "Layered pasta with chicken, ricotta, mozzarella, and meat sauce", image: "/menupage/pasta/p4.jpg" },
  ];

  // APPETIZERS
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

  // CHINESE CORNER
  const chinese = [
    { id: 1, name: "Chicken-Manchurian", displayName: "Chicken Manchurian", price: 849, description: "Fried chicken balls in spicy, tangy manchurian sauce with bell peppers", image: "/menupage/chines/c1.jpg" },
    { id: 2, name: "Chicken-Chili-Dry", displayName: "Chicken Chili Dry", price: 1199, description: "Stir-fried chicken with chili sauce, bell peppers, and onions", image: "/menupage/chines/c2.jpg" },
    { id: 3, name: "Beef-Chili-Dry", displayName: "Beef Chili Dry", price: 899, description: "Tender beef strips stir-fried with chili, garlic, and mixed vegetables", image: "/menupage/chines/c3.jpg" },
    { id: 4, name: "Vegetable-Fried-Rice", displayName: "Vegetable Fried Rice", price: 349, description: "Wok-tossed rice with mixed vegetables, eggs, and soy sauce", image: "/menupage/chines/c4.jpg" },
    { id: 5, name: "Masala-Rice", displayName: "Masala Rice", price: 349, description: "Fragrant rice cooked with Indian spices, peas, and carrots", image: "/menupage/chines/c5.jpg" },
  ];

  // BURGERS
  const burgers = [
    { id: 1, name: "Dream-Special-Burger", displayName: "Dream Special Burger", price: 599, description: "Double patty burger with cheese, lettuce, tomato, onion rings, and special sauce", image: "/menupage/burger/b1.jpg" },
    { id: 2, name: "Zinger-Burger", displayName: "Zinger Burger", price: 449, description: "Crispy spicy chicken fillet with lettuce and mayo", image: "/menupage/burger/b2.jpg" },
    { id: 3, name: "Cheese-Mushroom-Burger", displayName: "Cheese Mushroom Burger", price: 499, description: "Beef patty topped with sauteed mushrooms and melted Swiss cheese", image: "/menupage/burger/b3.jpg" },
    { id: 4, name: "Roast-Beef-Burger", displayName: "Roast Beef Burger", price: 599, description: "Slow-roasted beef with caramelized onions and BBQ sauce", image: "/menupage/burger/b4.jpg" },
    { id: 5, name: "Smoked-Chicken-Burger", displayName: "Smoked Chicken Burger", price: 499, description: "Smoked chicken patty with avocado, bacon, and chipotle sauce", image: "/menupage/burger/b5.jpg" },
  ];

  // STEAKS
  const steaks = [
    { id: 1, name: "Dream-Special-Steak", displayName: "Dream Special Steak", small: 1299, large: 1899, description: "Premium cut steak with garlic mash, grilled vegetables, and red wine sauce", image: "/menupage/steak/s1.jpg" },
    { id: 2, name: "American-Steak", displayName: "American Steak", small: 1199, large: 1799, description: "Classic American-style steak with fries, coleslaw, and peppercorn sauce", image: "/menupage/steak/s2.jpg" },
    { id: 3, name: "Mushroom-Steak", displayName: "Mushroom Steak", small: 1199, large: 1799, description: "Juicy steak smothered in creamy mushroom sauce with mashed potatoes", image: "/menupage/steak/s3.jpg" },
    { id: 4, name: "Jalapeno-Steak", displayName: "Jalapeno Steak", small: 1199, large: 1799, description: "Spicy steak with jalapenos, pepper jack cheese, and chipotle sauce", image: "/menupage/steak/s4.jpg" },
    { id: 5, name: "Mexican-Steak", displayName: "Mexican Steak", small: 1199, large: 1799, description: "Steak topped with salsa, guacamole, sour cream, and cheddar cheese", image: "/menupage/steak/s5.jpg" },
  ];

  // WRAPS
  const wraps = [
    { id: 1, name: "BBQ-Chicken-Wrap", displayName: "BBQ Chicken Wrap", price: 349, description: "Grilled chicken, BBQ sauce, lettuce, corn, and cheese wrapped in tortilla", image: "/menupage/wraps/w1.jpg" },
    { id: 2, name: "Grill-Chicken-Wrap", displayName: "Grill Chicken Wrap", price: 349, description: "Grilled chicken with fresh vegetables and garlic sauce", image: "/menupage/wraps/w2.jpg" },
    { id: 3, name: "Zinger-Chicken-Wrap", displayName: "Zinger Chicken Wrap", price: 349, description: "Crispy zinger chicken with spicy mayo, lettuce, and pickles", image: "/menupage/wraps/w3.jpg" },
    { id: 4, name: "Chicken-Shawarma", displayName: "Chicken Shawarma", price: 200, description: "Slow-roasted shawarma chicken with garlic paste and pickles", image: "/menupage/wraps/w4.jpg" },
  ];

  // CHICKEN PORTIONS
  const chickenPortions = [
    { id: 1, name: "Dream-Special-Chicken", displayName: "Dream Special Chicken", price: 1199, description: "Signature grilled chicken breast with herb butter and roasted vegetables", image: "/menupage/chicken/c1.jpg" },
    { id: 2, name: "Moroccan-Chicken", displayName: "Moroccan Chicken", price: 899, description: "Spiced Moroccan chicken with apricot, almond, and couscous", image: "/menupage/chicken/c2.jpg" },
    { id: 3, name: "Parmesan-Chicken", displayName: "Parmesan Chicken", price: 666, description: "Breaded chicken breast topped with marinara sauce and melted parmesan", image: "/menupage/chicken/c3.jpg" },
    { id: 4, name: "Tarragon-Chicken", displayName: "Tarragon Chicken", price: 668, description: "Chicken breast in creamy tarragon sauce with mushrooms", image: "/menupage/chicken/c4.jpg" },
  ];

  const handleCardClick = (itemName) => {
    router.push(`/menu/${itemName.toLowerCase()}`);
  };

  // Menu Card Component for Single Price Items
  function MenuCard({ item }) {
    return (
      <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2" onClick={() => handleCardClick(item.name)}>
        <div className="relative overflow-hidden h-64">
          <img 
            src={item.image} 
            alt={item.displayName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = "/fallback-image.jpg"; }}
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-800 mb-2">{item.displayName}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-emerald-600">₨{item.price}</span>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Menu Card Component for Items with Small/Large
  function MenuCardWithSizes({ item }) {
    return (
      <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2" onClick={() => handleCardClick(item.name)}>
        <div className="relative overflow-hidden h-64">
          <img 
            src={item.image} 
            alt={item.displayName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = "/fallback-image.jpg"; }}
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-800 mb-2">{item.displayName}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Small:</span>
                <span className="font-semibold text-emerald-600">₨{item.small}</span>
              </div>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Large:</span>
                <span className="font-semibold text-emerald-600">₨{item.large}</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    );
  }

  // Menu Card Component for Pizzas (4 sizes)
  function PizzaCard({ item }) {
    return (
      <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2" onClick={() => handleCardClick(item.name)}>
        <div className="relative overflow-hidden h-64">
          <img 
            src={item.image} 
            alt={item.displayName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.src = "/fallback-image.jpg"; }}
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-800 mb-2">{item.displayName}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-sm"><span className="text-gray-500">Small:</span> <span className="font-semibold text-emerald-600">₨{item.small}</span></div>
            <div className="text-sm"><span className="text-gray-500">Medium:</span> <span className="font-semibold text-emerald-600">₨{item.medium}</span></div>
            <div className="text-sm"><span className="text-gray-500">Large:</span> <span className="font-semibold text-emerald-600">₨{item.large}</span></div>
            <div className="text-sm"><span className="text-gray-500">Family:</span> <span className="font-semibold text-emerald-600">₨{item.family}</span></div>
          </div>
          <button className="w-full bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    );
  }

  // Section component to reduce repetition
  function MenuSection({ title, items, componentType = "single" }) {
    const getComponent = () => {
      switch(componentType) {
        case "sizes":
          return items.map((item) => <MenuCardWithSizes key={item.id} item={item} />);
        case "pizza":
          return items.map((item) => <PizzaCard key={item.id} item={item} />);
        default:
          return items.map((item) => <MenuCard key={item.id} item={item} />);
      }
    };

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-10 text-left">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {getComponent()}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4">
              Flavour so good you'll <br />
              <span className="text-amber-600">try to eat with your eyes</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Discover our carefully crafted menu featuring the finest ingredients and boldest flavors
            </p>
          </div>

          <div className="flex justify-center px-4 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="/menupage/hero.jpg"
                alt="Menu Hero"
                className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.src = "/fallback-hero.jpg"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <MenuSection title="Sandwiches" items={sandwiches} componentType="single" />
      <MenuSection title="Soups" items={soups} componentType="sizes" />
      <MenuSection title="Salads" items={salads} componentType="single" />
      <MenuSection title="Pizzas" items={pizzas} componentType="pizza" />
      <MenuSection title="Pastas" items={pastas} componentType="single" />
      <MenuSection title="Appetizers" items={appetizers} componentType="single" />
      <MenuSection title="Chinese Corner" items={chinese} componentType="single" />
      <MenuSection title=" Burgers" items={burgers} componentType="single" />
      <MenuSection title=" Steaks" items={steaks} componentType="sizes" />
      <MenuSection title=" Wraps" items={wraps} componentType="single" />
      <MenuSection title=" Chicken Portions" items={chickenPortions} componentType="single" />
    </>
  );
}

export default MenuPage;