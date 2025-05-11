import { Routes, Route } from "react-router"

import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Bivacchi from "./pages/Bivacchi"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProductDetail from "./pages/ProductDetail"
import Profile from "./pages/Profile"
import Layout from "./layout/Layout"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path= "/" element={<Home />} />
        <Route path="/Bivacchi" element={<Bivacchi />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

      </Route>
      {/* Grazie al Nested Routing posso raggruppare quali pagine debbano condividere delle componenti UI di layout "fisse" */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
