import { Link } from "react-router";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import { Eye, Phone, Plus, MapPin, Loader } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  fetchUserServices,
  fetchServiceAnalytics,
  Service,
  ServiceAnalytics,
} from "../../api/serviceApi";
import { toast } from "sonner";

interface ServiceWithAnalytics extends Service {
  analytics?: ServiceAnalytics;
}

export function MyServices() {
  const { isAuthenticated, login } = useAuth();
  const [userServices, setUserServices] = useState<ServiceWithAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      login("/my-services");
      return;
    }

    const loadUserServices = async () => {
      setLoading(true);
      try {
        const services = await fetchUserServices();

        // Fetch analytics for each service
        const servicesWithAnalytics = await Promise.all(
          services.map(async (service) => {
            try {
              const analytics = await fetchServiceAnalytics(service.id);
              return { ...service, analytics };
            } catch (error) {
              console.error(
                `Failed to load analytics for service ${service.id}:`,
                error
              );
              return service;
            }
          })
        );

        setUserServices(servicesWithAnalytics);
      } catch (error) {
        console.error("Error loading user services:", error);
        toast.error("Failed to load your services");
        setUserServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserServices();
  }, [isAuthenticated, login]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <Loader className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Services</h1>
            <p className="text-gray-600">
              Manage and track your service listings
            </p>
          </div>

          <Link to="/add-service">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </Link>
        </div>

        {userServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userServices.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2 line-clamp-1">
                    {service.title}
                  </h3>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {service.city}, {service.state}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Views</span>
                      </div>
                      <span className="font-semibold">
                        {service.analytics?.views || service.views}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-green-50 p-3 rounded">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">Contacts</span>
                      </div>
                      <span className="font-semibold">
                        {service.analytics?.contactClicks || service.contacts}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/service/${service.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View
                      </Button>
                    </Link>
                    <Button variant="ghost" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">
                No services listed yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by adding your first service to the marketplace
              </p>
              <Link to="/add-service">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Service
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
