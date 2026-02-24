 import { useState, useEffect } from "react";
import { generalReport } from "../../services/apiReport";
export const useGeneralReport = () => {
  const [doc, setDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGeneralReport = async () => {
      try {
         const res = await generalReport()
         setDoc(res.data)
      } catch (error) {
        console.log("Error: ", error.message);
      }finally{
         setIsLoading(false)
      }
    };
    fetchGeneralReport()
  });
  return{
    doc,
    isLoading
  }
};
