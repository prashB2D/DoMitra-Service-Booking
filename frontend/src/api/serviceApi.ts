import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export interface Category {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  title: string;
  city: string;
  state: string;
  priceRange: string;
  categoryName: string;
  imageUrl: string;
}

export interface ServiceAnalytics {
  views: number;
  contactClicks: number;
}

export interface ServiceResponse {
  id: number;
  title: string;
  city: string;
  state: string;
  priceRange: string;
  categoryName: string;
  imageUrl: string;
  imageUrls?: string[];
  phone?: string;
}

export interface ServicesListResponse {
  content: Service[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: Send cookies with every request for session-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Session cookie is automatically sent with every request due to withCredentials: true
// No need for manual token handling

// Get all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Get services with optional filters
export const fetchServices = async (params?: {
  city?: string;
  category?: number;
  page?: number;
  size?: number;
}): Promise<ServicesListResponse> => {
  try {
    const response = await apiClient.get("/services", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Get a specific service by ID
export const fetchServiceById = async (id: number): Promise<ServiceResponse> => {
  try {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

// Get service analytics
export const fetchServiceAnalytics = async (
  id: number
): Promise<ServiceAnalytics> => {
  try {
    const response = await apiClient.get(`/services/${id}/analytics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

// Contact service provider (reveal phone number)
export const contactServiceProvider = async (id: number): Promise<void> => {
  try {
    await apiClient.post(`/services/${id}/contact`);
  } catch (error) {
    console.error("Error contacting provider:", error);
    throw error;
  }
};

// Create a new service
export const createService = async (formData: FormData): Promise<ServiceResponse> => {
  try {
    const response = await apiClient.post("/services", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// Get user's services
export const fetchUserServices = async (): Promise<Service[]> => {
  try {
    const response = await apiClient.get("/users/me/services");
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return response.data.content || [];
  } catch (error) {
    console.error("Error fetching user services:", error);
    throw error;
  }
};

export default apiClient;
