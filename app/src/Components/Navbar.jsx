import React, { useState } from "react";
import { navBar } from "../utils";
import { FiSearch } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const handleSearch = () => {
    console.log(search);
    alert(search);
  };
  return (
    <nav className=" w-[100%] hidden h-[80px] bg-black lg:flex ">
      <div className=" w-[60%] flex px-5  text-white hover:text-gray-400 gap-4 items-center">
        <img
          src="https://i.pinimg.com/564x/87/02/6a/87026affe8b9ae802ebe49f594a29228.jpg"
          alt=""
          className=" h-full w-[60px]"
        />
        <ul className=" flex gap-4">
          {navBar.map((nav, i) => (
            <li
              key={i}
              className=" hover:text-white cursor-pointer hover:underline text-[16px] font-semibold"
            >
              {nav}
            </li>
          ))}
        </ul>
      </div>

      <div className=" w-[40%] h-full flex items-center gap-5  ">
        <form
          onSubmit={handleSearch}
          action=""
          className=" w-[60%] h-[50px]  flex items-center bg-white rounded-md"
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
        <GoHeartFill fill="white" size={25} className=" cursor-pointer" />
        <div className=" relative cursor-pointer">
          <BsFillCartFill fill="white" size={25} />
          <div className=" absolute w-4 h-4 rounded-full bg-red-500 -top-2 -right-1 flex justify-center items-center text-[10px] font-semibold text-white ">
            1
          </div>
        </div>
        <FaUserAlt fill="white" size={25} className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
