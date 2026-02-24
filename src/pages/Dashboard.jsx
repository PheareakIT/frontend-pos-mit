import { IoMdRefresh  } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { GoPackageDependencies } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useGeneralReport } from "../hooks/report/useGeneralReport";
function Dashboard() {
  const {doc} = useGeneralReport()
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">របាយការណ៍ទូទៅ</h1>
        <button onClick={() => window.location.reload()} className="btn btn-sm btn-accent">
          <IoMdRefresh />
          <span>Reload</span> 
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-8">
            <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
                  <div className="space-y-1">
                        <p className="text-sm text-slate-600">ចំណូលថ្ងៃនេះ</p>
                        <h2 className="text-3xl  font-semibold">{doc?.todayIncome || 0}$</h2>
                  </div>
                  <div className="p-2 bg-green-200/30 rounded-full">
                        <span className="text-3xl text-green-700"> <AiOutlineDollarCircle/>  </span>
                  </div>
            </div>
            <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
                  <div className="space-y-1">
                        <p className="text-sm text-slate-600">ចំនួនលក់ថ្ងៃនេះ</p>
                        <h2 className="text-3xl font-semibold">{doc?.todaySale || 0}</h2>
                  </div>
                  <div className="p-2 bg-green-200/30 rounded-full">
                      <span className="text-3xl text-green-700"> <GoPackage /> </span>
                  </div>
            </div>
            <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
                  <div className="space-y-1">
                        <p className="text-sm text-slate-600">ចំនួនទំនិញ</p>
                        <h2 className="text-3xl font-semibold">{doc?.totalProducts || 0}</h2>
                  </div>
                  <div className="p-2 bg-green-200/30 rounded-full">
                      <span className="text-3xl text-green-700"> <GoPackageDependencies/> </span>
                  </div>
            </div>
            <div className="bg-white flex justify-between items-start p-3 shadow-sm rounded-lg py-5">
                  <div className="space-y-1">
                        <p className="text-sm text-slate-600">អ្នកប្រើប្រាស់</p>
                        <h2 className="text-3xl font-semibold">{doc?.totalUsers || 0}</h2>
                  </div>
                  <div className="p-2 bg-green-200/30 rounded-full">
                      <span className="text-3xl text-green-700"> <HiOutlineUserGroup /> </span>
                  </div>
            </div>
           
      </div>
    </>
  );
}

export default Dashboard;
