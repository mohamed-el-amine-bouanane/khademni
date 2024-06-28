import Image from "next/image";
import reviewer from "./reviewer.png";
import StarRating from "../../shared/StarRating.js";
import { BACKEND_URL } from "@/app/constants/index.js";

function ReviewCard({ review, isActive }) {
  const user =  review.user?? review.client
  const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    return `${day}/${month}/${year} AT ${hours}:${minutes}`;
  };
  const formattedDate = formatDate(review.date);

  return (
    <div
      className={`${
        isActive && "md:scale-125"
      } flex flex-col justify-center  shadow-lg drop-shadow-xl w-[400px] items-center gap-4 p-8 rounded-sm m-4`}
    >
      <span className="self-end text-sm ">
        {formattedDate ?? "24/11/2022 AT 23:12 "}
      </span>
      <div className="flex flex-col items-center gap-2">
        <p className="text-base text-center w-[70%]">
          {review.comment ??
            "Very useful platform, i found the service that i was looking for, with a very good priceThank you for your efforts"}
        </p>
        <StarRating rating={review.rating} />
      </div>
      <h2 className="text-xl font-bold ">
        {user.firstName + " " + user.lastName ?? "Aymen Sn"}
      </h2>

      <Image
        src={
          user.profilePicture
            ? BACKEND_URL + user.profilePicture
            : reviewer
        }
        height={93}
        width={93}
        quality={100}
        alt="profile"
        className="overflow-hidden object-cover aspect-square h-[93px] rounded-full w-[93px]"
      />
    </div>
  );
}

export default ReviewCard;
