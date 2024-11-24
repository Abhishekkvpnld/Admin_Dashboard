import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { BACKEND_URL } from "../utils/base_api";
import toast from "react-hot-toast";


const Navbar = () => {

    const navigate = useNavigate();
    const { userData, setUserData } = useContext(userDataContext);


    const handleLogout = async () => {
        const res = await axios.get(`${BACKEND_URL}/admin/logout`, { withCredentials: true });
        if (res?.data?.success) {
            setUserData(null);  
            navigate("/login")
            toast.success(res?.data?.message)
        }
    }

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
                    {
                        userData?._id && (
                            <div className="flex items-center justify-center">
                                <img src="/avatar.png" className="w-12 h-12 rounded-full" alt="avatar" title={userData?.userName} />
                                <h3 className="font-bold hidden md:block">{userData?.userName}</h3>
                            </div>
                        )
                    }

                    {
                        userData?._id ? (
                            <button className="border-red-800 border h-8 px-4 rounded-lg font-semibold hover:bg-red-600 hover:text-white" onClick={handleLogout}>Logout</button>
                        ) : (
                            <button onClick={() => navigate("/login")} className="border-black border h-8 px-4 rounded-lg font-semibold hover:text-white hover:bg-blue-500">Login</button>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar;