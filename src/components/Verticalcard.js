import React, { useContext } from "react";
import displayINRCurrency from "../helper/DisplayCurrency";
import { Link } from "react-router-dom";
import AddToCart from "../helper/AddToCart";
import Context from "../context";

export default function Verticalcard({ loading, data = [] }) {
  const loadinglist = new Array(13).fill(null);

  const { fetchuseraddtocount } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchuseraddtocount();
  };

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(270px,280px))] justify-center md-gap-6 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadinglist.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[250px] md:min-w-[280px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3 ">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm text-white px-3 py-2 rounded-full p-1 animate-pulse bg-slate-200"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product-detail/" + product?._id}
                key={index}
                className="w-full min-w-[280px] md:min-w-[280px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px]">
                  <img src={product?.productimage[0]} className='w-full h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' alt='product' />
         
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productname}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
}
