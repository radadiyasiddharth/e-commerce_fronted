import React, { useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Imagetobase64 from "../helper/Imagetobase64";
import { toast } from "react-toastify";
import SummaryApi from "../comman";


export default function Signup() {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    name: "",
    password: "",
    confirm_password: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleuploadpic = async (e) => {
    const file = e.target.files[0];
    const imagepic = await Imagetobase64(file);
    setdata((prev) => ({
      ...prev,
      profilePic: imagepic,
    }));
    console.log(data.profilePic);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirm_password) {
      try {
        const response = await fetch(SummaryApi.SignUp.url, {
          method:"post",
           credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        if(result.success){
          toast.success(result.message)
        navigate("/login");

        }
        if(!result.success){
          toast.error(result.message)
      }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to create user!");
      }
    } else {
      toast.error("Password and Confirm Password do not match");
    }
  };

  return (
    <div>
      <section id="signup">
        <div className="mx-auto container p-6">
          <div className="bg-white mx-auto p-5 max-w-sm rounded w-full">
            <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
              <div>
                <img src={data.profilePic || loginicon} alt="login icon" />
              </div>
              <form action="">
                <label>
                  <div className="text-xs bg-slate-200 pt-1 pb-4 opacity-80 cursor-pointer text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    name="profilePic"
                    onChange={handleuploadpic}
                  />
                </label>
              </form>
            </div>
            <form
              action=""
              className="pt-5 flex flex-col gap-2"
              onSubmit={handlesubmit}
            >
              <div className="grid">
                <label htmlFor="name">Name:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={data.name}
                    onChange={handleonchange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="grid">
                <label htmlFor="email">Email:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    required
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={data.email}
                    onChange={handleonchange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <div className="bg-slate-100 p-2 flex items-center">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
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
              </div>
              <div>
                <label htmlFor="confirm_password">Confirm Password:</label>
                <div className="bg-slate-100 p-2 flex items-center">
                  <input
                    required
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirm_password"
                    value={data.confirm_password}
                    onChange={handleonchange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] mx-auto block mt-6 rounded-full hover:scale-110 transition-all hover:bg-red-700"
              >
                Sign Up
              </button>
            </form>
            <p className="my-5">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-red-600 hover:underline hover:text-red-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
