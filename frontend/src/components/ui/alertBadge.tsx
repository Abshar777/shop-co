import React from "react";

interface prop {
  cont: string;
}

const Alert = ({ cont }: prop) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        style={{ border: "1px dashed red" }}
        className=" text-sm  w-full bg-[#ff000033] p-2 rounded-lg text-center"
      >
        <p>{cont}</p>
      </div>
    </div>
  );
};

export default Alert;
