import React, { useContext, useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../comman";
import { toast } from "react-toastify";
import Context from "../context";
import axios from "axios";
export default function Login() {
  const [showPassword, setshowPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const {setUserDetails,fetchuseraddtocount} = useContext(Context)
  const {fetchUserDetail}  = useContext(Context)
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handlesubmit = async(e) => {
    e.preventDefault();
    const dataResponse = await axios.post(SummaryApi.SignIn.url, data, {
      withCredentials: true,
    });
    
    //  fetch(SummaryApi.SignIn.url,{
    //   method:SummaryApi.SignIn.method,
    //   credentials:"include",
    //   headers:{
    //     "content-type":"application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    const dataapi =  dataResponse
    console.log("data",dataapi)

    if(dataapi.data.success){
      toast.success(dataapi.data.message)
      navigate("/")
      fetchUserDetail()
      fetchuseraddtocount()
    }
    if(!dataapi.success){
      toast.error(dataapi.message)
  }
  };





  return (
    <div>
      <section id="login">
        <div className="mx-auto container p-6">
          <div className="bg-white mx-auto p-5 max-w-sm rounded w-full">
            <div className="w-20 h-20 mx-auto ">
                <img src={loginicon} alt="login icon" />
            </div>
            <form
              action=""
              className="pt-5 flex flex-col gap-2"
              onSubmit={handlesubmit}
            >
              <div className="grid">
                <label htmlFor="">Email : </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={data.email}
                    onChange={handleonchange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">Password : </label>
                <div className="bg-slate-100 p-2 flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    name="password"
                    value={data.password}
                    onChange={handleonchange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setshowPassword(!showPassword)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="block w-fit ml-auto hover:underline hover:text-red-600 "
                >
                  Forgot password
                </Link>
              </div>
              <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-6 rounded-full hover:scale-110 transition-all hover:bg-red-700">
                Login
              </button>
            </form>
            <p className="my-5">
              Dont't have account ?{" "}
              <Link
                to={"/sign-up"}
                className="text-red-600 hover:underline hover:text-red-700"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
