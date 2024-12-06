import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import  displayINRCurrency  from "../helper/DisplayCurrency";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../comman";
import { toast } from "react-toastify";

export default function AdminProductCard({ data, fetchproduct }) {
  const [editproduct, seteditproduct] = useState(false);
  const deletproduct = async(id) =>{
      const response = await fetch(SummaryApi.deleteProduct.url,{
        method:SummaryApi.deleteProduct.method,
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          productId:id
        })
      })
      const dataResponse = await response.json();
      if(dataResponse.success){
        toast.success(dataResponse.message)
        fetchproduct()
      }
      if(!dataResponse.success){
        toast.error(dataResponse.message)
    }
  }
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="h-32 w-32 flex justify-center items-center">
        <img src={data?.productimage[0]} alt="" width={120} height={120} className="mx-auto object-fill h-full"/>
        </div>
        <p className="text-ellipsis line-clamp-2">{data?.productname}</p>
        <div>
          <p className="">
            {
              displayINRCurrency(data?.sellingPrice)
            }
          </p>
         <div className="flex items-center justify-between mt-2">
         <div
            className="w-fit  p-2 hover:bg-red-600 rounded-full cursor-pointer hover:text-white bg-red-100"
            onClick={() => deletproduct(data?._id)}
          >
            <MdDelete />
          </div>
          <div
            className="w-fit  p-2 hover:bg-green-600 rounded-full cursor-pointer hover:text-white bg-green-100"
            onClick={() => seteditproduct(true)}
          >
            <MdModeEditOutline />
          </div>
         </div>
        </div>
        {editproduct && (
          <AdminEditProduct
            productData={data}
            onClose={() => seteditproduct(false)}
            fetchproduct={fetchproduct}
          />
        )}
      </div>
    </div>
  );
}
