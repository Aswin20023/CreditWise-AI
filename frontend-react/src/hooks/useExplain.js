import { useState, useCallback } from "react";
import explainService from "../services/explainService";

export default function useExplain() {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [error, setError] = useState(null);

  const getExplanation = useCallback(async (customerData) => {
    try {
      setLoading(true);
      setError(null);

      const data = await explainService.explain(customerData);

      setExplanation(data);

      return data;
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Failed to generate explanation."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearExplanation = useCallback(() => {
    setExplanation(null);
    setError(null);
  }, []);

  return {
    loading,
    explanation,
    error,
    getExplanation,
    clearExplanation,
  };
}