import { useState } from "react"
import { create } from "../../services/apiProduct"
import toast from "react-hot-toast"

export function useCreateProduct(){
    const [isLoading, setIsLoading] = useState(false)

    const createProduct = async (doc) => {
        try {
            setIsLoading(true)
            const res = await create(doc)
            if(res){
                toast.success('បញ្ចូលបានជោគជ័យ')        
            }
            setIsLoading(false)
            return res
        } catch (error) {
            toast.error(error.response.data.message)
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        createProduct
    }
}