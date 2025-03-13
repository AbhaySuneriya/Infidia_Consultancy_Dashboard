import React from 'react'
import { Link } from 'react-router-dom'
import ImageLight from '../assets/img/login-office.png'
import ImageDark from '../assets/img/login-office-dark.png'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { loginAdmin } from '../api/authApi'
import { handleError, handleSuccess } from '../utils'
import { useState} from 'react'
const Login = () => {
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
    return (
        <>
            <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
                <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                aria-hidden="true"
                                className="object-cover w-full h-full dark:hidden"
                                src={ImageLight}
                                alt="Office"
                            />
                            <img
                                aria-hidden="true"
                                className="hidden object-cover w-full h-full dark:block"
                                src={ImageDark}
                                alt="Office"
                            />
                        </div>
                        <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                                    Login
                                </h1>
                                <form >
                                    
                                    <input
                                        required={true}                                     
                                        label="Email"
                                        name="email"
                                        type="email"
                                        autoComplete="username"
                                        placeholder="Email"
                                        className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2'
                                    />
                                   
                                    <div className="mt-6"></div>
                                    
                                    <input
                                        required={true}
                                      
                                        label="Password"
                                        name="password"
                                        type="password"
                                        autocomplete="current-password"
                                        placeholder="Password"
                                        className='border border-gray-300 rounded-md w-full h-12 px-3 mt-2'
                                    />
                                   
                                </form>

                                
                                <button className='w-full h-12 bg-emerald-600 text-white rounded-md mt-4 cursore-pointer'>
                                    submit
                                </button>
                                <div>
                                    

                                <p className='mt-4'>
                                    <Link
                                        className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                                        to="/forgetpassword"
                                    >

                                        Forget Password</Link> 
                                    </p>
                                    <p className='mt-1'>Don't have an Account?  <Link
                                        className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                                        to="/signup"
                                    >

                                        Sign UP</Link></p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
