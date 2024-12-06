import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "./Header";
import Footer from "./Footer";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import SummaryApi from "../comman";
import Context from "../context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/slice/Userslice";
import AdminPanel from "../pages/AdminPanel";
import AllUser from "../pages/AllUser";
import AllProduct from "../pages/AllProduct";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";

export default function Layout() {
  const [cartProductCount,setcartProductCount] = useState(0)
  const dispatch = useDispatch();
  const fetchUserDetail = async () => {
    const datares = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const dataapi = await datares.json();
    if (dataapi.success) {
      dispatch(setUserDetails(dataapi.data));
    }
  };

  const fetchuseraddtocount = async () => {
    const response = await fetch(SummaryApi.countaddtocartproduct.url,{
      method: SummaryApi.countaddtocartproduct.method,
      credentials: "include",
    })
    const dataResponse = await response.json();
    // console.log(dataResponse)
    setcartProductCount(dataResponse?.data?.count)
  }
  useEffect(() => {
    fetchUserDetail();
    fetchuseraddtocount()
  },[]);
  return (
    <div>
      <Context.Provider
        value={{
          fetchUserDetail,
          fetchuseraddtocount,
          cartProductCount,
        }}
      >
        <Header></Header>
        <div className="min-h-[calc(100vh-120px)] py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/sign-up" element={<Signup />} />
            {/* <Route path="/sign-up" element={<Signup />} /> */}
            <Route path="/categoryproduct/:categoryname" element={<CategoryProduct/>} />
            <Route path="/product-detail/:product_id" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/searchproduct" element={<SearchProduct/>} />
            <Route path="/admin" element={<AdminPanel />}>
              <Route path="all_users" element={<AllUser />} />
              <Route path="all_product" element={<AllProduct />} />
            </Route>
          </Routes>
        </div>
        <Footer></Footer>
      </Context.Provider>
    </div>
  );
}
