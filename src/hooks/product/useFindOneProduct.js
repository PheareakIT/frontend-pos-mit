import { useEffect, useState } from "react";
import { findOne } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useFindOneProduct(id){
    const [isLoading, setIsLoading] = useState(false)
    const [doc, setDoc] = useState({})

    useEffect(() => {
        const findOneProduct = async () => {
            try {
                setIsLoading(true)
                const res = await findOne(id)
                setDoc(res.data)
                setIsLoading(false)
            } catch (error) {
                toast.error(error.message)
            }
        }
        findOneProduct()
    },[id])

    return{
        isLoading,
        doc,
    }
}