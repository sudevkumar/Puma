import React from "react";
import { RxCross2 } from "react-icons/rx";
import { RiErrorWarningLine } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PopUp = ({ setShow, delId, getAllShoes }) => {
  const user = useSelector((state) => state.user.user);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/v1/shoe/${delId}`, {
        headers: {
          Authorization: user.token,
        },
      });
      setShow(false);
      getAllShoes();
      toast.success("Shoe has been deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-[100vh] z-50 fixed top-0 left-0 right-0 bottom-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className=" w-[35%] g-[400px] bg-white p-4">
        <div className=" w-full">
          <button
            className=" w-[35px] h-[35px] flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer"
            onClick={() => setShow(false)}
          >
            <RxCross2 size={24} color="white" title="Close" />
          </button>
        </div>
        <div className=" w-full flex justify-center">
          {/* <RiErrorWarningLine size={37} /> */}
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h1 className=" text-2xl mt-3 text-center  font-semibold">
          Are you sure you want to delete this product?
        </h1>

        <div className=" flex gap-6 mt-8 w-[85%] mx-auto justify-between">
          <button
            className=" bg-red-600 focus:outline-none text-white font-medium text-sm rounded-md px-8 py-3"
            onClick={handleDelete}
          >
            Yes, I want
          </button>
          <button
            className=" border focus:outline-none text-black font-medium text-sm rounded-md px-8 py-3"
            onClick={() => setShow(false)}
          >
            No, I don't want
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
