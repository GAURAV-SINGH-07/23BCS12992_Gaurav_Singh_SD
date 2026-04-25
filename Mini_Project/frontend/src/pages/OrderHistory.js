
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/api';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="oh__loading">
        <div className="oh__spinner" />
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="oh">
      <h1 className="oh__heading">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="oh__empty">
          <h2>No orders yet</h2>
          <p>Looks like you haven't placed any orders.</p>
          <Link to="/" className="oh__empty-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="oh__list">
          {orders.map((order) => {
            const orderDate = new Date(order.created_at);
            return (
              <div key={order.id} className="oh__order">
                {/* Order Header */}
                <div className="oh__order-header">
                  <div className="oh__header-col">
                    <span className="oh__header-label">ORDER PLACED</span>
                    <span className="oh__header-value">
                      {orderDate.toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="oh__header-col">
                    <span className="oh__header-label">TOTAL</span>
                    <span className="oh__header-value">
                      ₹
                      {parseFloat(order.total_amount).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="oh__header-col">
                    <span className="oh__header-label">SHIP TO</span>
                    <span className="oh__header-value oh__header-value--link">
                      {order.shipping_name}
                    </span>
                  </div>
                  <div className="oh__header-col oh__header-col--right">
                    <span className="oh__header-label">
                      ORDER # {order.id}
                    </span>
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="oh__view-detail"
                    >
                      View order details
                    </Link>
                  </div>
                </div>

                {/* Order Body */}
                <div className="oh__order-body">
                  <div className="oh__status-row">
                    <span
                      className={`oh__status-badge oh__status-badge--${order.status}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>

                  <div className="oh__items">
                    {order.items &&
                      order.items.map((item) => (
                        <div key={item.id} className="oh__item">
                          <Link to={`/product/${item.product.id}`}>
                            <img
                              src={
                                item.product.images?.[0] ||
                                'https://via.placeholder.com/80x80?text=N'
                              }
                              alt={item.product.name}
                              className="oh__item-image"
                            />
                          </Link>
                          <div className="oh__item-info">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="oh__item-title"
                            >
                              {item.product.name}
                            </Link>
                            <p className="oh__item-meta">
                              Qty: {item.quantity} | ₹
                              {parseFloat(
                                item.price_at_purchase
                              ).toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                              })}{' '}
                              each
                            </p>
                            <div className="oh__item-actions">
                              <Link
                                to={`/product/${item.product.id}`}
                                className="oh__btn-again"
                              >
                                Buy it again
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;