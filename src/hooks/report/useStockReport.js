import { useState } from "react"
import { stockReport } from "../../services/apiReport"

export const useStockReport = () => {
    const [isLoading, setIsLoading] = useState(false)
    const fetchStockReport = async (stock) => {
        try {
            setIsLoading(true)
            const res = await stockReport(stock)
            return res
        } catch (error) {
            console.log('Error: ', error)
        }finally{
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        fetchStockReport
    }
} 