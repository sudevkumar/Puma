import React, { useRef } from "react";

const VideoBannner = () => {
  const videoRef = useRef();
  return (
    <section className=" w-full h-[120vh] flex justify-center items-center relative">
      <div className=" w-full h-[65%] bg-[#ADBCCC]  flex">
        <div className=" absolute left-[40px] top-[200px]">
          <h1 className=" text-4xl font-bold">VELOCITY NITRO™ 3</h1>
          <p className=" text-[23px]">THE WAY RUNNING SHOULD FEEL</p>
          <div className=" flex gap-2 mt-3">
            <button className=" px-6 py-[9px] bg-black text-white text-[14px]">
              SHOP NOW
            </button>

            <button className=" px-6 py-[9px] bg-black text-white text-[14px]">
              SHOP NITRO COLLECTIONS
            </button>
          </div>
        </div>

        <div className=" w-[750px] h-[400px] absolute top-[340px] z-50">
          <video
            className="h-full w-[750px] z-50 "
            autoplay="true"
            loop="true"
            ref={videoRef}
            muted
            src="https://cdn.sanity.io/files/qa41whrn/prod/4a3026279df3bdb8eac79fcd2d37c6df1a4313e1.mp4"
          ></video>
        </div>

        <img
          src="https://cdn.sanity.io/images/qa41whrn/prod/57b628c688021950aac02b0eae07b9bdb81de7f5-1536x1536.jpg?w=2160&q=80&auto=format"
          alt=""
          className=" absolute right-[70px] top-[100px] w-[800px] h-[700px]"
        />
      </div>
    </section>
  );
};

export default VideoBannner;
