
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiMapPin, FiMenu } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      {/* Top Nav */}
      <div className="header__top">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">amazon</span>
          <span className="header__logo-in">.in</span>
        </Link>

        <div className="header__delivery">
          <FiMapPin className="header__delivery-icon" />
          <div>
            <span className="header__delivery-label">Deliver to</span>
            <span className="header__delivery-address">India</span>
          </div>
        </div>

        <form className="header__search" onSubmit={handleSearch}>
          <input
            type="text"
            className="header__search-input"
            placeholder="Search Amazon.in"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="header__search-btn">
            <FiSearch size={22} />
          </button>
        </form>

        <div className="header__nav-items">
          <Link to="/orders" className="header__nav-item">
            <span className="header__nav-line1">Returns</span>
            <span className="header__nav-line2">& Orders</span>
          </Link>

          <Link to="/cart" className="header__cart">
            <div className="header__cart-icon-wrapper">
              <FiShoppingCart size={28} />
              <span className="header__cart-count">{cartCount}</span>
            </div>
            <span className="header__cart-text">Cart</span>
          </Link>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="header__bottom">
        <div className="header__bottom-content">
          <button className="header__bottom-all">
            <FiMenu size={18} />
            <span>All</span>
          </button>
          <Link to="/?category=1" className="header__bottom-link">Electronics</Link>
          <Link to="/?category=2" className="header__bottom-link">Books</Link>
          <Link to="/?category=3" className="header__bottom-link">Clothing</Link>
          <Link to="/?category=4" className="header__bottom-link">Home & Kitchen</Link>
          <Link to="/?category=5" className="header__bottom-link">Sports</Link>
          <Link to="/?category=6" className="header__bottom-link">Beauty</Link>
          <Link to="/orders" className="header__bottom-link">Order History</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;