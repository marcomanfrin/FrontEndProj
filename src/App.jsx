import { Routes, Route } from "react-router"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Bivacchi from "./pages/Bivacchi"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import DetailPage from "./pages/DetailPage"
import Profile from "./pages/Profile"
import Test from "./pages/test"
import { Provider } from "react-redux"
import store from "./redux/store"
import Layout from "./layout/Layout";


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route path= "/" element={<Home />} />
          <Route path="/Bivacchi" element={<Bivacchi />} />
          <Route path="/products/:productId" element={<DetailPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />

        </Route>
        {/* Grazie al Nested Routing posso raggruppare quali pagine debbano condividere delle componenti UI di layout "fisse" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  )
}

export default App
