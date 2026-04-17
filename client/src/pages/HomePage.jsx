import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './HomePage.css';

const categories = [
  { name: 'Casual Wear', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
  { name: 'Party Wear', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80' },
  { name: 'Traditional', img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80' },
  { name: 'Western', img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80' },
];

const featuredProducts = [
  { id: 1, name: 'Floral Summer Dress', price: 1299, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80', category: 'Summer' },
  { id: 2, name: 'Elegant Evening Gown', price: 4999, img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80', category: 'Party' },
  { id: 3, name: 'Boho Maxi Dress', price: 1899, img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80', category: 'Boho' },
  { id: 4, name: 'Little Black Dress', price: 2499, img: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=500&q=80', category: 'Party' },
];

const HomePage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({ ...product, _id: String(product.id), image: product.img });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="app">
      {/* Hero */}
      <section className="hero" id="home">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" alt="Fashion Model" className="hero-img" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">New Collection 2026</span>
          <h1>Dress to <br/><span className="gradient-text">Impress</span></h1>
          <p>Discover the latest trends in women's fashion. Refresh your wardrobe with our elegant and comfortable styles.</p>
          <div className="hero-btns">
            <Link to="/products"><button className="btn-secondary">Explore Collection</button></Link>
            <a href="#categories"><button className="btn-outline">Browse Categories</button></a>
          </div>
          <div className="hero-stats">
            <div className="stat"><span>500+</span><p>Styles</p></div>
            <div className="stat-divider"></div>
            <div className="stat"><span>50K+</span><p>Happy Customers</p></div>
            <div className="stat-divider"></div>
            <div className="stat"><span>4.9★</span><p>Rating</p></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">Find your perfect style in our curated categories</p>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <Link to="/products" key={i} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <div className="category-overlay">
                <div className="category-name">{cat.name}</div>
                <span>Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="section" id="shop">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <p className="section-subtitle">Hand-picked favourites loved by thousands</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-img-wrap">
                <img src={product.img} alt={product.name} className="product-img" />
                <div className="product-quick-view">
                  <Link to="/products">Quick View</Link>
                </div>
              </div>
              <div className="product-info">
                <span className="product-tag">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-footer-row">
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <button className="btn-buy" onClick={() => handleAddToCart(product)}>+ Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-wrap">
          <Link to="/products"><button className="btn-view-all">View Full Collection →</button></Link>
        </div>
      </section>

      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h2>Flat 50% Off!</h2>
          <p>On all orders above ₹2,999. Use code: <strong>STYLE50</strong></p>
          <Link to="/products"><button className="btn-secondary">Shop Sale</button></Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-col brand">
            <div className="logo">StyleHub</div>
            <p>Your ultimate destination for modern, elegant, and stylish women's clothing.</p>
            <div className="social-icons">
              <div className="social-icon">In</div>
              <div className="social-icon">Fb</div>
              <div className="social-icon">Tw</div>
            </div>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <Link to="/">About Us</Link>
            <Link to="/products">New Arrivals</Link>
            <a href="#categories">Categories</a>
            <a href="#contact">FAQs</a>
          </div>
          <div className="footer-col">
            <h3>Policies</h3>
            <a href="#">Return Policy</a>
            <a href="#">Shipping Info</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p>Email: hello@stylehub.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Mumbai, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 StyleHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
