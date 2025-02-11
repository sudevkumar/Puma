import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Components/Card";
import ShowMsg from "../Components/ShowMsg";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";
import Footer from "../Components/Footer";

const ShowWithDiscount = () => {
  const { id } = useParams();
  const [shoes, setShoes] = useState([]);
  const getAllShoes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/shoe/searchs?type=${id}&discount=40`
      );
      setShoes(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllShoes();
    document.title = `Puma ${id} shoes with discount 40%.`;
  }, []);
  return (
    <>
      <Navbar />
      <ResponsiveNavbar />
      <section className="w-full h-auto absolute top-[70px] lg:top-[100px]">
        <section className=" p-[40px] w-full h-auto ">
          <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold">
            Showing shoes for {id}
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

export default ShowWithDiscount;
