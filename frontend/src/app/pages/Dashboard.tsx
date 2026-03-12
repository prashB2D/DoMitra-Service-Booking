import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { SearchBar } from "../components/SearchBar";
import { ServiceCard } from "../components/ServiceCard";
import { Button } from "../components/ui/button";
import { User, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logoImage from "../../assets/99ac8648d1d549a25c80986d34fdd6f54a1c5f31.png";
import {
  fetchServices,
  fetchCategories,
  Service,
  Category,
} from "../../api/serviceApi";
import { toast } from "sonner";

export function Dashboard() {
  const { isAuthenticated } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
        toast.error("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  // Load services based on filters
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const params: any = {
          page: currentPage,
          size: 20,
        };

        if (selectedCategory) {
          params.category = selectedCategory;
        }

        if (searchLocation) {
          params.city = searchLocation.split(",")[0].trim();
        }

        const response = await fetchServices(params);
        setServices(response.content || []);
      } catch (error) {
        console.error("Error loading services:", error);
        toast.error("Failed to load services");
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [selectedCategory, searchLocation, currentPage]);

  // Filter services by search query (local filtering for title)
  const filteredServices = services.filter((service) => {
    if (!searchQuery) return true;

    return (
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    setSelectedCategory(null);
    setCurrentPage(0);
  };

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    setSearchLocation("");
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="DoMitra" className="h-10" />
            </Link>

            <div className="flex-1 max-w-3xl mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/add-service">
                    <Button variant="outline" size="sm">
                      Add Service
                    </Button>
                  </Link>
                  <Link to="/my-services">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category buttons */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => handleCategoryClick(null)}
          >
            All Services
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Service grid */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-1">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : searchLocation
              ? `Services in ${searchLocation}`
              : "All Services"}
          </h2>
          <p className="text-gray-600">
            {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">
              No services found. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
