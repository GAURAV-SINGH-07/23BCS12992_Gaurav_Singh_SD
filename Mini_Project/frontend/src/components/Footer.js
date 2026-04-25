
import React from 'react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <button className="footer__back-to-top" onClick={scrollToTop}>
        Back to top
      </button>
      <div className="footer__links">
        <div className="footer__column">
          <h4>Get to Know Us</h4>
          <a href="#!">About Us</a>
          <a href="#!">Careers</a>
          <a href="#!">Press Releases</a>
          <a href="#!">Amazon Science</a>
        </div>
        <div className="footer__column">
          <h4>Connect with Us</h4>
          <a href="#!">Facebook</a>
          <a href="#!">Twitter</a>
          <a href="#!">Instagram</a>
        </div>
        <div className="footer__column">
          <h4>Make Money with Us</h4>
          <a href="#!">Sell on Amazon</a>
          <a href="#!">Sell under Private Brands</a>
          <a href="#!">Become an Affiliate</a>
          <a href="#!">Advertise Your Products</a>
        </div>
        <div className="footer__column">
          <h4>Let Us Help You</h4>
          <a href="#!">COVID-19 and Amazon</a>
          <a href="#!">Your Account</a>
          <a href="#!">Returns Centre</a>
          <a href="#!">Shipping Rates & Policies</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span className="footer__logo">amazon</span>
        <p>© 2024, Amazon Clone — Educational Project</p>
      </div>
    </footer>
  );
};

export default Footer;