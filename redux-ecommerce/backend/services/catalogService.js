/**
 * Catalog Service
 * Handles fetching authoritative product details from the Fake Store API
 * with in-memory caching and fallback catalog for resilient offline/network protection.
 * Ensures the backend NEVER trusts client-submitted prices or totals.
 * All prices are authoritatively normalized into Indian Rupees (INR / ₹).
 */

export const USD_TO_INR_RATE = 85;

// Fallback seed catalog matching Fake Store API standard products in INR (₹)
const FALLBACK_CATALOG = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 9345.75, // 109.95 * 85
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 1895.5, // 22.3 * 85
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket',
    price: 4759.15, // 55.99 * 85
    description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit',
    price: 1359.15, // 15.99 * 85
    description: 'The color could be slightly different between on the screen and in practice. Hand wash or machine wash.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 59075.0, // 695.0 * 85
    description: 'From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean\'s pearl.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave',
    price: 14280.0, // 168.0 * 85
    description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png',
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: 'White Gold Plated Princess',
    price: 849.15, // 9.99 * 85
    description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
    rating: { rate: 3.0, count: 400 },
  },
  {
    id: 8,
    title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
    price: 934.15, // 10.99 * 85
    description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png',
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
    price: 5440.0, // 64.0 * 85
    description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 9265.0, // 109.0 * 85
    description: 'Easy upgrade for faster boot up, shutdown, application load and response. Boosts burst write performance.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png',
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
    price: 9265.0, // 109.0 * 85
    description: '3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer read speeds up to 500MB/s.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png',
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
    price: 9690.0, // 114.0 * 85
    description: 'Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png',
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
    price: 50915.0, // 599.0 * 85
    description: '21.5 inches Full HD widescreen IPS display. AMD Radeon FreeSync technology. Zero-frame design.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png',
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor',
    price: 84999.15, // 999.99 * 85
    description: '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png',
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 4844.15, // 56.99 * 85
    description: 'Note: The Jackets is US standard size, Please choose size as your usual wear. Material: 100% Polyester.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png',
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 2545.75, // 29.95 * 85
    description: '100% POLYURETHANE (shell) 100% POLYESTER (lining). Faux leather material for style and comfort.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png',
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
    price: 3399.15, // 39.99 * 85
    description: 'Lightweight perfect for light trips, adjustable drawstring waist and hood, waterproof and windproof.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png',
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V Neck T-Shirt",
    price: 837.25, // 9.85 * 85
    description: '95% RAYON 5% SPANDEX, Made in USA or Imported, Pull On closure, Machine Wash Cold.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png',
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 675.75, // 7.95 * 85
    description: '100% Polyester, Machine wash, 100% cationic polyester interlock, Lightweight, roomy and highly breathable.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png',
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: 'DANVOUY Womens T Shirt Casual Cotton Short',
    price: 1104.15, // 12.99 * 85
    description: '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees The fabric is soft and has some stretch.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png',
    rating: { rate: 3.6, count: 145 },
  },
];

// In-memory cache for live external catalog
let cachedProducts = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch all products from external Fake Store API with cache, converting to INR.
 */
export const getAllProducts = async () => {
  const now = Date.now();
  if (cachedProducts && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedProducts;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('https://fakestoreapi.com/products', {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Normalize prices into INR (₹)
        cachedProducts = data.map((item) => ({
          ...item,
          price: Number((item.price * USD_TO_INR_RATE).toFixed(2)),
        }));
        cacheTimestamp = now;
        return cachedProducts;
      }
    }
  } catch (err) {
    console.warn(`[CatalogService] FakeStoreAPI unreachable (${err.message}). Using authoritative INR fallback catalog.`);
  }

  // Use robust fallback catalog
  cachedProducts = FALLBACK_CATALOG;
  cacheTimestamp = now;
  return FALLBACK_CATALOG;
};

/**
 * Fetch single authoritative product by ID in INR.
 */
export const getProductById = async (id) => {
  const numericId = Number(id);
  const products = await getAllProducts();
  const product = products.find((p) => Number(p.id) === numericId);

  if (!product) {
    const fallback = FALLBACK_CATALOG.find((p) => Number(p.id) === numericId);
    if (fallback) return fallback;
    return null;
  }
  return product;
};

/**
 * Authoritatively calculates and recalculates order line items, subtotal, shipping, tax, and total.
 * NEVER trusts client-submitted prices or totals.
 *
 * @param {Array<{ productId: number|string, quantity: number }>} rawItems
 * @returns {Promise<{ items: Array, subtotal: number, shippingCost: number, tax: number, total: number }>}
 */
export const calculateAuthoritativeOrder = async (rawItems) => {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  const verifiedItems = [];
  let subtotal = 0;

  for (const rawItem of rawItems) {
    const quantity = parseInt(rawItem.quantity, 10);
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity (${rawItem.quantity}) for product ID ${rawItem.productId}`);
    }

    const authoritativeProduct = await getProductById(rawItem.productId);
    if (!authoritativeProduct) {
      throw new Error(`Product with ID ${rawItem.productId} does not exist in catalog`);
    }

    const unitPrice = Number(authoritativeProduct.price);
    const itemTotal = Number((unitPrice * quantity).toFixed(2));
    subtotal += itemTotal;

    verifiedItems.push({
      productId: authoritativeProduct.id,
      title: authoritativeProduct.title,
      price: unitPrice,
      quantity,
      image: authoritativeProduct.image || '',
      category: authoritativeProduct.category || 'General',
      itemTotal,
    });
  }

  subtotal = Number(subtotal.toFixed(2));

  // Business Rules for Indian Shipping:
  // Free delivery on orders ₹999 or above. Otherwise ₹99 standard shipping.
  const shippingCost = subtotal >= 999 || subtotal === 0 ? 0.0 : 99.0;

  // Business Rules for GST: 5% Goods and Services Tax rounded to 2 decimal places
  const tax = Number((subtotal * 0.05).toFixed(2));

  // Final total in INR
  const total = Number((subtotal + shippingCost + tax).toFixed(2));

  return {
    items: verifiedItems,
    subtotal,
    shippingCost,
    tax,
    total,
  };
};
