
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getOrderById } from '../services/api';
import { FiCheckCircle, FiPackage } from 'react-icons/fi';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="oc__loading">
        <div className="oc__spinner" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="oc__not-found">
        <h2>Order not found</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const orderDate = new Date(order.created_at);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="oc">
      {/* Success Banner */}
      <div className="oc__success-banner">
        <FiCheckCircle size={48} className="oc__success-icon" />
        <div>
          <h1 className="oc__success-title">Order placed, thank you!</h1>
          <p className="oc__success-sub">
            Confirmation will be sent to your email.
          </p>
        </div>
      </div>

      <div className="oc__content">
        {/* Order Info */}
        <div className="oc__info-section">
          <div className="oc__order-id-row">
            <span className="oc__label">Order #</span>
            <span className="oc__order-id">{order.id}</span>
          </div>

          <div className="oc__info-grid">
            <div className="oc__info-card">
              <h3>Shipping Address</h3>
              <p>{order.shipping_name}</p>
              <p>{order.shipping_address}</p>
              <p>
                {order.shipping_city}, {order.shipping_state}{' '}
                {order.shipping_zip}
              </p>
              <p>Phone: {order.shipping_phone}</p>
            </div>

            <div className="oc__info-card">
              <h3>Order Summary</h3>
              <div className="oc__summary-row">
                <span>Item(s) subtotal:</span>
                <span>
                  ₹
                  {parseFloat(order.total_amount).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="oc__summary-row">
                <span>Shipping:</span>
                <span className="oc__free">FREE</span>
              </div>
              <div className="oc__summary-divider" />
              <div className="oc__summary-row oc__summary-total">
                <span>Order Total:</span>
                <span>
                  ₹
                  {parseFloat(order.total_amount).toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="oc__info-card">
              <h3>Delivery Estimate</h3>
              <div className="oc__delivery-estimate">
                <FiPackage size={24} className="oc__package-icon" />
                <div>
                  <p className="oc__delivery-date">
                    {deliveryDate.toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="oc__delivery-label">Estimated delivery</p>
                </div>
              </div>
              <div className="oc__status">
                <span className={`oc__status-badge oc__status-badge--${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="oc__items-section">
            <h2>Order Items</h2>
            {order.items &&
              order.items.map((item) => (
                <div key={item.id} className="oc__item">
                  <Link to={`/product/${item.product.id}`}>
                    <img
                      src={
                        item.product.images?.[0] ||
                        'https://via.placeholder.com/80x80?text=N'
                      }
                      alt={item.product.name}
                      className="oc__item-image"
                    />
                  </Link>
                  <div className="oc__item-details">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="oc__item-title"
                    >
                      {item.product.name}
                    </Link>
                    <p className="oc__item-qty">Qty: {item.quantity}</p>
                    <p className="oc__item-price">
                      ₹
                      {parseFloat(item.price_at_purchase).toLocaleString(
                        'en-IN',
                        { minimumFractionDigits: 2 }
                      )}
                      {item.quantity > 1 && ' each'}
                    </p>
                  </div>
                  <div className="oc__item-total">
                    ₹
                    {(
                      parseFloat(item.price_at_purchase) * item.quantity
                    ).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
          </div>

          {/* Action Buttons */}
          <div className="oc__actions">
            <Link to="/orders" className="oc__action-btn oc__action-btn--secondary">
              View Order History
            </Link>
            <Link to="/" className="oc__action-btn oc__action-btn--primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;