import { useEffect, useState } from "react"
import { currentUser } from "../../services/apiAuth"

export const useUser = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await currentUser()
                setUser(res.result)
            } catch (error) {
                setUser(null)
                console.log(`useUser Error: `, error.response.data.message)
            }finally{
                setIsLoading(false);
            }
        }
        fetchUser()
    },[])

    return {
        user,
        isLoading
    }
}