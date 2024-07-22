import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatToINR, xNumebr } from "../utils";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const EditOrder = () => {
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.user.user);

  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  console.log(id, "id");

  const getAllOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/order`, {
        headers: {
          Authorization: user.token,
        },
      });
      setOrder(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5050/api/v1/order/${orderId}`,
        { status },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setOrder((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: res.data.status } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
    document.title = "Pume Admin order details.";
  }, []);

  return (
    <section className=" w-full h-auto p-[40px]">
      <div className=" w-full h-auto flex flex-col gap-3">
        {order?.map((ord) => (
          <div
            key={ord._id}
            className={` w-full ${
              show === true && id === ord._id ? "h-auto" : "h-[150px]"
            } border border-black p-[30px] rounded-md overflow-hidden  `}
          >
            <div className=" flex">
              <div className=" w-[45%]">
                <h1 className="text-[15px] font-semibold">{ord._id}</h1>
                <h1 className="text-[15px] font-semibold">{ord.name}</h1>
                <h1 className="text-[15px] font-semibold">{ord.phone}</h1>
                <h1 className="text-[15px] font-semibold">{ord.mail}</h1>
                <h1 className="text-[15px] font-semibold">{ord.address}</h1>
              </div>

              <div className=" w-[45%]">
                <h1 className="text-[18px] font-semibold">
                  {formatToINR(ord.total)}
                </h1>
                <h1 className="text-[15px] font-semibold">
                  Payment type:{ord.payment}
                </h1>
                {ord.card !== "" && (
                  <h1 className="text-[15px] font-semibold">
                    {xNumebr(ord.card)}
                  </h1>
                )}

                <select
                  className=" w-fit p-1 bg-red-500 text-[10px] rounded-md font-semibold text-white"
                  value={ord.status || "pending"}
                  onChange={(e) => updateOrderStatus(ord._id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="outfordelivery">out for delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="w-[10%] flex justify-center items-center ">
                <div
                  className="w-[50px] h-[50px] bg-white rounded-full border flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    setId(ord._id);
                    setShow(ord._id === id ? !show : true);
                  }}
                >
                  <BiDownArrow size={24} title="Show more" />
                </div>
              </div>
            </div>
            {show === true && id === ord._id && (
              <div className=" flex flex-col gap-4 mt-5">
                {ord?.prodArray?.map((ele) => (
                  <div key={ele.title} className=" w-full border flex gap-3">
                    <img src={ele.mainImg} alt="" className=" w-[20%]" />
                    <div className=" w-[75%]">
                      <h1 className=" text-2xl">{ele.title}</h1>
                      <h1 className=" text-[20px]">Qty : {ele.qty}</h1>
                      <h1 className=" text-[20px]">{formatToINR(ele.price)}</h1>
                      <h1 className=" text-[20px]">{ele.type}</h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EditOrder;
