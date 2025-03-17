import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forgotAdminPassword, resetPassword } from "../api/authApi";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer, toast } from "react-toastify";
import { quantum } from "ldrs"; 
import { Loader } from "lucide-react";

quantum.register(); // Register the loader

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isSendDisabled, setIsSendDisabled] = useState(false);

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

    // Handle Sending OTP
    const handleSendOtp = async () => {
        if (!email) {
            handleError("Please enter your email.");
            return;
        }

        try {
            setIsSendDisabled(true);
            console.log("Sending request to forgotAdminPassword API with email:", email);
            const response = await forgotAdminPassword(email);
            console.log("Response received from forgotAdminPassword API:", response.data);

            setIsOtpSent(true);
            handleSuccess("OTP sent to your registered email.");

            sessionStorage.setItem("userEmail", email);

            setTimer(30);
            setIsResendDisabled(true);

            toast.onChange((payload) => {
                if (payload.status === "removed") {
                    setIsSendDisabled(false);
                }
            });

        } catch (error) {
            console.error("Error response from forgotAdminPassword API:", error.response?.data || error);
            handleError(error.response?.data?.message || "Failed to send OTP.");
            setIsSendDisabled(false);
        }
    };

    // Handle OTP Verification and Password Reset
    const handleResetPassword = async () => {
        if (!otp) {
            handleError("Please enter the OTP.");
            return;
        }
        if (!newPassword || !confirmPassword) {
            handleError("All fields are required.");
            return;
        }
        if (newPassword !== confirmPassword) {
            handleError("Passwords do not match.");
            return;
        }

        try {
            setIsSubmitting(true);
            console.log("Resetting Password:", { email, otp, newPassword });

            const response = await resetPassword({ email, otp, newPassword });

            console.log("Response received from resetPassword API:", response.data);
            handleSuccess(response.data.message || "Password changed successfully!");

            sessionStorage.removeItem("userEmail");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error response:", error.response?.data || error);
            handleError(error.response?.data?.message || "Failed to reset password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 p-6">
                {!isOtpSent ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-4">Forgot Password</h2>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {isSendDisabled ? (
                            <div className="flex justify-center mt-4">
                               <Loader/>
                            </div>
                        ) : (
                            <button
                                className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4"
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </button>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-4">Reset Password</h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="border border-gray-300 rounded-md w-full h-12 px-3 mt-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {isSubmitting ? (
                            <div className="flex justify-center mt-4">
                               <Loader/>
                            </div>
                        ) : (
                            <button
                                className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4"
                                onClick={handleResetPassword}
                            >
                                Change Password
                            </button>
                        )}

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
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
