import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageContainer from "../Components/ImageContainer";
import ProductDetails from "../Components/ProductDetails";
import ShowShoes from "../Components/ShowShoes";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import ResponsiveNavbar from "../Components/ResponsiveNavbar";
import Footer from "../Components/Footer";

const SingleShoe = () => {
  const [shoes, setShoes] = useState({});
  const [cart, setCart] = useState([]);
  const [cartFlag, setCartFlag] = useState(false);
  const [similarShoes, setSimilarShoes] = useState([]);
  const [size, setSize] = useState("UK 3");
  const [qty, setQty] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const { getShoeByIdCart } = useContext(CartContext);

  const getShoeById = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/shoe/${id}`);
      const shoeData = res.data;
      setShoes(shoeData);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllShoes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/shoe/searchs?type=${shoes?.type}`
      );
      setSimilarShoes(res?.data?.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  const getCartItem = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/cart/get?userId=${user?.user?._id}&prodId=${id}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      setCart(res?.data);
      setCartFlag(res?.data.length !== 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShoeById();
  }, [id]);

  useEffect(() => {
    getCartItem();
  }, [cartFlag, id, user?.user?._id]);

  useEffect(() => {
    getAllShoes();
  }, [shoes]);

  const handleAddToCart = async () => {
    if (!user) {
      return toast.error("Login first!");
    }

    if (qty === "") {
      return toast.error("Please select quantity!");
    }

    const payload = {
      userId: user?.user?._id,
      prodId: shoes?._id,
      title: shoes?.title,
      mainImg: shoes?.mainImg,
      subOneImg: shoes.subOneImg,
      subTwoImg: shoes.subTwoImg,
      subThreeImg: shoes.subThreeImg,
      subFourImg: shoes.subFourImg,
      price: shoes.price,
      discount: shoes.discount,
      type: shoes.type,
      desc: shoes.desc,
      productStory: shoes.productStory,
      countryOfOrigin: shoes.countryOfOrigin,
      style: shoes.style,
      qty,
      size,
      color: shoes.color,
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/api/v1/cart/create",
        payload,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      toast.success("Item added to cart successfully!");
      getCartItem();
      getShoeByIdCart();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  const deleteCartItem = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/v1/cart/${cart[0]._id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      toast.success("Item removed from cart!");
      getCartItem();
      getShoeByIdCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <ResponsiveNavbar />
      <section className="  w-full h-auto absolute top-[100px]">
        <div className=" w-full h-auto p-10">
          <div className=" w-full">
            <ul className=" flex gap-4 items-center h-[5]">
              <Link to={"/"}>
                <li className=" text-[14px] font-semibold">Home</li>
              </Link>
              <span className=" w-1 h-1 rounded-full bg-gray-600"></span>
              <Link>
                <li className=" text-[14px] font-semibold">{shoes?.type}</li>
              </Link>
              <span className=" w-1 h-1 rounded-full bg-gray-600"></span>
              <li className=" text-[14px]">{shoes?.title}</li>
            </ul>
          </div>
          <div className=" w-full h-auto flex flex-col lg:flex-row gap-3 mt-5">
            <ImageContainer
              images={[
                shoes?.mainImg,
                shoes?.subOneImg,
                shoes?.subTwoImg,
                shoes?.subThreeImg,
                shoes?.subFourImg,
              ]}
            />
            <ProductDetails
              title={shoes?.title}
              discount={shoes?.discount}
              price={shoes?.price}
              desc={shoes?.desc}
              style={shoes.style}
              color={shoes.color}
              size={size}
              setSize={setSize}
              qty={qty}
              setQty={setQty}
              handleAddToCart={handleAddToCart}
              deleteCartItem={deleteCartItem}
              cartFlag={cartFlag}
            />
          </div>

          {/* Btm */}
          <div className="bg-[#F3F3F3] w-full h-auto p-2 lg:p-5 mt-4 lg:mt-0">
            <div className="">
              <h3 className=" text-2xl font-semibold mb-4">PRODUCT STORY</h3>
              <p className=" text-[15px] font-light">{shoes.productStory}</p>
            </div>

            <div className=" mt-4">
              <h3 className=" text-2xl font-semibold mb-2">
                Country Of Origin
              </h3>
              <p className=" text-[15px] font-light">{shoes.countryOfOrigin}</p>
            </div>
          </div>

          <div className=" mt-10">
            <ShowShoes compTitle={"YOU MAY ALSO LIKE"} shoes={similarShoes} />
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
};

export default SingleShoe;
