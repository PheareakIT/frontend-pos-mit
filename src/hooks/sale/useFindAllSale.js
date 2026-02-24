import { useEffect, useState } from "react"
import { findAll } from "../../services/apiPos"
import toast from "react-hot-toast"

export function useFindAllSale(page = 1, limit = 25, search = ''){
    const [isLoading, setIsLoading] = useState(false)
    const [docs, setDocs] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchAllSale = async () => {
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
        
        fetchAllSale()
    },[page, limit, search])
    
    return {
        docs,
        isLoading,
        totalPages,
    }
}