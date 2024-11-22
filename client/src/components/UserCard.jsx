import { roles, status } from "../data/data";


const UserCard = () => {
  return (
    <div className="hidden md:block px-4 py-2 rounded-md w-full">
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
        <tr className="bg-white hover:bg-slate-50 transition">
          <td className="px-4 py-2 text-center">1</td>
          <td className="px-4 py-2 text-center">
            <img src="/user.png" alt="profile" className="rounded-full w-12 h-12 mx-auto" />
          </td>
          <td className="px-4 py-2">username</td>
          <td className="px-4 py-2">email</td>
          <td className="px-4 py-2">phone</td>
          <td className="px-4 py-2">created At</td>
          <td className="px-4 py-2">
            <select name="role" id="role" className="border text-sm font-semibold rounded p-1 bg-blue-50">
              {roles.map((item, index) => (
                <option className="bg-slate-200" key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </td>
          <td className="px-4 py-2">
            <select name="status" id="status" className="border text-sm font-semibold rounded p-1">
              {status.map((item, index) => (
                <option
                  className={item.value === "InActive" ? "bg-red-200" : "bg-green-200"}
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  
  )
}

export default UserCard;