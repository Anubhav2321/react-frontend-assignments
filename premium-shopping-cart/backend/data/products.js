// Helper to generate random reviews
const generateReviews = () => {
  const reviews = [];
  const names = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley"];
  const comments = ["Absolutely stunning quality!", "Fast shipping, looks exactly like the photo.", "Decent, but slightly overpriced.", "Perfect fit! Highly recommend.", "Incredible build quality.", "My favorite purchase this year!"];
  
  const count = Math.floor(Math.random() * 4) + 1; // 1 to 4 reviews
  for(let i = 0; i < count; i++) {
    reviews.push({
      id: Math.random().toString(36).substr(2, 9),
      user: names[Math.floor(Math.random() * names.length)],
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
      comment: comments[Math.floor(Math.random() * comments.length)]
    });
  }
  return reviews;
};

let products = [
  // Electronics
  {
    id: 1,
    name: "Quantum Mechanical Keyboard",
    brand: "TechNova",
    price: 12400,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["RGB Backlight", "Cherry MX", "Wireless"],
    reviews: generateReviews()
  },
  {
    id: 2,
    name: "Virtual Reality Headset Pro",
    brand: "OmniVR",
    price: 39920,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["4K Resolution", "120Hz", "Eye Tracking"],
    reviews: generateReviews()
  },
  {
    id: 3,
    name: "High-Fidelity Wireless Headphones",
    brand: "SonicBoom",
    price: 23920,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Noise Cancelling", "40hr Battery", "Bluetooth 5.2"],
    reviews: generateReviews()
  },
  {
    id: 4,
    name: "Smart Watch Elite",
    brand: "ChronoTech",
    price: 15920,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Heart Rate", "Waterproof", "OLED Display"],
    reviews: generateReviews()
  },
  // Dresses
  {
    id: 5,
    name: "Holographic Evening Dress",
    brand: "Lumina",
    price: 27200,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733958-699f4ff8933b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Silk", "Color-shifting", "Dry Clean Only"],
    reviews: generateReviews()
  },
  {
    id: 6,
    name: "Cyberpunk Streetwear Gown",
    brand: "NeonThreads",
    price: 16800,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1583391733958-699f4ff8933b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583391733958-699f4ff8933b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Cotton", "LED Trim", "Custom Fit"],
    reviews: generateReviews()
  },
  {
    id: 7,
    name: "Velvet Cocktail Dress",
    brand: "Noir",
    price: 14400,
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Velvet", "Deep Black", "Elegant"],
    reviews: generateReviews()
  },
  // Shoes
  {
    id: 8,
    name: "Neon Glow Sneakers",
    brand: "CyberWear",
    price: 9600,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Size 9-12", "LED Soles", "Breathable"],
    reviews: generateReviews()
  },
  {
    id: 9,
    name: "Urban Combat Boots",
    brand: "TitanFootwear",
    price: 13200,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Leather", "Steel Toe", "Anti-Slip"],
    reviews: generateReviews()
  },
  {
    id: 10,
    name: "Anti-Gravity Running Shoes",
    brand: "AeroGlide",
    price: 11600,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Ultra Light", "Foam Sole", "Reflective"],
    reviews: generateReviews()
  },
  // Bags
  {
    id: 11,
    name: "Tactical Tech Backpack",
    brand: "GridRunner",
    price: 10400,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Waterproof", "Laptop Sleeve", "USB Port"],
    reviews: generateReviews()
  },
  {
    id: 12,
    name: "Holographic Tote Bag",
    brand: "Lumina",
    price: 6000,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Vegan Leather", "Iridescent", "Spacious"],
    reviews: generateReviews()
  },
  {
    id: 13,
    name: "Minimalist Messenger Bag",
    brand: "UrbanMatrix",
    price: 7200,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Canvas", "Crossbody", "Durable"],
    reviews: generateReviews()
  },
  // Bottles
  {
    id: 14,
    name: "Smart Hydration Flask",
    brand: "HydroTech",
    price: 4400,
    category: "Bottles",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["Vacuum Insulated", "Temp Display", "1L"],
    reviews: generateReviews()
  },
  {
    id: 15,
    name: "Neon Sports Bottle",
    brand: "CyberWear",
    price: 2000,
    category: "Bottles",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    specs: ["BPA Free", "Squeeze", "750ml"],
    reviews: generateReviews()
  }
];

module.exports = {
  getProducts: () => products,
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      images: [product.image, product.image],
      reviews: generateReviews()
    };
    products.push(newProduct);
    return newProduct;
  }
};
