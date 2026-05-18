// Sticky top navbar — shows brand "IntraNet" on the left
// Nav links: Home, Time Sheet, Meetings, Payslip — plus Admin link only when user.role === 'admin'
// Log Out button calls logout() and navigates to /login
// Renders <Outlet /> below so child pages appear inside the layout

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import  {useState, useEffect} from 'react'
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import "./navbar.css";


const baseLinks = [
    { label: "Home", path: "/"},
    { label: "Time Sheet", path: "/timesheet"},
    { label: "Meetings", path: "/meetings"},
    { label: "Payslip", path: "/payslip"},
];

const adminLink = { label: "Admin", path: "/admin"};

export default function Navbar() {

    const { user, logout} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    const links = user?.role === "admin" ? // Safe check, only access if user exits
    [...baseLinks, adminLink] : baseLinks;

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if ( window.innerWidth > 768) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        // Here is the logout logic presented
        logout();
        navigate("/login");
    };

    return (
        <div style={{ position: 'relative', width: '100%'}}>
            <nav className="navbar">
                <div className="navbar-logo">
                    <img
                        src="/src/assets/logo.png"
                        alt="Zorex logo"
                        className="navbar-logo-image"
                    />
                    <span className="navbar-logo-text">Zorex</span>
                </div>

            <ul className="navbar-links">
                {links.map((link) => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            className={`navbar-link ${
                                location.pathname === link.path ? "navbar-link--active" : ""}`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="navbar-right">
                <span className="navbar-username">Welcome, {user.name}!</span>
                <button className="navbar-logout" onClick={handleLogout}>
                    Log out
                </button>
            </div>
            
            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "✕" : "☰"}
            </button>
        </nav>

        {menuOpen && (
            <div className="navbar-mobile-menu">
                <span className="navbar-mobile-username"> Welcome, {user.name}!</span>
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>
                        {link.label}
                    </Link>
                ))}

                <button className="navbar-mobile-logout" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        )}
        <Outlet />

    </div>
    );
}