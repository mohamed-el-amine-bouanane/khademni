"use client";

import ReviewCard from "@/app/components/LandigPage/Reviews/ReviewCard.js";
import api from "@/app/utils/api.js";
import { useEffect, useState } from "react";

function AddReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/api/reviews");

        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="container px-10 flex flex-col py-20 justify-center items-center gap-10">
      <h2 className="text-6xl font-bold text-secondaryColor">Reviews</h2>

      <div className="w-full flex flex-row flex-wrap justify-center gap-10">
        {reviews.map((review, index) => (
          <ReviewCard key={index} isActive={false} review={review} />
        ))}
      </div>
    </div>
  );
}

export default AddReviews;
