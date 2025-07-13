const products = [
  {
    id: 1,
    name: "Classic Vanilla Birthday Cake",
    category: "cakes",
    price: 45.99,
    image: "/assets/images/products/vanilla-cake.jpg",
    description:
      "A classic vanilla sponge cake with buttercream frosting, perfect for birthdays and celebrations.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minServings: 8,
    maxServings: 16,
    options: [
      {
        name: "Size",
        choices: ["6 inch", "8 inch", "10 inch", "12 inch"],
      },
      {
        name: "Frosting Color",
        choices: ["White", "Pink", "Blue", "Yellow", "Purple", "Green"],
      },
    ],
  },
  {
    id: 2,
    name: "Decadent Chocolate Fudge Cake",
    category: "cakes",
    price: 49.99,
    image: "/assets/images/products/chocolate-cake.jpg",
    description:
      "Rich, moist chocolate sponge with a deep chocolate fudge frosting. A chocolate lover's dream!",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten", "Soy"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minServings: 8,
    maxServings: 16,
    options: [
      {
        name: "Size",
        choices: ["6 inch", "8 inch", "10 inch", "12 inch"],
      },
      {
        name: "Additional",
        choices: [
          "Add chocolate shavings",
          "Add chocolate ganache",
          "Add chocolate-covered strawberries",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    category: "cakes",
    price: 52.99,
    image: "/assets/images/products/red-velvet-cake.jpg",
    description:
      "Smooth and velvety cake with a hint of cocoa, topped with cream cheese frosting.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minServings: 8,
    maxServings: 16,
    options: [
      {
        name: "Size",
        choices: ["6 inch", "8 inch", "10 inch", "12 inch"],
      },
    ],
  },
  {
    id: 4,
    name: "Lemon Drizzle Cake",
    category: "cakes",
    price: 47.99,
    image: "/assets/images/products/lemon-cake.jpg",
    description:
      "Light and zesty lemon sponge with a tangy lemon drizzle and buttercream frosting.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minServings: 8,
    maxServings: 14,
    options: [
      {
        name: "Size",
        choices: ["6 inch", "8 inch", "10 inch"],
      },
    ],
  },
  {
    id: 5,
    name: "Carrot Cake",
    category: "cakes",
    price: 48.99,
    image: "/assets/images/products/carrot-cake.jpg",
    description:
      "Moist carrot cake with cinnamon spices and cream cheese frosting, topped with walnuts.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten", "Nuts"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minServings: 8,
    maxServings: 16,
    options: [
      {
        name: "Size",
        choices: ["6 inch", "8 inch", "10 inch", "12 inch"],
      },
      {
        name: "Nuts",
        choices: ["With walnuts", "Without nuts"],
      },
    ],
  },
  {
    id: 6,
    name: "Classic Vanilla Cupcakes",
    category: "cupcakes",
    price: 24.99,
    image: "/assets/images/products/vanilla-cupcakes.jpg",
    description:
      "Classic vanilla cupcakes topped with buttercream frosting. Perfect for any occasion.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minQuantity: 6,
    maxQuantity: 24,
    options: [
      {
        name: "Quantity",
        choices: ["6 cupcakes", "12 cupcakes", "24 cupcakes"],
      },
      {
        name: "Frosting Color",
        choices: [
          "White",
          "Pink",
          "Blue",
          "Yellow",
          "Purple",
          "Green",
          "Assorted colors",
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Double Chocolate Cupcakes",
    category: "cupcakes",
    price: 26.99,
    image: "/assets/images/products/chocolate-cupcakes.jpg",
    description:
      "Rich chocolate cupcakes with chocolate buttercream frosting. A chocolate lover's delight!",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten", "Soy"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minQuantity: 6,
    maxQuantity: 24,
    options: [
      {
        name: "Quantity",
        choices: ["6 cupcakes", "12 cupcakes", "24 cupcakes"],
      },
      {
        name: "Toppings",
        choices: ["Chocolate shavings", "Chocolate chips", "None"],
      },
    ],
  },
  {
    id: 8,
    name: "Red Velvet Cupcakes",
    category: "cupcakes",
    price: 27.99,
    image: "/assets/images/products/red-velvet-cupcakes.jpg",
    description:
      "Velvety red cupcakes with a hint of cocoa, topped with cream cheese frosting.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minQuantity: 6,
    maxQuantity: 24,
    options: [
      {
        name: "Quantity",
        choices: ["6 cupcakes", "12 cupcakes", "24 cupcakes"],
      },
    ],
  },
  {
    id: 9,
    name: "Assorted Mini Cupcakes",
    category: "cupcakes",
    price: 29.99,
    image: "/assets/images/products/mini-cupcakes.jpg",
    description:
      "Bite-sized assorted cupcakes in various flavors and colors. Perfect for parties and events.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten", "Soy"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minQuantity: 12,
    maxQuantity: 48,
    options: [
      {
        name: "Quantity",
        choices: ["12 cupcakes", "24 cupcakes", "36 cupcakes", "48 cupcakes"],
      },
      {
        name: "Flavors",
        choices: [
          "Vanilla assortment",
          "Chocolate assortment",
          "Mixed flavors",
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Chocolate Chip Cookies",
    category: "cookies",
    price: 18.99,
    image: "/assets/images/products/chocolate-chip-cookies.jpg",
    description:
      "Classic chocolate chip cookies with a soft center and crispy edges.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten", "Soy"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minQuantity: 6,
    maxQuantity: 24,
    options: [
      {
        name: "Quantity",
        choices: ["6 cookies", "12 cookies", "24 cookies"],
      },
    ],
  },
  {
    id: 11,
    name: "Vanilla Wedding Cake",
    category: "wedding",
    price: 349.99,
    image: "/assets/images/products/wedding-cake.jpg",
    description:
      "Elegant multi-tiered vanilla wedding cake with delicate decorations. Customizable to match your wedding theme.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minServings: 50,
    maxServings: 200,
    options: [
      {
        name: "Tiers",
        choices: ["2 tiers", "3 tiers", "4 tiers"],
      },
      {
        name: "Design",
        choices: [
          "Classic white",
          "Floral",
          "Modern",
          "Custom (please specify in order notes)",
        ],
      },
    ],
  },
  {
    id: 12,
    name: "French Macarons",
    category: "pastries",
    price: 24.99,
    image: "/assets/images/products/macarons.jpg",
    description:
      "Delicate French macarons in assorted flavors. Perfect for gifts or special occasions.",
    allergens: ["Eggs", "Dairy", "Nuts"],
    isAvailable: true,
    isFeatured: true,
    customizable: true,
    minQuantity: 6,
    maxQuantity: 24,
    options: [
      {
        name: "Quantity",
        choices: ["6 macarons", "12 macarons", "24 macarons"],
      },
      {
        name: "Flavors",
        choices: [
          "Chef's selection",
          "Chocolate & vanilla",
          "Fruity selection",
          "Custom selection (specify in notes)",
        ],
      },
    ],
  },
  {
    id: 13,
    name: "Fruit Tart",
    category: "pastries",
    price: 32.99,
    image: "/assets/images/products/fruit-tart.jpg",
    description:
      "Buttery pastry crust filled with vanilla custard and topped with fresh seasonal fruits.",
    allergens: ["Eggs", "Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    options: [
      {
        name: "Size",
        choices: [
          "Individual (4 inch)",
          "Small (6 inch)",
          "Medium (8 inch)",
          "Large (10 inch)",
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Croissants",
    category: "pastries",
    price: 17.99,
    image: "/assets/images/products/croissants.jpg",
    description:
      "Buttery, flaky croissants baked to golden perfection. Available plain or with fillings.",
    allergens: ["Dairy", "Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minQuantity: 4,
    maxQuantity: 12,
    options: [
      {
        name: "Quantity",
        choices: ["4 croissants", "6 croissants", "12 croissants"],
      },
      {
        name: "Type",
        choices: ["Plain", "Chocolate", "Almond", "Assorted"],
      },
    ],
  },
  {
    id: 15,
    name: "Gluten-Free Chocolate Cake",
    category: "dietary-specific",
    price: 54.99,
    image: "/assets/images/products/gluten-free-cake.jpg",
    description:
      "Rich chocolate cake made with gluten-free flour, perfect for those with gluten sensitivities.",
    allergens: ["Eggs", "Dairy"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minServings: 8,
    maxServings: 12,
    options: [
      {
        name: "Size",
        choices: ["6 inch", "8 inch"],
      },
    ],
  },
  {
    id: 16,
    name: "Vegan Vanilla Cupcakes",
    category: "dietary-specific",
    price: 28.99,
    image: "/assets/images/products/vegan-cupcakes.jpg",
    description:
      "Delicious vanilla cupcakes made without animal products. Topped with vegan buttercream frosting.",
    allergens: ["Wheat", "Gluten"],
    isAvailable: true,
    isFeatured: false,
    customizable: true,
    minQuantity: 6,
    maxQuantity: 12,
    options: [
      {
        name: "Quantity",
        choices: ["6 cupcakes", "12 cupcakes"],
      },
      {
        name: "Frosting Color",
        choices: [
          "White",
          "Pink",
          "Blue",
          "Yellow",
          "Purple",
          "Green",
          "Assorted colors",
        ],
      },
    ],
  },
];

export const categories = [
  {
    id: "cakes",
    name: "Cakes",
    description: "Delicious cakes for all occasions",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    description: "Perfect individual treats",
  },
  {
    id: "cookies",
    name: "Cookies",
    description: "Freshly baked cookies",
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Special cakes for your big day",
  },
  {
    id: "pastries",
    name: "Pastries",
    description: "Fine pastries and desserts",
  },
  {
    id: "dietary-specific",
    name: "Dietary Specific",
    description: "Vegan, gluten-free, and other options",
  },
];

export default products;
