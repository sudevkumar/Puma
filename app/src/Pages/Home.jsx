import HeroBanner from "../Components/HeroBanner";
import VideoBannner from "../Components/VideoBannner";
import ShowShoes from "../Components/ShowShoes";
import axios from "axios";
import { useEffect, useState } from "react";

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
      <HeroBanner />
      <VideoBannner />
      <ShowShoes shoes={shoes} compTitle="PUMA SPOTLIGHT" />
    </>
  );
};

export default Home;

// https://cdn.sanity.io/images/qa41whrn/prod/57b628c688021950aac02b0eae07b9bdb81de7f5-1536x1536.jpg?w=2160&q=80&auto=format
// https://cdn.sanity.io/images/qa41whrn/prod/ac3fc79415884460f1a7b3459b333ff091dee5a5-6000x2167.jpg?w=2160&q=80&auto=forma
// https://cdn.sanity.io/files/qa41whrn/prod/4a3026279df3bdb8eac79fcd2d37c6df1a4313e1.mp4
