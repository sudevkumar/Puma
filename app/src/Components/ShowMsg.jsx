import React from "react";

const ShowMsg = ({ msg }) => {
  return (
    <div className=" w-[full] h-[60vh] flex justify-center items-center">
      <h1 className=" text-3xl font-semibold">{msg}</h1>
    </div>
  );
};

export default ShowMsg;
