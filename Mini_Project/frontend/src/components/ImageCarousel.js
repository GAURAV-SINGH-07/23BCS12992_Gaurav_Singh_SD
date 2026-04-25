
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const placeholderImage =
    'https://via.placeholder.com/600x600?text=No+Image';
  const imageList = images && images.length > 0 ? images : [placeholderImage];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel">
      <div className="carousel__thumbnails">
        {imageList.map((img, idx) => (
          <div
            key={idx}
            className={`carousel__thumbnail ${
              idx === currentIndex ? 'carousel__thumbnail--active' : ''
            }`}
            onMouseEnter={() => setCurrentIndex(idx)}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel__main">
        {imageList.length > 1 && (
          <button className="carousel__arrow carousel__arrow--left" onClick={goToPrev}>
            <FiChevronLeft size={24} />
          </button>
        )}
        <img
          src={imageList[currentIndex]}
          alt="Product"
          className="carousel__main-image"
        />
        {imageList.length > 1 && (
          <button className="carousel__arrow carousel__arrow--right" onClick={goToNext}>
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCarousel;