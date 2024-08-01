import React, { useContext, useEffect, useState } from "react";
import { navBar } from "../utils";
import { FiSearch } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiDeliveryTruck } from "react-icons/ci";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [search, setsearch] = useState("");
  const { cartNumber, setCartNumber } = useContext(CartContext);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    setCartNumber(0);
    navigate("/");
    toast.success("See you soon!");
  };

  return (
    <nav className=" fixed w-[100%] h-[80px] bg-black lg:flex hidden z-50">
      <div className=" w-[60%] flex px-5  text-white hover:text-gray-400 gap-4 items-center">
        <img
          src="https://i.pinimg.com/564x/87/02/6a/87026affe8b9ae802ebe49f594a29228.jpg"
          alt=""
          className=" h-full w-[60px] cursor-pointer"
          onClick={() => navigate("/")}
        />

        <ul className=" flex gap-4">
          {navBar.map((nav, i) => (
            <Link to={`/category/${nav}`}>
              <li
                key={i}
                className=" hover:text-white cursor-pointer hover:underline text-[16px] font-semibold"
              >
                {nav}
              </li>
            </Link>
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
            value={search}
            id=""
            className=" w-[85%] h-full rounded-l-md px-4 outline-none"
            placeholder="Search..."
            onChange={(e) => setsearch(e.target.value)}
          />
          <button className=" w-[15%] h-full flex justify-center items-center">
            <FiSearch title="Search" />
          </button>
        </form>
        <Link to={"/order"}>
          <CiDeliveryTruck
            fill="white"
            size={27}
            className=" cursor-pointer"
            title="Order"
          />
        </Link>
        <div className=" relative cursor-pointer">
          <Link to={"/cart"}>
            <BsFillCartFill fill="white" size={25} title="Cart" />
            <div className=" absolute w-4 h-4 rounded-full bg-red-500 -top-2 -right-1 flex justify-center items-center text-[10px] font-semibold text-white ">
              {cartNumber}
            </div>
          </Link>
        </div>

        {user === null ? (
          <Link to={"/login"}>
            <FaUserAlt
              fill="white"
              size={25}
              className="cursor-pointer"
              title="Login/Register"
            />
          </Link>
        ) : (
          <>
            <div
              className=" w-[50px] h-[50px] bg-white rounded-full"
              onClick={handleLogOut}
            >
              <img
                src={
                  user?.user?.userimg
                    ? user?.user?.userimg
                    : "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                }
                alt={user.user.username}
                className=" rounded-full w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
