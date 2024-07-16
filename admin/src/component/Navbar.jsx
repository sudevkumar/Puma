import React, { useContext } from "react";
import { navBar } from "../utils";
import { UserContext } from "../context/context";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <nav className=" w-full h-[80px] bg-black flex">
        <div className=" w-[60%] flex px-5  text-white hover:text-gray-400 gap-[30PX] items-center">
          <img
            src="https://i.pinimg.com/564x/87/02/6a/87026affe8b9ae802ebe49f594a29228.jpg"
            alt=""
            className=" h-full w-[60px]"
          />
          <ul className=" flex gap-[30PX]">
            {navBar.map((nav, i) => (
              <Link to={`${nav.link}`}>
                <li
                  key={i}
                  className=" hover:text-white cursor-pointer hover:underline text-[16px] font-semibold"
                >
                  {nav.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className=" w-[40%] h-full flex justify-center items-center">
          {user === null ? (
            <FaUserAlt fill="white" size={25} className="cursor-pointer" />
          ) : (
            <>
              <div className=" w-[50px] h-[50px] bg-white rounded-full cursor-pointer">
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

      <div></div>
    </>
  );
};

export default Navbar;
