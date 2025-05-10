import { NavLink } from "react-router"
import { Button } from "react-bootstrap"
import ThemeToggler from "../components/ThemeToggler"
import { useSelector } from "react-redux"

function Navbar() {
  const linkStyle = {
    marginRight: "1rem",
    color: "#444",
    textDecoration: "none",
  }

  const activeStyle = {
    color: "#007bff",
    fontWeight: "bold",
  }

  const cartTotal = useSelector(state => state.cart.total)
  const currentUser = useSelector(state => state.users.currentUser)

  return (
    <>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Home
        </NavLink>
        <NavLink to="/admin" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Admin
        </NavLink>
        <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Login
        </NavLink>
        <Button>
          <NavLink to="/cart" style={{ color: "white", textDecoration: "none" }}>
            🛒 {cartTotal}
          </NavLink>
        </Button>
        {currentUser && currentUser.role === "admin" ? <Button>Admin Section</Button> : <Button>Profile Page</Button>}
        <ThemeToggler />
      </nav>
    </>
  )
}

export default Navbar
