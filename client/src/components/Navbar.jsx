import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";


const Navbar = () => { 

const navigate = useNavigate();

    return (
        <div className="py-1 border-b-2 px-4">
            <div className=" mx-auto flex justify-between items-center">
                <Link
                    to={"/"}
                    className="text-xl font-semibold tracking-tight text-blue-600 flex items-center justify-center"
                >
                    <span><img className="rounded-full w-12 h-12" src="/admin-dashboard-icon.png" alt="img" /></span> Admin
                </Link>

                <div className="hidden md:flex items-center justify-between gap-2 pr-2 border-2 rounded-md w-[40%]">
                    <input type="text" placeholder="Search username..." className="px-2 py-1 rounded-md w-[100%]" />
                    <span className="flex text-xl gap-1">
                        <IoIosClose title="clear" className="text-white hidden bg-red-600 rounded-full hover:scale-125 transition-all" />
                        <IoIosSearch title="search" className="hover:scale-125 cursor-pointer transition-all" />
                    </span>
                </div>

                <div className="flex gap-5 items-center">
                    <div className="flex items-center justify-center">
                        <img src="/avatar.png" className="w-12 h-12 rounded-full" alt="avatar" />
                        <h3 className="font-bold">username</h3>
                    </div>

                    <button onClick={()=>navigate("/login")}  className="border-black border h-8 px-4 rounded-lg font-semibold hover:text-white hover:bg-blue-500">Login</button>

                    <button className="border-red-800 border h-8 px-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;