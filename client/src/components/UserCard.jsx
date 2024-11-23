import { roles, status } from "../data/data";
import moment from "moment";


const UserCard = ({ users, setUserRole, handleUpdateRole,handleUpdateStatus }) => {



  return (
    <div className="md:block px-4 py-2 rounded-md w-full overflow-x-scroll">
      <table className="table-auto w-full border border-slate-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Profile</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user, index) => (
              <tr key={user._id} className="bg-white hover:bg-slate-50 transition">
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">
                  <img src={`${user?.role === "User" ? "/user.png" : "/admin.jpeg"}`} alt="profile" className="rounded-full w-12 h-12 mx-auto" />
                </td>
                <td className="px-4 py-2">{user?.userName}</td>
                <td className="px-4 py-2">{user?.email}</td>
                <td className="px-4 py-2">{user?.phone}</td>
                <td className="px-4 py-2">{moment(user?.createdAt).format("YYYY-MM-DD")}</td>
                <td className="px-4 py-2">
                  <select name="role" id="role" value={user?.role} onChange={(e) => handleUpdateRole(user?._id, e.target.value)} className={`border text-sm font-semibold rounded p-1 bg-violet-50 ${user?.role === "Admin" ? "bg-blue-700 text-white" : ''}`}>
                    {roles.map((item, index) => (
                      <option className="bg-blue-200" key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <select name="status" value={user?.status} onChange={(e) => handleUpdateStatus(user?._id, e.target.value)} id="status" className={`${user?.status === "Active" ? "bg-green-600 text-white" : "bg-red-600 text-white"} border text-sm font-semibold rounded p-1`}>
                    {status.map((item, index) => (
                      <option
                        className={`bg-slate-300 text-black`}
                        key={index}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>


  )
}

export default UserCard;