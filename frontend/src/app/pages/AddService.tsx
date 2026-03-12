import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card } from "../components/ui/card";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { ArrowLeft, Upload, Loader } from "lucide-react";
import { createService, Category } from "../../api/serviceApi";
import { useCategories } from "../hooks/useCategories";

const indianCities = [
  { city: "Hassan", state: "Karnataka" },
  { city: "Bangalore", state: "Karnataka" },
  { city: "Mysore", state: "Karnataka" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Delhi", state: "Delhi" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
  { city: "Jaipur", state: "Rajasthan" },
  { city: "Ahmedabad", state: "Gujarat" },
  { city: "Lucknow", state: "Uttar Pradesh" },
  { city: "Kochi", state: "Kerala" },
  { city: "Indore", state: "Madhya Pradesh" },
  { city: "Bhopal", state: "Madhya Pradesh" },
];

export function AddService() {
  const navigate = useNavigate();
  const { isAuthenticated, login, user } = useAuth();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceRange: "",
    city: "",
    state: "",
    categoryId: "",
    customCategoryName: "",
    phone: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      login("/add-service");
      return;
    }

    // Show error if categories failed to load
    if (categoriesError) {
      toast.error(categoriesError);
    }
  }, [isAuthenticated, login, categoriesError]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("File must be an image");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.priceRange ||
      !formData.city ||
      !formData.categoryId ||
      !formData.phone
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // If "Other" is selected, check for custom category name
    if (formData.categoryId === "other" && !formData.customCategoryName) {
      toast.error("Please enter a custom category name");
      return;
    }

    if (!imageFile) {
      toast.error("Please upload a service image");
      return;
    }

    setSubmitting(true);
    try {
      // Find numeric ID for "Other" category
      let categoryIdToSend = formData.categoryId;
      let customCategoryNameToSend = "";
      if (formData.categoryId === "other") {
        const otherCategory = categories.find(
          (cat) => cat.name.toLowerCase() === "other"
        );
        if (otherCategory) {
          categoryIdToSend = String(otherCategory.id);
          customCategoryNameToSend = formData.customCategoryName;
        } else {
          toast.error("'Other' category not found in database.");
          setSubmitting(false);
          return;
        }
      }

      // Create FormData for multipart submission
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priceRange", formData.priceRange);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("phone", formData.phone);
      data.append("categoryId", categoryIdToSend);
      if (user?.id) {
        data.append("userId", String(user.id));
      }
      if (customCategoryNameToSend) {
        data.append("customCategoryName", customCategoryNameToSend);
      }
      data.append("image", imageFile);

      // Submit to API
      await createService(data);

      toast.success("Service listed successfully!");
      setTimeout(() => {
        navigate("/my-services");
      }, 1000);
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLocationChange = (value: string) => {
    const [city, state] = value.split(", ");
    setFormData({ ...formData, city, state });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2">List Your Service</h1>
          <p className="text-gray-600 mb-8">
            Fill in the details to add your service to the marketplace
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">
                Service Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Expert Plumbing Repair"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your service in detail..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 min-h-32"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, categoryId: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {formData.categoryId === "other" && (
                <Input
                  placeholder="Enter custom category (e.g., Gaming, Photography, etc.)"
                  value={formData.customCategoryName}
                  onChange={(e) =>
                    setFormData({ ...formData, customCategoryName: e.target.value })
                  }
                  className="mt-2"
                />
              )}
            </div>

            {/* Price Range */}
            <div>
              <Label htmlFor="priceRange">
                Price Range (₹) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="priceRange"
                type="text"
                placeholder="e.g., 300-700"
                value={formData.priceRange}
                onChange={(e) =>
                  setFormData({ ...formData, priceRange: e.target.value })
                }
                className="mt-1"
                title="Enter price range in format: min-max (e.g., 300-700)"
              />
              <p className="text-sm text-gray-500 mt-1">Format: minimum-maximum (e.g., 300-700)</p>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.city ? `${formData.city}, ${formData.state}` : ""}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map((loc) => (
                    <SelectItem
                      key={`${loc.city}-${loc.state}`}
                      value={`${loc.city}, ${loc.state}`}
                    >
                      {loc.city}, {loc.state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">
                Service Image <span className="text-red-500">*</span>
              </Label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imagePreview ? (
                <div className="mt-1 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-300"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="mt-2"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block"
                >
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1"
                size="lg"
              >
                {submitting ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Listing...
                  </>
                ) : (
                  "List My Service"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                size="lg"
                disabled={submitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
