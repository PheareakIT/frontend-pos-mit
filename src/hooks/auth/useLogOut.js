import {  useState } from "react"
import { logOut } from "../../services/apiAuth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useLogOut = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const logout = async () => {
        try {
            setIsLoading(true)
            await logOut()
            navigate('/signin')
            toast.success('អ្នកបានចាកចេញដោយជោគជ័យ')
        } catch (error) {
            console.log(`useUser Error: `, error.response.data.message)
        }finally{
            setIsLoading(false);
        }
    }

    return {
        logout,
        isLoading
    }
}