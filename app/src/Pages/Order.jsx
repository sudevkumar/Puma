import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShowMsg from "../Components/ShowMsg";
import { calculateDiscountedPrice, formatToINR, xNumebr } from "../utils";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";
import Footer from "../Components/Footer";

const Order = () => {
  const [order, setOrder] = useState([]);
  const user = useSelector((state) => state.user.user);

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
    <>
      <Navbar />
      <ResponsiveNavbar />
      <section className="w-full h-auto  absolute top-[70px] lg:top-[100px]">
        <div className=" w-full h-auto p-[40px]">
          {order.length === 0 ? (
            <ShowMsg msg={"No orders yet!"} wid={"100%"} hig={"60vh"} />
          ) : (
            <div className=" w-full h-auto flex flex-col gap-3">
              {order?.map((ord) => (
                <div
                  className={` w-full ${
                    show === true && id === ord._id ? "h-auto" : "h-[150px]"
                  } border border-black p-[10px] md:p-[30px] rounded-md overflow-hidden  `}
                >
                  <div className=" flex">
                    <div className=" w-[60%] md:w-[45%] ">
                      <h1 className="text-[15px] font-semibold">{ord._id}</h1>
                      <h1 className="text-[15px] font-semibold">{ord.name}</h1>
                      <h1 className="text-[15px] font-semibold">{ord.phone}</h1>
                      <h1 className="text-[15px] font-semibold">{ord.mail}</h1>
                      <h1 className="text-[15px] font-semibold">
                        {ord.address}
                      </h1>
                    </div>

                    <div className=" w-[45%] md:block hidden">
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

                    <div className=" w-[45%]">
                      <h1 className="text-[18px] font-semibold">
                        {formatToINR(ord.total)}
                      </h1>
                      <h1 className="text-[15px] font-semibold">
                        Payment type:{ord.payment}
                      </h1>
                      <div className=" w-fit p-1 bg-red-500 text-[10px] rounded-md font-semibold text-white">
                        {ord.status}
                      </div>
                    </div>

                    <div className=" w-[10%]  md:w-[10%] flex justify-center items-center ">
                      <div
                        className=" w-[30px] md:w-[50px] h-[30px] lg:h-[50px] bg-white md:text-[24px] text-[14px] rounded-full border flex justify-center items-center cursor-pointer"
                        onClick={() => {
                          setId(ord._id);
                          setShow(ord._id === id ? !show : true);
                        }}
                      >
                        <BiDownArrow title="Show more" />
                      </div>
                    </div>
                  </div>
                  <div className=" flex flex-col gap-4 mt-5">
                    <>
                      {ord?.prodArray?.map((ele) => (
                        <div className=" w-full border flex gap-3">
                          <img src={ele.mainImg} alt="" className=" w-[20%]" />
                          <div className=" w-[75%]">
                            <h1 className=" text-[18px] md:text-2xl">
                              {ele.title}
                            </h1>
                            <h1 className=" text-[15px] md:text-[20px]">
                              Qty : {ele.qty}
                            </h1>
                            <h1 className=" text-[15px] md:text-[20px] text-[20px]">
                              {" "}
                              {calculateDiscountedPrice(
                                ele.price,
                                ele.discount
                              )}
                            </h1>

                            <h1 className=" text-[15px] md:text-[20px]">
                              {ele.type}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Order;
