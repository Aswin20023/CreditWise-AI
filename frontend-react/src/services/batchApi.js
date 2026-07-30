import api from "./api";

/**
 * Upload CSV file for batch prediction
 */
export async function batchPredict(file) {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post("/batch/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}