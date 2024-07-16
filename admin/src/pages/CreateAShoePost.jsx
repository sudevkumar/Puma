import axios from "axios";
import React, { useContext, useState, useRef } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/context";

const CreateAShoePost = () => {
  const [title, setTitle] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [subOneImg, setSubOneImg] = useState("");
  const [subTwoImg, setSubTwoImg] = useState("");
  const [subThreeImg, setSubThreeImg] = useState("");
  const [subFourImg, setSubFourImg] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [productStory, setProductStory] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const { user } = useContext(UserContext);

  const mainImageRef = useRef(null);
  const subOneImageRef = useRef(null);
  const subTwoImageRef = useRef(null);
  const subThreeImageRef = useRef(null);
  const subFourImageRef = useRef(null);

  // Cloudinary upload function
  const handleImageUpload = async (event, setImage) => {
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
        setImage(response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handlePostCreate = async (e) => {
    e.preventDefault();
    if (!title) return toast.error("Title is required!");
    if (!mainImg) return toast.error("Main image is required!");
    if (!price) return toast.error("Price is required!");
    if (!discount) return toast.error("Discount is required!");
    if (!productStory) return toast.error("Product story is required!");
    if (!countryOfOrigin) return toast.error("Country of origin is required!");
    if (!style) return toast.error("Style is required!");
    if (!color) return toast.error("Color is required!");

    const payload = {
      title,
      mainImg,
      subOneImg,
      subTwoImg,
      subThreeImg,
      subFourImg,
      price,
      discount,
      productStory,
      countryOfOrigin,
      style,
      color,
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/api/v1/shoe/create",
        payload,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      toast.success("Post created successfully!");

      setTitle("");
      setMainImg("");
      setSubOneImg("");
      setSubTwoImg("");
      setSubThreeImg("");
      setSubFourImg("");
      setPrice("");
      setDiscount("");
      setProductStory("");
      setCountryOfOrigin("");
      setStyle("");
      setColor("");

      // Reset file input elements
      mainImageRef.current.value = "";
      subOneImageRef.current.value = "";
      subTwoImageRef.current.value = "";
      subThreeImageRef.current.value = "";
      subFourImageRef.current.value = "";
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <section className="flex justify-center">
      <form className="w-[70%] h-auto px-10 py-10" onSubmit={handlePostCreate}>
        <h1 className="text-4xl">Create a new post</h1>
        <div className="grid grid-cols-2 gap-5 mt-4">
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="title" className="flex gap-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="mainImg" className="flex gap-1">
              Main Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="mainImg"
              ref={mainImageRef}
              onChange={(e) => handleImageUpload(e, setMainImg)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="subOneImg" className="flex gap-1">
              Sub Picture 1
            </label>
            <input
              type="file"
              id="subOneImg"
              ref={subOneImageRef}
              onChange={(e) => handleImageUpload(e, setSubOneImg)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="subTwoImg" className="flex gap-1">
              Sub Picture 2
            </label>
            <input
              type="file"
              id="subTwoImg"
              ref={subTwoImageRef}
              onChange={(e) => handleImageUpload(e, setSubTwoImg)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="subThreeImg" className="flex gap-1">
              Sub Picture 3
            </label>
            <input
              type="file"
              id="subThreeImg"
              ref={subThreeImageRef}
              onChange={(e) => handleImageUpload(e, setSubThreeImg)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="subFourImg" className="flex gap-1">
              Sub Picture 4
            </label>
            <input
              type="file"
              id="subFourImg"
              ref={subFourImageRef}
              onChange={(e) => handleImageUpload(e, setSubFourImg)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="price" className="flex gap-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="price"
              value={price}
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="discount" className="flex gap-1">
              Discount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="discount"
              value={discount}
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="productStory" className="flex gap-1">
              Product Story <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productStory"
              value={productStory}
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Product Story"
              onChange={(e) => setProductStory(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="countryOfOrigin" className="flex gap-1">
              Country Of Origin <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="countryOfOrigin"
              value={countryOfOrigin}
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Country Of Origin"
              onChange={(e) => setCountryOfOrigin(e.target.value)}
            />
          </div>

          <div className=" w-full  flex flex-col gap-2">
            <label htmlFor="" className=" flex gap-1">
              Style
              <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              value={style}
              name=""
              id=""
              className=" w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Style"
              onChange={(e) => setStyle(e.target.value)}
            />
          </div>

          <div className=" w-full  flex flex-col gap-2">
            <label htmlFor="" className=" flex gap-1">
              Color
              <span className=" text-red-500">*</span>
            </label>
            <input
              type="text"
              name=""
              value={color}
              id=""
              className=" w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Color"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>

        <button className=" w-full mt-4 py-3 bg-black text-white">
          Submit
        </button>
      </form>
    </section>
  );
};

export default CreateAShoePost;
