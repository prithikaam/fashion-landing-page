import React from 'react';
import './App.css';

function App() {
  const categories = [
    { name: 'Casual Wear', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' },
    { name: 'Party Wear', img: '/party-wear.png' },
    { name: 'Traditional', img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80' },
    { name: 'Western', img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=600&q=80' }
  ];

  const products = [
    { id: 1, name: 'Floral Summer Dress', price: '\u20B91,299', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=80' },
    { id: 2, name: 'Elegant Evening Gown', price: '\u20B93,499', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80' },
    { id: 3, name: 'Classic Denim Jacket', price: '\u20B91,899', img: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80' },
    { id: 4, name: 'Printed Silk Saree', price: '\u20B94,299', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80' }
  ];

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">StyleHub</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#contact">Contact</a>
          <button className="btn-primary">Shop Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="Fashion Model"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>New Summer Collection 2026</h1>
          <p>Discover the latest trends in women's fashion. Refresh your wardrobe with our elegant and comfortable styles.</p>
          <button className="btn-secondary">Explore Collection</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section" id="categories">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div className="category-card" key={index}>
              <img src={category.img} alt={category.name} />
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="section" id="shop">
        <h2 className="section-title">Trending Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.img} alt={product.name} className="product-img" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <div className="product-price">{product.price}</div>
                <button className="btn-buy">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offer Banner */}
      <div className="banner">
        <h2>Flat 50% Off!</h2>
        <p>On all orders above ₹2,999. Use code: STYLE50</p>
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
            <a href="#home">About Us</a>
            <a href="#shop">New Arrivals</a>
            <a href="#categories">Size Guide</a>
            <a href="#contact">FAQs</a>
          </div>
          <div className="footer-col">
            <h3>Policies</h3>
            <a href="#home">Return Policy</a>
            <a href="#home">Shipping Info</a>
            <a href="#home">Privacy Policy</a>
            <a href="#home">Terms of Service</a>
          </div>
          <div className="footer-col">
            <h3>Contact Us</h3>
            <p>Email: hello@stylehub.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Mumbai, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 StyleHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
