import { useState } from "react"
import { useStockReport } from "../../hooks/report/useStockReport"

function StockReport() {
  const [stockQty, setStockQty] = useState(5)
  const [products, setProducts] = useState([])
  const {fetchStockReport} = useStockReport()
  const handleFilter = async (e) => {
      e.preventDefault()
      const res = await fetchStockReport(stockQty)
      setProducts(res.data)
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">របាយការណ៍ការស្តុក</h1>
      </div>

      <div className="p-5 bg-white rounded-lg flex justify-center items-center">
                <form onSubmit={handleFilter} className="flex space-x-4 items-center">
                       <div>
                                <label htmlFor="" className="block">បរិមាណស្តុក</label>
                                <select defaultValue="" required onChange={(e) => setStockQty(e.target.value)} className="select select-bordered">
                                        <option value="">សូមជ្រើសរើស</option>
                                        <option value="5">ចំនួនស្តុកទំនិញតូចជាង 5</option>
                                        <option value="10">ចំនួនស្តុកទំនិញតូចជាង 10</option>
                                        <option value="20">ចំនួនស្តុកទំនិញតូចជាង 20</option>
                                        <option value="40">ចំនួនស្តុកទំនិញតូចជាង 40</option>
                                        <option value="60">ចំនួនស្តុកទំនិញតូចជាង 60</option>
                                        <option value="80">ចំនួនស្តុកទំនិញតូចជាង 80</option>
                                        <option value="100">ចំនួនស្តុកទំនិញតូចជាង 100</option>
                                        <option value="500">ចំនួនស្តុកទំនិញតូចជាង 500</option>
                                        <option value="1000">ចំនួនស្តុកទំនិញតូចជាង 1000</option>
                                </select>
                       </div>
                       <div className="mt-5">
                                <button type="submit" className="btn w-20 btn-success text-white">ច្រោះ</button>
                       </div>
                </form>
      </div>

      <div className="overflow-x-auto grid grid-cols-12 bg-white p-5 rounded-lg mt-4">
          <table className="table border col-span-12 border-gray-200">
            {/* head */}
            <thead className="md:text-sm text-slate-600 bg-black/5">
              <tr>
                <th>ល.រ</th>
                <th>រូបភាព</th>
                <th>ឈ្មោះទំនិញ</th>
                <th>កូដទំនិញ</th>
                <th>ថ្លៃដើម</th>
                <th>ថ្លៃលក់</th>
                <th>ចំនួនស្តុក</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => {
                return (
                  <tr key={item._id} className="border-b border-gray-200">
                    <th>{index + 1}</th>
                    <td className="text-nowrap">
                          <div className="w-[50px] h-[50px]">
                                <img src={`http://localhost:8001/${item.imageURL}`} className="w-full h-full" alt={item.description} />
                          </div>
                    </td>
                    <td className="text-nowrap">{item?.name}</td>
                    <td className="text-nowrap">{item.code }</td>
                    <td className="text-nowrap text-red-500 font-semibold"> ${ (item.costPrice).toFixed(2) }</td>
                    <td className="text-nowrap text-red-500 font-semibold">${(item.salePrice).toFixed(2) }</td>
                    <td className="text-nowrap">{item.stockQty }</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default StockReport