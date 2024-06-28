"use client"
import Image from "next/image";
import offerImage from "@/public/Offers/painter.jpg"
import Link from "next/link";
import { BACKEND_URL } from "@/app/constants";
const OfferCard = ({offer}) => {
    return ( 
    <Link href={"/offers/"+offer.id}  className="w-[350px] relative rounded-xl shadow-lg hover:cursor-pointer hover:opacity-80" >
        <Image src={(offer.taskImages[0]?.url) ? (BACKEND_URL+"/uploads/taskImages/" + offer.taskImages[0]?.url) :offerImage} alt="image offer" width={400} height={350} className="rounded-xl object-cover overflow-hidden h-[200px]"/>
        <div className="flex justify-between p-5  w-full bottom-0">
            <h3 className="text-[#767676] text-md font-bold">{offer.category.name} </h3>
            <h3 className="text-[#5040E9] ">{offer.price}DA/H</h3>
        </div>
    </Link> );
}
 
export default OfferCard;