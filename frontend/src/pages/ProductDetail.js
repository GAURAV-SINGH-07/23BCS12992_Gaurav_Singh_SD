
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import ImageCarousel from '../components/ImageCarousel';
import StarRating from '../components/StarRating';
import { FiCheck, FiMapPin, FiShield } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleBuyNow = async () => {
    await addToCart(product.id, quantity);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="pd__loading">
        <div className="pd__spinner" />
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd__not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

  const inStock = product.stock_quantity > 0;

  return (
    <div className="pd">
      {/* Breadcrumb */}
      <div className="pd__breadcrumb">
        <span onClick={() => navigate('/')} className="pd__breadcrumb-link">
          Home
        </span>
        {product.category && (
          <>
            <span className="pd__breadcrumb-sep">&rsaquo;</span>
            <span
              onClick={() => navigate(`/?category=${product.category.id}`)}
              className="pd__breadcrumb-link"
            >
              {product.category.name}
            </span>
          </>
        )}
        <span className="pd__breadcrumb-sep">&rsaquo;</span>
        <span className="pd__breadcrumb-current">{product.name}</span>
      </div>

      <div className="pd__main">
        {/* Left: Images */}
        <div className="pd__images">
          <ImageCarousel images={product.images} />
        </div>

        {/* Center: Details */}
        <div className="pd__details">
          <h1 className="pd__title">{product.name}</h1>

          {product.brand && (
            <p className="pd__brand">
              Visit the <span className="pd__brand-link">{product.brand} Store</span>
            </p>
          )}

          <div className="pd__rating-row">
            <span className="pd__rating-number">
              {parseFloat(product.rating).toFixed(1)}
            </span>
            <StarRating
              rating={parseFloat(product.rating)}
              reviewCount={product.review_count}
              size={16}
            />
          </div>

          <div className="pd__divider" />

          {/* Price */}
          <div className="pd__price-section">
            {discount > 0 && (
              <span className="pd__discount">-{discount}%</span>
            )}
            <div className="pd__price-display">
              <span className="pd__rupee">₹</span>
              <span className="pd__price-value">
                {parseFloat(product.price).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          {product.original_price && (
            <p className="pd__mrp">
              M.R.P.:{' '}
              <span className="pd__mrp-strike">
                ₹
                {parseFloat(product.original_price).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </p>
          )}

          <p className="pd__tax-info">Inclusive of all taxes</p>

          <div className="pd__divider" />

          {/* Description */}
          {product.description && (
            <div className="pd__description">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>
          )}

          {/* Specifications */}
          {product.specifications &&
            Object.keys(product.specifications).length > 0 && (
              <div className="pd__specs">
                <h3>Technical Details</h3>
                <table className="pd__specs-table">
                  <tbody>
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <tr key={key}>
                          <td className="pd__specs-label">{key}</td>
                          <td className="pd__specs-value">{value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
        </div>

        {/* Right: Buy Box */}
        <div className="pd__buy-box">
          <div className="pd__buy-box-inner">
            <div className="pd__buy-price">
              <span className="pd__rupee">₹</span>
              <span className="pd__buy-price-value">
                {parseFloat(product.price).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>

            <p className="pd__delivery">
              <FiMapPin size={14} />
              FREE delivery <strong>Tomorrow</strong>
            </p>

            {inStock ? (
              <p className="pd__availability pd__availability--in">
                <FiCheck size={16} /> In Stock
              </p>
            ) : (
              <p className="pd__availability pd__availability--out">
                Currently unavailable
              </p>
            )}

            {inStock && (
              <>
                <div className="pd__quantity">
                  <label htmlFor="qty">Qty:</label>
                  <select
                    id="qty"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="pd__quantity-select"
                  >
                    {[...Array(Math.min(product.stock_quantity, 10))].map(
                      (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button
                  className="pd__add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>

                <button className="pd__buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </>
            )}

            <div className="pd__secure">
              <FiShield size={14} />
              <span>Secure transaction</span>
            </div>

            <div className="pd__seller-info">
              <div className="pd__seller-row">
                <span className="pd__seller-label">Ships from</span>
                <span className="pd__seller-value">Amazon</span>
              </div>
              <div className="pd__seller-row">
                <span className="pd__seller-label">Sold by</span>
                <span className="pd__seller-value">Amazon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;