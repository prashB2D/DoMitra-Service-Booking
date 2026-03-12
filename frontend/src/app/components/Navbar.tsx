import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";
import logoImage from "../../assets/99ac8648d1d549a25c80986d34fdd6f54a1c5f31.png";

export function Navbar() {
  const { isAuthenticated, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login("/dashboard");
  };

  const handleAddService = () => {
    if (isAuthenticated) {
      // Already logged in, go directly to add service page
      navigate("/add-service");
    } else {
      // Not logged in, redirect to OAuth with redirect URL
      login("/add-service");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="DoMitra" className="h-10" />
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              How It Works
            </Link>

            {/* Add Service button - visible to all users */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAddService}
            >
              Add Service
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/my-services">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-1" />
                    My Services
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={handleLogin}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
