import { useState } from "react";
import { batchPredict } from "../services/batchApi";

export default function useBatchPrediction() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function predict() {
    if (!file) return;

    try {
      setLoading(true);

      const response = await batchPredict(file);

      setResults(response.results);
    } catch (error) {
      console.error(error);
      alert("Batch prediction failed.");
    } finally {
      setLoading(false);
    }
  }

  return {
    file,
    setFile,
    results,
    loading,
    predict,
  };
}