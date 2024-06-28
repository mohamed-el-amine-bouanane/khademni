"use client";
import ReviewCard from "@/app/components/LandigPage/Reviews/ReviewCard";
import offerImage from "@/public/Offers/painter.jpg";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/utils/api";
import { AuthContext } from "@/app/context/Auth";
import { BACKEND_URL } from "@/app/constants";
import NewWorkMessage from "@/app/components/Chat/NewWorkMessage";

const OfferDetails = () => {
  const { id } = useParams();
  const authContext = useContext(AuthContext);
  const [offer, setOffer] = useState({});
  const [error, setError] = useState(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOwner, SetIsOwner] = useState(false);
  const [err, SetErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDialogOpen(false);
    try {
      const response = await api.delete("/api/tasks/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext?.authState?.token}`,
        },
      });
      if (response.statusText == "OK") {
        router.push("/users/" + authContext.authState.user.id);
      }
    } catch (error) {
      if (error.response?.data?.error) {
        SetErr(error.response.data.error);
      } else {
        SetErr(error.message);
      }
    }
  };

  const handleUpdate = () => {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        SetErr(null);
        const response = await api.get("/api/tasks/" + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.authState?.token}`,
          },
        });
        const data = response.data.data;
        setOffer(data.task);
        setReviews(data.workReviews);
        SetIsOwner(data.task.taskerId == authContext.authState.user.id);
        setIsLoading(false);
      } catch (error) {
        if (error.response?.data?.error) {
          SetErr(error.response.data.error);
        } else {
          SetErr(error.message);
        }
        setIsLoading(false);
      }
    };
    if (authContext.authState?.token) {
      fetchData();
    }
  }, [authContext]);

  const [openModel, setModelOpen] = useState(false);
  const ContactTasker = () => {
    setModelOpen(true);
  };

  return (
    <div>
      {!isLoading && !err ? (
        <div className="mt-8 px-36">
          <div className="flex justify-between mb-5 items-center">
          <Link href={"/users/"+offer.tasker.userId} className="flex justify-center items-center gap-3 w-fit  rounded-lg p-2 ">
            <Image
              src={
                BACKEND_URL + "/uploads/pictures/" + offer.tasker.profilePicture
              }
              alt="profilepic"
              height={60}
              width={60}
              className="rounded-full object-cover aspect-square overflow-hidden "
            />
            <h2 className="font-semibold text-xl">{offer.tasker.User.firstName + " " + offer.tasker.User.lastName} </h2>
          </Link>
            {isOwner && (
              <div className="flex justify-end items-center gap-6">
                <Link
                  href={"/offers/edit/" + id}
                  className="bg-[#27419E] p-2 text-center text-white w-[75px] rounded-lg hover:bg-blue-950"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 p-2 text-white w-[75px] rounded-lg hover:bg-red-800"
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-[#27419E] text-[36px] font-bold">
              {offer.category?.name}
            </h3>
            <p className="text-[#5040E9] text-[18px] font-semibold">
              {offer.price}DA/H
            </p>
          </div>
          
          <div className="mt-8">
            <h3 className="text-[22px] font-bold mb-2">Description :</h3>
            <p>{offer.description}</p>
          </div>
          {authContext.authState.user.role == "client" && (
            <button
              onClick={ContactTasker}
              className="px-20 bg-[#27419E]  rounded-3xl py-2 font-semibold text-white mt-6 hover:bg-blue-950 w-fit"
            >
              Contacter
            </button>
          )}
          <h3 className="text-[22px] font-bold mt-8">Images :</h3>
          <div className="flex flex-wrap gap-10 mt-6 ">
            {offer.taskImages?.map((elem) => {
              return (
                <Image
                  key={elem.id}
                  src={BACKEND_URL + "/uploads/taskImages/" + elem.url}
                  alt="image offer"
                  height={250}
                  width={250}
                  className="rounded-xl object-cover aspect-square overflow-hidden "
                />
              );
            })}
            {/* <Image src={offerImage} alt="image offer" width={250} className="rounded-xl object-cover overflow-hidden "/>
            <Image src={offerImage} alt="image offer" width={250} className="rounded-xl object-cover overflow-hidden "/>
            <Image src={offerImage} alt="image offer" width={250} className="rounded-xl object-cover overflow-hidden "/>
            <Image src={offerImage} alt="image offer" width={250} className="rounded-xl object-cover overflow-hidden "/> */}
          </div>
          <h3 className="text-[#27419E] text-[36px] font-bold mt-8">
            Reviews :
          </h3>
          <div
            className="flex flex-col justify-center items-center w-full mt-8"
            id="reviews"
          >
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
          </div>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent className=" p-0">
              <AlertDialogHeader>
                <AlertDialogDescription>
                  <div className="p-4 bg-white rounded-lg">
                    <h3 className="text-black text-lg font-semibold">
                      Are You Sure that you want to delete this offer ?
                    </h3>
                    <div className="flex justify-end items-center gap-4 mt-4">
                      <button
                        onClick={() => {
                          setIsDialogOpen(false);
                        }}
                        className="p-2 px-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-black"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDelete}
                        className="p-2 px-4 bg-red-600 rounded-lg text-white font-semibold hover:bg-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={openModel} onOpenChange={setModelOpen}>
            <AlertDialogContent className=" p-0">
              <AlertDialogHeader>
                <AlertDialogDescription>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="w-full flex justify-end">
                      <button
                        onClick={() => {
                          setModelOpen(false);
                        }}
                        className="hover:text-red-600"
                      >
                        Close
                      </button>
                    </div>
                    {error && (
                      <h3 className="w-full text-red-600 text-center mb-2 font-semibold">
                        {error}
                      </h3>
                    )}
                    <NewWorkMessage
                      setError={setError}
                      offer={offer}
                      authContext={authContext}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        !err && (
          <h3 className="absolute top-1/2 w-full text-center">Loading ... </h3>
        )
      )}
      {!isLoading && err && (
        <h3 className="absolute text-red-600 top-1/2 left-[40%] font-bold text-[36px]">
          {err}
        </h3>
      )}
    </div>
  );
};

export default OfferDetails;
