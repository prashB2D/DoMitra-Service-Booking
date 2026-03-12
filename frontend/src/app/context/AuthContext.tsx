import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
  getGoogleAuthUrl,
  getCurrentUser,
  logout as logoutUser,
  handleOAuth2Callback,
} from "../../api/authApi";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (redirectUrl?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount and handle OAuth callback
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        // Check if this is OAuth2 callback
        const wasOAuthCallback = handleOAuth2Callback();
        
        // Always try to fetch current user (session cookie will be sent automatically)
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          console.log("✅ User authenticated:", currentUser.email);
          
          // If OAuth callback, a redirect will be handled by useAuthRedirect hook
        } else {
          setUser(null);
          if (wasOAuthCallback) {
            console.warn("OAuth callback detected but user fetch failed");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (redirectUrl?: string) => {
    // Redirect to OAuth2 authorization endpoint
    window.location.href = getGoogleAuthUrl(redirectUrl);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
