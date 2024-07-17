import React from "react";
import { account, support } from "../utils";
import {
  FaYoutube,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section className=" w-full h-[60vh] bg-black text-white p-[44px]">
      <div className=" w-full flex">
        <div className=" px-10 pb-10 w-[50%]">
          <h1 className=" text-xl font-semibold">Support</h1>
          <ul className=" grid grid-cols-2 w-full gap-y-1 mt-4">
            {support.map((ele, ind) => (
              <li className=" text-[15px] font-light">{ele}</li>
            ))}
          </ul>
        </div>

        <div className=" px-10 pb-10 w-[50%] flex ">
          <div className=" w-[50%]">
            <h1 className=" text-xl font-semibold">About</h1>
            <ul className=" w-[40%] flex flex-col gap-1 mt-4">
              {account.map((ele, ind) => (
                <li className=" text-[15px] font-light">{ele}</li>
              ))}
            </ul>
          </div>

          <div className=" w-[60%] h-full ">
            <h1 className=" text-xl font-semibold">STAY UP TO DATE</h1>
            <p className=" font-light mt-1">Sign Up for Email</p>
            <div className=" w-full flex gap-5 mt-9">
              <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center  hover:bg-white hover:bg-opacity-25 cursor-pointer">
                <FaYoutube size={33} />
              </div>

              <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center  hover:bg-white hover:bg-opacity-25 cursor-pointer">
                <FaTwitter size={33} />
              </div>

              <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center  hover:bg-white hover:bg-opacity-25 cursor-pointer">
                <FaFacebook size={33} />
              </div>

              <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center  hover:bg-white hover:bg-opacity-25 cursor-pointer">
                <FaPinterest size={33} />
              </div>

              <div className=" w-[50px] h-[50px]  rounded-full flex justify-center items-center  hover:bg-white hover:bg-opacity-25 cursor-pointer">
                <FaInstagram size={33} />
              </div>
            </div>

            <div className=" mt-4">
              <h1 className=" text-xl font-semibold">EXPLORE</h1>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className=" w-full flex flex-col gap-1 pt-6 mb-3">
        <p className=" text-sm font-light">
          © PUMA INDIA LTD, 2024. ALL RIGHTS RESERVED.
        </p>
        <p>Created by Sudev.</p>
      </div>
    </section>
  );
};

export default Footer;
