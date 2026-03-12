import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * Custom hook to handle redirects after OAuth2 authentication.
 * Call this in your root layout or main component.
 * 
 * Usage:
 * function RootLayout() {
 *   useAuthRedirect();
 *   return <Outlet />;
 * }
 */
export function useAuthRedirect() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // Check if this is an OAuth callback
    const params = new URLSearchParams(window.location.search);
    const wasOAuthCallback = params.get("login") === "success";

    if (wasOAuthCallback && isAuthenticated) {
      // User just logged in via OAuth
      const redirectUrl = sessionStorage.getItem("redirectAfterAuth");
      
      if (redirectUrl) {
        // Clear the redirect URL
        sessionStorage.removeItem("redirectAfterAuth");
        // Navigate to the intended page
        navigate(redirectUrl, { replace: true });
      } else {
        // Default redirect
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, loading, navigate]);
}
