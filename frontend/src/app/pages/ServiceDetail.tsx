import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  MapPin,
  Phone,
  IndianRupee,
  ArrowLeft,
  Loader,
  Eye,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  fetchServiceById,
  fetchCategories,
  contactServiceProvider,
  fetchServiceAnalytics,
  Category,
  Service,
  ServiceAnalytics,
} from "../../api/serviceApi";

export function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [service, setService] = useState<any | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<ServiceAnalytics | null>(null);
  const [loadingReveal, setLoadingReveal] = useState(false);

  useEffect(() => {
    const loadServiceDetail = async () => {
      if (!id) return;

      setLoading(true);
      try {
        // Fetch service details
        const serviceData = await fetchServiceById(Number(id));
        setService(serviceData);

        // Fetch categories to find category name (optional, now in DTO)
        setCategory(null);

        // Fetch analytics
        const analyticsData = await fetchServiceAnalytics(Number(id));
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Error loading service details:", error);
        toast.error("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    loadServiceDetail();
  }, [id]);

  const handleRevealPhone = async () => {
    if (!isAuthenticated) {
      toast.info("Please login to reveal phone number");
      login();
      return;
    }

    setLoadingReveal(true);
    try {
      // Call the contact API endpoint
      if (id) {
        await contactServiceProvider(Number(id));
        setPhoneRevealed(true);
        toast.success("Phone number revealed!");
      }
    } catch (error) {
      console.error("Error revealing phone:", error);
      toast.error("Failed to reveal phone number");
    } finally {
      setLoadingReveal(false);
    }
  };

  const formatPhone = (phone: string | undefined) => {
    if (!phone) {
      return "Phone not available";
    }
    if (phoneRevealed) {
      return phone;
    }
    return phone.substring(0, 5) + "XXXXX";
  };

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

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Service not found</h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image section */}
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={service.imageUrls?.[0] || service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-blue-600 font-medium mb-2">
                {service.categoryName}
              </div>
              <h1 className="text-3xl font-bold mb-4">{service.title}</h1>

              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-5 w-5 mr-2" />
                {service.city}, {service.state}
              </div>

              <div className="flex items-center text-2xl font-semibold text-green-600">
                <IndianRupee className="h-6 w-6" />
                {service.priceRange}
              </div>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </Card>

            {/* Contact section */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold text-lg mb-4">Contact Provider</h3>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <span className="text-xl font-mono">
                    {formatPhone(service.phone)}
                  </span>
                </div>
              </div>

              {!phoneRevealed && (
                <Button
                  onClick={handleRevealPhone}
                  disabled={loadingReveal}
                  className="w-full"
                >
                  {loadingReveal ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Revealing...
                    </>
                  ) : (
                    <>
                      <Phone className="h-4 w-4 mr-2" />
                      Reveal Phone Number
                    </>
                  )}
                </Button>
              )}

              {phoneRevealed && (
                <div className="text-sm text-green-700 bg-green-50 p-3 rounded border border-green-200">
                  ✓ Phone number revealed. You can now contact the provider
                  directly.
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">📍</div>
            <div className="font-semibold mb-1">Location</div>
            <div className="text-gray-600 text-sm">
              {service.city}, {service.state}
            </div>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-semibold mb-1">Price Range</div>
            <div className="text-gray-600 text-sm">
              {service.priceRange}
            </div>
          </Card>

          <Card className="p-6 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div className="font-semibold mb-1">Views</div>
            <div className="text-gray-600 text-sm">
              {analytics?.views || service.views}
            </div>
          </Card>

          <Card className="p-6 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div className="font-semibold mb-1">Contacts</div>
            <div className="text-gray-600 text-sm">
              {analytics?.contactClicks || service.contacts}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
