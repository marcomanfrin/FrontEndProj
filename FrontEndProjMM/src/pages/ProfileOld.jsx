import { Link, useLocation } from "react-router"

const ProfileOld = () => {
  const location = useLocation()
  console.log(location)
  return (
    <div>
      <h1>Your profile </h1>
    </div>
  )
}

export default ProfileOld

