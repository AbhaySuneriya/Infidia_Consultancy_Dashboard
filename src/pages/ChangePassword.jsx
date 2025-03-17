import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Retrieve email and OTP from sessionStorage
    const email = sessionStorage.getItem("userEmail");
    const otp = sessionStorage.getItem("userOtp");

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!email || !otp) {
            handleError("Session expired. Please request OTP again.");
            navigate("/verify-otp"); // Redirect to OTP page
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
            const response = await resetPassword({ email, otp, newPassword }); // Send 'newPassword' instead of 'password'
            handleSuccess(response.data.message || "Password changed successfully!");

            // Clear session storage after password reset
            sessionStorage.removeItem("userEmail");
            sessionStorage.removeItem("userOtp");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            handleError(error.response?.data?.message || "Failed to reset password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 text-center mb-4">Change Password</h2>
                <form onSubmit={handleChangePassword}>
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

                    <button type="submit" className="w-full h-12 bg-emerald-600 text-white rounded-md mt-4" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Change Password"}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ChangePassword;
