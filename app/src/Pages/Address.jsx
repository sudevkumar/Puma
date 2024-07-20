import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { formatToINR } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";

const Address = () => {
  const { getShoeByIdCart } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.user.user);

  // title
  useEffect(() => {
    document.title = "Puma billing details.";
  }, []);

  //   Get All Cart for Login User
  const getCartItem = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/cart/get?userId=${user?.user?._id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setCart(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItem();
  }, []);

  //   Get cart discount price
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      cart.forEach((item) => {
        const price = parseFloat(item.price);
        const discount = parseFloat(item.discount) / 100; // Convert percentage to decimal
        const qty = parseInt(item.qty, 10);
        const discountedPrice = price * (1 - discount); // Apply discount
        total += discountedPrice * qty;
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  return <div>{formatToINR(totalPrice)}</div>;
};

export default Address;
