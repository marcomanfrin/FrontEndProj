import { Outlet } from "react-router"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* Outlet rappresenta un "segnaposto" che mi serve per indicare dove dovranno essere posizionate le vari pagine Home, Admin ecc ecc */}
      <Footer />
    </>
  )
}

export default Layout
