
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://via.placeholder.com/300x300?text=No+Image';

  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) *
          100
      )
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img src={primaryImage} alt={product.name} className="product-card__image" />
          {discount > 0 && (
            <span className="product-card__badge">{discount}% off</span>
          )}
        </div>
        <div className="product-card__info">
          <h3 className="product-card__title">{product.name}</h3>
          {product.brand && (
            <p className="product-card__brand">by {product.brand}</p>
          )}
          <div className="product-card__rating">
            <StarRating
              rating={parseFloat(product.rating)}
              reviewCount={product.review_count}
            />
          </div>
          <div className="product-card__price">
            <span className="product-card__currency">₹</span>
            <span className="product-card__amount">
              {parseFloat(product.price).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          {product.original_price && (
            <div className="product-card__original-price">
              M.R.P.:{' '}
              <span className="product-card__mrp">
                ₹
                {parseFloat(product.original_price).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}
          {product.stock_quantity > 0 ? (
            <p className="product-card__stock product-card__stock--in">
              In Stock
            </p>
          ) : (
            <p className="product-card__stock product-card__stock--out">
              Out of Stock
            </p>
          )}
        </div>
      </Link>
      <button
        className="product-card__add-btn"
        onClick={handleAddToCart}
        disabled={product.stock_quantity === 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;