import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    isActive
      ? "bg-white text-blue-600 px-3 py-1 rounded font-semibold"
      : "hover:bg-blue-500 px-3 py-1 rounded transition";

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <NavLink to="/">News Portal</NavLink>
        </h1>

        <div className="space-x-4 flex items-center">
          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink to="/news" className={navStyle}>
            News
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navStyle}>
                Dashboard
              </NavLink>

              <NavLink to="/profile" className={navStyle}>
                {user.name}
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
               <NavLink to="/contact" className={navStyle}>
  Contact Us
</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navStyle}>
                Login
              </NavLink>

              <NavLink to="/register" className={navStyle}>
                Register
              </NavLink>
              <NavLink to="/contact" className={navStyle}>
  Contact Us
</NavLink>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;