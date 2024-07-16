import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { validatePassword } from "../utils";
import { Link, useNavigate } from "react-router-dom";

// Cloudinary

const Register = () => {
  const [username, setUsername] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  //   Cloudinary Things
  const handleImageChange = async (event) => {
    const image = event.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "puma app"); // Set your upload preset here

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/sudevkumar/image/upload`,
          formData
        );
        setImageUrl(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  //   Clodinary Ends

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username) {
      return toast.error("Username required!");
    }

    if (!email) {
      return toast.error("Email required!");
    }

    if (!password) {
      return toast.error("Password required!");
    }

    if (!validatePassword(password)) {
      return toast.error(
        "Password must be at least 8 characters long, contain one uppercase letter, one number, and one symbol."
      );
    }

    if (!phone) {
      return toast.error("Phone number required!");
    }

    if (phone.length !== 10) {
      return toast.error("Provid a legal number!");
    }

    const payload = {
      username,
      userimg: imageUrl,
      email,
      password,
      phone,
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/api/v1/auth/registerpuma",
        payload
      );

      toast.success("Register Successfull!");
      navigate("/login");
      console.log(res.data.msg, "jpjpjp");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <section className=" w-full h-auto  py-10">
      <div className=" w-[90%] lg:w-[60%]  m-auto mt-[100px] lg:mt-[50px] ">
        <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
          Create Account
        </h1>
        <form
          action=""
          onSubmit={handleRegister}
          className="  w-[100%] md:w-[70%]   m-auto mt-3 lg:mt-7 flex flex-col gap-5"
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
              Email ID
              <span className=" text-red-500">*</span>
            </label>
            <input
              type="email"
              name=""
              id=""
              className=" w-[80%] border border-black outline-none px-5 h-[45px]"
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" w-full  flex flex-col gap-3">
            <label htmlFor="" className=" flex gap-1">
              Phone no.
              <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className=" w-[80%] border border-black outline-none px-5 h-[45px]"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
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

          <div className=" w-full  flex flex-col gap-3">
            <label htmlFor="" className=" flex gap-1">
              Profile Picture
            </label>
            <input
              type="file"
              name=""
              id=""
              placeholder=""
              onChange={handleImageChange}
            />
          </div>

          <button className=" w-[80%] h-[45px] bg-black text-white">
            Register
          </button>

          <strong>
            Already have an acount?{" "}
            <Link to={"/loginpuma"}>
              <span className=" text-blue-500 underline cursor-pointer">
                Login
              </span>
            </Link>
          </strong>
        </form>
      </div>
    </section>
  );
};

export default Register;
