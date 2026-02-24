import { useState } from "react"
import {deleteById} from "../../services/apiProduct"
import toast from "react-hot-toast"
export function useDeleteProduct(){
    const [isLoading, setIsLoading] = useState(false)

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true)  
            const res = await deleteById(id)
            if(res){
                toast.success('លុបបានជោគជ័យ')
            }
            setIsLoading(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return {
        isLoading,
        deleteProduct
    }
}