import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../comman'
import AdminProductCard from '../components/AdminProductCard'

export default function AllProduct() {
  const [openUploadProduct,setopenUploadProduct] = useState(false)
  const [allproduct,setallproduct] = useState([])
  const fetchallproduct = async()=>{
    const response = await fetch(SummaryApi.get_allproduct.url,{
      method:SummaryApi.get_allproduct.method,
      // credentials:"include"
    })
    const dataapi = await response.json()
    console.log("ok",dataapi.data)
    setallproduct(dataapi?.data || [])
    // if(dataapi.success){
    //   setallproduct(dataapi.data)
    // }
    // if(dataapi.error){
    //   toast.error(dataapi.message)
    // }
  }
  useEffect(()=>{
    fetchallproduct()
  },[])
  return (
    <div>
      <div className=' bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All  Product</h2>
        <button className='border-2 border-red-600 hover:bg-red-600 hover:text-white py-3 px-3 rounded-full' onClick={()=>setopenUploadProduct(true)}>Upload Product</button>
      </div>

      <div className='flex items-center gap-5 py-4 flex-wrap h-[calc(100vh-190px)] overflow-y-scroll '>
          {
            allproduct?.map((data,index)=>{
              return (
                <div>
                  <AdminProductCard data={data} key={index+"allproduct"} fetchproduct={fetchallproduct}/>
                </div>
              )
            })
      
          }
      </div>


      {
      openUploadProduct && (
        <UploadProduct onClose={()=>setopenUploadProduct(false)} fetchproduct={fetchallproduct}/>
      )
      }
    </div>
  )
}
