import { useState } from "react"
import {deleteById} from "../../services/apiCategory"
import toast from "react-hot-toast"
export function useDeleteCategory(){
    const [isLoading, setIsLoading] = useState(false)
    const deleteCategory = async (id) => {
        try {
            setIsLoading(true)  
            const res = await deleteById(id)
            if(res){
                toast.success('លុបបានជោគជ័យ')
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
        deleteCategory
    }
}