import { IoIosClose, IoIosSearch } from "react-icons/io";
import UserCard from "../components/UserCard";
import { filterData } from "../data/data";

const AdminManagment = () => {
  return (
    <div className="flex items-center justify-start flex-col gap-2 w-[100vw] p-3">
      <h1 className="font-bold m-3">User List and Controls</h1>

      <div className="flex-row flex items-center justify-between px-4 gap-3 w-[100vw] bg-red-400">

        <div className="flex items-center justify-between gap-2 pr-2 border-2 rounded-md w-[30%]">
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
                  {item.label} {item.label === "Creation Date" ? "↑" :'' }
                </option>
              ))}
            </select>
      </div>

      <UserCard />
    </div>
  )
}

export default AdminManagment;