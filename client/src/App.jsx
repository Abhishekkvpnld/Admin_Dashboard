import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import AdminManagment from "./pages/AdminManagment";
import Layout from "./layout/Layout";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/new-user" element={<Layout><NewUser /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-managment" element={<Layout><AdminManagment /></Layout>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  )
}

export default App;