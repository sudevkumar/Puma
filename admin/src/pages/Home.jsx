import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageSlider from "../component/ImageSlider";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { calculateDiscountedPrice, formatToINR } from "../utils";
import PopUp from "../component/PopUp";
import { Link } from "react-router-dom";

const Home = () => {
  const [shoes, setShoes] = useState([]);
  const [show, setShow] = useState(false);
  const [delId, setDelId] = useState("");

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
    <section className=" p-[40px] w-full h-auto ">
      <h1 className=" text-3xl">All Products</h1>

      <div className=" w-full mt-7 grid grid-cols-4 gap-4">
        {shoes.map((shoe) => (
          <div className=" w-full h-auto ">
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

            <div className=" w-full mt-2 flex gap-3 ">
              <Link to={`/updateproduct/${shoe?._id}`}>
                <button className=" w-[35px] rounded-md cursor-pointer  h-[35px] bg-green-600 flex justify-center items-center">
                  <GrUpdate size={18} color="white" title="Update" />
                </button>
              </Link>

              <button
                className=" w-[35px] rounded-md cursor-pointer  h-[35px] bg-red-600 flex justify-center items-center"
                onClick={() => {
                  setShow(true);
                  setDelId(shoe?._id);
                }}
              >
                <MdDeleteOutline size={24} color="white" title="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {show && (
        <PopUp setShow={setShow} delId={delId} getAllShoes={getAllShoes} />
      )}
    </section>
  );
};

export default Home;
