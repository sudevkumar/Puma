import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import Card from "./Card";
import { Link } from "react-router-dom";

const ShowShoes = ({ shoes, compTitle }) => {
  const leftSlider = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  const rightSlider = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  return (
    <section className=" w-[97%] h-auto mx-auto mb-10">
      <h1 className=" text-3xl font-semibold">{compTitle}</h1>
      <div className=" w-full relative flex items-center mt-5 ">
        <div className=" w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer bg-black bg-opacity-15">
          <MdChevronLeft size={33} onClick={leftSlider} />
        </div>
        <div
          id="slider"
          className="animate w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
        >
          {shoes?.slice(0, 7).map((shoe) => (
            <Link to={`/singleshoe/${shoe._id}`}>
              <Card shoe={shoe} showNav={false} />
            </Link>
          ))}
        </div>
        <div className=" w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer bg-black bg-opacity-15">
          <MdChevronRight onClick={rightSlider} size={33} />
        </div>
      </div>
    </section>
  );
};

export default ShowShoes;
