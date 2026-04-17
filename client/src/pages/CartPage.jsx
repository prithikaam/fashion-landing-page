import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="cart-empty-content">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any dresses yet.</p>
          <Link to="/products"><button className="shop-now-btn">Browse Collection</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <span>{cartItems.length} item(s)</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
              </div>
              <div className="cart-item-controls">
                <div className="qty-selector">
                  <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                </div>
                <p className="item-subtotal">₹{(item.price * item.qty).toLocaleString()}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>🗑 Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button className="checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout →
          </button>
          <Link to="/products" className="continue-shopping">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
