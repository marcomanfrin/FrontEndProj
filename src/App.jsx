import { Routes, Route } from "react-router"
import "./App.css"
import Layout from "./Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css"
import Bivacchi from "./pages/Bivacchi"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import DetailPage from "./pages/DetailPage"
import Profile from "./pages/Profile"
import { Provider } from "react-redux"
import store from "./redux/store"


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route path= "/" element={<Home />} />
          <Route path="/Bivacchi" element={<Bivacchi />} />
          <Route path="/Bivacchi/:bivaccoId" element={<DetailPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  )
}

export default App
