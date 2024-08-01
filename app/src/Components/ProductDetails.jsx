import React from "react";
import {
  calculateDiscountedPrice,
  formatToINR,
  quantity,
  sizes,
} from "../utils/index";
import { GoHeartFill } from "react-icons/go";
import { RxUpdate } from "react-icons/rx";

const ProductDetails = ({
  title,
  discount,
  price,
  desc,
  style,
  color,
  size,
  setSize,
  qty,
  setQty,
  handleAddToCart,
  cartFlag,
  deleteCartItem,
}) => {
  return (
    <div className=" w-full lg:w-[35%] flex flex-col gap-3 ">
      <h1 className=" text-2xl md:text-3xl lg:text-4xl font-semibold">
        {title}
      </h1>
      <div className=" w-[80px] h-[27px] font-bold rounded-md flex justify-center items-center bg-red-600 text-white text-[12px]">
        -{discount}%
      </div>
      <h2 className=" text-3xl font-semibold text-green-700">
        {calculateDiscountedPrice(price, discount)}
      </h2>
      <h2 className=" text-xl font-semibold text-red-600 line-through">
        {formatToINR(price, discount)}
      </h2>
      <hr className=" my-4  md:my-8 lg:my-16" />
      <div className="">
        <h3 className=" text-2xl font-semibold">Size</h3>
        <div className=" w-full h-auto grid grid-cols-5 gap-2 mt-3">
          {sizes?.map((s) => (
            <div
              key={s}
              className={`w-[80px] h-[80px] ${
                size === s ? " border-2 border-blue-700" : "border"
              } flex justify-center items-center text-[15px] cursor-pointer`}
              onClick={() => setSize(s)}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
      <div className=" w-full flex gap-3">
        <select
          name=""
          id=""
          className=" w-[22%] border-2 border-black h-[63px] rounded-sm"
          onChange={(e) => setQty(e.target.value)}
        >
          <option value="">Qty</option>
          {quantity.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
        <div className=" w-[75%] flex flex-col gap-2">
          {cartFlag ? (
            <button
              className=" w-full h-[63px] bg-red-600 rounded-sm text-white text-[17px]"
              onClick={deleteCartItem}
            >
              REMOVE FROM CART
            </button>
          ) : (
            <button
              className=" w-full h-[63px] bg-black rounded-sm text-white text-[17px]"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          )}
        </div>
      </div>

      <h1 className=" md:text-[17px] lg:text-[19px] text-gray-500 font-semibold flex h-6 mt-3 items-center gap-4">
        <RxUpdate size={22} />
        Free returns on all qualifying orders.
      </h1>

      <hr className=" my-3 md:my-5 lg:my-10" />

      <div className="">
        <h3 className=" text-2xl font-semibold mb-4">Description</h3>
        <p className=" text-[15px] text-gray-500">{desc}</p>
        <ul className="list-disc pl-5 mt-3">
          <li className="text-[17px] text-gray-500 font-light">
            Style : {style}
          </li>

          <li className="text-[17px] text-gray-500 font-light">
            Color : {color}
          </li>
        </ul>
      </div>

      <hr className=" my-10" />

      <div className="">
        <h3 className=" text-2xl font-semibold mb-4">Shipping and Returns</h3>
        <p className=" text-[15px]">
          Free return for all qualifying orders within{" "}
          <span className=" text-[16px] font-bold">
            14 days of your order delivery date
          </span>
          . Visit our <span className=" underline">Return Policy</span> for more
          information
        </p>
      </div>
      {/* End */}
    </div>
  );
};

export default ProductDetails;
