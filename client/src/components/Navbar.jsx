import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">StyleHub</Link>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
          🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
        {userInfo ? (
          <>
            <span className="nav-user">Hi, {userInfo.name.split(' ')[0]}</span>
            <button className="btn-primary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn-primary" onClick={() => setMenuOpen(false)}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
