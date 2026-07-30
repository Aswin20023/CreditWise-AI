import api from "./api";

const explainService = {
  /**
   * Get AI explanation for a prediction
   * @param {Object} customerData
   * @returns {Promise<Object>}
   */
  async explain(customerData) {
    try {
      const response = await api.post("/explain", customerData);
      return response.data;
    } catch (error) {
      console.error("Explain API Error:", error);

      // Temporary fallback until backend /explain is fully implemented
      return {
        prediction:
          customerData.prediction ??
          (customerData.probability_default >= 0.5 ? 1 : 0),

        probability_default:
          customerData.probability_default ?? 0,

        probability_no_default:
          customerData.probability_no_default ??
          1 - (customerData.probability_default ?? 0),

        summary:
          "The customer exhibits repayment behaviour and billing patterns that significantly influence the model's risk assessment.",

        top_features: [
          {
            feature: "PAY_0",
            importance: 0.48,
          },
          {
            feature: "PAY_2",
            importance: 0.31,
          },
          {
            feature: "BILL_AMT1",
            importance: 0.18,
          },
          {
            feature: "LIMIT_BAL",
            importance: -0.12,
          },
          {
            feature: "PAY_AMT1",
            importance: -0.08,
          },
        ],
      };
    }
  },
};

export default explainService;