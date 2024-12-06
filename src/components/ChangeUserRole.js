import React, { useState } from "react";
import Role from "../comman/Role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../comman";
import { toast } from "react-toastify";

export default function ChangeUserRole({
  name,
  email,
  role,
  userId,
  onClose,
  funcallagain
}) {
  const [userRole,setuserRole] = useState(role)
  const updateUserRole = async() => {
    const dataResponse  = await fetch(SummaryApi.update_user.url,{
      method:SummaryApi.update_user.method,
      credentials:"include",
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({role:userRole,userId})
    })
    const dataapi = await dataResponse.json()
    console.log(dataapi,userId)
    if(dataapi.success){
      toast.success(dataapi.message)
      onClose()
      funcallagain()
    }
    if(!dataapi.success){
      toast.error(dataapi.message)
    }
  }
  return (
    <div className="fixed bottom-0 right-0 left-0 w-full h-full z-10 flex justify-center items-center bg-black bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
      <button className="block ml-auto"><IoMdClose onClick={onClose}/></button>
        <h1 className="p-4 text-lg font-medium">Change User Role</h1>
        <p>name:{name}</p>
        <p>email:{email}</p>
        <div className="flex justify-between items-center my-4">
          <p>Role:</p>
          <select className="border px-4 py-1" value={userRole} onChange={(e)=>setuserRole(e.target.value)}>
            {Object.values(Role).map((Role, index) => (
              <option value={Role} key={index}>
                {Role}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700" onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  );
}
