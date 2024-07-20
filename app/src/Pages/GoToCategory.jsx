import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GoToCategory = () => {
  const [shoe, setShoe] = useState([]);
  const { name } = useParams();

  const getAllCategoryProduct = async () => {
    try {
      if (name === "New") {
        const res = await axios.get("http://localhost:5050/api/v1/shoe/recent");
        setShoe(res?.data);
      } else if (name === "Kids") {
        const res = await axios.get(
          `http://localhost:5050/api/v1/shoe/search?type=kid`
        );
        console.log(res?.data);
        setShoe(res?.data);
      } else {
        const res = await axios.get(
          `http://localhost:5050/api/v1/shoe/search?type=${name}`
        );
        console.log(res?.data);
        setShoe(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategoryProduct();
    document.title = `Puma Shoe's for ${name}`;
  }, [name]);

  return <div>{name}</div>;
};

export default GoToCategory;
