

import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Role from "../comman/Role";

export default function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const naviget = useNavigate()
  if(user?.role !== Role.admin){
    naviget("/")
  }
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex  hidden">
      <aside className="bg-white min-h-full w-full max-w-60 shadow-md">
        <div className="h-32 justify-center items-center flex flex-col">
          <div className="text-5xl cursor-pointer flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt=""
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to="all_users" className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to="all_product" className="px-2 py-1 hover:bg-slate-100">
              Product
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet/>
      </main>
    </div>
  );
}
