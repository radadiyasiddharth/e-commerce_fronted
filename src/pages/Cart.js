import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../comman";
import Context from "../context";
import displayINRCurrency from "../helper/DisplayCurrency";
import { MdDelete } from "react-icons/md";

export default function Cart() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductCount).fill(null);

  const fetchdata = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.addtocartviewproduct.url, {
      method: SummaryApi.addtocartviewproduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResponse = await response.json();
    setloading(false);
    setdata(dataResponse?.data);
  };

  const incquantity = async (id, quantity) => {
    const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
      method: SummaryApi.updateAddToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, quantity: quantity + 1 }),
    });
    const dataResponse = await response.json();
    if (dataResponse.success) {
      fetchdata();
      context.fetchuseraddtocount();
    }
    // console.log("dataresponse", data);
  };

  const decquantity = async (id, quantity) => {
    if (quantity > 1) {
      const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
        method: SummaryApi.updateAddToCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, quantity: quantity - 1 }),
      });
      const dataResponse = await response.json();
      if (dataResponse.success) {
        fetchdata();
        context.fetchuseraddtocount();
      }
      // console.log("dataresponse", data);
    }
  };

  const deleteProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteAddToCartProduct.url, {
      method: SummaryApi.deleteAddToCartProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const dataResponse = await response.json();
    // console.log("dataresponse", dataResponse);
    if (dataResponse.success) {
      fetchdata();
      context.fetchuseraddtocount();
    }
    // console.log("dataresponse", data);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const totleqty = data.reduce(
    (preveValue, currentValue) => preveValue + currentValue?.quantity,
    0
  );
  const totlePrice = data.reduce(
    (preveValue, currentValue) =>
      preveValue +
      currentValue?.quantity * currentValue?.productId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto p-4">
      <div className="text-lg my-3 text-center">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">Cart Is Empty</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((e, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse"
                  ></div>
                );
              })
            : data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr] "
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={data?.productId?.productimage[0]}
                        alt=""
                        className="w-full h-full mix-blend-multiply object-scale-down"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div
                        className="absolute top-0 right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteProduct(data?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                        {data?.productId?.productname}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {data?.productId?.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(data?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600  font-semibold text-lg">
                          {displayINRCurrency(
                            data?.productId?.sellingPrice * data?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className=" text-red-600 border border-red-600  w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                          onClick={() => decquantity(data?._id, data?.quantity)}
                        >
                          -
                        </button>
                        <span>{data?.quantity}</span>
                        <button
                          className=" text-red-600 border border-red-600  w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                          onClick={() => incquantity(data?._id, data?.quantity)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse  ">
              hotel
            </div>
          ) : (
            <div className="h-36 bg-white border    ">
              <h2 className="bg-red-600 text-white px-4 py-1">Summary</h2>
              <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totleqty}</p>
              </div>
              <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Totle Price</p>
                <p>{totlePrice}</p>
              </div>
              <button className="bg-blue-600 p-2 text-white w-full">Payment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
