import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import AdminManagment from "./pages/AdminManagment";
import Layout from "./layout/Layout";
import { userDataContext } from "./context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "./utils/base_api";

const App = () => {

  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    const res = await axios.get(`${BACKEND_URL}/admin/user`, { withCredentials: true })

    if (res?.data?.success) {
      setUserData(res?.data?.data);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <Router>

      <userDataContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/new-user" element={<Layout><NewUser /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/admin-managment" element={<Layout><AdminManagment /></Layout>} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </userDataContext.Provider>

      <Toaster position="top-right" />
    </Router >
  )
}

export default App;