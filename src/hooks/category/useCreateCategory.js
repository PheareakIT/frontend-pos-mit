import { useState } from "react"
import { create } from "../../services/apiCategory"
import toast from "react-hot-toast"

export function useCreateCategory(){
    const [isLoading, setIsLoading] = useState(false)

    const createCategory = async (doc) => {
        try {
            setIsLoading(true)
            const res = await create(doc)
            if(res){
                toast.success('បញ្ចូលបានជោគជ័យ')        
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return {
        isLoading,
        createCategory
    }
}