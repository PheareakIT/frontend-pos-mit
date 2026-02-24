import { useState } from "react"
import { sale } from "../../services/apiPos"
import toast from "react-hot-toast"

export const useCreateSale = () => {
    const [isLoading, setIsLoading] = useState(false)
    const createSale = async (doc) => {
        try {
            const res = await sale(doc)
            return res
        } catch (error) {
            console.log('Sale Error:', error)
            toast.error(error.response.data.message)
        }finally{
            setIsLoading(false)
        }
    }
    return{
        isLoading,
        createSale
    }
}