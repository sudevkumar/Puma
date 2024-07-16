import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { getUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
      return toast.error("Username required!");
    }

    if (!password) {
      return toast.error("Password required!");
    }

    const payload = {
      username,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/api/v1/auth/loginpuma",
        payload
      );
      toast.success("Login Successfull!");
      navigate("/");
      localStorage.setItem("puma-data-admin", JSON.stringify(res?.data));
      getUser();
      console.log(res);
    } catch (error) {
      console.log(error?.response?.data);
      toast.error(error?.response?.data);
    }
  };

  return (
    <section className=" w-full h-auto  py-10">
      <div className=" w-[90%] md:w-[60%] m-auto mt-[100px] lg:mt-[50px] ">
        <h1 className=" text-5xl font-bold">Login</h1>
        <form
          action=""
          onSubmit={handleLogin}
          className="  w-[100%] md:w-[70%]  m-auto mt-7 flex flex-col gap-5"
        >
          <div className=" w-full  flex flex-col gap-3">
            <label htmlFor="" className=" flex gap-1">
              Username
              <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className=" w-[80%] border border-black outline-none px-5 h-[45px]"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className=" w-full  flex flex-col gap-3">
            <label htmlFor="" className=" flex gap-1">
              Password
              <span className=" text-red-500">*</span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              name=""
              id=""
              className=" w-[80%] border border-black outline-none px-5 h-[45px]"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className=" w-full  flex gap-3">
            <input
              type="checkbox"
              name=""
              id="check"
              className=" w-4 outline-none"
              onChange={(e) => setShowPass(e.target.checked)}
            />
            <label htmlFor="check" className=" cursor-pointer">
              Show Password
            </label>
          </div>

          <button className=" w-[80%] h-[45px] bg-black text-white">
            Login
          </button>

          <strong>
            Don't have an acount?{" "}
            <Link to={"/registerpuma"}>
              <span className=" text-blue-500 underline cursor-pointer">
                Register
              </span>
            </Link>
          </strong>
        </form>
      </div>
    </section>
  );
};

export default Login;
