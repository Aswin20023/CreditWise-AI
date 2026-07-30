import { useEffect, useState } from "react";
import api from "../services/api";

export default function useHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    async function fetchHistory() {

        try {

            const response = await api.get("/history");

            setHistory(response.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    return {
        history,
        loading,
        refresh: fetchHistory,
    };

}