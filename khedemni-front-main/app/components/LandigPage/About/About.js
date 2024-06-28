import React from "react";

function About() {
  return (
    <div
      id="about"
      className="min-h-screen py-20 px-10 container flex flex-col items-center justify-center md:flex-row gap-12"
    >
      <div className="text-center md:text-left flex flex-col items-center md:items-start gap-10">
        <h2 className="text-6xl font-bold text-secondaryColor">About Us</h2>
        <p className="text-2xl mt-2 w-[70%] text-wrap text-justify break-words">
          Finding a job in our days is not like it was in the past, so our
          purpose is to make it easier than it was. Our initiative started when
          we saw people looking for a worker, and workers looking for a job, but
          they often spent a long time to do it.
        </p>
        <button className="px-6 w-fit text-3xl text-[#0009B2] hover:text-white hover:bg-mainColor transition-colors duration-300 font-black text-center bg-white border border-mainColor py-2 rounded-lg">
          Read more
        </button>
      </div>
      <img
        className="h-[400px] md:h-[500px] lg:h-auto"
        src="/Landing/painter.svg"
      />
    </div>
  );
}

export default About;
