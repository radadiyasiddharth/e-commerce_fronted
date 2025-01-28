const backendDomain = "http://localhost:5500"
// const backendDomain = "https://e-commerce-backend-4-9244.onrender.com"


const SummaryApi = {
    SignUp : {
        url:`${backendDomain}/v1/user/create_user`,
        method:"post"
    },
    SignIn : {
        url:`${backendDomain}/v1/user/signin`,
        method:"post"
    },
    current_user:{
        url:`${backendDomain}/v1/user/user_detail`,
        method:"get"
    },
    logout_user:{
        url:`${backendDomain}/v1/user/logout`,
        method:"get"
    },
    all_user:{
        url:`${backendDomain}/v1/admin/all_user`,
        method:"get"
    },
    update_user:{
        url:`${backendDomain}/v1/admin/update_user`,
        method:"post"
    },
    upload_product:{
        url:`${backendDomain}/v1/product/create_product`,
        method:"post"
    },
    get_allproduct:{
        url:`${backendDomain}/v1/product/get_allproduct`,
        method:"get"
    },
    update_product:{
        url:`${backendDomain}/v1/product/update_product`,
        method:"post"
    },
    categoryProduct:{
        url:`${backendDomain}/v1/user_product/get_allproduct`,
        method:"get"
    },
    categorywiseproduct:{
        url:`${backendDomain}/v1/user_product/get_categorywise_product`,
        method:"post"
    },
    getProductdetail:{
        url:`${backendDomain}/v1/user_product/get_productDetail`,
        method:"post"
    },
    addtocart:{
        url:`${backendDomain}/v1/user_cart/addtocartproduct`,
        method:"post"
    },
    countaddtocartproduct:{
        url:`${backendDomain}/v1/user_cart/countaddtocartproduct`,
        method:"post"
    },
    addtocartviewproduct:{
        url:`${backendDomain}/v1/user_cart/addtocartviewproduct`,
        method:"get"
    },
    updateAddToCartProduct:{
        url:`${backendDomain}/v1/user_cart/updateAddToCartProduct`,
        method:"post"
    },
    deleteAddToCartProduct:{
        url:`${backendDomain}/v1/user_cart/deleteAddToCartProduct`,
        method:"post"
    },
    search_product:{
        url:`${backendDomain}/v1/product/search_product`,
        method:"get"
    },
    filterProduct:{
        url:`${backendDomain}/v1/product/filterProduct`,
        method:"post"
    },
    deleteProduct:{
        url:`${backendDomain}/v1/product/deleteProduct`,
        method:"post"
    },
    

}

export default SummaryApi
