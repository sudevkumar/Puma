import React, { useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import Card from "./Card";

const ShowShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = shoes.length;
  const slidesToShow = 3;

  const leftSlider = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  const rightSlider = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  const getAllShoes = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/v1/shoe");
      setShoes(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShoes();
  }, []);

  return (
    <section className=" w-[97%] h-auto mx-auto mb-10">
      <h1 className=" text-3xl font-semibold">PUMA SPOTLIGHT</h1>
      <div className=" w-full relative flex items-center mt-5 ">
        <div className=" w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer bg-black bg-opacity-15">
          <MdChevronLeft size={33} onClick={leftSlider} />
        </div>
        <div
          id="slider"
          className="animate w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
        >
          {shoes.map((shoe) => (
            <Card shoe={shoe} />
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
