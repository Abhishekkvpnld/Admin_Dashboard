import { IoIosClose, IoIosSearch } from "react-icons/io";
import UserCard from "../components/UserCard";
import axios from "axios";
import { filterData } from "../data/data";
import { BACKEND_URL } from "../utils/base_api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminManagment = () => {

  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(users?.role);
  const [userStatus, setUserStatus] = useState([])


  const handleUpdateRole = async (id, role) => {
    console.log(id, role)

    const res = await axios.put(`${BACKEND_URL}/admin/update-role`, { id, role }, { withCredentials: true });
    if (res?.data?.success) {
      setUserRole(res?.data?.data?.role);
      toast.success(res?.data?.message)
    }
  }

  const handleUpdateStatus = async (id, status) => {
    console.log(id, status)

    const res = await axios.put(`${BACKEND_URL}/admin/update-status`, { id, status }, { withCredentials: true });
    if (res?.data?.success) {
      setUserStatus(res?.data?.data?.status);
      toast.success(res?.data?.message)
    }
  }

  const fetchAllUsers = async () => {
    const res = await axios.get(`${BACKEND_URL}/admin/users`, { withCredentials: true })
    if (res?.data?.success) {
      setUsers(res?.data?.data)
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
          <input type="text" placeholder="Search username..." className="px-2 py-1 rounded-md w-[100%]" />
          <span className="flex text-xl gap-1">
            <IoIosClose title="clear" className="text-white hidden bg-red-600 rounded-full hover:scale-125 transition-all" />
            <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" />
          </span>
        </div>

        <select name="status" id="status" className="border text-sm font-semibold rounded p-1">
          {filterData.map((item, index) => (
            <option
              className={"bg-slate-100 px-2"}
              key={index}
              value={item.value}
            >
              {item.label} {item.label === "Creation Date" ? "↑" : ''}
            </option>
          ))}
        </select>
      </div>

      <UserCard users={users} userRole={userRole} setUserRole={setUserRole} handleUpdateRole={handleUpdateRole} handleUpdateStatus={handleUpdateStatus} />
    </div>
  )
}

export default AdminManagment;