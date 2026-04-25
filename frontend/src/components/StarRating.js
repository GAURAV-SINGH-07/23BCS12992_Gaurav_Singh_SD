
import React from 'react';
import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating, reviewCount, size = 14 }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const extraFull = rating - fullStars >= 0.75;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars + (extraFull ? 1 : 0)) {
      stars.push(<FaStar key={i} size={size} color="#de7921" />);
    } else if (i === fullStars && hasHalf) {
      stars.push(<FaStarHalfAlt key={i} size={size} color="#de7921" />);
    } else {
      stars.push(<FiStar key={i} size={size} color="#de7921" />);
    }
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      {stars}
      {reviewCount !== undefined && (
        <span style={{ fontSize: '13px', color: '#007185', marginLeft: '4px' }}>
          {reviewCount.toLocaleString()}
        </span>
      )}
    </span>
  );
};

export default StarRating;