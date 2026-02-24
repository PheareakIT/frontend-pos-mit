import { useState } from "react";
import { update } from "../../services/apiCategory";
import toast from "react-hot-toast";

export function useUpdateCategory(){
    const [isLoading, setIsLoading] = useState(false)
    const updateCategory = async (id, doc) => {
            try {
                setIsLoading(true)
                const res = await update(id, doc)
                if(res){
                    toast.success('កែប្រែបានជោគជ័យ')
                }
                setIsLoading(false)
            } catch (error) {
                toast.error(error.reponse.data.message)
            }
    }

    return{
        isLoading,
        updateCategory
    }
}