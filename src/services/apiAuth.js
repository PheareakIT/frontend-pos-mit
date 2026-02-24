import { api } from "../config/api"

const signInWithEmailAndPassword = async (email, password) => {
    const {data} = await api.post('/auth/signin', {email,password})
    return data
}

const currentUser = async () => {
    const {data} = await api.get('/auth/currentUser')
    if(data){
        return data
    }else{
        return null
    }

}

const logOut = async () => {
    const {data} = await api.get('/auth/logout')
    return data
}

export{
    signInWithEmailAndPassword,
    currentUser,
    logOut
}