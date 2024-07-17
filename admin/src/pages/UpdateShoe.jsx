import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateShoe = () => {
  const [shoes, setShoes] = useState({});
  const [title, setTitle] = useState("");
  const [mainImg, setMainImg] = useState("");
  const [subOneImg, setSubOneImg] = useState("");
  const [subTwoImg, setSubTwoImg] = useState("");
  const [subThreeImg, setSubThreeImg] = useState("");
  const [subFourImg, setSubFourImg] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [fors, setFors] = useState("");
  const [desc, setDesc] = useState("");
  const [productStory, setProductStory] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);

  const mainImageRef = useRef(null);
  const subOneImageRef = useRef(null);
  const subTwoImageRef = useRef(null);
  const subThreeImageRef = useRef(null);
  const subFourImageRef = useRef(null);

  // Navigator
  const navigate = useNavigate();

  const getShoeById = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/shoe/${id}`);
      const shoeData = res.data;
      setShoes(shoeData);
      setTitle(shoeData.title);
      setMainImg(shoeData.mainImg);
      setSubOneImg(shoeData.subOneImg);
      setSubTwoImg(shoeData.subTwoImg);
      setSubThreeImg(shoeData.subThreeImg);
      setSubFourImg(shoeData.subFourImg);
      setPrice(shoeData.price);
      setDiscount(shoeData.discount);
      setFors(shoeData.for);
      setDesc(shoeData.desc);
      setProductStory(shoeData.productStory);
      setCountryOfOrigin(shoeData.countryOfOrigin);
      setStyle(shoeData.style);
      setColor(shoeData.color);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getShoeById();
  }, []);

  const handleImageUpload = async (event, setImage) => {
    const image = event.target.files[0];
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "puma app");

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

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      mainImg,
      subOneImg,
      subTwoImg,
      subThreeImg,
      subFourImg,
      price,
      discount,
      type: fors,
      desc,
      productStory,
      countryOfOrigin,
      style,
      color,
    };

    try {
      await axios.patch(`http://localhost:5050/api/v1/shoe/${id}`, payload, {
        headers: {
          Authorization: user.token,
        },
      });

      toast.success("Shoe is updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Error updating shoe");
      console.error(error);
    }
  };

  return (
    <section className="p-[40px] w-full h-auto">
      <h1 className="text-3xl">Update Product</h1>
      <form className="w-[70%] h-auto px-10 py-10" onSubmit={handlePostUpdate}>
        <h1 className="text-4xl">Update Shoe</h1>
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
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="for" className="flex gap-1">
              For <span className="text-red-500">*</span>
            </label>
            <select
              name=""
              id="for"
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              onChange={(e) => setFors(e.target.value)}
            >
              <option value="">Please Select Shoe's For</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kid">Kid</option>
            </select>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label htmlFor="productDec" className="flex gap-1">
              Product Descriptions <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productDec"
              value={desc}
              className="w-[100%] border border-black outline-none px-5 h-[45px]"
              placeholder="Product Description"
              onChange={(e) => setDesc(e.target.value)}
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
              placeholder={"Style" || shoes.style}
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
              placeholder={"Color" || shoes?.color}
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

export default UpdateShoe;
