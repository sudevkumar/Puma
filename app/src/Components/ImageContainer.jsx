import React from "react";

const ImageContainer = ({ images }) => {
  return (
    <div className=" w-[65%] flex flex-col gap-2">
      <div className=" grid grid-cols-2 gap-2">
        {images.slice(0, 4).map((img) => (
          <img src={img} alt={img} key={img} />
        ))}
      </div>

      <div className=" w-full h-[400px] bg-red-300">
        <img src={images[4]} alt="" className=" w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default ImageContainer;
