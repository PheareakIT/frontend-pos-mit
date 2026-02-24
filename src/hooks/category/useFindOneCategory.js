import { useEffect, useState } from "react";
import { findOne } from "../../services/apiCategory";
import toast from "react-hot-toast";

export function useFindOneCategory(id){
    const [isLoading, setIsLoading] = useState(false)
    const [doc, setDoc] = useState({})

    useEffect(() => {
        const findOneCategory = async () => {
            try {
                setIsLoading(true)
                const res = await findOne(id)
                setDoc(res.data)
                setIsLoading(false)
            } catch (error) {
                toast.error(error.message)
            }
        }
        findOneCategory()
    },[id])

    return{
        isLoading,
        doc,
    }
}