import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
import RoleRoute from './components/common/RoleRoute'  
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import MeetingsPage from './pages/MeetingsPage'
import PayslipPage from './pages/PayslipPage'
import TimeSheetPage from './pages/TimeSheetPage'
import LoginPage from './pages/LoginPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<LoginPage />} />

        <Route element={ <PrivateRoute /> }>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/timesheet' element={ <TimeSheetPage /> } />
          <Route path='/meetings' element={ <MeetingsPage /> } />
          <Route path='/payslip' element={ <PayslipPage /> } />
          <Route element={<RoleRoute allowedRoles={['Admin']}/>} >
            <Route path='/admin' element={<AdminPage />} />
          </Route>
        </Route>

        
      </Routes>
    </BrowserRouter>
  )
}
export default App
