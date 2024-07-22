import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMsg from "../Components/ShowMsg";
import { formatToINR, xNumebr } from "../utils";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const Order = () => {
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.user.user);
  console.log(user?.user?._id);

  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  console.log(id, "id");
  const getAllOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/order/get?userId=${user?.user?._id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setOrder(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
    document.title = "Pume order details.";
  }, []);

  return (
    <section className=" w-full h-auto p-[40px]">
      {order.length === 0 ? (
        <ShowMsg msg={"No orders yet!"} wid={"100%"} hig={"60vh"} />
      ) : (
        <div className=" w-full h-auto flex flex-col gap-3">
          {order?.map((ord) => (
            <div
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

                  <div className=" w-fit p-1 bg-red-500 text-[10px] rounded-md font-semibold text-white">
                    {ord.status}
                  </div>
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
              <div className=" flex flex-col gap-4 mt-5">
                <>
                  {ord?.prodArray?.map((ele) => (
                    <div className=" w-full border flex gap-3">
                      <img src={ele.mainImg} alt="" className=" w-[20%]" />
                      <div className=" w-[75%]">
                        <h1 className=" text-2xl">{ele.title}</h1>
                        <h1 className=" text-[20px]">Qty : {ele.qty}</h1>
                        <h1 className=" text-[20px]">
                          {" "}
                          {formatToINR(ele.price)}
                        </h1>

                        <h1 className=" text-[20px]">{ele.type}</h1>
                      </div>
                    </div>
                  ))}
                </>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Order;
