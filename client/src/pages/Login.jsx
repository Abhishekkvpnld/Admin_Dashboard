import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { BACKEND_URL } from "../utils/base_api";
import { userDataContext } from "../context/UserContext";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/schema";


const Login = () => {

  const navigate = useNavigate();
  const { userData, setUserData } = useContext(userDataContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {

    const res = await axios.post(`${BACKEND_URL}/admin/login`, values, { withCredentials: true });
    if (res?.data?.success) {
      navigate("/");
      setUserData(userData);
      toast.success(res?.data?.message)
    } else {
      console.log(res.error.data.message)
    }

  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin
  })


  return (
    <div className='mx-auto container p-5 md:w-[50vw] h-[100vh] flex items-center justify-center'>

      <div className='border border-gray-300 w-full py-2 mx-auto rounded p-3  shadow-lg'>

        <div className="font-bold m-4 text-center ">
          <h1 className="flex items-center gap-3">Welcome Back! Login to Your Account <IoMdLogIn size={30} /></h1>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>

          <div className="w-full font-semibold">
            <label htmlFor="email" className="text-slate-500">Email</label>
            <div className='bg-slate-100  rounded'>
              <input
                type="email"
                name="email"
                value={values.email}
                required
                onBlur={handleBlur}
                onChange={handleChange}
                id="email"
                placeholder='enter email...'
                className={`w-full h-full outline-none bg-transparent p-2 rounded-md ${errors.email && touched.email ? "border-red-600 focus:border-red-600" : "focus:border-gray-500 border-2"
                  } border transition`} />
            </div>
            <span className="text-red-500 text-xs">{errors.email}</span>
          </div>


          <div className="w-full font-semibold">
            <label className="text-slate-500" htmlFor="password">Password</label>
            <div className={`bg-slate-100  rounded flex items-center ${errors.password ? "border border-red-600" : "border-gray-500 border-2"}`}>
              <input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                id="password"
                required
                placeholder='enter password...'
                className={`w-full h-full outline-none p-2 rounded-md bg-transparent }`} />

              <div className='cursor-pointer mr-2' onClick={() => setShowPassword((prev) => !prev)}>
                <span>
                  {
                    showPassword ? <FaEyeSlash /> : <FaEye />
                  }
                </span>
              </div>

            </div>
            <span className="text-red-500 text-xs">{errors.password}</span>
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