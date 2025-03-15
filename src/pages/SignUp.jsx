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
      [name]: name === "name" ? value : value.trim(), // Trim spaces except for name
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, mobile, password, confirmPassword } = signUpInfo;

    // Trim input and check if any field is empty
    if (!name.trim() || !email || !mobile || !password || !confirmPassword) {
      toast.error("All fields are required");
      setIsSubmitting(false);
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      setIsSubmitting(false);
      return;
    }

    // Mobile Number Validation (10 digits, starts with 6-9)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number.");
      setIsSubmitting(false);
      return;
    }

    // Password Strength Validation (Min 8 characters, 1 letter, 1 number)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and contain letters and numbers.");
      setIsSubmitting(false);
      return;
    }

    // Confirm Password Check
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Sending data to server:", { name, email, mobile, password });
      const response = await registerAdmin({ name, email, mobile, password });

      // Reset Form
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
          setTimeout(() => navigate("/"), 2000);
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      const errorMessage = error.response?.data?.message || error.message || "Registration Failed";
      toast.error(errorMessage);
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
                    {/* {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />} */}
                  </button>
                </div>

                {/* Submit Button with Loader */}
                <button type="submit" className={`w-full cursor-pointer h-12 bg-emerald-600 text-white rounded-md mt-4 flex items-center justify-center ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : "Create Account"}
                </button>
              </form>
              <p className="mt-1">
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
