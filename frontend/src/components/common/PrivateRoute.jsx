// Reads user from AuthContext — if not logged in redirects to /login, otherwise renders <Outlet />
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet} from 'react-router-dom'

function PrivateRoute() {
  const { user, login, logout, token } = useAuth()
  if (!user) {
    return <Navigate to='/login' />
  }else{
    return <Outlet />
  }
} 

export default PrivateRoute