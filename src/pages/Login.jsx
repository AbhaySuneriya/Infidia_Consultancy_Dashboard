import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';  // Import Lucide icons
import ImageLight from '../assets/img/login-office.png';
import ImageDark from '../assets/img/login-office-dark.png';
import useAuthStore from '../store/authStore';
import { loginAdmin } from '../api/authApi';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);  // New state for password visibility

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        try {
            const response = await loginAdmin({ email, password });
            login(response.data.user, response.data.token);
            handleSuccess("Login Successful");
            navigate('/home');
        } catch (error) {
            if (error.response?.status === 401) {
                handleError("Invalid email or password");
            } else {
                handleError("Login Failed");
            }

            setLoginInfo({
                email: '',
                password: ''
            });
        }
    };

    return (
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
                            <form onSubmit={handleLogin}>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    autoComplete="username"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    value={loginInfo.email}
                                    className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                                />

                                <div className="relative mt-6">
                                    <input
                                        required
                                        name="password"
                                        type={showPassword ? "text" : "password"} // Toggle between text & password
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={loginInfo.password}
                                        className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2 pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute mt-1.5 right-3 top-4 text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                <button type="submit" className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4 cursor-pointer">
                                    Login
                                </button>
                            </form>

                            <div>
                                <p className="mt-4">
                                    <Link className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline" to="/forgetPassword">
                                        Forgot Password?
                                    </Link>
                                </p>
                                <p className="mt-1">
                                    Don't have an account?  
                                    <Link className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline" to="/signup">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
