import React from "react";
import ImageSlider from "./ImageSlider";
import { calculateDiscountedPrice, formatToINR } from "../utils";

const Card = ({ shoe }) => {
  return (
    <div key={shoe._id} className=" w-[400px] h-[400px] inline-block p-3">
      <ImageSlider
        images={[
          shoe?.mainImg,
          shoe?.subOneImg,
          shoe?.subTwoImg,
          shoe?.subThreeImg,
          shoe?.subFourImg,
        ]}
        discount={shoe?.discount}
      />
      {shoe.title.length > 30 ? (
        <p className=" text-[18px] font-semibold">
          {shoe.title.slice(0, 30)}...
        </p>
      ) : (
        <p className=" text-[18px] font-semibold">{shoe.title}</p>
      )}

      <p className=" flex items-center text-green-500 font-semibold">
        {calculateDiscountedPrice(shoe?.price, shoe?.discount)}
      </p>

      <p className="flex text-[13px] line-through items-center text-red-500 font-semibold">
        {formatToINR(shoe?.price)}
      </p>
    </div>
  );
};

export default Card;
