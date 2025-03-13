import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageLight from "../assets/img/login-office.png";
import ImageDark from "../assets/img/login-office-dark.png";
import { sendOtp } from "../api/authApi";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';
import { useRef } from "react";

const EmailVerification = () => {
  const inputRefs = useRef([])
  const navigate = useNavigate();

  const handleInput = (e, index) =>{
    if(e.target.value.length > 0 && index < inputRefs.current.length -1){
        inputRefs.current[index + 1].focus()
    }

  }

  const handleKeyDown = (e, index) =>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
        inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = () =>{
    const pasteText = navigator.clipboard.readText()
    const pasteArray = pasteText.split(' ')
    const pasteArrayLength = pasteArray.length
    const pasteArrayIndex = pasteArrayLength - 1
    inputRefs.current[pasteArrayIndex].focus()
    
  }

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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Email Verify OTP</h1>
            <p className="text-left text-gray-700 dark:text-gray-200 text-sm">Enter the 4-digit code sent to your email id</p>
              <form onSubmit={handleSubmit}>
    
             
               <div className="flex justify-between ">
                {Array(4).fill(0).map((_,index) =>(
                    <input type="text" maxLength='1' key={index} required className="w-12 h-12 text-black dark:text-white text-xl border   rounded-md text-center dark:border-white mt-4 " 
                    ref={e => inputRefs.current[index] = e}
                    onInput={(e) => handleInput(e, index)}
                    onkeydown={(e) => handleKeyDown(e, index)

                    } 
                    />
                   
                ))}
               </div>
                <button type="submit" className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4  cursor-pointer">
                  Verify OTP
                </button>
              </form>
              <p className="text-center mt-2 text-[#007A52] cursor-pointer">Resend OTP</p>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EmailVerification;
