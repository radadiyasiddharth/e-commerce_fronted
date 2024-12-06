import { toast } from "react-toastify"
import SummaryApi from "../comman"

const AddToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()
    const response = await fetch(SummaryApi.addtocart.url, {
        method: SummaryApi.addtocart.method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId:id
        }),
    })

    const dataResponse = await response.json();
    if(dataResponse.success){
        toast.success(dataResponse.message)
      }
      if(!dataResponse.success){
        toast.error(dataResponse.message)
    }
    console.log(dataResponse)
}

export default AddToCart