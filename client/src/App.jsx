import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import AdminManagment from "./pages/AdminManagment";

const App = () => {
  return ( 
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-managment" element={<AdminManagment />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App;