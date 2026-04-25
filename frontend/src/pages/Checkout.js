
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getSubtotal, fetchCart, fetchCartCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    shipping_name: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip: '',
    shipping_phone: '',
  });

  const subtotal = getSubtotal();
  const shipping = 0;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    for (const key of Object.keys(form)) {
      if (!form[key].trim()) {
        toast.error('Please fill in all fields');
        return;
      }
    }

    try {
      setLoading(true);
      const { data } = await placeOrder(form);
      await fetchCart();
      await fetchCartCount();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout checkout--empty">
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checking out.</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1 className="checkout__heading">Checkout</h1>

      <div className="checkout__content">
        {/* Shipping Form */}
        <div className="checkout__form-section">
          <h2>Shipping Address</h2>
          <form onSubmit={handleSubmit} className="checkout__form">
            <div className="checkout__field">
              <label htmlFor="shipping_name">Full Name</label>
              <input
                type="text"
                id="shipping_name"
                name="shipping_name"
                value={form.shipping_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="checkout__field">
              <label htmlFor="shipping_phone">Phone Number</label>
              <input
                type="tel"
                id="shipping_phone"
                name="shipping_phone"
                value={form.shipping_phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <div className="checkout__field">
              <label htmlFor="shipping_address">Address</label>
              <input
                type="text"
                id="shipping_address"
                name="shipping_address"
                value={form.shipping_address}
                onChange={handleChange}
                placeholder="123 Main Street, Apt 4B"
                required
              />
            </div>

            <div className="checkout__row">
              <div className="checkout__field">
                <label htmlFor="shipping_city">City</label>
                <input
                  type="text"
                  id="shipping_city"
                  name="shipping_city"
                  value={form.shipping_city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  required
                />
              </div>
              <div className="checkout__field">
                <label htmlFor="shipping_state">State</label>
                <input
                  type="text"
                  id="shipping_state"
                  name="shipping_state"
                  value={form.shipping_state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  required
                />
              </div>
              <div className="checkout__field">
                <label htmlFor="shipping_zip">ZIP Code</label>
                <input
                  type="text"
                  id="shipping_zip"
                  name="shipping_zip"
                  value={form.shipping_zip}
                  onChange={handleChange}
                  placeholder="400001"
                  required
                />
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="checkout__items-preview">
              <h3>
                Items ({totalItems})
              </h3>
              {cartItems.map((item) => (
                <div key={item.id} className="checkout__preview-item">
                  <img
                    src={
                      item.product.images?.[0] ||
                      'https://via.placeholder.com/60x60?text=N'
                    }
                    alt={item.product.name}
                  />
                  <div className="checkout__preview-info">
                    <p className="checkout__preview-name">
                      {item.product.name}
                    </p>
                    <p className="checkout__preview-qty">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="checkout__preview-price">
                    ₹
                    {(parseFloat(item.product.price) * item.quantity).toLocaleString(
                      'en-IN',
                      { minimumFractionDigits: 2 }
                    )}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="checkout__place-order-btn"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place your order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="checkout__summary">
          <div className="checkout__summary-inner">
            <h2>Order Summary</h2>

            <div className="checkout__summary-row">
              <span>Items ({totalItems}):</span>
              <span>
                ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="checkout__summary-row">
              <span>Shipping & handling:</span>
              <span className="checkout__summary-free">FREE</span>
            </div>

            <div className="checkout__summary-divider" />

            <div className="checkout__summary-row checkout__summary-total">
              <span>Order total:</span>
              <span>
                ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;