import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../comman";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayINRCurrency from "../helper/DisplayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import AddToCart from "../helper/AddToCart";
import Context from "../context";
import CategoryWiseProduct from "../components/CategoryWiseProduct";


export default function ProductDetail() {
  const params = useParams();
  const productId = params.product_id;
  const [loading, setloading] = useState(false);
  const [activeimg, setactiveimg] = useState();
  const productimagelist = Array(4).fill(null);
  const {fetchuseraddtocount} = useContext(Context);
  const [zoomImageCoordinate, setzoomImageCoordinate] = useState({
    x: 0.5, y: 0.5 
  });
  const [zoomimage, setzommimage] = useState(false);
  console.log(productId)
  const [data, setdata] = useState({
    productname: "",
    brandname: "",
    category: "",
    productimage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const fetchProductDetail = async () => {
    setloading(true);
    const response = await fetch(SummaryApi.getProductdetail.url, {
      method: SummaryApi.getProductdetail.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
      }),
    });
    setloading(false);
    const dataResponse = await response.json();
    setdata(dataResponse?.data);
    setactiveimg(dataResponse?.data?.productimage[0]);
    console.log("productdetail", dataResponse);
  };
  useEffect(() => {
    fetchProductDetail();
  }, []);
  const handleOnmouseImg = (imgurl) => {
    setactiveimg(imgurl);
  };

   const handeZoomImage = useCallback((e) => {
    setzommimage(true);
    const { left, top, height, width } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setzoomImageCoordinate({ x, y });
  }, []);

  const handleZommOutImage = () => {
    setzommimage(false);
  };
  const addToCart = async(e,pid) =>{
    await AddToCart(e,pid)
   await fetchuseraddtocount()
 }
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-2">
        {/* product image */}
        <div className="h-96  flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96  bg-slate-200 relative">
            <img
              src={activeimg}
              alt=""
              className="w-full h-full object-scale-down mix-blend-multipl"
              onMouseMove={(e) => handeZoomImage(e)}
              onMouseLeave={handleZommOutImage}
            />
            {zoomimage && (
              <div className="hidden lg:block absolute  bg-slate-200 -right-[510px] top-0 overflow-hidden min-h-[400px] min-w-[500px]">
                <div
                  className="w-full h-full mix-blend-multiply  min-w-[500px]  min-h-[400px] scale-150"
                  style={{
                    backgroundImage: `url(${activeimg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x}% ${zoomImageCoordinate.y}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scroll-hidden h-full">
                {productimagelist.map((data, index) => {
                  return (
                    <div
                      className="w-20 h-20 rounded bg-slate-200 animate-pulse"
                      key={index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scroll-hidden h-full">
                {data.productimage.map((data, index) => {
                  return (
                    <div className="w-20 h-20 rounded bg-slate-200" key={index}>
                      <img
                        src={data}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multipl "
                        onMouseEnter={() => handleOnmouseImg(data)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product detail */}
        {loading ? (
          <div className="flex flex-col gap-1 w-full">
            <p className="bg-slate-200 animate-pulse text-red-600 px-2 rounded-full inline-block w-full lg:h-8 h-6"></p>
            <p className="text-2xl lg:text-4xl font-semibold bg-slate-200 h-6 animate-pulse w-full lg:h-8"></p>
            <p className="capitalize text-slate-400 bg-slate-200  min-w-[100px] h-6 animate-pulse w-full lg:h-8"></p>
            <div className="text-slate-200 w-full lg:h-8 animate-pulse flex  items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse">
              <p className="text-red-600 bg-slate-200 w-full lg:h-8 h-6"></p>
              <p className="text-slate-400 line-through w-full lg:h-8 bg-slate-200 h-6"></p>
            </div>
            <div className="flex items-center gap-3 my-3">
              <button className="bg-slate-200 animate-pulse w-full lg:h-8 rounded h-6"></button>
              <button className="bg-slate-200 animate-pulse w-full lg:h-8 rounded h-6"></button>
              <button></button>
            </div>
            <div>
              <p className="text-slate-600 w-full lg:h-8 font-medium my-1"></p>
              <p className="w-full lg:h-8 bg-slate-200 animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandname}
            </p>
            <p className="text-2xl lg:text-4xl font-semibold">
              {data?.productname}
            </p>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="text-yellow-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
              <p className="text-red-600">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>
            <div className="flex items-center gap-3 my-3">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600  font-medium hover:bg-red-600 hover:text-white">
                Buy
              </button>
              <button className="border-2 border-red-600   rounded px-3 py-1 min-w-[120px] text-white bg-red-600  font-medium hover:bg-white hover:text-red-600" onClick={(e)=>addToCart(e,productId)}>
                Add to cart
              </button>
              <button></button>
            </div>
            <div>
              <p className="text-slate-600  font-medium my-1">Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data?.category && (
        <CategoryWiseProduct category={data.category} heading={"Recommended Products"}/>
      )}

    </div>
  );
}
