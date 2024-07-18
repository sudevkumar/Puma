import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageContainer from "../Components/ImageContainer";
import ProductDetails from "../Components/ProductDetails";
import ShowShoes from "../Components/ShowShoes";

const SingleShoe = () => {
  const [shoes, setShoes] = useState({});
  const { id } = useParams();
  const getShoeById = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/shoe/${id}`);
      const shoeData = res.data;
      setShoes(shoeData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShoeById();
  }, []);

  return (
    <section className=" w-full h-auto p-10">
      <div className=" w-full">
        <ul className=" flex gap-4 items-center h-[5]">
          <Link to={"/"}>
            <li className=" text-[14px] font-semibold">Home</li>
          </Link>
          <span className=" w-1 h-1 rounded-full bg-gray-600"></span>
          <Link>
            <li className=" text-[14px] font-semibold">{shoes?.type}</li>
          </Link>
          <span className=" w-1 h-1 rounded-full bg-gray-600"></span>
          <li className=" text-[14px]">{shoes?.title}</li>
        </ul>
      </div>
      <div className=" w-full h-auto flex gap-3 mt-5">
        <ImageContainer
          images={[
            shoes?.mainImg,
            shoes?.subOneImg,
            shoes?.subTwoImg,
            shoes?.subThreeImg,
            shoes?.subFourImg,
          ]}
        />
        <ProductDetails
          title={shoes?.title}
          discount={shoes?.discount}
          price={shoes?.price}
          desc={shoes?.desc}
          style={shoes.style}
          color={shoes.color}
        />
      </div>

      {/* Btm */}
      <div className="bg-[#F3F3F3] w-full h-auto p-5">
        <div className="">
          <h3 className=" text-2xl font-semibold mb-4">PRODUCT STORY</h3>
          <p className=" text-[15px] font-light">{shoes.productStory}</p>
        </div>

        <div className=" mt-4">
          <h3 className=" text-2xl font-semibold mb-2">Country Of Origin</h3>
          <p className=" text-[15px] font-light">{shoes.countryOfOrigin}</p>
        </div>
      </div>

      <div className=" mt-10">
        <ShowShoes compTitle={"YOU MAY ALSO LIKE"} />
      </div>
    </section>
  );
};

export default SingleShoe;
