import { useParams } from "react-router-dom";
import { useFindOneSale } from "../hooks/sale/useFindOneSale";
import dayjs from "dayjs"
function Invoice() {
  const {id} = useParams()
  console.log(id)
  const {doc: invoice} = useFindOneSale(id)
  const formatDate = (date) => {
    return dayjs(new Date(date)).format('MMM D, YYYY h:mm A');
}
  return (
    <>
      <div className="bg-white border shadow-sm print:border-none print:shadow-none px-6 py-8 max-w-md mx-auto mt-8">
        <h1 className="font-bold text-2xl my-4 text-center">
          MASTERIT POS 
        </h1>
        <hr className="mb-2" />
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-bold">វិក័យប័ត្រ</h1>
          <div className="text-gray-700">
            <div>កាលបរិច្ចេទ: {formatDate(invoice?.transactionDate)}</div>
            <div>លេខ: {invoice?.invoiceNumber}</div>
          </div>
        </div>
   
        <table className="w-full mb-8">
          <thead>
            <tr>
              <th className="text-left font-bold text-gray-700">ទំនិញ</th>
              <th className="text-left font-bold text-gray-700">ចំនួន</th>
              <th className="text-right font-bold text-gray-700">តំលៃ</th>
            </tr>
          </thead>
          <tbody>
            {invoice?.items?.map(item => {
                return (
                    <tr key={item.productId}>
                        <td className="py-1 text-left text-gray-700">{item?.product?.name}</td>
                        <td className="py-1 text-left text-gray-700">{item?.quantity}</td>
                        <td className="py-1 text-right text-gray-700">${item?.totalPrice}</td>
                    </tr>
            
                )
            })}
          
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-700">
              <td colSpan={2} className=" pt-2 text-right font-bold text-gray-700">ចំនួនសរុប</td>
              <td  className="text-right pt-2 font-bold text-gray-700">${invoice?.totalAmount}</td>
            </tr>
          </tfoot>
        </table>
        <div className="text-gray-700 mb-2 text-center">សូមអរគុណ!</div>
      </div>
    </>
  );
}

export default Invoice;
