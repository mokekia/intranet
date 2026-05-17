// Accepts allowedRoles prop — if user.role is not in the list redirects to /, otherwise renders <Outlet />
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet} from 'react-router-dom'
function RoleRoute({ allowedRoles }) {
  const { user } = useAuth()
  if(!allowedRoles.includes(user.role)) {
    return <Navigate to='/'/>
  }else{
    return <Outlet />
  }
}
export default RoleRoute