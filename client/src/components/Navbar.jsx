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


                <div className="flex gap-5 items-center">
                    <div className="flex items-center justify-center">
                        <img src="/avatar.png" className="w-12 h-12 rounded-full" alt="avatar" />
                        <h3 className="font-bold hidden md:block">username</h3>
                    </div>

                    <button onClick={()=>navigate("/login")}  className="border-black border h-8 px-4 rounded-lg font-semibold hover:text-white hover:bg-blue-500">Login</button>

                    <button className="border-red-800 border h-8 px-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;