import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const registerAdmin = async (userData) => {
  console.log("Sending user data to server:", userData);
  try {
    const response = await axios.post(`${API_BASE_URL}/api/adminauth/admin-register`, userData);
    console.log("Server response:", response.data);
    return response;
  } catch (error) {
    console.error("Error from server:", error.response?.data || error);
    throw error;
  }
};

export const loginAdmin = async (credentials) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-login`, credentials, {
    headers: { "Content-Type": "application/json" }
  });
};

export const sendOtp = async (email) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-send-otp`, { email });
};

export const verifyOtp = async (otpData) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-verify-otp`, otpData);
};


export const resendForgotOtp = async (email) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-resend-forgot-password-otp`, { email });
};

export const forgotAdminPassword = async (email) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-forgot-password`, { email });
};

export const resetPassword = async (resetData) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-reset-password`, resetData);
};


export const requestAdminEmailVerification = async (email) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-email-verification`, { email });
};

export const resendAdminVerifyEmailOtp = async (email) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-verify-email`, { email });
};

export const verifyAdminEmail = async (otpData) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-verify-email`, otpData);
};
