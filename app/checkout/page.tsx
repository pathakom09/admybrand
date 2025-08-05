// app/checkout/page.tsx
"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals and small teams starting out.",
    features: [
      "Basic AI automation",
      "Up to 3 campaigns/month",
      "Email support",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "$49 / month",
    description: "Advanced features for growing businesses.",
    features: [
      "Unlimited campaigns",
      "Advanced analytics",
      "Integrations",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    description: "Tailored for large teams and enterprises.",
    features: [
      "Custom integrations",
      "Dedicated manager",
      "Enterprise security",
      "Onboarding & training",
    ],
  },
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [processing, setProcessing] = useState(false);

  const handlePurchase = async () => {
    setProcessing(true);
    // Integrate payment gateway API here (Stripe / PayPal etc.)
    await new Promise((res) => setTimeout(res, 1500));
    alert(`Thank you for choosing the ${selectedPlan.name} plan!`);
    setProcessing(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-16 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-8 text-center max-w-3xl">
        Choose Your Plan & Get Started
      </h1>

      <div className="max-w-5xl w-full grid gap-10 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl p-8 shadow-lg flex flex-col justify-between bg-white border transition cursor-pointer
              ${selectedPlan.name === plan.name ? "border-blue-600 shadow-2xl scale-[1.03]" : "border-gray-200 hover:shadow-xl"}
            `}
            onClick={() => setSelectedPlan(plan)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelectedPlan(plan)}
          >
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-800">{plan.name}</h2>
              <p className="text-xl font-extrabold text-blue-700 mb-4">{plan.price}</p>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="text-gray-700 list-disc list-inside space-y-1">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            {selectedPlan.name === plan.name && (
              <button
                onClick={handlePurchase}
                disabled={processing}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 active:scale-[0.97] transition disabled:opacity-60"
              >
                {processing ? "Processing..." : "Proceed to Payment"}
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
