import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import ImageLight from "../assets/img/login-office.png";
import ImageDark from "../assets/img/login-office-dark.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAdmin } from "../api/authApi";

const SignUp = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, phone, password, confirmPassword } = signUpInfo;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required", { onClose: () => setIsSubmitting(false) });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", { onClose: () => setIsSubmitting(false) });
      return;
    }

    try {
      const response = await registerAdmin({ name, email, phone, password });
      setSignUpInfo({ email: "", password: "", name: "", phone: "", confirmPassword: "" });
      toast.success(response.data.message || "Registration Successful", {
        onClose: () => {
          setIsSubmitting(false);
          setTimeout(() => navigate("/"), 2000);
        },
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration Failed";
      toast.error(errorMessage, { onClose: () => setIsSubmitting(false) });
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
                <input onChange={handleChange} name="name" type="text" value={signUpInfo.name} placeholder="Name" className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2' />
                <input onChange={handleChange} name="email" type="email" value={signUpInfo.email} placeholder="Email" className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2' />
                <input onChange={handleChange} name="phone" type="text" value={signUpInfo.phone} placeholder="Phone" className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2' />
                <div className='relative'>
                  <input onChange={handleChange} name="password" type={showPassword ? "text" : "password"} value={signUpInfo.password} placeholder="Password" className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2' />
                  <button type="button" className="absolute right-3 top-4 text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className='relative'>
                  <input onChange={handleChange} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={signUpInfo.confirmPassword} placeholder="Confirm Password" className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2' />
                  <button type="button" className="absolute right-3 top-4 text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button type="submit" className={`w-full h-12 bg-emerald-600 text-white rounded-md mt-4 cursor-pointer ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>Create Account</button>
              </form>
              <p className='mt-1'>Already have an account? <Link className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline" to="/">Login</Link></p>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;