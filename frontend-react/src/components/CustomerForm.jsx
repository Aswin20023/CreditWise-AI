import { useState, useMemo } from "react";
import {
  User,
  CreditCard,
  Receipt,
  Wallet,
  Sparkles,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { validateForm } from "../utils/validation";

const DEFAULT_FORM = {
  LIMIT_BAL: 20000,
  AGE: 24,
  SEX: 1,
  EDUCATION: 2,
  MARRIAGE: 2,

  PAY_0: 0,
  PAY_2: 0,
  PAY_3: 0,
  PAY_4: 0,
  PAY_5: 0,
  PAY_6: 0,

  BILL_AMT1: 0,
  BILL_AMT2: 0,
  BILL_AMT3: 0,
  BILL_AMT4: 0,
  BILL_AMT5: 0,
  BILL_AMT6: 0,

  PAY_AMT1: 0,
  PAY_AMT2: 0,
  PAY_AMT3: 0,
  PAY_AMT4: 0,
  PAY_AMT5: 0,
  PAY_AMT6: 0,
};

export default function CustomerForm({
  formData = DEFAULT_FORM,
  setFormData,
  onSubmit,
  loading,
}) {
  const [errors, setErrors] = useState({});

  const isFormValid = useMemo(
    () => Object.keys(validateForm(formData)).length === 0,
    [formData]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: Number(value),
    };

    setFormData(updatedData);
    setErrors(validateForm(updatedData));
  };

  const resetForm = () => {
    setFormData(DEFAULT_FORM);
    setErrors({});
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit();
  };

  const Input = ({
    name,
    label,
    prefix = "",
    placeholder = "0",
  }) => (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
            {prefix}
          </span>
        )}

        <input
          type="number"
          name={name}
          value={formData[name]}
          placeholder={placeholder}
          onChange={handleChange}
          className={`h-14 w-full rounded-2xl border bg-white transition-all duration-200 outline-none ${
            errors[name]
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          } ${prefix ? "pl-9 pr-4" : "px-4"}`}
        />
      </div>

      {errors[name] && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const Select = ({
    name,
    label,
    options,
  }) => (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`h-14 w-full rounded-2xl border bg-white px-4 transition-all duration-200 outline-none ${
          errors[name]
            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        }`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {errors[name] && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const Section = ({
    icon: Icon,
    iconColor,
    iconBg,
    title,
    subtitle,
    children,
  }) => (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="mb-7 flex items-start gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon
            size={22}
            className={iconColor}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </section>
  );

  return (    <div className="space-y-8">

      {/* ================= Header ================= */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 shadow-sm">
          <Sparkles
            size={28}
            className="text-blue-600"
          />
        </div>

        <div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-800">
            Customer Information
          </h2>

          <p className="mt-1 text-slate-500">
            Enter customer financial information to generate an AI-powered
            credit risk assessment.
          </p>

        </div>

      </div>

      {/* ================= Personal Information ================= */}

      <Section
        icon={User}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
        title="Personal Information"
        subtitle="Basic demographic details"
      >

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">

          <div className="xl:col-span-2">
            <Input
              name="LIMIT_BAL"
              label="Credit Limit"
              prefix="₹"
            />
          </div>

          <Input
            name="AGE"
            label="Age"
          />

          <Select
            name="SEX"
            label="Gender"
            options={[
              { value: 1, label: "Male" },
              { value: 2, label: "Female" },
            ]}
          />

          <div className="xl:col-span-2">

            <Select
              name="EDUCATION"
              label="Education"
              options={[
                { value: 1, label: "Graduate School" },
                { value: 2, label: "University" },
                { value: 3, label: "High School" },
                { value: 4, label: "Others" },
              ]}
            />

          </div>

          <div className="xl:col-span-3">

            <Select
              name="MARRIAGE"
              label="Marital Status"
              options={[
                { value: 1, label: "Married" },
                { value: 2, label: "Single" },
                { value: 3, label: "Others" },
              ]}
            />

          </div>

        </div>

      </Section>

      {/* ================= Repayment History ================= */}

      <Section
        icon={CreditCard}
        iconColor="text-red-600"
        iconBg="bg-red-100"
        title="Repayment History"
        subtitle="Repayment status for the previous six months"
      >

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">

          <Input
            name="PAY_0"
            label="Current"
          />

          <Input
            name="PAY_2"
            label="Month -2"
          />

          <Input
            name="PAY_3"
            label="Month -3"
          />

          <Input
            name="PAY_4"
            label="Month -4"
          />

          <Input
            name="PAY_5"
            label="Month -5"
          />

          <Input
            name="PAY_6"
            label="Month -6"
          />

        </div>

      </Section>      {/* ================= Bill Amounts ================= */}

      <Section
        icon={Receipt}
        iconColor="text-orange-600"
        iconBg="bg-orange-100"
        title="Bill Amounts"
        subtitle="Outstanding bill amounts for the previous six months"
      >

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">

          <Input
            name="BILL_AMT1"
            label="Bill 1"
            prefix="₹"
          />

          <Input
            name="BILL_AMT2"
            label="Bill 2"
            prefix="₹"
          />

          <Input
            name="BILL_AMT3"
            label="Bill 3"
            prefix="₹"
          />

          <Input
            name="BILL_AMT4"
            label="Bill 4"
            prefix="₹"
          />

          <Input
            name="BILL_AMT5"
            label="Bill 5"
            prefix="₹"
          />

          <Input
            name="BILL_AMT6"
            label="Bill 6"
            prefix="₹"
          />

        </div>

      </Section>

      {/* ================= Payment Amounts ================= */}

      <Section
        icon={Wallet}
        iconColor="text-green-600"
        iconBg="bg-green-100"
        title="Payment Amounts"
        subtitle="Payments made over the previous six months"
      >

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">

          <Input
            name="PAY_AMT1"
            label="Payment 1"
            prefix="₹"
          />

          <Input
            name="PAY_AMT2"
            label="Payment 2"
            prefix="₹"
          />

          <Input
            name="PAY_AMT3"
            label="Payment 3"
            prefix="₹"
          />

          <Input
            name="PAY_AMT4"
            label="Payment 4"
            prefix="₹"
          />

          <Input
            name="PAY_AMT5"
            label="Payment 5"
            prefix="₹"
          />

          <Input
            name="PAY_AMT6"
            label="Payment 6"
            prefix="₹"
          />

        </div>

      </Section>      {/* ================= Footer ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-8">

          {/* Security Notice */}

          <div className="flex items-start gap-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100">

              <ShieldCheck
                size={22}
                className="text-green-600"
              />

            </div>

            <div className="min-w-0">

              <h4 className="text-lg font-bold text-slate-800">
                Secure & Private
              </h4>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Customer information is encrypted and processed securely.
                Your data is only used to generate the AI credit risk
                assessment and is never stored permanently.
              </p>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex flex-col gap-4 lg:flex-row">

            <button
              type="button"
              onClick={resetForm}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
            >
              <RotateCcw size={18} />
              Reset Form
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className={`flex h-14 flex-[1.25] items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white shadow-lg transition-all duration-200

                ${
                  loading || !isFormValid
                    ? "cursor-not-allowed bg-slate-400 shadow-none"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
                }
              `}
            >
              <Sparkles size={18} />

              {loading
                ? "Analyzing Customer..."
                : "Analyze Customer"}
            </button>

          </div>

          {/* Validation Status */}

          {!isFormValid && (

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">

              <p className="text-sm font-medium text-amber-700">

                Please correct the highlighted fields before analyzing
                the customer.

              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}