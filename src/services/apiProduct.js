import { api } from "../config/api"

const findAll = async (page = 1, limit = 25 , search = '') => {
        const {data} = await api.get(`/product?page=${page}&limit=${limit}&search=${search}`)
        return data
}

const findOne = async (id) => {
    if(id){
        const {data} = await api.get(`/product/${id}`)
        return data
    }
}

const findByCategoryID = async (categoryID) => {
     if(categoryID){
         const {data} = await api.get(`/product/category/${categoryID}`)
         return data
     }else{
        const {data} = await api.get(`/product?page=${1}&limit=${20}`)
        return data
     }
}

const create = async (doc) => {
    const {data} = await api.post('/product', doc, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return data
}

const deleteById = async (id) => {
    if(id){
        const {data} = await api.delete(`/product/${id}`)
        return data
    }
} 

const update = async (id, doc) => {
    if(id){
        const {data} = await api.patch(`/product/${id}`,doc,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return data
    }
}

export{
    findAll,
    deleteById,
    create,
    findOne,
    update,
    findByCategoryID
}