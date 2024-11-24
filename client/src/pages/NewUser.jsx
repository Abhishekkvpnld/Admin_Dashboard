import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";


const NewUser = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: null
  });

  const userData = useContext(userDataContext);


  const handleSignup = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      try {
        const response = await axios.post("", data);

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login")
        };

        if (response.data.error) {
          console.log('error', response.data.message);
          toast.error(response.data.message);
        };

      } catch (error) {
        toast.error(error.response.data.message);
      };

    } else {
      toast.error("Please check the password and confirm passwor");
    };

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

  if (!userData?._id) {
    return <Navigate to={"/login"} />
  }


  return (
    <div className='mx-auto container p-5 w-[100vw] flex flex-col items-center justify-center'>

      <h1 className="font-bold m-3">Register a New User!</h1>

      <div className='border border-gray-500 w-full py-2 mx-auto rounded p-3  '>

        <div className='w-20 h-20 mx-auto rounded-full mt-4 mb-2 relative flex justify-center overflow-hidden'>

          <div>
            <img src={"/avatar.png"} alt="img" className='mix-blend bg-slate-200-multiply border border-black rounded-full' />
          </div>

        </div>


        <form onSubmit={handleSignup} className='flex flex-col gap-2'>

          <div className="flex flex-col md:flex-row items-center justify-center md:gap-4">
            <div className="w-full">
              <label>Username</label>
              <div className='bg-slate-100 p-2 rounded'>
                <input
                  type="text"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  required
                  id=""
                  placeholder='enter username...'
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div className="w-full">
              <label>Email</label>
              <div className='bg-slate-100 p-2 rounded'>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  required
                  onChange={handleOnChange}
                  id=""
                  placeholder='enter email...'
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:gap-4">
            <div className="w-full">
              <label>Phone</label>
              <div className='bg-slate-100 p-2 rounded'>
                <input
                  type="number"
                  name="phone"
                  value={data.phone}
                  required
                  onChange={handleOnChange}
                  id=""
                  placeholder='enter phone no...'
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>


            <div className="w-full">
              <label >Password</label>
              <div className='bg-slate-100 p-2 rounded flex items-center'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleOnChange}
                  name="password"
                  id=""
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

          </div>

          <div className="w-full" >
            <label >Confirm Password</label>
            <div className='bg-slate-100 p-2 rounded flex items-center'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword}
                onChange={handleOnChange}
                name="confirmPassword"
                id=""
                required
                placeholder='confirm password...'
                className='w-full h-full outline-none bg-transparent' />

              <div className='cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                <span>
                  {
                    showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                  }
                </span>
              </div>

            </div>

          </div>

          <button className='bg-green-600 hover:bg-green-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4'>
            Create
          </button>


        </form>

      </div>

    </div>
  )
}

export default NewUser;