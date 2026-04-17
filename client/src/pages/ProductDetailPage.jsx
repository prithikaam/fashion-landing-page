import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        toast.error('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;
  if (!product) return null;

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-price">₹{product.price.toLocaleString()}</div>
          <div className="detail-stock">
            {product.countInStock > 0
              ? <span className="in-stock">✓ In Stock ({product.countInStock} left)</span>
              : <span className="out-stock">✗ Out of Stock</span>}
          </div>
          {product.countInStock > 0 && (
            <div className="detail-actions">
              <div className="qty-selector">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}>+</button>
              </div>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          )}
          <button className="back-btn" onClick={() => navigate('/products')}>← Back to Shop</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
