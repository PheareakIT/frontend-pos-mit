import { useEffect, useState } from "react";
import { findByCategoryID } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useFindProductByCategory(categoryID){
    const [isLoading, setIsLoading] = useState(false)
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const fetchAllProduct = async () => {
            try {
                setIsLoading(true)
                const res = await findByCategoryID(categoryID)
                setDocs(res.data)
                setIsLoading(false)
            } catch (error) {
                toast.error(error.message)
            }
        } 
        
        fetchAllProduct()
    },[categoryID])
    
    return {
        docs,
        isLoading,
    }
}