import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

  };


  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    });
  };


  return (
    <div className='mx-auto container p-5 md:w-[50vw] h-[100vh] flex items-center justify-center'>

      <div className='border border-blue-500 w-full py-2 mx-auto rounded p-3  '>

        <div className="font-bold m-4 text-center ">
          <h1 className="flex items-center gap-3">Welcome Back! Login to Your Account <IoMdLogIn size={30}/></h1>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col gap-2'>

          <div className="w-full font-semibold">
            <label htmlFor="email">Email</label>
            <div className='bg-slate-100 p-2 rounded'>
              <input
                type="email"
                name="email"
                value={data.email}
                required
                onChange={handleOnChange}
                id="email"
                placeholder='enter email...'
                className='w-full h-full outline-none bg-transparent' />
            </div>
          </div>


          <div className="w-full font-semibold">
            <label htmlFor="password">Password</label>
            <div className='bg-slate-100 p-2 rounded flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleOnChange}
                name="password"
                id="password"
                required
                placeholder='enter password...'
                className='w-full h-full outline-none bg-transparent' />

              <div className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                <span>
                  {
                    showPassword ? <FaEyeSlash /> : <FaEye />
                  }
                </span>
              </div>

            </div>
          </div>


          <button type="submit" className='bg-blue-600 hover:bg-blue-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4'>
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login;