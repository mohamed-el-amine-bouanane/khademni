"use client";
import React, { useState } from "react";

const ReviewForm = ({
  onReviewSubmit,
  onCancel,
  rating,
  comment,
  setComment,
  setRating,
  err,
}) => {
  const handleRatingChange = (e) => setRating(parseInt(e.target.value));
  const handleCommentChange = (e) => setComment(e.target.value);

  return (
    <form
      onSubmit={onReviewSubmit}
      className="flex flex-col border gap-4 p-6 bg-white shadow-md rounded-lg w-full"
    >
      <h2 className="text-2xl font-semibold text-secondaryColor">
        Add your own review
      </h2>
      <label className="flex flex-col">
        <span className="text-mainColor font-semibold mb-2">Rating:</span>
        <input
          type="number"
          value={rating}
          onChange={handleRatingChange}
          min="0"
          max="5"
          required
          className="p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-mainColor font-semibold mb-2">Comment:</span>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          required
          rows={5}
          className="p-2 border text-black resize-none border-gray-300 rounded h-24 focus:outline-none focus:ring-2 focus:ring-mainColor"
        />
      </label>
      {err && (
        <h3 className="text-[18px] text-red-600 font-bold w-full text-center mt-2">
          {err}
        </h3>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 w-fit text-white py-2 px-4 font-semibold rounded hover:bg-gray-600 transition-colors duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-mainColor w-fit text-white py-2 px-4 font-semibold rounded hover:bg-secondaryColor transition-colors duration-300"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
