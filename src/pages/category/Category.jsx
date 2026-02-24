import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Confirmation from "../../ui/Confirmation";
import { useFindAllCategory } from "../../hooks/category/useFindAllCategory";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory";
import InputSearch from "../../ui/InputSearch";
function Category() {
  // const [categories, setCategories] = useState([]);
  
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(25)
  const [search, setSearch] = useState('')

  const {docs: categories, totalPages} = useFindAllCategory(page,limit,search)
  const {deleteCategory, isLoading: isDeleleting} = useDeleteCategory()
  
  const handleDelete = async () => {
          const res = await deleteCategory(deleteId)
          if(!res){
              setIsOpenConfirm(false)
          }else{
            const findIndex = categories.findIndex((item) => item._id == deleteId)
            categories.splice(findIndex,1)
            setIsOpenConfirm(false)
          }
  }


  return (
    <>

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">ប្រភេទំនិញ</h1>
        <Link
          to={'/category/create'}
          className="btn btn-sm btn-success text-white"
        >
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
                <th>ឈ្មោះប្រភេទទំនិញ</th>
                <th>ពិណ៌នា</th>
                <th>សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item, index) => {
                return (
                  <tr key={item._id} className="border-b border-gray-200">
                    <th>{index + 1}</th>
                    <td className="text-nowrap">{item.name}</td>
                    <td className="text-nowrap">{item.note }</td>
                    <td className="flex text-nowrap space-x-2 items-center">
                      <Link to={`/category/edit/${item._id}`} className="text-sm flex text-success items-center">
                        <FaRegEdit />
                        <span>កែប្រែ</span>
                      </Link>
                      <button onClick={() => {
                          setIsOpenConfirm(true)  
                          setDeleteId(item._id)
                      }}
                      className="text-sm flex text-red-500 items-center">
                        <MdDeleteOutline />
                        <span>លុប</span>
                      </button>
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
      
      {
        isOpenConfirm && (
          <Confirmation 
            onClose={() => setIsOpenConfirm(false)}
            isDeleleting={isDeleleting}
            onDelete={handleDelete}
          />
        )
      }
    </>
  );
}

export default Category;
