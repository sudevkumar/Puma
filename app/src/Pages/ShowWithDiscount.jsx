import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../Components/Card";

const ShowWithDiscount = () => {
  const { id } = useParams();
  const [shoes, setShoes] = useState([]);
  const getAllShoes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/shoe/search?type=${id}&discount=40`
      );
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
      <h1 className=" text-4xl font-bold">Showing shoes for {id}</h1>
      {shoes.length === 0 ? (
        <div className=" w-[full] h-[60vh] flex justify-center items-center">
          <h1 className=" text-3xl font-semibold">No products found!</h1>
        </div>
      ) : (
        <div className="  w-full mt-7 grid grid-cols-4 gap-x-3 gap-y-3">
          {shoes?.map((shoe) => (
            <Link to={`/singleshoe/${shoe._id}`}>
              <Card shoe={shoe} showNav={true} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ShowWithDiscount;
