import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { formatToINR } from "../utils";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { setCartNumber } = useContext(CartContext);

  // User Address Details Payload
  const [payment, setPayment] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCVV] = useState("");

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

  // Place order
  const handlePlaceOrder = async () => {
    if (!name) {
      return toast.error("Please enter the name!");
    }

    if (!mail) {
      return toast.error("Please enter the mail id!");
    }

    if (!address) {
      return toast.error("Please enter the address!");
    }

    if (!phone || phone.length !== 10) {
      return toast.error("Please enter the phone number!");
    }

    if (!payment) {
      return toast.error("Please select the payment method!");
    }

    if (showCard === true && !card) {
      return toast.error("Please enter your card number!");
    }

    if (showCard === true && card.length !== 16) {
      return toast.error("Please enter valid card number!");
    }

    if (showCard === true && !cvv) {
      return toast.error("Please enter your card cvv!");
    }

    if (showCard === true && cvv.length !== 3) {
      return toast.error("Please enter valid card cvv!");
    }

    const payload = {
      userId: user?.user?._id,
      name,
      address,
      phone,
      mail,
      prodArray: cart,
      payment,
      card,
      cvv,
      status: "pending",
      total: totalPrice,
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/api/v1/order/create",
        payload
      );

      await axios.delete(
        `http://localhost:5050/api/v1/cart/delete/${user?.user?._id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setCartNumber(0);
      toast.success("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className=" w-full h-auto p-[40px]">
      <h2 className=" text-3xl font-semibold">Billing Address</h2>
      <div className=" w-full h-auto grid grid-cols-3 gap-3 mt-5">
        <input
          type="text"
          name=""
          id=""
          placeholder="Your name..."
          className=" w-full border p-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="mail"
          name=""
          id=""
          placeholder="Your email..."
          className=" w-full border p-3"
          onChange={(e) => setMail(e.target.value)}
        />

        <input
          type="text"
          name=""
          id=""
          placeholder="Your phone number..."
          className=" w-full border p-3"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          name=""
          id=""
          placeholder="Your address..."
          className=" w-full border p-3"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <h2 className=" text-xl font-semibold mt-4">
        Payment Of {formatToINR(totalPrice)}
      </h2>
      <select
        name=""
        onChange={(e) => {
          setPayment(e.target.value);
          setShowCard(e.target.value === "card" ? true : false);
        }}
        id=""
        className=" w-fit border p-3 mt-4"
      >
        <option value="">Please Choose a Payment Method</option>
        <option value="cash">Cash On Delivery</option>
        <option value="card">Debit / Credit Cards</option>
      </select>

      {showCard && (
        <div className=" w-full mt-4 flex gap-4">
          <div className=" flex flex-col gap-2">
            <label htmlFor="" className=" text-[14px] font-semibold">
              Card Number
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your 16 digit card number"
              className=" w-[450px] border p-3"
              onChange={(e) => setCard(e.target.value)}
            />
          </div>

          <div className=" flex flex-col gap-2">
            <label htmlFor="" className=" text-[14px] font-semibold">
              CVV
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your 3 digit CVV"
              className=" w-[450px] border p-3"
              onChange={(e) => setCVV(e.target.value)}
            />
          </div>
        </div>
      )}

      <div className=" w-full flex justify-center mt-6  ">
        <button
          className=" w-[200px] bg-green-600 p-3 text-[14px] text-white font-semibold"
          onClick={handlePlaceOrder}
        >
          Place the order
        </button>
      </div>
    </section>
  );
};

export default Address;
