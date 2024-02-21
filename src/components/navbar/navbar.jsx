import React, { useState } from "react";
import "./styles/navbar.css";
import { loguot, userProfile } from "@/utils/user";

const NavBar = ({ token, onLogout, profile}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    setDropdownVisible(false);
    onLogout(loguot(token));
  };

  const handleProfile = () => {
    setDropdownVisible(false);
    profile();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <h3>Red social de prueba</h3>
      <div className="navbarDiv">
        <button onClick={toggleDropdown}>Menú</button>
        {dropdownVisible && (
          <div className="dropdown">
            <button onClick={handleProfile}>Perfil</button>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
