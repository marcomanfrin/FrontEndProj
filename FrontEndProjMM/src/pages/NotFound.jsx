import { Link, useLocation } from "react-router"

const NotFound = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div>
      <p>404 page '{location.pathname}' not found</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound
