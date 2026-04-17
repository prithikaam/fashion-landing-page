import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: '', city: '', postalCode: '', country: 'India', paymentMethod: 'Cash on Delivery',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.address || !form.city || !form.postalCode) return toast.error('Please fill in all fields');
    setLoading(true);
    try {
      await API.post('/orders', {
        orderItems: cartItems.map((item) => ({
          name: item.name, qty: item.qty, image: item.image, price: item.price, product: item._id,
        })),
        shippingAddress: { address: form.address, city: form.city, postalCode: form.postalCode, country: form.country },
        paymentMethod: form.paymentMethod,
        totalPrice,
      });
      clearCart();
      setSuccess(true);
      toast.success('Order placed successfully! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-success">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h1>Order Placed!</h1>
          <p>Thank you for shopping with StyleHub. Your order is being processed.</p>
          <button className="success-btn" onClick={() => navigate('/products')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Almost there! Complete your order below.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>📦 Shipping Address</h2>
            <div className="form-group">
              <label>Street Address</label>
              <input name="address" placeholder="123 Fashion Street" value={form.address} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="city" placeholder="Mumbai" value={form.city} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input name="postalCode" placeholder="400001" value={form.postalCode} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input name="country" value={form.country} onChange={handleChange} />
            </div>
          </div>

          <div className="form-section">
            <h2>💳 Payment Method</h2>
            <div className="payment-options">
              {['Cash on Delivery', 'UPI', 'Net Banking'].map((method) => (
                <label key={method} className={`payment-option ${form.paymentMethod === method ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="place-order-btn" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order • ₹${totalPrice.toLocaleString()}`}
          </button>
        </form>

        <div className="order-summary-box">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div className="summary-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p className="summary-qty">Qty: {item.qty}</p>
              </div>
              <span>₹{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
