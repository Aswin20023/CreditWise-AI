import { useState } from "react";
import api from "../services/api";

export default function usePrediction() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const predict = async (payload) => {
        setLoading(true);

        try {
            console.log("========== API REQUEST ==========");
            console.log("URL:", api.defaults.baseURL + "/predict");
            console.log("Payload:", payload);

            const response = await api.post("/predict", payload);

            console.log("========== API RESPONSE ==========");
            console.log(response);

            setResult(response.data);

            return response.data;

        } catch (error) {

            console.error("========== API ERROR ==========");
            console.error(error);

            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
                console.error("Data:", error.response.data);

                alert(
                    `Server Error (${error.response.status})\n\n${JSON.stringify(
                        error.response.data,
                        null,
                        2
                    )}`
                );

            } else if (error.request) {

                console.error("No response received.");
                console.error(error.request);

                alert(
                    "Network Error\n\nThe request reached the browser but no response was received from the API."
                );

            } else {

                console.error("Request setup error:", error.message);

                alert(error.message);
            }

        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        result,
        predict,
    };
}