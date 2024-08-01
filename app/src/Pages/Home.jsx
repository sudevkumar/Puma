import HeroBanner from "../Components/HeroBanner";
import VideoBannner from "../Components/VideoBannner";
import ShowShoes from "../Components/ShowShoes";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";

const Home = () => {
  const [shoes, setShoes] = useState([]);
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

  useEffect(() => {
    document.title = "Puma Home Page";
  }, []);
  return (
    <>
      <Navbar />
      <ResponsiveNavbar />
      <section className=" w-full h-auto absolute top-[70px] lg:top-[80px] ">
        <HeroBanner />
        <VideoBannner />
        <ShowShoes shoes={shoes} compTitle="PUMA SPOTLIGHT" />
        <Footer />
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default Home;
