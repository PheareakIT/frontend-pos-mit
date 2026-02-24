import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import InputSearch from "../../ui/InputSearch";
import { useState } from "react";
import { useFindAllSale } from "../../hooks/sale/useFindAllSale";
import { IoIosEye } from "react-icons/io";
import dayjs from "dayjs";

function Sale() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [search, setSearch] = useState('')
  const {docs: sales, totalPages} = useFindAllSale(page,limit,search)
  const formatDate = (date) => {
    return dayjs(new Date(date)).format('MMM D, YYYY h:mm A');
}
 
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">បញ្ជីរការលក់</h1>
        <Link to={"/sale/post"} className="btn btn-sm btn-success text-white">
          +បន្ថែមថ្មី
        </Link>
      </div>

      <div className="bg-white rounded-lg p-3 mt-4">
        <div className="mt-6 mb-3 flex items-center justify-between">
          <select onChange={(e) => setLimit(e.target.value)} className="select select-sm select-bordered w-auto">
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
          </select> 

           <InputSearch onSearch={(text) => setSearch(text)} />
          
        </div>

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
                <th>សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {sales?.map((item, index) => {
                return (
                  <tr key={item._id} className="border-b border-gray-200">
                    <th>{index + 1}</th>
                    <td className="text-nowrap">{item.invoiceNumber}</td>
                    <td className="text-nowrap">{item?.userDetail?.username }</td>
                    <td className="text-nowrap text-red-500 font-semibold">${(item.totalAmount).toFixed(2) }</td>
                    <td className="text-nowrap">{ formatDate(item?.transactionDate) }</td>
                    <td className="flex text-nowrap space-x-2 items-center">
                      <Link to={`/invoice/${item._id}`} target="_blank" className="text-sm flex space-x-1 text-success items-center">
                        <span className="text-lg"><IoIosEye /></span>
                        <span>មើលលម្អិត</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between">
          <div className="font-medium text-sm">ទំព័រ {page}/{totalPages}</div>
          <div className="join mt-4 flex justify-end">
            <button  onClick={() => setPage(page - 1)} disabled={page == 1} className="join-item btn btn-sm">«</button>
            <button className="join-item btn btn-sm">ទំព័រ {page}</button>
            <button onClick={() => setPage(page + 1)} disabled={page == totalPages} className="join-item btn btn-sm">»</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sale;
