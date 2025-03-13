import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const registerAdmin = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-register`, userData);
};

export const loginAdmin = async (credentials) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-login`, credentials);
};

export const sendOtp = async (email) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-send-otp`, { email });
};
 
export const verifyOtp = async (otpData) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-verify-otp`, otpData);
};

export const resetPassword = async (resetData) => {
  return axios.post(`${API_BASE_URL}/api/adminauth/admin-reset-password`, resetData);
};
