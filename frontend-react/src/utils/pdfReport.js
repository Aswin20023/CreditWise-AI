import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generatePDF(customer, prediction) {
  const doc = new jsPDF();

  const generatedOn = new Date().toLocaleString();

  // ===========================
  // Header
  // ===========================

  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("CreditWise AI", 15, 16);

  doc.setFontSize(11);
  doc.text("Professional Credit Risk Assessment Report", 15, 23);

  doc.setTextColor(0);

  // ===========================
  // Customer Information
  // ===========================

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Information", 14, 42);

  autoTable(doc, {
    startY: 48,
    theme: "grid",
    head: [["Field", "Value"]],
    body: [
      ["Credit Limit", `₹${Number(customer.LIMIT_BAL).toLocaleString("en-IN")}`],
      ["Age", customer.AGE],
      ["Education", customer.EDUCATION],
      ["Marriage", customer.MARRIAGE],
      ["Gender", customer.SEX],
    ],
  });

  // ===========================
  // Prediction Summary
  // ===========================

  const predictionY = doc.lastAutoTable.finalY + 12;

  doc.setFontSize(16);
  doc.text("Prediction Summary", 14, predictionY);

  autoTable(doc, {
    startY: predictionY + 6,
    theme: "striped",
    head: [["Metric", "Value"]],
    body: [
      [
        "Prediction",
        prediction.prediction === 1 ? "High Risk" : "Low Risk",
      ],
      [
        "Default Probability",
        `${Number(prediction.probability_default || 0).toFixed(2)} %`,
      ],
      [
        "No Default Probability",
        `${Number(prediction.probability_no_default || 0).toFixed(2)} %`,
      ],
    ],
  });

  // ===========================
  // AI Summary
  // ===========================

  const summaryY = doc.lastAutoTable.finalY + 12;

  doc.setFontSize(16);
  doc.text("AI Summary", 14, summaryY);

  doc.setFontSize(11);

  doc.text(
    prediction.summary ||
      "No AI summary available.",
    14,
    summaryY + 8,
    {
      maxWidth: 180,
    }
  );

  // ===========================
  // Feature Importance
  // ===========================

  const featureY = summaryY + 35;

  doc.setFontSize(16);
  doc.text("Top Contributing Features", 14, featureY);

  const features =
    prediction.top_features?.length > 0
      ? prediction.top_features.map((item) => [
          item.feature,
          item.impact,
        ])
      : [["Not Available", "-"]];

  autoTable(doc, {
    startY: featureY + 6,
    head: [["Feature", "Impact"]],
    body: features,
  });

  // ===========================
  // Recommendation
  // ===========================

  const recommendationY = doc.lastAutoTable.finalY + 14;

  doc.setFontSize(16);
  doc.text("Recommendation", 14, recommendationY);

  doc.setFontSize(11);

  let recommendation =
    "Approve with standard monitoring.";

  if (prediction.prediction === 1) {
    recommendation =
      "High risk detected. Manual verification and enhanced monitoring are recommended before approval.";
  }

  doc.text(
    recommendation,
    14,
    recommendationY + 8,
    {
      maxWidth: 180,
    }
  );

  // ===========================
  // Footer
  // ===========================

  doc.setDrawColor(180);
  doc.line(14, 285, 196, 285);

  doc.setFontSize(9);

  doc.text(
    `Generated: ${generatedOn}`,
    14,
    291
  );

  doc.text(
    "CreditWise AI v1.0",
    150,
    291
  );

  doc.save("CreditWise_AI_Report.pdf");
}