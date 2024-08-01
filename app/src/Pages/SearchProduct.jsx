import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShowMsg from "../Components/ShowMsg";
import Card from "../Components/Card";
import Footer from "../Components/Footer";

const SearchProduct = () => {
  const [shoes, setShoes] = useState([]);
  const { id } = useParams();
  console.log(id);
  const searchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/shoe/search?title=${id}`
      );
      setShoes(res?.data?.shoes);
      console.log(shoes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchProduct();
    document.title = `Puma Searching for ${id}`;
  }, [id]);
  return (
    <>
      <Navbar />
      <ResponsiveNavbar />
      <section className="w-full h-auto absolute top-[70px] lg:top-[100px]">
        <section className=" p-[40px] w-full min-h-[70vh] h-auto  ">
          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold">
            Showing result for {id}
          </h1>
          {shoes?.length === 0 ? (
            <ShowMsg msg="No Product Found!" wid="full" hig="60vh" />
          ) : (
            <div className="  w-full mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-x-3 gap-y-3">
              {shoes?.map((shoe) => (
                <Card shoe={shoe} showNav={true} />
              ))}
            </div>
          )}
        </section>
        <Footer />
      </section>
    </>
  );
};

export default SearchProduct;
