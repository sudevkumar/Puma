import React, { useEffect } from "react";

const ShowMsg = ({ msg, wid, hig }) => {
  return (
    <div className={` w-[${wid}] h-[${hig}] flex justify-center items-center`}>
      <h1 className=" text-3xl font-semibold">{msg}</h1>
    </div>
  );
};

export default ShowMsg;
