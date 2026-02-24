import { useEffect, useState } from "react"
import { findOne } from "../../services/apiPos"
import toast from "react-hot-toast"

export const useFindOneSale = (id) => {
    const [doc, setDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const res = await findOne(id)
                setDoc(res.data)
            } catch (error) {
                console.log('Sale Error: ', error)
                toast.error(error.message)
            }finally{
                setIsLoading(false)
            }
        }
        fetchData()

     },[id])

     return{
        doc,
        isLoading
     }
}