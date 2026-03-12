import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const authClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: Send cookies with auth requests for session persistence
});

// Get OAuth2 authorization URL for Google
export const getGoogleAuthUrl = (redirectUrl?: string): string => {
  let url = `${API_BASE_URL}/oauth2/authorization/google`;
  
  // Add redirect URL as query parameter for backend
  if (redirectUrl) {
    sessionStorage.setItem("redirectAfterAuth", redirectUrl);
    url += `?redirect=${encodeURIComponent(redirectUrl)}`;
  }
  
  return url;
};

// Handle OAuth2 callback - session cookie is automatically set by backend
export const handleOAuth2Callback = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  const loginSuccess = params.get("login") === "success";
  
  if (loginSuccess) {
    // Clean up URL - remove login parameters
    window.history.replaceState({}, document.title, window.location.pathname);
    return true;
  }
  
  return false;
};

// Get current user from backend using session cookie
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // Session cookie is automatically sent due to withCredentials: true
    const response = await authClient.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

// Check if user is authenticated (session cookie exists)
export const isUserAuthenticated = (): boolean => {
  // For session-based auth, we check by attempting to fetch user
  // This is handled by AuthContext during initialization
  return true; // Optimistically true; getCurrentUser will validate
};

// Logout user
export const logout = (): void => {
  try {
    // Call backend logout endpoint
    authClient.post("/logout").catch(() => {
      // Continue even if logout fails
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export default authClient;
