
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, getSubtotal } = useCart();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty-page">
        <div className="cart__empty">
          <h2>Your Amazon Cart is empty</h2>
          <p>
            Check your Saved for later items below or{' '}
            <Link to="/">continue shopping</Link>.
          </p>
          <Link to="/" className="cart__empty-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__content">
        {/* Cart Items */}
        <div className="cart__items-section">
          <h1 className="cart__heading">Shopping Cart</h1>
          <p className="cart__deselect">Price</p>

          <div className="cart__divider" />

          {cartItems.map((item) => (
            <div key={item.id} className="cart__item">
              <div className="cart__item-image-wrapper">
                <Link to={`/product/${item.product.id}`}>
                  <img
                    src={
                      item.product.images?.[0] ||
                      'https://via.placeholder.com/180x180?text=No+Image'
                    }
                    alt={item.product.name}
                    className="cart__item-image"
                  />
                </Link>
              </div>

              <div className="cart__item-details">
                <Link
                  to={`/product/${item.product.id}`}
                  className="cart__item-title"
                >
                  {item.product.name}
                </Link>

                {item.product.stock_quantity > 0 ? (
                  <p className="cart__item-stock cart__item-stock--in">
                    In Stock
                  </p>
                ) : (
                  <p className="cart__item-stock cart__item-stock--out">
                    Out of Stock
                  </p>
                )}

                {item.product.brand && (
                  <p className="cart__item-brand">by {item.product.brand}</p>
                )}

                <div className="cart__item-actions">
                  <div className="cart__item-qty">
                    <label>Qty:</label>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    >
                      {[...Array(Math.min(item.product.stock_quantity, 10))].map(
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <span className="cart__item-separator">|</span>

                  <button
                    className="cart__item-delete"
                    onClick={() => removeItem(item.id)}
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>

              <div className="cart__item-price">
                <span className="cart__item-price-value">
                  ₹
                  {parseFloat(item.product.price).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          ))}

          <div className="cart__divider" />

          <div className="cart__items-subtotal">
            Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
            <strong>
              ₹
              {subtotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </strong>
          </div>
        </div>

        {/* Checkout Box */}
        <div className="cart__checkout-box">
          <div className="cart__checkout-inner">
            <p className="cart__checkout-free">
              ✓ Your order is eligible for FREE Delivery.
            </p>
            <p className="cart__checkout-subtotal">
              Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''}):{' '}
              <strong>
                ₹
                {subtotal.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </p>
            <button
              className="cart__checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;