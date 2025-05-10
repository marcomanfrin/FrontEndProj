import { Link, useLocation } from "react-router"

const NotFound = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div>
      <p>No match found for {location.pathname}</p>
      <Link to="/">Back to Home</Link>
    </div>
  )
}

export default NotFound
