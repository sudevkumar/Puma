import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const ImageSlider = ({ images, discount, showNav }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className=" w-full h-[300px] relative">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full"
        />
        <div className="absolute top-0 left-0 p-2 bg-red-600 text-white text-sm rounded-br-lg">
          -{discount}%
        </div>

        {showNav && (
          <>
            <button
              disabled={currentIndex === 0}
              onClick={prevSlide}
              className={`${
                currentIndex === 0 ? "cursor-not-allowed" : " cursor-pointer"
              } flex justify-center items-center w-[35px] h-[35px] absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-gray-400 bg-opacity-50 rounded-full focus:outline-none`}
            >
              <FaChevronLeft size={14} title="Previous" />
            </button>
            <button
              disabled={currentIndex === images.length - 1}
              onClick={nextSlide}
              className={` ${
                currentIndex === images.length - 1
                  ? "cursor-not-allowed"
                  : " cursor-pointer"
              } flex justify-center items-center w-[35px] h-[35px] absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-gray-400 bg-opacity-50 rounded-full p-2 focus:outline-none`}
            >
              <FaChevronRight size={14} title="Next" />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageSlider;
