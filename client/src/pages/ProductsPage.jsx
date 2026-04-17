import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filtered = filter === 'All' ? products : products.filter((p) => p.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Dress Collection</h1>
        <p>Explore our curated selection of beautiful dresses</p>
      </div>

      <div className="filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid-page">
        {filtered.map((product) => (
          <div className="product-card-page" key={product._id}>
            <Link to={`/products/${product._id}`}>
              <div className="product-img-wrap">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <span>View Details</span>
                </div>
              </div>
            </Link>
            <div className="product-info-page">
              <span className="product-category-tag">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="product-desc">{product.description.substring(0, 70)}...</p>
              <div className="product-footer">
                <span className="product-price-tag">₹{product.price.toLocaleString()}</span>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
