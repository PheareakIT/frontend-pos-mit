import { api } from "../config/api"

const generalReport = async () => {
    const {data} = await api.get('/report/general')
    return data
}

const saleReport = async (startDate, endDate) => {
    const {data} = await api.get(`/report/sale?startDate=${startDate}&endDate=${endDate}`)
    return data
}

const stockReport = async (stock) => {
    const {data} = await api.get(`report/stock?stockQty=${stock}`)
    return data
}

export{
    generalReport,
    saleReport,
    stockReport
}

