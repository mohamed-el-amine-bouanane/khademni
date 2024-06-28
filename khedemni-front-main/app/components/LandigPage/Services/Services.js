import React from "react";
import Bg from "./Bg";
import "./index.css";
import CardJob from "./CardJob.js";
import Link from "next/link.js";

function Services(props) {
  return (
    <div id="services" className="relative ">
      <div className="absolute z-40 flex flex-col w-scren h-screen w-screen items-center justify-between">
        <div>
          <div className="text-[28px] lg:text-[42px] font-bold text-[#1D3072] mt-[10%]">
            Explore offers by category
          </div>
          <div className="text-[12px] lg:text-[14px] font-semibold text-center mt-[3%]">
            Have you a skill ? propose your services to get the most
          </div>
          <div className="text-[12px] lg:text-[14px] font-semibold text-center">
            exiting job in the country !
          </div>
        </div>
        <div className="BigCard group transition-all duration-300 delay-150">
          <div className="flex  flex-row">
            <div className="cardContainer"></div>
            <div className="cardContainer cursor-pointer -rotate-12  group-hover:rotate-0 hover:bg-[#FD1F4A22]">
              <CardJob
                offers={22}
                title="Building"
                img="/Services/Builder.svg"
              />
            </div>
            <div className=" hidden md:cardContainer "></div>
            <div className=" hidden md:cardContainer  cursor-pointer -rotate-12 group-hover:rotate-0 hover:bg-[#FD1F4A22]">
              <CardJob
                offers={30}
                title="Painting"
                img="/Services/Painter.svg"
              />
            </div>
            <div className="cardContainer"></div>
          </div>
          <div className="flex flex-row">
            <div className="cardContainer cursor-pointer rotate-12 group-hover:rotate-0 hover:bg-[#FD1F4A22]">
              <CardJob
                offers={25}
                title="Electricity"
                img="/Services/Electricien.svg"
              />
            </div>
            <div className="cardContainer"></div>
            <div className="cardContainer cursor-pointer rotate-12 group-hover:rotate-0 hover:bg-[#FD1F4A22]">
              <CardJob
                offers={50}
                title="Mechanic"
                img="/Services/Mechanicien.svg"
              />
            </div>
            <div className=" hidden md:cardContainer "></div>
            <div className=" hidden md:cardContainer  cursor-pointer rotate-12 group-hover:rotate-0 hover:bg-[#FD1F4A22]">
              <CardJob
                offers={43}
                title="Carpentry"
                img="/Services/Carpenter.svg"
              />
            </div>
          </div>
        </div>
        <div className="Explore flex flex-col h-[10%]">
          <Link
            href="/offers"
            className="txt text-[14px] font-bold text-center"
          >
            Explore more offers
          </Link>
          <img
            src="/Services/Explore.svg"
            alt="ExploreButton"
            className="Exp h-[30%] opacity-0 lg:block hidden"
          />
        </div>
      </div>

      <Bg />
    </div>
  );
}

export default Services;
