import { useState } from "react"
import Navbar from "../layout/Navbar"
import { useNavigate } from "react-router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    // Login simulato
    if (email && password) {
      // Normalmente dovrei mandare una POST al server
      navigate("/")
    } else {
      alert("Please enter email and password")
    }
  }
  return (
    <div>
      <h2>Login Component</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
