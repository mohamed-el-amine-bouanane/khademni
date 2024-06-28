import React from "react";

function CardJob({title, img, offers}) {
  return (
    <div className=" flex flex-col items-center justify-center borderImage">
      <div className="text-base md:text-lg lg:text-[24px] font-bold text-[#1D3072] text-center">
        {title}
      </div>
      <div className="text-[12px] font-semibold text-center">{offers} offers</div>
      <img
        src={img}
        alt=""
        className="mt-6"
      />
    </div>
  );
}

export default CardJob;
