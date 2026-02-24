import { api } from "../config/api"

export const findAll = async (page, limit, search) => {
    const {data} = await api.get(`/user?page=${page}&limit=${limit}&search=${search}`)
    return data
}

export const create = async () => {
    
}
