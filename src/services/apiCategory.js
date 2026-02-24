import { api } from "../config/api"

const findAll = async (page = 1, limit = 25 , search = '') => {
        const {data} = await api.get(`/category?page=${page}&limit=${limit}&search=${search}`)
        return data
}

const findOne = async (id) => {
    if(id){
        const {data} = await api.get(`/category/${id}`)
        return data
    }
}

const create = async (doc) => {
    const {data} = await api.post('/category', doc)
    return data
}

const deleteById = async (id) => {
    if(id){
        const {data} = await api.delete(`/category/${id}`)
        return data
    }
} 

const update = async (id, doc) => {
    if(id){
        const {data} = await api.patch(`/category/${id}`,doc)
        return data
    }
}

export{
    findAll,
    deleteById,
    create,
    findOne,
    update
}