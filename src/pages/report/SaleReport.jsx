import dayjs from "dayjs";
import { useSaleReport } from "../../hooks/report/useSaleReport";
import { useState } from "react";

function SaleReport() {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [sales, setSales] = useState([])
    const {fetchSaleReport} = useSaleReport()



    const formatDate = (date) => {
        return dayjs(new Date(date)).format('MMM D, YYYY h:mm A');
    }

    const handleFilter = async (e) => {
        e.preventDefault()
        const start = new Date(startDate)
        const end = new Date(endDate)
        const res = await fetchSaleReport(start, end)
        setSales(res)
        console.log(res)
    }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">របាយការណ៍ការលក់</h1>
      </div>

      <div className="p-5 bg-white rounded-lg flex justify-center items-center">
                <form onSubmit={handleFilter} className="flex space-x-4 items-center">
                       <div>
                                <label htmlFor="" className="block">ចាប់ផ្តើម</label>
                                <input type="date" onChange={(e) => setStartDate(e.target.value)} className="input input-bordered" />
                       </div>
                       <div>
                                <label htmlFor="" className="block">បញ្ចប់</label>
                                <input type="date" onChange={(e) => setEndDate(e.target.value)} className="input input-bordered" />
                       </div>
                       <div className="mt-5">
                                <button className="btn w-20 btn-success text-white">ច្រោះ</button>
                       </div>
                </form>
      </div>

      <div className="bg-white p-5 rounded-lg mt-3">  
      <div className="overflow-x-auto grid grid-cols-12">
          <table className="table border col-span-12 border-gray-200">
            {/* head */}
            <thead className="md:text-sm text-slate-600 bg-black/5">
            <tr>
                <th>ល.រ</th>
                <th>លេខវិក័យប័ត្រ</th>
                <th>លក់ដោយ</th>
                <th>ចំនួនសរុប</th>
                <th>កាលបរិច្ចេទ</th>
              </tr>
            </thead>
            <tbody>
              {
                sales?.data?.length > 0 && (
                    sales.data.map((item, index) => {
                        return (
                            <tr key={item._id} className="border-b border-gray-200">
                            <th>{index + 1}</th>
                            <td className="text-nowrap">{item.invoiceNumber}</td>
                            <td className="text-nowrap">{item?.userDetail?.username }</td>
                            <td className="text-nowrap text-red-500 font-semibold">${(item.totalAmount).toFixed(2) }</td>
                            <td className="text-nowrap">{ formatDate(item?.transactionDate) }</td>
                          </tr>
                        );
                      })
                )
              }
              
            </tbody>
          </table>
        </div>
          <div className="flex justify-end items-center mt-3">
                <h1>ចំនួនសរុប៖ <span className="text-red-500 font-semibold">${sales?.totalAmountSum || 0}</span></h1>
          </div>
      </div>
    </>
  );
}

export default SaleReport;
