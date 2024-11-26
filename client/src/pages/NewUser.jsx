import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createUserSchema } from "../schemas/schema";
import { BACKEND_URL } from "../utils/base_api";
import LoadingPage from "../components/LoadingPage";


const NewUser = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleSignup = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/user/addNew`, values);
      toast.success(response.data.message);
      navigate("/")

    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }

  };


  const { values, handleChange, handleBlur, isSubmitting, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: null,
      userName: ""
    },
    validationSchema: createUserSchema,
    onSubmit: handleSignup
  })


  return loading ? <LoadingPage /> : (
    <div className='mx-auto container p-5 w-[100vw] flex flex-col items-center justify-center'>

      <h1 className="font-bold text-xl m-3">Register a New User!</h1>

      <div className='border border-gray-500 w-full py-2 mx-auto rounded p-3  '>

        <div className='w-20 h-20 mx-auto rounded-full mt-4 mb-2 relative flex justify-center overflow-hidden'>
          <div>
            <img src={"/avatar.png"} alt="img" className='mix-blend bg-slate-200-multiply border border-black rounded-full' />
          </div>
        </div>


        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>

          <div className="flex flex-col md:flex-row items-center justify-center md:gap-4">

            <div className="w-full">
              <label>Username</label>
              <div className='bg-slate-100  rounded'>
                <input
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  id=""
                  placeholder='enter username...'
                  className={`w-full h-full outline-none bg-transparent p-2 rounded-md ${errors.userName && touched.userName ? "border border-red-600 focus:border-red-600" : "focus:border-gray-500 border-2"
                    } border transition`} />
              </div>
              <span className="text-red-500 text-xs">{errors.userName}</span>
            </div>

            <div className="w-full">
              <label>Email</label>
              <div className='bg-slate-100  rounded'>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  id=""
                  placeholder='enter email...'
                  className={`w-full h-full outline-none bg-transparent p-2 rounded-md ${errors.email && touched.email ? "border-red-600 focus:border-red-600" : "focus:border-gray-500 border-2"
                    } border transition`} />
              </div>
              <span className="text-red-500 text-xs">{errors.email}</span>
            </div>

          </div>


          <div className="flex flex-col md:flex-row items-center md:gap-4">

            <div className="w-full">
              <label>Phone</label>
              <div className='bg-slate-100 rounded'>
                <input
                  type="number"
                  name="phone"
                  value={values.phone}
                  onBlur={handleBlur}
                  required
                  onChange={handleChange}
                  id=""
                  placeholder='enter phone no...'
                  className={`w-full h-full outline-none bg-transparent p-2 rounded-md ${errors.phone && touched.phone ? "border-red-600 focus:border-red-600" : "focus:border-gray-500 border-2"
                    } border transition`} />
              </div>
              <span className="text-red-500 text-xs">{errors.phone}</span>
            </div>


            <div className="w-full">
              <label >Password</label>
              <div className={`bg-slate-100 rounded flex items-center ${errors.phone && touched.phone ? "border-red-600 focus:border-red-600" : "focus:border-gray-500 border-2"
                } border transition`} >
                <input
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  id=""
                  onBlur={handleBlur}
                  required
                  placeholder='enter password...'
                  className={`w-full h-full outline-none bg-transparent p-2 rounded-md `} />

                <div className='cursor-pointer flex items-center' onClick={() => setShowPassword((prev) => !prev)}>
                  <span className="mr-2">
                    {
                      showPassword ? <FaEyeSlash /> : <FaEye />
                    }
                  </span>
                </div>

              </div>
              <span className="text-red-500 text-xs">{errors.password}</span>
            </div>

          </div>


          <div className="w-full" >
            <label >Confirm Password</label>
            <div className={`bg-slate-100 rounded flex items-center ${errors.phone && touched.phone ? "border-red-600 focus:border-red-600" : "focus:border-gray-500 border-2"
              } border transition`} >
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                id=""
                onBlur={handleBlur}
                required
                placeholder='confirm password...'
                className={`w-full h-full outline-none bg-transparent p-2 rounded-md`} />

              <div className='cursor-pointer flex items-center' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                <span className="mr-2">
                  {
                    showConfirmPassword ? <FaEyeSlash /> : <FaEye />
                  }
                </span>
              </div>

            </div>
            <span className="text-red-500 text-xs">{errors.confirmPassword}</span>
          </div>

          <button disabled={isSubmitting} type="submit" className='bg-green-600 hover:bg-green-700 w-full max-w-[150px] rounded text-white p-2 px-6 hover:scale-105 transition-all mt-4'>
            Create
          </button>

        </form>

      </div>

    </div>
  )
}

export default NewUser;