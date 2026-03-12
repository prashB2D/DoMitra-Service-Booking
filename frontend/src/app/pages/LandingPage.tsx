import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import heroImage from "../../assets/1a96c2101b7557fc6e98ae4b0f175e61a1d65e5d.png";
import searchImage from "../../assets/36639f7ff80e4d1bc84c49cd7a7687790820e573.png";
import providerImage from "../../assets/18898c399e82367772489cd33ca8ebfcb08fdc85.png";
import contactImage from "../../assets/4a872fce689aa22af609c8792275708ae0070bba.png";

export function LandingPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleFindServices = () => {
    navigate("/dashboard");
  };

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Find Trusted Local Services Near You
            </h1>
            <p className="text-xl text-gray-600">
              Search plumbers, electricians, painters and more in your city.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex gap-4 pt-4"
            >
              <Button
                size="lg"
                onClick={handleFindServices}
                className="text-lg px-8"
              >
                Find Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleLogin}
                className="text-lg px-8"
              >
                Login
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Hero illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <img
              src={heroImage}
              alt="Service providers working together"
              className="w-full max-w-lg"
            />
          </motion.div>
        </div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src={searchImage} alt="Search easily" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Search Easily</h3>
            <p className="text-gray-600">
              Find service providers by category and location
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src={providerImage} alt="Trusted providers" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trusted Providers</h3>
            <p className="text-gray-600">
              Connect with verified local service professionals
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src={contactImage} alt="Direct contact" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
            <p className="text-gray-600">
              Get phone numbers and contact providers instantly
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}