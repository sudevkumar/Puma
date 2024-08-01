import React from "react";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <>
      <section className=" w-full h-[85vh] relative  hidden lg:block">
        <img
          src="https://cdn.sanity.io/images/qa41whrn/prod/09646d25a041fa5bb063844eaad9fdae3af30fde-2880x1040.jpg?w=2160&q=80&auto=format"
          alt=""
          className=" w-full h-full relative"
        />
        <div className=" absolute bottom-[40%] flex flex-col items-center right-[86px] text-white">
          <h1 className=" text-4xl font-bold ">END OF SEASON SALE</h1>
          <h1 className="text-2xl mt-2">NEW STYLE ADDED</h1>
          <p className="">+ EXTRA 5% OFF ON ALL ONLINE PAYMENTS</p>
          <div className=" flex gap-2 mt-5">
            <Link to={"showwithdiscount/men"}>
              {" "}
              <button className=" bg-white text-black w-[100px] h-[40px] text-[14px] font-bold">
                For Him
              </button>
            </Link>

            <Link to={"showwithdiscount/women"}>
              <button className=" bg-white text-black w-[100px] h-[40px] text-[14px] font-bold">
                For Her
              </button>
            </Link>

            <Link to={"showwithdiscount/kid"}>
              <button className=" bg-white text-black w-[100px] h-[40px] text-[14px] font-bold">
                For Kid
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className=" w-full h-[85vh] lg:hidden ">
        <img
          src="https://cdn.sanity.io/images/qa41whrn/prod/35ff63a6b064ad2744e92eaa393abb6a9a1d0122-1536x1536.jpg?w=720&q=80&auto=format"
          alt=""
          className=" w-full h-full "
        />

        <div className=" w-full flex flex-col items-center ">
          <h1 className=" text-2xl font-bold ">END OF SEASON SALE</h1>
          <h1 className="text-[18px] mt-1">NEW STYLE ADDED</h1>
          <p className="">+ EXTRA 5% OFF ON ALL ONLINE PAYMENTS</p>
          <div className=" flex gap-2 mt-5">
            <Link to={"showwithdiscount/men"}>
              {" "}
              <button className=" bg-black text-white w-[100px] h-[40px] text-[14px] font-bold">
                For Him
              </button>
            </Link>

            <Link to={"showwithdiscount/women"}>
              <button className=" bg-black text-white w-[100px] h-[40px] text-[14px] font-bold">
                For Her
              </button>
            </Link>

            <Link to={"showwithdiscount/kid"}>
              <button className=" bg-black text-white w-[100px] h-[40px] text-[14px] font-bold">
                For Kid
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroBanner;
