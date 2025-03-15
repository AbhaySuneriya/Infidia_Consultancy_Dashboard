import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../api/authApi";
import ImageLight from "../assets/img/login-office.png";
import ImageDark from "../assets/img/login-office-dark.png";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer, toast } from 'react-toastify';

const EmailOtpVerification = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isSendDisabled, setIsSendDisabled] = useState(false); // Disable send OTP button

    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (isOtpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [isOtpSent, timer]);

    const handleSendOtp = async () => {
        try {
            setIsSendDisabled(true); // Disable button while sending OTP
            await sendOtp(email);
            setIsOtpSent(true);
            handleSuccess("OTP sent to your registered email");
            localStorage.setItem("userEmail", email); // Store email in local storage

            setTimer(30);
            setIsResendDisabled(true);

            // Enable button after toast disappears
            toast.onChange((payload) => {
                if (payload.status === "removed") {
                    setIsSendDisabled(false);
                }
            });

        } catch (error) {
            handleError("Failed to send OTP");
            setIsSendDisabled(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtp({ email, otp });
            handleSuccess(response.data.message || "OTP verified successfully.");
            
            setTimeout(() => {
                navigate("/changePassword"); // Redirect after successful verification
            }, 2000); // Delay for better user experience

        } catch (error) {
            handleError("Invalid OTP. Please try again.");
        }
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
                            {!isOtpSent ? (
                                <>
                                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Forgot password</h1>
                                    <input
                                        type="email"
                                        placeholder="john@doe.com"
                                        className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button
                                        className={`w-full h-12 bg-emerald-600 text-white rounded-md mt-4 ${
                                            isSendDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                        }`}
                                        onClick={handleSendOtp}
                                        disabled={isSendDisabled}
                                    >
                                        Send OTP
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Verify OTP</h1>
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button
                                        className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4 cursor-pointer"
                                        onClick={handleVerifyOtp}
                                    >
                                        Verify OTP
                                    </button>
                                    <button
                                        className={`w-full py-2 mt-2 rounded ${
                                            isResendDisabled ? "bg-transparent cursor-not-allowed" : "bg-transparent hover:text-emerald-800 text-emerald-600"
                                        }`}
                                        onClick={handleSendOtp}
                                        disabled={isResendDisabled}
                                    >
                                        Resend OTP? {isResendDisabled && `(${timer}s)`}
                                    </button>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EmailOtpVerification;
