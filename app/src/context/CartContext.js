import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartNumber, setCartNumber] = useState(0);
  const user = useSelector((state) => state.user.user);

  const getShoeByIdCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/cart/get?userId=${user?.user?._id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setCartNumber(res?.data?.length);
      console.log(res?.data, "Navbar");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShoeByIdCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartNumber, setCartNumber, getShoeByIdCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
