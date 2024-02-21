import "./styles/navbar.css";
import { loguot } from "@/utils/user";

export default function NavBar({ token, onLogout }) {
  const handleLogout = () => {
    onLogout(loguot(token));
  };

  return (
    <nav className="navbar">
      <h3>Red social de prueba</h3>
      <div className="navbarDiv">
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
}
