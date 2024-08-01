import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMsg from "../Components/ShowMsg";
import { calculateDiscountedPrice, formatToINR } from "../utils";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";
import Footer from "../Components/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [actualPrice, setActualPrice] = useState(0);
  const user = useSelector((state) => state.user.user);
  const { getShoeByIdCart } = useContext(CartContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    document.title = "Puma cart";
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

  //   get cart actual price

  useEffect(() => {
    const calculateActualPrice = () => {
      let total = 0;
      cart.forEach((item) => {
        const price = parseFloat(item.price);
        const qty = parseInt(item.qty);
        total += price * qty;
      });
      setActualPrice(total);
    };

    calculateActualPrice();
  }, [cart]);

  //   Delete a product from cart
  const delteCartProduct = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5050/api/v1/cart/${id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      getCartItem();
      getShoeByIdCart();
      toast.success("Item removed from cart!");
    } catch (error) {
      console.log(error);
    }
  };

  const goToBillingPage = () => {
    navigate("/address");
  };

  return (
    <>
      <Navbar />
      <ResponsiveNavbar />
      <div className=" w-full h-auto absolute top-[100px]">
        <section className="  w-full h-auto p-[40px]">
          {cart.length === 0 ? (
            <ShowMsg msg="Cart is empty!" wid="full" hig="60vh" />
          ) : (
            <div className="  w-[100%] mt-7 flex flex-col lg:flex-row gap-3">
              <div className=" w-full lg:w-[60%] flex flex-col gap-3">
                {cart.map((ct) => (
                  <div className=" w-full h-auto border flex flex-col lg:flex-row gap-3">
                    <img
                      src={ct.mainImg}
                      alt=""
                      className=" w-full lg:w-[50%] h-[200px]"
                    />
                    <div className=" w-full flex flex-col gap-2 lg:p-0 p-2">
                      <h1 className=" text-xl lg:text-2xl font-semibold">
                        {ct.title}
                      </h1>
                      <p className=" text-[14px]">Qty:{ct.qty}</p>
                      <p className=" text-[14px]">Color:{ct.color}</p>
                      <p className=" text-[14px] font-semibold">
                        {calculateDiscountedPrice(ct.price, ct.discount)}
                      </p>

                      <button
                        className=" w-[50%] lg:w-[33%] bg-red-600 text-white font-semibold text-[14px] mt-3 p-3"
                        onClick={() => delteCartProduct(ct._id)}
                      >
                        Remove From Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Details */}

              <div className=" w-full lg:w-[35%] border border-black h-[350px] p-5 ">
                <h1 className=" text-2xl font-semibold">Your cart details</h1>
                <hr className=" mt-4" />
                <div className=" w-full h-full flex flex-col mt-4 gap-4">
                  <div className=" w-full flex h-[30px] items-center">
                    <h1 className=" text-xl w-1/2 font-semibold">
                      Your Price:{" "}
                    </h1>
                    <span className=" text-xl w-1/2 font-semibold">
                      {formatToINR(actualPrice)}
                    </span>
                  </div>

                  <div className=" w-full flex h-[30px] items-center">
                    <h1 className=" text-[18px] w-1/2 font-semibold">
                      Your Discount Price:{" "}
                    </h1>
                    <span className=" text-[18px] w-1/2 font-semibold">
                      {formatToINR(totalPrice)}
                    </span>
                  </div>

                  <div className=" w-full flex h-[30px] items-center">
                    <h1 className=" text-[16px] w-1/2 font-semibold">
                      Your Have Saved:{" "}
                    </h1>
                    <span className=" text-[16px] w-1/2 font-semibold">
                      {formatToINR(actualPrice - totalPrice)}
                    </span>
                  </div>

                  <hr className=" mt-3" />

                  <button
                    onClick={goToBillingPage}
                    className=" w-full bg-green-500 p-4 text-[15px] font-bold text-white"
                  >
                    PAY THE BILL
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
