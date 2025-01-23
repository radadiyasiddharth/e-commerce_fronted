import React, { useContext, useState } from "react";
import Headerlogo from "./Header_logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../comman";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/slice/Userslice";
import Context from "../context";
import logo from "../assest/add-to-cart.png";

export default function Header() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay,setmenuDisplay] = useState(false)
  const context = useContext(Context)
  const naviget = useNavigate();
  const handleLogout = async () => {
    const userlogout = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await userlogout.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  const handleSerch = (e) => {
    const { value } = e.target;
    if(value){
      naviget(`/searchproduct?q=${value}`)
    }
    else{
      naviget("/searchproduct")
    }
  }
  // console.log("header add to cart count",context.cartProductCount)
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
        <Link to="/">
            {/* <Headerlogo /> */}
            <img src={logo} width={40} height={60} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-full outline-none "
            onChange={handleSerch}
          />
          <div className="text-lg min-w-[50px] bg-13 h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">

          <div className="relative flex justify-center" >
              {
                user?._id && (
                  <div className="text-3xl cursor-pointer relative flex justify-center" onClick={()=>setmenuDisplay(!menuDisplay)}>
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
                )
              }
            {
              menuDisplay && (
                <div className=" bg-white absolute  top-11 h-fit p-4 shadow-lg rounded hidden md:block z-10">
                <nav>{
                    user?.role === "admin" ? <Link to={"/admin/all_product"} className="whitespace-nowrap hover:bg-slate-100 p-2" onClick={()=>setmenuDisplay(!menuDisplay)}>Admin Panel</Link> : null
                  }
                </nav>
                </div>
              )
            }
          </div>

         {
           user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">{context?.cartProductCount}</p>
            </div>
          </Link>
           )
         }
          <div>
            {user?._id ? (
              <button
                className="px-3 py-1 text-white rounded-full  bg-red-600 hover:bg-red-700"
                onClick={() => {handleLogout()}}
              >
                Logout
              </button>
            ) : (
              <button className="px-3 py-1 text-white rounded-full  bg-red-600 hover:bg-red-700">
                <Link to={"/login"}>Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
