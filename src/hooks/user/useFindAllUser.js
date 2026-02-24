import toast from "react-hot-toast"
import { findAll } from "../../services/apiUser"
import { useEffect, useState } from "react"

export const useFindAllUser = (page = 1, limit = 25, search = '') => {
    const [isLoading, setIsLoading] = useState(false)
    const [docs, setDocs] = useState([])
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const fetchAllUser = async () => {
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
        
        fetchAllUser()
    },[page, limit, search])
    
    return {
        docs,
        isLoading,
        totalPages,
    }
}