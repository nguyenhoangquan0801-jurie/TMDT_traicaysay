const API_URL = "http://localhost:8080/api/auth";

// ==========================
// LOGIN
// ==========================

export const login = async (data) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

// ==========================
// REGISTER
// ==========================

export const register = async (data) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

// ==========================
// FORGOT PASSWORD
// ==========================

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return response.json();
};

// ==========================
// VERIFY OTP
// ==========================

export const verifyOTP = async (data) => {
  const response = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

// ==========================
// RESET PASSWORD
// ==========================

export const resetPassword = async (data) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

// ==========================
// PROFILE
// ==========================

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};