import { useState } from "react"
import { saleReport } from "../../services/apiReport"

export const useSaleReport = () => {
    const [isLoading, setIsLoading] = useState(false)
    const fetchSaleReport = async (startDate, endDate) => {
        try {
            setIsLoading(true)
            const res = await saleReport(startDate, endDate)
            return res
        } catch (error) {
            console.log('Error: ', error)
        }finally{
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        fetchSaleReport
    }
} 