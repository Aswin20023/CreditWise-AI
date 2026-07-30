import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function exportAnalyticsPDF(history = []) {

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("CreditWise AI Analytics Report", 14, 20);

    doc.setFontSize(11);

    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        30
    );

    const rows = history.map((item) => [

        item.id,
        item.age,
        `${(item.probability_default * 100).toFixed(1)}%`,
        item.probability_default >= 0.7
            ? "High"
            : item.probability_default >= 0.4
            ? "Medium"
            : "Low",

    ]);

    autoTable(doc, {

        startY: 40,

        head: [[
            "Prediction ID",
            "Age",
            "Probability",
            "Risk"
        ]],

        body: rows,

    });

    doc.save("CreditWise-Analytics.pdf");

}