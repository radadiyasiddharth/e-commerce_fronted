import React, { useEffect, useState } from "react";
import SummaryApi from "../comman";
import { Link } from "react-router-dom";

export default function CategoryList() {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(false);
  const categoryloading = new Array(13).fill(null);
  const fetchCategoryProduct = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.categoryProduct.url, {
      method: SummaryApi.categoryProduct.method,
    });
    const dataresponse = await response.json();
    setloading(false);
    setproduct(dataresponse.data);
    // console.log("all product", product);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-x-scroll scroll-hidden">
        {loading
          ? categoryloading.map((data,index) => {
              return (
                <div className="w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden animate-pulse bg-slate-200"></div>
              );
            })
          : product.map((data, index) => {
              return (
                <Link
                  to={"/categoryproduct/" + data?.category}
                  key={index}
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 md:h-20 md:w-20 rounded-full overflow-hidden p-4  flex justify-center bg-slate-200 items-center">
                    <img
                      src={data?.productimage[0]}
                      alt=""
                      className="h-full  mix-blend-multiply object-scale-down  hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="md:text-base text-sm text-center capitalize ">
                    {data?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}
