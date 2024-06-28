"use client";
import { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, FreeMode } from "swiper/modules";
import ReviewCard from "./ReviewCard.js";
import Link from "next/link.js";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import ReviewForm from "./ReviewForm.js";
import api from "@/app/utils/api.js";
import { AuthContext } from "@/app/context/Auth.jsx";

function Reviews() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState(null);
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/api/reviews?best=true");

        setReviews(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/api/reviews",
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${authContext.authState?.token}`,
          },
        }
      );
      if (response.status === 200 ) {
        if(response.data.rating >= 3)
        setReviews([...reviews, response.data]);
        setIsDialogOpen(false);

      } else {
        setErr("You must be logged in");
      }
    } catch (error) {
      if (error.response.status===401){
        setErr("You must be logged in");
      }else{
      setErr("Failed to submit review.");

      }
      console.error("Error submitting review:", error);

    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div
      id="reviews"
      className="container min-h-[500px] px-10 flex flex-col py-20 justify-center items-center gap-10"
    >
      <h2 className="text-6xl font-bold text-secondaryColor">Reviews</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-2xl">No reviews available at the moment.</p>
      ) : (
        <div className="w-full">
          <Swiper
            initialSlide={2}
            centeredSlides={true}
            observer={true}
            pagination={{
              bulletElement: true,
              clickable: true,
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
              500: {
                slidesPerView: 1,
                spaceBetween: 50,
              },
              800: {
                slidesPerView: 3,
                spaceBetween: 150,
              },
            }}
            freeMode={true}
            modules={[Pagination, FreeMode]}
          >
            {reviews.map((review, index) => (
              <SwiperSlide className="mb-24" key={index}>
                {({ isActive, isNext, isPrev }) => (
                  <ReviewCard isActive={isActive} review={review} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="flex flex-row gap-10 mt-4 text-center justify-center items-center">
        <Link
          href="/reviews"
          className="px-8 py-2 rounded-3xl text-[#3D45E2] hover:text-white font-bold text-2xl border border-[#3D45E2] hover:bg-[#3D45E2] transition-colors duration-200"
        >
          View more
        </Link>

        <button
          onClick={() => setIsDialogOpen(true)}
          className="px-8 py-2 rounded-3xl bg-[#3D45E2] font-bold text-white text-2xl"
        >
          Write Review
        </button>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="p-0">
            <AlertDialogHeader>
              <AlertDialogDescription>
                <ReviewForm
                  onReviewSubmit={handleReviewSubmit}
                  onCancel={handleCancel}
                  rating={rating}
                  comment={comment}
                  setComment={setComment}
                  setRating={setRating}
                  err={err}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Reviews;
