import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../comman";
import displayINRCurrency from "../helper/DisplayCurrency";
import { Link } from "react-router-dom";
import AddToCart from "../helper/AddToCart";
import Context from "../context";

export default function SearchProduct() {
  const query = useLocation();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const { fetchuseraddtocount } = useContext(Context);

  const fetchproduct = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.search_product.url + query.search);
    const dataResponse = await response.json();
    setloading(false);
    setdata(dataResponse?.data);
  };

  const addToCart = async (e, pid) => {
    await AddToCart(e, pid);
    await fetchuseraddtocount();
  };

  useEffect(() => {
    fetchproduct();
  }, [query]);

  return (
    <div className="container mx-auto px-4 my-6">
      {loading && (
        <h1 className="text-2xl font-semibold text-center py-4">Loading....</h1>
      )}

      {!loading && query.search && data.length > 0 && (
        <h1 className="text-xl font-semibold py-4">Search Result: {data?.length}</h1>
      )}
      
      {data?.length === 0 && !loading && (
        <h1 className="text-2xl font-semibold text-center py-4">
          No Data Found
        </h1>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!loading && query.search && data.length > 0 ? (
          data.map((item, index) => (
            <Link
              key={index}
              to={"/product-detail/" + item?._id}
              className="w-full bg-white rounded-sm shadow"
            >
              <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                <img
                  src={item.productimage[0]}
                  alt=""
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                  {item?.productname}
                </h2>
                <p className="capitalize text-slate-500">{item?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(item?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(item?.price)}
                  </p>
                </div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-full text-sm"
                  onClick={(e) => addToCart(e, item?._id)}
                >
                  Add to cart
                </button>
              </div>
            </Link>
          ))
        ) : !loading && query.search && data.length === 0 ? (
          <h1 className="text-2xl font-semibold text-center py-4">
            No Data Found
          </h1>
        ) : (
          loadingList.map((_, index) => (
            <div key={index} className="w-full bg-white rounded-sm shadow">
              <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                <img
                  alt=""
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 p-1 animate-pulse bg-slate-200 rounded-full py-2"></h2>
                <p className="capitalize text-slate-500 p-1 animate-pulse bg-slate-200 rounded-full py-2"></p>
                <div className="flex gap-3 w-full">
                  <p className="text-red-600 font-medium p-1 animate-pulse bg-slate-200 rounded-full py-2 w-full"></p>
                  <p className="text-slate-500 line-through p-1 animate-pulse bg-slate-200 rounded-full w-full py-2"></p>
                </div>
                <button className="p-1 bg-slate-200 text-white animate-pulse px-3 rounded-full text-sm w-full py-2"></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
