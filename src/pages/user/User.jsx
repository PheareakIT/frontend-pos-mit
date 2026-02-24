import { Link } from "react-router-dom";
import InputSearch from "../../ui/InputSearch";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useFindAllUser } from "../../hooks/user/useFindAllUser";

function User() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [search, setSearch] = useState("");
  const {docs: users, totalPages} = useFindAllUser(page, limit, search)
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">អ្នកប្រើប្រាស់</h1>
        <Link
          to={"/user/create"}
          className="btn btn-sm btn-success text-white"
        >
          +បន្ថែមថ្មី
        </Link>
      </div>

      <div className="p-3 bg-white rounded-lg mt-3">
        <div className="mb-3 flex items-center justify-between">
          <select
            onChange={(e) => setLimit(e.target.value)}
            className="select select-sm select-bordered w-auto"
          >
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
                <th>ឈ្មោះ</th>
                <th>អ៊ីម៉ែល</th>
                <th>សិទ្ធ</th>
                <th>ស្ថានភាព</th>
                <th>សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => {
                return (
                  <tr key={item._id} className="border-b border-gray-200">
                    <th>{index + 1}</th>
                    <td className="text-nowrap">{item.username}</td>
                    <td className="text-nowrap">{item.email }</td>
                    <td className="text-nowrap">{item.role }</td>
                    <td className="text-nowrap">
                        {item.status ? (
                            <span className="badge badge-success text-white">ដំណើការ</span>
                        ): (
                            <span className="badge badge-error text-white">មិនដំណើការ</span>
                        ) }
                    </td>
                    <td className="flex text-nowrap space-x-2 items-center">
                      <Link to={`/category/edit/${item._id}`} className="text-sm flex text-success items-center">
                        <FaRegEdit />
                        <span>កែប្រែ</span>
                      </Link>
                      <button onClick={() => {
                          // setIsOpenConfirm(true)  
                          // setDeleteId(item._id)
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
          <div className="font-medium text-sm">ទំព័រ {page}/{ totalPages}</div>
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

export default User;
