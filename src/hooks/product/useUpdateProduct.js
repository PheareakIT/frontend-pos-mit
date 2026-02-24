import { useState } from "react";
import { update } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useUpdateProduct(){
    const [isLoading, setIsLoading] = useState(false)
    const updateProduct = async (id, doc) => {
            try {
                setIsLoading(true)
                const res = await update(id, doc)
                if(res){
                    toast.success('កែប្រែបានជោគជ័យ')
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                // toast.error(error)
                setIsLoading(false)
            }
    }

    return{
        isLoading,
        updateProduct
    }
}