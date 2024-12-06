import React from "react";
import { IoMdClose } from "react-icons/io";


export default function DisplayImage({ imgUrl, onClose }) {
  return (
    <div className="fixed left-0 bottom-0 right-0 top-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto p-2">
        <div onClick={onClose} className="w-fit text-2xl hover:text-rose-600 cursor-pointer block ml-auto">
          <IoMdClose  />
        </div>
        <div className="flex justify-center p-4 max-h-[80vh] max-w-[80vh]">
          <img src={imgUrl} alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
