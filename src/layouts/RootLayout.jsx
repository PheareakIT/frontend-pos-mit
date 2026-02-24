import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import TopMenu from "../components/TopMenu"
import { useState } from "react"


function RootLayout() {
  const [isActiveSidebar, setIsActiveSidebar] = useState(false) 
  const handleToggleSidebar = () => {
      setIsActiveSidebar(!isActiveSidebar)
  }
  return (
    <>
        <TopMenu onToggleSidebar={handleToggleSidebar}/>
         <div className="flex">

            <Sidebar isActive={isActiveSidebar}/>    

              <div className="p-2 bg-slate-100 flex-grow">
                  <div className="p-4 min-h-screen rounded-lg">
                      <Outlet />
                  </div>
              </div>

         </div>
    
    </>
  )
}

export default RootLayout