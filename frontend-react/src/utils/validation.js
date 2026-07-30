export function validateForm(form) {
  const errors = {};

  // Credit Limit
  if (form.LIMIT_BAL <= 0) {
    errors.LIMIT_BAL = "Credit limit must be greater than 0.";
  }

  // Age
  if (form.AGE < 18 || form.AGE > 100) {
    errors.AGE = "Age must be between 18 and 100.";
  }

  // Bills
  for (let i = 1; i <= 6; i++) {
    if (form[`BILL_AMT${i}`] < 0) {
      errors[`BILL_AMT${i}`] = "Bill amount cannot be negative.";
    }
  }

  // Payments
  for (let i = 1; i <= 6; i++) {
    if (form[`PAY_AMT${i}`] < 0) {
      errors[`PAY_AMT${i}`] = "Payment amount cannot be negative.";
    }
  }

  // Repayment History
  const payFields = [
    "PAY_0",
    "PAY_2",
    "PAY_3",
    "PAY_4",
    "PAY_5",
    "PAY_6",
  ];

  payFields.forEach((field) => {
    if (form[field] < -2 || form[field] > 8) {
      errors[field] = "Value must be between -2 and 8.";
    }
  });

  return errors;
}