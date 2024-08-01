import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Card from "./Card";
import { Link } from "react-router-dom";

const ShowShoes = ({ shoes, compTitle }) => {
  const resLeftSlider = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 380;
  };

  const resRightSlider = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 380;
  };

  return (
    <>
      <section className="w-[97%] h-auto mx-auto lg:relative lg:mb-6 lg:top-0 ">
        <h1 className=" text-2xl lg:text-3xl font-semibold mb-4 px-1 lg:px-3">
          {compTitle}
        </h1>
        <div className="w-full relative flex items-center mt-5">
          <div
            className="w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer bg-black bg-opacity-15"
            onClick={resLeftSlider}
          >
            <MdChevronLeft size={33} />
          </div>
          <div
            id="slider"
            className="animate w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {shoes?.map((shoe) => (
              <Link key={shoe?._id} to={`/singleshoe/${shoe?._id}`}>
                <Card shoe={shoe} showNav={false} />
              </Link>
            ))}
          </div>
          <div
            className="w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer bg-black bg-opacity-15"
            onClick={resRightSlider}
          >
            <MdChevronRight size={33} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowShoes;
