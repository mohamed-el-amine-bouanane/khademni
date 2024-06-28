import React from 'react';

const StarRating = ({ rating }) => {
  const filledStars = Array.from({ length: rating }, (_, index) => (
    <span key={index} className="text-yellow-400 select-none text-3xl">&#9733;</span>
  ));
  
  const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
    <span key={index} className="text-gray-300 select-none text-3xl">&#9733;</span>
  ));

  return (
    <div className="flex select-none">
      {filledStars}
      {emptyStars}
    </div>
  );
};

export default StarRating;