import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/authActions"; // assicurati che esista
import React from "react";

function Navbar() {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkStyle = {
    marginRight: "1rem",
    color: "#444",
    textDecoration: "none",
  };

  const activeStyle = {
    color: "#007bff",
    fontWeight: "bold",
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Home
      </NavLink>

      <NavLink
        to="/Bivacchi"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Bivacchi
      </NavLink>

      {currentUser && currentUser.role === "admin" && (
      <NavLink
        to="/admin"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Aggiungi bivacco
      </NavLink>
      )}

      {currentUser && (
        <NavLink
          to="/profile"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          Il tuo Profilo
        </NavLink>
      )}

      {!currentUser && (
        <NavLink
          to="/login"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          Login
        </NavLink>
      )}

      {currentUser && (
        <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>
          Log Out
        </button>
      )}
    </nav>
  );
}

export default Navbar;
