import { IoIosClose, IoIosSearch } from "react-icons/io";
import UserCard from "../components/UserCard";
import axios from "axios";
import { filterData } from "../data/data";
import { BACKEND_URL } from "../utils/base_api";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userDataContext } from "../context/UserContext";

const AdminManagment = () => {

  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(users?.role);
  const [userStatus, setUserStatus] = useState([]);
  const [searchData, setSearchData] = useState("");

  

  const handleUpdateRole = async (id, role) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/admin/update-role`, { id, role }, { withCredentials: true });
      setUserRole(res?.data?.data?.role);
      toast.success(res?.data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

  }

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/admin/update-status`, { id, status }, { withCredentials: true });
      setUserStatus(res?.data?.data?.status);
      toast.success(res?.data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const handleFilterData = async (value) => {
    let filterData;

    if (value === "Active") {
      filterData = users.filter((user) => user?.status === "Active");
    } else if (value === "InActive") {
      filterData = users.filter((user) => user?.status === "InActive");
    } else if (value === "User") {
      filterData = users.filter((user) => user?.role === "User");
    } else if (value === "Admin") {
      filterData = users.filter((user) => user?.role === "Admin");
    } else if (value === "CreatedAt") {
      filterData = [...users].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setUsers(filterData || users);
  };

  const handleDeleteUser = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      try {
        const res = await axios.delete(`${BACKEND_URL}/admin/delete-user/${id}`, { withCredentials: true });
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          setUsers(users.filter((user)=>user._id !== id))
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/admin/users`, { withCredentials: true })
      setUsers(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  const handleSearch = async () => {
    if (searchData) {
      try {
        const res = await axios.get(`${BACKEND_URL}/admin/search?username=${searchData}`, { withCredentials: true });
        setUsers(res?.data?.data);
        toast.success(res?.data?.message)
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Please enter username...❌")
    }
  }


  useEffect(() => {
    fetchAllUsers();
  }, [userRole, userStatus]);


  return (
    <div className="flex items-center justify-start flex-col gap-2 w-[100vw] p-3">
      <h1 className="font-bold m-3">User List and Controls</h1>

      <div className="flex-row flex items-center justify-between px-4 gap-3 w-[100vw]">

        <div className="flex items-center justify-between gap-2 pr-2 border-2 rounded-md w-[50%]">
          <input type="text" placeholder="Search username..." className="px-2 py-1 rounded-md w-[100%]" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
          <span className="flex text-xl gap-1">
            <IoIosClose onClick={() => setSearchData("")} title="clear" className={`text-white ${searchData ? "block" : "hidden"} bg-red-600 rounded-full hover:scale-125 transition-all`} />
            <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" onClick={handleSearch} />
          </span>
        </div>

        <select name="status" id="status" onChange={(e) => handleFilterData(e.target.value)} className=" border border-black   text-sm font-semibold rounded p-1">
          {filterData.map((item, index) => (
            <option
              className={"bg-slate-100 px-2 font-semibold hover:bg-slate-200"}
              key={index}
              value={item.value}
            >
              {item.label} {item.label === "Creation Date" ? "↑" : ''}
            </option>
          ))}
        </select>
      </div>

      <UserCard handleDeleteUser={handleDeleteUser} users={users} userRole={userRole} setUserRole={setUserRole} handleUpdateRole={handleUpdateRole} handleUpdateStatus={handleUpdateStatus} />
    </div>
  )
}

export default AdminManagment;