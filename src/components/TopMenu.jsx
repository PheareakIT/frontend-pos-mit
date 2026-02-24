import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { useUser } from "../hooks/auth/useUser";
import { useLogOut } from "../hooks/auth/useLogOut";
// eslint-disable-next-line react/prop-types
function TopMenu({ onToggleSidebar }) {
  const {user} = useUser()
  const {logout, isLoading} = useLogOut()
  
  return (
    <div className="h-[60px] bg-success px-4 flex justify-between items-center border-b border-gray-200">
      <div className="flex space-x-4 items-center">
        <button
          onClick={onToggleSidebar}
          className="text-xl font-semibold text-white block md:hidden"
        >
          <HiOutlineMenuAlt1 />
        </button>
        <div className="font-semibold text-base md:text-lg text-white">
          MASTERIT POS
        </div>
      </div>
      <div className="flex space-x-2 items-center">
        <button className="btn btn-sm bg-green-900 border-none text-white hover:text-slate-900">
          POS
        </button>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-sm uppercase bg-white m-1">
            {user?.username}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-44 p-2 shadow"
          >
            <li>
              <a className="font-semibold uppercase">សិទ្ធ៖ {user?.role}</a>
            </li>
            <li>
              <button onClick={logout} disabled={isLoading} className="flex items-center gap-1 text-red-500"> 
                  <span className="text-md"><BiLogOutCircle/></span>
                  <span>ចាកចេញ</span>    
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopMenu;
