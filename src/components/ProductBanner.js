import React, { useEffect, useState } from "react";
import img1 from "../assest/banner/img1.webp";
import img2 from "../assest/banner/img2.webp";
import img3 from "../assest/banner/img3.jpg";
import img4 from "../assest/banner/img4.jpg";
import img5 from "../assest/banner/img5.webp";

import img1_mobile from "../assest/banner/img1_mobile.jpg";
import img2_mobile from "../assest/banner/img2_mobile.webp";
import img3_mobile from "../assest/banner/img3_mobile.jpg";
import img4_mobile from "../assest/banner/img4_mobile.jpg";
import img5_mobile from "../assest/banner/img5_mobile.png";

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

export default function ProductBanner() {
  const [currentimage, setcurrentimage] = useState(0);
  const desktopimages = [img1, img2, img3, img4, img5];
  const mobileimages = [
    img1_mobile,
    img2_mobile,
    img3_mobile,
    img4_mobile,
    img5_mobile,
  ];

  const nextimage = () => {
    if (desktopimages.length - 1  > currentimage) {
      setcurrentimage((prev) => prev + 1);
    }
  };
  const previmage = () => {
    if (currentimage !== 0) {
      setcurrentimage((prev) => prev - 1);
    }
  };
  useEffect(()=>{
    const interavl  = setInterval(()=>{
      if (desktopimages.length - 1  > currentimage){
        nextimage()
      }else{
        setcurrentimage(0)
      }
    }, 2000)
    return ()=> clearInterval(interavl)
  },[currentimage])
  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 bg-slate-200   w-full relative">
        <div className="absolute z-20 h-full w-full flex items-center">
          <div className="md:flex justify-between items-center w-full text-2xl hidden ">
            <button
              onClick={previmage}
              className="bg-white shadow-md  rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextimage}
              className="bg-white shadow-md  rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className=" w-full h-full overflow-hidden md:flex hidden">
          {desktopimages.map((img, index) => {
            return (
              <div
                key={index}
                className=" min-h-full min-w-full transition-all "
                style={{ transform: `translateX(-${currentimage * 100}%)` }}
              >
                <img src={img} alt="" className="w-full h-full" />
              </div>
            );
          })}
        </div>

        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileimages.map((img, index) => {
            return (
              <div
                key={index}
                className=" min-h-full min-w-full transition-all"
                style={{ transform: `translateX(-${currentimage * 100}%)` }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
