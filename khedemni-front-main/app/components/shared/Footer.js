import Link from "next/link.js";
import React from "react";

function Footer() {
  return (
    <div className="bg-mainColor w-screen py-20 px-16 md:px-20 lg:px-44 text-white flex flex-col gap-16 md:gap-6  items-center lg:items-start justify-between lg:flex-row">
      <div className="flex flex-col gap-7 items-center lg:items-start">
        <h2 className="text-5xl font-extrabold">Khedemni</h2>
        <div className="flex items-center gap-7">
          <Link href="#">
            <img src="/footer/instagram.png" alt="instagram" />
          </Link>
          <Link href="#">
            <img src="/footer/facebook.png" alt="facebook" />
          </Link>
          <Link href="#">
            <img src="/footer/twitter.png" alt="twitter" />
          </Link>
          <Link href="#">
            <img src="/footer/telegram.png" alt="telegram" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-20">
      <div className="flex flex-col text-xl gap-2">
        <h2 className="font-bold text-3xl mb-2">Information</h2>
        <p className="flex items-center">
          {" "}
          <span className="font-bold mr-4">&gt;</span> Sidi Mezghiche, Skikda{" "}
        </p>
        <p>
          <span className="font-bold mr-4">&gt;</span> +213 666323241{" "}
        </p>
        <p>
          <span className="font-bold mr-4">&gt;</span> Khedemni@gmail.com{" "}
        </p>
        <p>
          <span className="font-bold mr-4">&gt;</span> 9:00 AM - 7:00 PM{" "}
        </p>
      </div>
      <div className="flex flex-col text-xl gap-2">
        <h2 className="font-bold text-3xl mb-2">Information</h2>
        <p className="flex items-center">
          {" "}
          <span className="font-bold mr-4">&gt;</span> Kouba, Algiers{" "}
        </p>
        <p>
          <span className="font-bold mr-4">&gt;</span> +213 556343240{" "}
        </p>
        <p>
          <span className="font-bold mr-4">&gt;</span> Khedemni2@gmail.com{" "}
        </p>
        <p>
          <span className="font-bold mr-4">&gt;</span> 9:00 AM - 7:00 PM{" "}
        </p>
      </div>
      
      </div>
     
    </div>
  );
}

export default Footer;
