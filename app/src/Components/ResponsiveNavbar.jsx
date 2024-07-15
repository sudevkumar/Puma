import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { navBar } from "../utils";
import { Link } from "react-router-dom";

const ResponsiveNavbar = () => {
  const [search, setsearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleSearch = () => {
    console.log(search);
    alert(search);
  };
  return (
    <>
      <nav className=" w-full h-[70px] bg-black flex fixed lg:hidden">
        <img
          src="https://i.pinimg.com/564x/87/02/6a/87026affe8b9ae802ebe49f594a29228.jpg"
          alt=""
          className=" h-full w-[60px]"
        />
        <div className=" w-[80%] h-full flex items-center gap-5  ">
          <form
            onSubmit={handleSearch}
            action=""
            className=" w-[80%] h-[40px]  flex items-center bg-white rounded-md"
          >
            <input
              type="text"
              name=""
              id=""
              className=" w-[85%] h-full rounded-l-md px-4 outline-none"
              placeholder="Search..."
              onChange={(e) => setsearch(e.target.value)}
            />
            <button className=" w-[15%] h-full flex justify-center items-center">
              <FiSearch />
            </button>
          </form>
          <div
            className=" w-[38px] h-[38px] rounded-md border border-white flex justify-center items-center"
            onClick={() => setOpen(true)}
          >
            <RxHamburgerMenu color="white" size={25} />
          </div>
        </div>
      </nav>

      {/* {open && ( */}
      <div
        className={`absolute ${
          open ? "top-0 left-[0]" : "top-0 -left-[100%]"
        } w-full h-screen overflow-scroll bg-black transition-all duration-300`}
      >
        <div className=" w-full h-[60px] flex items-center ">
          <img
            src="https://i.pinimg.com/564x/87/02/6a/87026affe8b9ae802ebe49f594a29228.jpg"
            alt=""
            className=" h-full w-[60px]"
          />
          <div className=" flex gap-4 items-center justify-center w-[70%] ">
            <GoHeartFill fill="white" size={25} className=" cursor-pointer" />
            <div className=" relative cursor-pointer">
              <BsFillCartFill fill="white" size={25} />
              <div className=" absolute w-4 h-4 rounded-full bg-red-500 -top-2 -right-1 flex justify-center items-center text-[10px] font-semibold text-white ">
                1
              </div>
            </div>
            <FaUserAlt fill="white" size={25} className="cursor-pointer" />
          </div>
          <div
            className=" w-[38px] h-[38px] rounded-md border border-white flex justify-center items-center"
            onClick={() => setOpen(false)}
          >
            <RxCross1 color="white" size={25} />
          </div>
        </div>

        <hr className=" mb-3" />

        <div className=" flex flex-col w-full text-white">
          <ul>
            {navBar.map((nav, i) => (
              <>
                <li className=" text-[19px] m-4" key={i}>
                  {nav}
                </li>
                <hr />
              </>
            ))}
          </ul>
        </div>

        <div
          className=" w-[90%] mt-2 mb-4 mx-auto"
          onClick={() => setOpen(false)}
        >
          <Link to={"/login"}>
            <button className=" w-full p-2 bg-white">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavbar;
