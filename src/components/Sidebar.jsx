import { TiHome } from "react-icons/ti";
import { MdCategory } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";
import { FaHandsHelping } from "react-icons/fa";
import { TbHttpPost, TbActivityHeartbeat ,TbPackages } from "react-icons/tb";
// import { FaUsersCog } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";

import { NavLink } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Sidebar({isActive}) {
  const [activeReportIndex, setActiveReportIndex] = useState(false);
  const [activePosIndex, setActivePosIndex] = useState(false)
  

  return (
    <div className={`${isActive ? 'w-[260px]' : 'w-0'} fixed top-[60px] z-50 left-0 md:w-[260px] md:static bg-white transition-all duration-300 overflow-hidden  pt-4 shadow-sm min-h-screen border-r border-gray-200`}>
      <div className="px-2 md:px-4 space-y-1">
        <NavLink to={"/"} className="sidebar">
          <span className="text-lg">
            
            <TiHome />
          </span>
          <span>ផ្ទាំងដើម</span>
        </NavLink>

        <NavLink to={"/category"} className="sidebar">
          <span className="text-lg">
            
            <MdCategory />
          </span>
          <span>ប្រភេទំនិញ</span>
        </NavLink>

        <NavLink to={"/supply"} className="sidebar hidden">
          <span className="text-lg">
            
            <FaHandsHelping />
          </span>
          <span>អ្នកផ្គត់ផ្គង់</span>
        </NavLink>

        <NavLink to={"/product"} className="sidebar">
          <span className="text-lg">
            
          <TbPackages />
          </span>
          <span>ទំនិញ</span>
        </NavLink>
        <button onClick={() => setActivePosIndex(!activePosIndex)} className="sidebar justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              
              <TbHttpPost />
            </span>
            <span>ការលក់</span>
          </div>

          <div className={`${activePosIndex ? '-rotate-90' : 'rotate-90'}  text-lg`}>
            <IoMdArrowDropright />
          </div>
        </button>

        <div
          className={`${
            activePosIndex ? "h-auto" : "h-0"
          } transition-all rounded-lg bg-gray-100 duration-300 overflow-hidden`}
        >
          <NavLink to={"/sale"} className="sub_sidebar">
            <span>
              <TbActivityHeartbeat />
            </span>
            <span>បញ្ជីរការលក់</span>
          </NavLink>
          <NavLink to={"/sale/pos"} className="sub_sidebar">
            <span>
              <TbActivityHeartbeat />
            </span>
            <span>POS</span>
          </NavLink>
        </div>
        
        {/* <NavLink to={"/user"} className="sidebar">
          <span className="text-lg">
            
            <FaUsersCog />
          </span>
          <span>អ្នកប្រើប្រាស់</span>
        </NavLink> */}
        <button onClick={() => setActiveReportIndex(!activeReportIndex)} className="sidebar justify-between w-full">
          <div className="flex items-center space-x-2">
            <span className="text-lg">
              
              <IoBarChart />
            </span>
            <span>របាយការណ៍</span>
          </div>

          <div className={`${activeReportIndex ? '-rotate-90' : 'rotate-90'}  text-lg`}>
            <IoMdArrowDropright />
          </div>
        </button>

        <div
          className={`${
            activeReportIndex ? "h-auto" : "h-0"
          } transition-all rounded-lg bg-gray-100 duration-300 overflow-hidden`}
        >
          <NavLink to={"/report/sale"} className="sub_sidebar">
            <span>
              <TbActivityHeartbeat />
            </span>
            <span>របាយការណ៍ចំណូល</span>
          </NavLink>
          <NavLink to={"/report/stock"} className="sub_sidebar">
            <span>
              <TbActivityHeartbeat />
            </span>
            <span>របាយការណ៍ស្តុក</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
