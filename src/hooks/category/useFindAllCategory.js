import { useEffect, useState } from "react";
import { findAll } from "../../services/apiCategory";
import toast from "react-hot-toast";

export function useFindAllCategory(page = 1, limit = 25, search = ''){
    const [isLoading, setIsLoading] = useState(false)
    const [docs, setDocs] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchAllCategory = async () => {
            try {
                setIsLoading(true)
                const res = await findAll(page, limit, search)
                setDocs(res.data)
                setTotalPages(res.totalPages)
                setIsLoading(false)
            
            } catch (error) {
                toast.error(error.message)
            }
        } 
        
        fetchAllCategory()
    },[page, limit, search,totalPages])
    
    return {
        docs,
        isLoading,
        totalPages,
    }
}