import { api } from "../config/api"


const findAll = async (page = 1, limit = 25 , search = '') => {
    const {data} = await api.get(`/sale?page=${page}&limit=${limit}&search=${search}`)
    return data
}

const sale = async (doc) => {
    const {data} = await api.post('/sale', doc)
    return data
}

const findOne = async (id) => {
    if(id){
        const {data} = await api.get(`/sale/${id}`)
        return data;
    }
}

export{
    sale,
    findAll,
    findOne
}

