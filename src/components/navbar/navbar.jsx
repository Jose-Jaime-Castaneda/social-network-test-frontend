import React, { useState } from "react";
import "./styles/navbar.css";

const NavBar = ({ token, onLogout }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    setDropdownVisible(false);
    onLogout(token);
  };

  const handleProfile = () => {
    console.log("hola");
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
