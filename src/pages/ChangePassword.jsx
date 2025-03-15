import React, { useState, useEffect } from "react";

 // Ensure correct path
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../api/authApi";

const ChangePasswordWithEmail = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Retrieve email from local storage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      toast.error("No email found. Please verify your email first.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError("Email is missing. Please verify your email first.");
      toast.error("Email is missing. Please verify your email first.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword( {
        email,
        newPassword,
      }, {
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.status === 200) {
        setSuccess("Password changed successfully");
        toast.success("Password changed successfully");
        localStorage.removeItem("userEmail"); // Clear stored email after reset
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "An error occurred");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 w-full">
            <div className="w-full max-w-md">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Change Password
              </h1>
              <p className="text-center mb-3 font-bold">{localStorage.getItem("userEmail")}</p>
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChangePasswordWithEmail;
