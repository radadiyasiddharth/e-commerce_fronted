import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCategory from "../helper/ProductCategory";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProduct from "../components/CategoryWiseProduct";
import SummaryApi from "../comman";
import Verticalcard from "../components/Verticalcard";

export default function CategoryProduct() {
  const params = useParams();
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectcategory,setselectcategory] = useState({});
  const [filtercategorylist,setfiltercategorylist] = useState([])
  const [sortby, setSortby] = useState('')
  const fetchdata = async () => {
    const response = await fetch(SummaryApi.filterProduct.url,{
      method:SummaryApi.filterProduct.method,
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        category:filtercategorylist
      })
    });
    const dataResponse = await response.json();
    setdata(dataResponse?.data);
    console.log("data",data);
  }

  const handleSelectCategory = (e) => {
  const { value, checked, name } = e.target;
  setselectcategory((prev) => ({
    ...prev,
    [value]: checked,
  }));
};
useEffect(()=>{
  fetchdata()
},[filtercategorylist])
  // console.log("setselectcategory",selectcategory)
  useEffect(() => {
    const ArrayOfCategory = Object.keys(selectcategory).map(categoryname=>{
      // console.log("categoryname",categoryname)
      if(selectcategory[categoryname]){
        return categoryname
      }
      return null
    }).filter(el => el)
    // console.log("ArrayOfCategory",ArrayOfCategory)
    setfiltercategorylist(ArrayOfCategory)
  }, [selectcategory]);

  const handleOnchangeSortby = (e) => {
    const {value} = e.target
    setSortby(value)
    if(value === "asc"){
      setdata(prev => prev.sort((a,b) => a.sellingPrice - b.sellingPrice))
    }
    if(value === "dcs"){
      setdata(prev => prev.sort((a,b) => b.sellingPrice - a.sellingPrice))
    }
}

useEffect(()=>{
   
},[sortby])


  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr] ">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll scroll-hidden">
          <div className="">
            <h3 className="text-base pb-1 border-slate-300 border-b   uppercase font-medium text-slate-500">
              Sort by
            </h3>
            <form action="" className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortby === "asc"} value={"asc"} onChange={handleOnchangeSortby}/>
                <label htmlFor="">Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio"name="sortBy" checked={sortby === "dcs"} value={"dcs"} onChange={handleOnchangeSortby}/>
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>
          <div className="">
            <h3 className="text-base pb-1 border-slate-300 border-b   uppercase font-medium text-slate-500">
              Category
            </h3>
            <form action="" className="text-sm flex flex-col gap-2 py-2">
              {ProductCategory.map((data, index) => {
                return (
                  <div className="flex items-center gap-3" onChange={handleSelectCategory}>
                    <input type="checkbox" checked={selectcategory[data?.value]} id={data?.value} value={data?.label} name="category"  />
                    <label htmlFor={data?.value}>{data?.label}</label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        <div>
          {params?.categoryname && (
            <Verticalcard
            loading={loading} data={data}
            />
          )}
          <div>
            {
              data?.length !== 0 && !loading && (
                <Verticalcard  loading={loading} data={data}  /> 
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
