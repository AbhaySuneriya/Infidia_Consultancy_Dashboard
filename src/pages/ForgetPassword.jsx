import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageLight from "../assets/img/login-office.png";
import ImageDark from "../assets/img/login-office-dark.png";
import { sendOtp } from "../api/authApi";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      
     handleError("Please fill the email")
    }
    try {
        const response =  await sendOtp({ email });
        if (response.status === 200) {
            navigate('/login')
            handleSuccess("email sent Succesfully!")
        }


    } catch (error) {
        
        handleError("Error...")
    }
    setEmail('');

    // Navigate to OTP page and pass email in state

  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" className="object-cover w-full h-full dark:hidden" src={ImageLight} alt="Office" />
            <img aria-hidden="true" className="hidden object-cover w-full h-full dark:block" src={ImageDark} alt="Office" />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Forgot password</h1>

              <form onSubmit={handleSubmit}>
             
                <input
                  required
                  name="verifyEmail"
                  type="email"
                  placeholder="john@doe.com"
                  className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4">
                  Recover password
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ForgetPassword;
