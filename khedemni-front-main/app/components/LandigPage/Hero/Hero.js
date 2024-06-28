"use client";

import Link from "next/link.js";
import Bg from "./Bg.js";
import Image from "next/image.js";

// bg-[#FCF9F2]
function Hero(props) {
  return (
    <div className="relative h-screen-minus-navbar flex items-center justify-center lg:items-start w-full   pt-16  bg-[#FCF9F2] ">
      <Bg />
      <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly  items-center gap-5 lg:gap-32 w-full ">
        <div className="gap-10 mt-5 scale-90 sm:scale-100 md:scale-90 lg:scale-95 llgg:gap-44">
          <div className="font-bold text-4xl md:text-6xl text-[#1D3072]">
            Find the jobs
          </div>
          <div className="text-4xl md:text-6xl font-bold text-[#1D3072]">
            that fits your life
          </div>
          <div className="font-semibold text-lg text-wrap llgg:text-xl w-[500px] mt-10">
            Create free account to find thousands Jobs, Employment, & Career
            Oppurtunities arround you !
          </div>
          <div className="flex flex-row text-lg gap-6 mt-5 ">
            <Link
              href="/register"
              className="shad cursor-pointer select-none py-3 border-[3px] border-[#3D45E2] text-center   w-[190px] rounded-[25px] font-bold text-white bg-[#3D45E2] z-20"
            >
              Create Account
            </Link>
            <Link
              href="/offers"
              className="shad2 cursor-pointer select-none py-3 px-2 border-[3px] transition-colors  border-[#3D45E2] text-center  w-[190px] rounded-[25px] font-extrabold hover:font-bold text-[#3D45E2] hover:bg-[#3D45E2] hover:text-white z-20"
            >
              See offers
            </Link>
          </div>
        </div>
        <div >
          <img
            src="/Landing/workers.png"
            alt=""
            className="object-cover scale-90 sm:scale-100  w-fit md:w-[450px] llgg:w-[550px] "
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
