import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import ImageLight from "../assets/img/login-office.png";
import ImageDark from "../assets/img/login-office-dark.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAdmin } from "../api/authApi";
import { quantum } from "ldrs";
import Loader from '../component/Loader'

quantum.register();

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({
      ...prev,
      [name]: name === "name" ? value : value.trim(),
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, mobile, password, confirmPassword } = signUpInfo;

    if (!name.trim() || !email || !mobile || !password || !confirmPassword) {
      toast.error("All fields are required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await registerAdmin({ name, email, mobile, password });

      setSignUpInfo({
        email: "",
        password: "",
        name: "",
        mobile: "",
        confirmPassword: "",
      });

      toast.success(response.data?.message || "Registration Successful", {
        onClose: () => {
          setIsSubmitting(false);
          setTimeout(() => navigate("/"), 50);
        },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src={ImageLight} alt="Office" />
            <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src={ImageDark} alt="Office" />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Create an Account</h1>
              <form onSubmit={handleSignUp}>
                <input onChange={handleChange} name="name" type="text" value={signUpInfo.name} placeholder="Name" className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2" />
                <input onChange={handleChange} name="email" type="email" value={signUpInfo.email} placeholder="Email" className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2" />
                <input onChange={handleChange} name="mobile" type="tel" value={signUpInfo.mobile} placeholder="Mobile" className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2" />

                {/* Password Input */}
                <div className="relative">
                  <input onChange={handleChange} name="password" type={showPassword ? "text" : "password"} value={signUpInfo.password} placeholder="Password" className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2" />
                  <button type="button" className="absolute right-3 top-5 mt-1 text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <input onChange={handleChange} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={signUpInfo.confirmPassword} placeholder="Confirm Password" className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2" />
                  <button type="button" className="absolute right-3 top-5 mt-1 text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    
                  </button>
                </div>

                {/* Loader instead of Button */}
                <div className="mt-4 w-full flex items-center justify-center">
                  {isSubmitting ? (
                   <Loader/>
                  ) : (
                    <button type="submit" className="w-full h-12 bg-emerald-600 text-white rounded-md flex items-center justify-center cursor-pointer">
                      Create Account
                    </button>
                  )}
                </div>
              </form>
              <p className="mt-9">
                Already have an account? <Link className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline" to="/">Login</Link>
              </p>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
