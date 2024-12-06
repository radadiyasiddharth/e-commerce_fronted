import React, { useContext, useEffect, useRef, useState } from "react";
import SummaryApi from "../comman";
import displayINRCurrency from "../helper/DisplayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddToCart from "../helper/AddToCart";
import Context from "../context";

export default function VerticalCardProduct({ category, heading }) {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [scroll, setscroll] = useState(0);
  const scrollElement = useRef();
  const loadingList = new Array(13).fill(null);
  const {fetchuseraddtocount,cartProductCount} = useContext(Context)
  const fetchdata = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.categorywiseproduct.url, {
      method: SummaryApi.categorywiseproduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: category }),
    });
    const dataresponse = await response.json();
    setloading(false);
    setdata(dataresponse.data);
    // console.log(dataresponse.data);
  };
  const addToCart = async(e,pid) =>{
     await AddToCart(e,pid)
    await fetchuseraddtocount()
  }

  useEffect(() => {
    fetchdata();
  }, []);
  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scroll-hidden transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollLeft}
          className="bg-white shadow-md  rounded-full p-1 absolute left-0 text-lg hidden md:block"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollRight}
          className="bg-white shadow-md  rounded-full p-1 absolute right-0 text-lg hidden md:block"
        >
          <FaAngleRight />
        </button>
        {
            loading ? (
                loadingList.map((data, index) => {
                    return (
                      <div className="w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]   bg-white rounded-sm shadow    ">
                        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                          <img
                            alt=""
                            className="object-scal-down h-full hover:scale-110 transition-all mix-blend-multiply"
                          />
                        </div>
                        <div className="p-4 grid gap-3">
                          <h2 className="font=medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 animate-pulse bg-slate-200 rounded-full py-2">
                         
                          </h2>
                          <p className="capitalize text-slate-500 p-1 animate-pulse bg-slate-200 rounded-full py-2"></p>
                          <div className="flex gap-3 w-full">
                            <p className="text-red-600 font-medium p-1 animate-pulse bg-slate-200 rounded-full py-2 w-full">
                          
                            </p>
                            <p className="text-slate-500 line-through p-1 animate-pulse bg-slate-200 rounded-full w-full py-2">
                         
                            </p>
                          </div>
                          <button className="p-1  bg-slate-200  text-white animate-pulse px-3 rounded-full text-sm w-full py-2">
                           
                          </button>
                        </div>
                      </div>
                    );
                  })
          
            ):(
                data.map((data, index) => {
                    return (
                      <Link to={"/product-detail/" + data?._id} className="w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]   bg-white rounded-sm shadow    ">
                        <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                          <img
                            src={data.productimage[0]}
                            alt=""
                            className="object-scal-down h-full hover:scale-110 transition-all mix-blend-multiply"
                          />
                        </div>
                        <div className="p-4 grid gap-3">
                          <h2 className="font=medium text-base md:text-lg text-ellipsis line-clamp-1">
                            {data?.productname}
                          </h2>
                          <p className="capitalize text-slate-500">{data?.category}</p>
                          <div className="flex gap-3">
                            <p className="text-red-600 font-medium">
                              {displayINRCurrency(data?.sellingPrice)}
                            </p>
                            <p className="text-slate-500 line-through">
                              {displayINRCurrency(data?.price)}
                            </p>
                          </div>
                          <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-full text-sm"  onClick={(e)=>addToCart(e,data?._id)}>
                            Add to cart
                          </button>
                        </div>
                      </Link>
                    );
                  })
          
            )
       
       }
      </div>
    </div>
  );
}
