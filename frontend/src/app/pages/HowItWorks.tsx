import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import searchImage from "../../assets/36639f7ff80e4d1bc84c49cd7a7687790820e573.png";
import providerImage from "../../assets/18898c399e82367772489cd33ca8ebfcb08fdc85.png";
import contactImage from "../../assets/4a872fce689aa22af609c8792275708ae0070bba.png";

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How DoMitra Works</h1>
          <p className="text-xl text-gray-600">
            Connect with local service providers in three simple steps
          </p>
        </div>

        {/* For Service Seekers */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Looking for a Service?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <img
                  src={searchImage}
                  alt="Search services"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-2xl font-bold mb-2">1. Search</div>
              <p className="text-gray-600">
                Browse through categories or search for specific services in
                your city
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <img
                  src={providerImage}
                  alt="View provider details"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-2xl font-bold mb-2">2. View Details</div>
              <p className="text-gray-600">
                Check service details, pricing, and provider information
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-4">
                <img
                  src={contactImage}
                  alt="Contact provider"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-2xl font-bold mb-2">3. Connect</div>
              <p className="text-gray-600">
                Login to reveal phone numbers and contact providers directly
              </p>
            </Card>
          </div>
        </div>

        {/* For Service Providers */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Want to Offer Services?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👤</span>
              </div>
              <div className="text-2xl font-bold mb-2">1. Sign Up</div>
              <p className="text-gray-600">
                Create your account quickly with Google login
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">➕</span>
              </div>
              <div className="text-2xl font-bold mb-2">2. List Service</div>
              <p className="text-gray-600">
                Add your service details, pricing, and contact information
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <div className="text-2xl font-bold mb-2">3. Get Contacted</div>
              <p className="text-gray-600">
                Customers find your service and contact you directly
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of service providers and customers on DoMitra
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary">
                Find Services
              </Button>
            </Link>
            <Link to="/add-service">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
                List Your Service
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}