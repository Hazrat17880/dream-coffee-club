// src/data/menuData.js
import { Pizza, Beef, Sandwich, Soup, Salad, Utensils, Fish } from 'lucide-react';
import { Flame, Crown } from 'lucide-react';

export const menuData = {
  pizzas: { 
    label: 'Pizzas',
    icon: Pizza,
    items: [
      { id: 'dream-special-pizza', code: "p1", name: 'Dream Special Pizza', description: 'Signature premium pizza with special sauce', price: 'Rs. 750', large: 'Rs. 1,599', family: 'Rs. 2,299', popular: true,  is3DModel: true,
        modelPath: "/models/pizza/p2.glb"  },
      { id: 'chicken-tikka-pizza', code: "p2", name: 'Chicken Tikka Pizza', description: 'Spicy chicken tikka with cheese', price: 'Rs. 650', large: 'Rs. 1,499', family: 'Rs. 1,899',  is3DModel: true,
        modelPath: "/models/pizza/p1.glb"  },
      { id: 'fajita-pizza', code: "p3", name: 'Fajita Pizza', description: 'Grilled fajita chicken with bell peppers', price: 'Rs. 650', large: 'Rs. 1,499', family: 'Rs. 1,899',  is3DModel: true,
        modelPath: "/models/pizza/p3.glb" },
      { id: 'crown-crust-pizza', code: "p4", name: 'Crown Crust Pizza', description: 'Premium pizza with crown crust', price: 'Rs. 699', large: 'Rs. 1,550', family: 'Rs. 1,999',  is3DModel: true,
        modelPath: "/models/pizza/p1.glb"  },
      { id: 'kabab-crust-pizza', code: "p5", name: 'Kabab Crust Pizza', description: 'Pizza with kabab crust edge', price: 'Rs. 600', large: 'Rs. 1,499', family: 'Rs. 1,999',  is3DModel: true,
        modelPath: "/models/pizza/p2.glb" },
      { id: 'pepperoni-pizza', code: "p6", name: 'Pepperoni Pizza', description: 'Classic pepperoni with cheese', price: 'Rs. 500', large: 'Rs. 1,399', family: 'Rs. 1,799',  is3DModel: true,
        modelPath: "/models/pizza/p2.glb" },
      { id: 'cheese-lover-pizza', code: "p7", name: 'Cheese Lover Pizza', description: 'Triple cheese blend', price: 'Rs. 500', large: 'Rs. 1,399', family: 'Rs. 1,799',  is3DModel: true,
        modelPath: "/models/pizza/p2.glb"  },
      { id: 'four-season-pizza', code: "p8", name: 'Four Season Pizza', description: 'Four different toppings', price: 'Rs. 749', large: 'Rs. 1,599', family: 'Rs. 2,199',  is3DModel: true,
        modelPath: "/models/pizza/p3.glb"  },
    ]
  },

  burgers: {
    label: 'Burgers',
    icon: Beef,
    items: [
      { id: 'dream-special-burger', code: "b1", name: 'Dream Special Burger', description: 'Signature premium beef burger', price: 'Rs. 599', popular: true,  is3DModel: true,
        modelPath: "/models/burger/b1.glb"  },
      { id: 'zinger-burger', code: "b2", name: 'Zinger Burger', description: 'Crispy fried chicken burger', price: 'Rs. 449', is3DModel: true,
        modelPath: "/models/burger/b2.glb" },
      { id: 'cheese-mushroom-burger', code: "b3", name: 'Cheese Mushroom Burger', description: 'Juicy beef with mushrooms & cheese', price: 'Rs. 499', is3DModel: true,
        modelPath: "/models/burger/b3.glb" },
      { id: 'roast-beef-burger', code: "b4", name: 'Roast Beef Burger', description: 'Tender roast beef patty', price: 'Rs. 599', is3DModel: true,
        modelPath: "/models/burger/b5.glb" },
      { id: 'smoked-chicken-burger', code: "b5", name: 'Smoked Chicken Burger', description: 'Smoked chicken breast', price: 'Rs. 499', is3DModel: true,
        modelPath: "/models/burger/b6.glb" },
    ]
  },

  sandwiches: {
    label: 'Sandwiches',
    icon: Sandwich,
    items: [
      { id: 'special-club-sandwich', code: "s1", name: 'Special Club Sandwich', description: 'Triple layer club sandwich', price: 'Rs. 599', is3DModel: true,
        modelPath: "/models/sandwich/sa1.glb" },
      { id: 'crispy-chicken-sandwich', code: "s2", name: 'Crispy Chicken Sandwich', description: 'Crunchy fried chicken sandwich', price: 'Rs. 449', is3DModel: true,
        modelPath: "/models/sandwich/sa2.glb" },
      { id: 'roast-beef-panini', code: "s3", name: 'Roast Beef Panini', description: 'Grilled panini with roast beef', price: 'Rs. 599',is3DModel: true,
        modelPath: "/models/sandwich/sa3.glb" },
      { id: 'grill-chicken-sandwich', code: "s4", name: 'Grill Chicken Sandwich', description: 'Grilled chicken breast sandwich', price: 'Rs. 449', is3DModel: true,
        modelPath: "/models/sandwich/sa4.glb" },
      { id: 'smoked-chicken-panini', code: "s5", name: 'Smoked Chicken Panini', description: 'Smoked chicken in pressed panini', price: 'Rs. 499', is3DModel: true,
        modelPath: "/models/sandwich/sa5.glb" },
    ]
  },

  steaks: {
    label: 'Steaks',
    icon: Flame,
    items: [
      { id: 'dream-special-steak', code: "st1", name: 'Dream Special Steak', description: 'Premium steak with mushroom sauce', price: 'Rs. 1,299', large: 'Rs. 1,899', is3DModel: true,
        modelPath: "/models/steak/st1.glb" },
      { id: 'american-steak', code: "st2", name: 'American Steak', description: 'Classic American style steak', price: 'Rs. 1,199', large: 'Rs. 1,799', is3DModel: true,
        modelPath: "/models/steak/st2.glb" },
      { id: 'mushroom-steak', code: "st3", name: 'Mushroom Steak', description: 'Steak with creamy mushroom sauce', price: 'Rs. 1,199', large: 'Rs. 1,799', is3DModel: true,
        modelPath: "/models/steak/st3.glb"},
      { id: 'jalapeno-steak', code: "st4", name: 'Jalapeno Steak', description: 'Spicy jalapeno infused steak', price: 'Rs. 1,199', large: 'Rs. 1,799', is3DModel: true,
        modelPath: "/models/steak/st4.glb" },
      { id: 'mexican-steak', code: "st5", name: 'Mexican Steak', description: 'Mexican spiced steak', price: 'Rs. 1,199', large: 'Rs. 1,799', is3DModel: true,
        modelPath: "/models/steak/st5.glb" },
    ]
  },

  chicken: {
    label: 'Chicken',
    icon: Crown,
    items: [
      { id: 'dream-special-chicken', code: "c1", name: 'Dream Special Chicken', description: 'Signature chicken dish', price: 'Rs. 1,199', is3DModel: true,
        modelPath: "/models/chicken/ch1.glb" },
      { id: 'moroccan-chicken', code: "c2", name: 'Moroccan Chicken', description: 'Moroccan spiced chicken', price: 'Rs. 899', is3DModel: true,
        modelPath: "/models/chicken/ch2.glb" },
      { id: 'parmesan-chicken', code: "c3", name: 'Parmesan Chicken', description: 'Chicken breast with parmesan crust', price: 'Rs. 666', is3DModel: true,
        modelPath: "/models/chicken/ch3.glb" },
      { id: 'tarragon-chicken', code: "c4", name: 'Tarragon Chicken', description: 'Chicken with tarragon sauce', price: 'Rs. 668',is3DModel: true,
        modelPath: "/models/chicken/ch4.glb" },
    ]
  },

  pasta: {
    label: 'Pasta',
    icon: Utensils,
    items: [
      { id: 'alfredo-pasta', code: "pa1", name: 'Alfredo Pasta', description: 'Creamy alfredo sauce with chicken', price: 'Rs. 699', is3DModel: true,
        modelPath: "/models/pasta/pa1.glb" },
      { id: 'dream-special-pasta', code: "pa2", name: 'Dream Special Pasta', description: 'Signature pasta blend', price: 'Rs. 999',is3DModel: true, modelPath: '/models/pasta/pa2.glb' },
      { id: 'oven-baked-pasta', code: "pa3", name: 'Oven Baked Pasta', description: 'Baked pasta with cheese', price: 'Rs. 799',is3DModel: true, modelPath: '/models/pasta/pa3.glb' },
      { id: 'chicken-lasagna', code: "pa4", name: 'Chicken Lasagna', description: 'Layered lasagna with chicken', price: 'Rs. 799',is3DModel: true,modelPath: "/models/pasta/pa4.glb" }
    ]
  },

  appetizers: {
    label: 'Appetizers',
    icon: Soup,
    items: [
      { id: 'hot-wings', code: "a1", name: 'Hot Wings', description: 'Spicy chicken wings', price: 'Rs. 599', is3DModel: true, modelPath: "/models/apparties/ap1.glb" },
      { id: 'bbq-wings', code: "a2", name: 'B.B.Q Wings', description: 'Barbecue glazed wings', price: 'Rs. 599', is3DModel: true, modelPath: "/models/pasta/pa2.glb" },
      { id: 'honey-wings', code: "a3", name: 'Honey Wings', description: 'Sweet honey glazed wings', price: 'Rs. 599',is3DModel: true,  modelPath: "/models/pasta/pa3.glb" },
      { id: 'zinger-wings', code: "a4", name: 'Zinger Wings', description: 'Crispy zinger style wings', price: 'Rs. 599',is3DModel: true,  modelPath: "/models/pasta/pa4.glb" },
      { id: 'garlic-mayo-fries', code: "a5", name: 'Garlic Mayo Fries', description: 'Fries with garlic mayo', price: 'Rs. 399',is3DModel: true,  modelPath: "/models/pasta/pa5.glb" },
    ]
  },

  chinese: {
    label: 'Chinese',
    icon: Fish,
    items: [
      { id: 'chicken-manchurian', code: "ch1", name: 'Chicken Manchurian', description: 'Chicken balls in manchurian sauce', price: 'Rs. 849', is3DModel: true, modelPath:"/models/chines/ch1.glb" },
      { id: 'chicken-chili-dry', code: "ch2", name: 'Chicken Chili Dry', description: 'Dry chili chicken', price: 'Rs. 1,199',is3DModel: true, modelPath:"/models/chines/ch2.glb" },
      { id: 'beef-chili-dry', code: "ch3", name: 'Beef Chili Dry', description: 'Dry chili beef', price: 'Rs. 899', is3DModel: true, modelPath:"/models/chines/ch3.glb" },
      { id: 'vegetable-fried-rice', code: "ch4", name: 'Vegetable Fried Rice', description: 'Classic veg fried rice', price: 'Rs. 349', is3DModel: true, modelPath:"/models/chines/ch4.glb" },
      { id: 'masala-rice', code: "ch5", name: 'Masala Rice', description: 'Spiced masala rice', price: 'Rs. 349',is3DModel: true, modelPath:"/models/chines/ch5.glb" },
    ]
  },

  soups: {
    label: 'Soups',
    icon: Salad,
    items: [
      { id: 'hot-sour-soup', code: "so1", name: 'Hot & Sour Soup', description: 'Spicy and tangy soup', price: 'Rs. 199', large: 'Rs. 799', is3DModel: true, modelPath:"/models/soup/so1.glb" },
      { id: 'chicken-corn-soup', code: "so2", name: 'Chicken Corn Soup', description: 'Sweet corn with chicken', price: 'Rs. 199', large: 'Rs. 799', is3DModel: true, modelPath:"/models/soup/so2.glb" },
      { id: 'dream-special-salad', code: "so3", name: 'Dream Special Salad', description: 'Signature house salad', price: 'Rs. 450', is3DModel: true, modelPath:"/models/soup/so3.glb" },
    ]
  },

  wraps: {
    label: 'Wraps',
    icon: Sandwich,
    items: [
      { id: 'bbq-chicken-wrap', code: "w1", name: 'B.B.Q Chicken Wrap', description: 'BBQ chicken in tortilla', price: 'Rs. 349', is3DModel: true, modelPath:"/models/wrap/wr1.glb" },
      { id: 'grill-chicken-wrap', code: "w2", name: 'Grill Chicken Wrap', description: 'Grilled chicken wrap', price: 'Rs. 349', is3DModel: true, modelPath:"/models/wrap/wr2.glb" },
      { id: 'zinger-chicken-wrap', code: "w3", name: 'Zinger Chicken Wrap', description: 'Crispy zinger wrap', price: 'Rs. 349', is3DModel: true, modelPath:"/models/wrap/wr3.glb" },
      { id: 'chicken-shawarma', code: "w4", name: 'Chicken Shawarma', description: 'Classic chicken shawarma', price: 'Rs. 200', is3DModel: true, modelPath:"/models/wrap/wr4.glb" },
    ]
  }
};