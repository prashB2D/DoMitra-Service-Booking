import { useState, useEffect } from "react";
import { Category } from "../../api/serviceApi";
import axios from "axios";
import { API_BASE_URL } from "../../api/apiConfig";

export interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch categories from the backend
 * 
 * Usage:
 * const { categories, loading, error } = useCategories();
 * 
 * @returns Object with categories array, loading state, and error
 */
export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const client = axios.create({
          baseURL: API_BASE_URL,
          withCredentials: true,
        });

        const response = await client.get<Category[]>("/categories");
        setCategories(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load categories";
        setError(errorMessage);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
