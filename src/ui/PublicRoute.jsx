import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';
import { useEffect } from 'react';
// eslint-disable-next-line react/prop-types
function PublicRoute({children}) {
  const navigate = useNavigate()
  const {user, isLoading} = useUser()
  
  useEffect(() => {
    if(user && !isLoading){
      navigate('/')
    }
  },[isLoading, user,navigate])

  if(isLoading){
    return <>
    <div className="grid h-screen place-items-center">
        <span className="loading loading-ring loading-lg"></span>
    </div>
</>
  }

  return children;
}

export default PublicRoute