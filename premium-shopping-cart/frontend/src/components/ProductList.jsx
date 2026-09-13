import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';
import './ProductList.css';

const CATEGORIES = ['All', 'Watches', 'Electronics', 'Accessories', 'Bags', 'Shoes', 'Fashion', 'Beauty', 'Home', 'Sports'];

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: 'LuxeAura Series X',
    brand: 'LuxeAura',
    price: 12999,
    category: 'Watches',
    image: '/images/watch.jpg',
    specs: ['Mechanical', 'Rose Gold', 'Sapphire Crystal'],
  },
  {
    id: 2,
    name: 'Acoustic Elegance',
    brand: 'Aura',
    price: 349,
    category: 'Electronics',
    image: '/images/headphones.jpg',
    specs: ['Noise Cancelling', 'Wireless', 'Gold Accents'],
  },
  {
    id: 3,
    name: 'Midnight Obsidian',
    brand: 'LuxeAura',
    price: 299,
    category: 'Accessories',
    image: '/images/sunglasses.jpg',
    specs: ['UV Protection', 'Gold Rims', 'Designer'],
  },
  {
    id: 4,
    name: 'T Shirt for Man',
    brand: 'WROGN',
    price: 399,
    category: 'Fashion',
    image: 'https://m.media-amazon.com/images/I/61xTfKaqUlL._SY879_.jpg',
    specs: ['UV Protection', 'Gold Rims', 'Designer'],
  },
  {
    id: 5,
    name: 'T Shirt for Man',
    brand: 'Lymio Polo',
    price: 658,
    category: 'Fashion',
    image: 'https://m.media-amazon.com/images/I/61gGFX2urpL._SX679_.jpg',
    specs: ['UV Protection', 'Gold Rims', 'Designer'],
  },
  {
    id: 6,
    name: 'Samsung Galaxy Z Fold8 Ultra 5G',
    brand: 'Samsung',
    price: 194999,
    category: 'Electronics',
    image: 'https://m.media-amazon.com/images/I/71Ocpa1KaiL._SX679_.jpg',
    specs: ['Mechanical', 'Gold Rims', 'Designer'],
  },
    {
    id: 7,
    name: 'HP Omnibook 3 Intel Core Ultra 5 Series Laptop',
    brand: 'HP Omnibook',
    price: 119990,
    category: 'Electronics',
    image: 'https://rukminim1.flixcart.com/image/1536/1536/xif0q/computer/l/w/f/-original-imahr5dsvvjt5msy.jpeg?q=90',
    specs: ['Glacier Silver Cover & Keyboard Frame, Glacier Gray Base, 1.4 kg, With MS Office)'],
  },  {
    id: 8,
    name: 'SONY PlayStation5 Console (slim)',
    brand: 'SONY',
    price: 54990,
    category: 'Electronics ',
    image: 'https://rukminim1.flixcart.com/image/1536/1536/xif0q/gamingconsole/j/g/z/-enriched-transparent-original-imahhgzqcjwdxgzx.png?q=90',
    specs: ['Mechanical', 'Gold Rims', 'Designer'],
  },
    {
    id: 7,
    name: 'Apple Watch SE 3(2025) GPS 40mm Starlight Aluminium Case',
    brand: 'Apple',
    price: 25900,
    category: 'Watches',
    image: 'https://rukminim1.flixcart.com/image/1536/1536/xif0q/smartwatch/q/6/g/-original-imahftggbrhpfrha.jpeg?q=90',
    specs: ['Mechanical', 'Gold Rims', 'Designer'],
  },
 
];

const ProductList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Simulate loading for premium feel
    setTimeout(() => {
      const stored = localStorage.getItem('luxeAuraProducts');
      if (stored) {
        setProducts(JSON.parse(stored));
      } else {
        setProducts(DEFAULT_PRODUCTS);
        localStorage.setItem('luxeAuraProducts', JSON.stringify(DEFAULT_PRODUCTS));
      }
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <div className="loading-state">CURATING COLLECTION...</div>;
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="product-list-container">
      <div className="list-header">
        <h2 className="section-title">
          AVAILABLE <span className="logo-highlight">PRODUCTS</span>
        </h2>
        
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="SEARCH INVENTORY..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="category-filters">
        {CATEGORIES.map(category => (
          <button 
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">NO EXCLUSIVE PIECES FOUND.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
