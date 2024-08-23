import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedin, user, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if(isLoading){
    return <h1>Loading...</h1>
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="main-menu">
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">MERN eduTech</NavLink>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>☰</button>

        <nav className={menuOpen ? "menu-open container" : ""}>
          <ul>
            <li> <NavLink onClick={closeMenu} to="/">Home</NavLink> </li>
            <li> <NavLink onClick={closeMenu} to="/about">About</NavLink> </li>
            <li> <NavLink onClick={closeMenu} to="/services">Services</NavLink> </li>
            <li> <NavLink onClick={closeMenu} to="/contact">Contact</NavLink> </li>
            {
              isLoggedin ? 
              <li> <NavLink onClick={closeMenu} to="/logout">Logout</NavLink> </li> :
              <>
                <li> <NavLink onClick={closeMenu} to="/login">Login</NavLink> </li>
                <li> <NavLink onClick={closeMenu} to="/register">Register</NavLink> </li>
              </>
            }
            {
              (isLoggedin && user?.isAdmin) && 
              <li> <NavLink onClick={closeMenu} to="/admin/users" className="admin-btn">Admin</NavLink> </li>
            }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
