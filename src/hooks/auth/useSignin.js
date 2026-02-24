import toast from "react-hot-toast"
import { signInWithEmailAndPassword } from "../../services/apiAuth"
import { useState } from "react"

const useSignin = () => {
    const [isLoading, setIsLoading] = useState(false)

    const signIn = async (email, password) => {
         try {
            setIsLoading(true)
            const res = await signInWithEmailAndPassword(email, password)
        
            if(res){
                toast.success('ចូលប្រព័ន្ធបានជោគជ័យ!')
            }
            setIsLoading(false)
            return res
         } catch (error) {
            console.log('Signin in : ',error)
            toast.error(error.message)
            setIsLoading(false)
         }
    }

    return{
        isLoading,
        signIn
    }
}

export{
    useSignin
}