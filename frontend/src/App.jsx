// This file controls which page is shown at which url to the user. It also contains the navigation bar, 
// which is shown on every page.
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
// import LoginPage from './pages/LoginPage.jsx';
// import TimeSheetPage from './pages/TimeSheetPage.jsx';
// import MeetingsPage from './pages/MeetingsPage.jsx';
// import AdminPage from './pages/AdminPage.jsx';

export  default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}

        <Route element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />

          {/* <Route path="/timesheet" element={<TimeSheetPage />} />
          <Route path="/meetings" element={<MeetingsPage />} />
          <Route path="/payslip" element={<PayslipPage />} />
          <Route path="/admin" element={<AdminPage />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

