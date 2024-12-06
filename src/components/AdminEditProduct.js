import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ProductCategory from "../helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../helper/UploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../comman";
import { toast } from "react-toastify";

export default function AdminEditProduct({onClose,productData,fetchproduct}) {
  const [uploadProductImageInput, setuploadProductImageInput] = useState("");
  const [data, setdata] = useState({
    ...productData,
    productname: productData?.productname,
    brandname: productData?.brandname,
    category: productData?.category,
    productimage: productData?.productimage,
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });
  const [fullScreenImage, setfullScreenImage] = useState("");
  const [openFullScreenImage, setopenFullScreenImage] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    setuploadProductImageInput(file.name);
    const uploadImageCloudinary = await UploadImage(file);
    console.log("uploadimage", data.productimage[0]);
    setdata((preve) => {
      return {
        ...preve,
        productimage: [...preve.productimage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage = (index) => {
    // console.log("indeximg",index)
    const newProductImage = [...data.productimage];
    newProductImage.splice(index, 1);
    setdata((preve) => {
      return {
        ...preve,
        productimage: [...newProductImage],
      };
    });
  };

  const handleSubmitProduct = async(e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.update_product.url,{
      method:SummaryApi.update_product.method,
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data),
    })
    const dataapi = await response.json();
    console.log("product",dataapi)
    if(dataapi.success){
      toast.success(dataapi.message)
      onClose()
      fetchproduct()
    }
    if(!dataapi.success){
      toast.error(dataapi.message)
    }
  };
 
  return (
    <div className="fiexd h-full w-full absolute bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl  h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Edit Product</h2>
          <div onClick={onClose}>
            <IoMdClose className="w-fit text-2xl hover:text-rose-600 cursor-pointer" />
          </div>
        </div>
        <form
          action=""
          className="grid p-2 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmitProduct}
        >
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            name="productname"
            id="productName"
            value={data.productname}
            placeholder="Enter Product Name"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="brandname" className="mt-3">
            Brand Name:{" "}
          </label>
          <input
            type="text"
            name="brandname"
            id="brandname"
            value={data.brandname}
            placeholder="Enter Brand Name"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="category" className="mt-3">
            Category Name:{" "}
          </label>
          <select
            name="category"
            value={data.category}
            id=""
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
          >
            <option value="">Select Category</option>
            {ProductCategory.map((category, index) => {
              return (
                <option key={category.value + index} value={category.label}>
                  {category.value}
                </option>
              );
            })}
          </select>

          <label htmlFor="productimage" className="mt-3">
            Product Image:{" "}
          </label>
          <label htmlFor="uploadimageinput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500  flex justify-center flex-col items-center gap-2">
                <span className="text-4xl ">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadimageinput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div className=" ">
            {data?.productimage[0] ? (
              <div className="flex gap-2 items-center">
                {data?.productimage.map((image, index) => {
                  return (
                    <div className="relative group ">
                      <img
                        src={image}
                        alt=""
                        width={100}
                        height={100}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setopenFullScreenImage(true);
                          setfullScreenImage(image);
                        }}
                      />
                      <div
                        className="absolute right-0 bottom-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Plsease Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Product Price:{" "}
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={data.price}
            placeholder="Enter Product Price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price Name:{" "}
          </label>
          <input
            type="text"
            name="sellingPrice"
            id="sellingPrice"
            value={data.sellingPrice}
            placeholder="Enter Selling Price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="description" className="mt-3">
            Enter description Here:{" "}
          </label>
          <textarea
            id="brandname"
            className="bg-slate-100 h-28 resize-none border "
            placeholder="Enter Product Description"
            onChange={handleOnChange}
            name={"description"}
            value={data.description}
          ></textarea>
          <button className="px-3 py-1 text-white bg-red-600 mb-10 hover:bg-red-700">
            Update Product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setopenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
}
