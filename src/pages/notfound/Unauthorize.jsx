import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/auth/useUser"

function Unauthorize() {
  const {user} = useUser()
  const navigate = useNavigate()
  console.log(user)
  const handleRedirect = () => {
      if(user?.role === "admin" || user?.role === "super"){
          navigate('/')
      }else if(user?.role == "cashier"){
          navigate('/cashier/sale/pos')
          // window.location.href = ""
      }else{
          navigate('/signin')
          // window.location.href = "/signin"
      }
  }
  return (
    <>
        <h1 className="h-screen grid place-items-center bg-success">
              <div className="border border-gray-200 p-5 rounded-lg bg-white shadow-md">
                    <p className="text-4xl font-semibold mb-4">ចូលដីគេតិចហើយ🥲</p>
                    <button onClick={handleRedirect} className="btn btn-sm btn-success text-white">ថយក្រោយ</button>
              </div>
        </h1>
    </>
  )
}

export default Unauthorize