"use client";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight: boolean;
}

const plans: Plan[] = [
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
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49/mo",
    description: "Advanced features for growing businesses.",
    features: [
      "Everything in Starter",
      "Unlimited campaigns",
      "Advanced analytics",
      "Integrations",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large teams and enterprises.",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated manager",
      "Enterprise security",
      //"Onboarding & training",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-50 px-4"
      id="pricing"
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-700 tracking-tight">
          Pricing Plans
        </h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Choose the plan that fits your needs. Upgrade or cancel anytime.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const isHovered = hoveredIndex === index;
          const isHighlight = plan.highlight;

          return (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`rounded-3xl border p-8 flex flex-col items-center bg-white cursor-pointer
              transition-transform duration-500 ease-in-out shadow-lg
              ${
                isHighlight
                  ? "border-blue-600 shadow-2xl scale-[1.06] z-10"
                  : "border-gray-200 shadow"
              }
              ${isHovered && !isHighlight ? "scale-[1.03] shadow-xl" : ""}
            `}
              style={{
                transformOrigin: "center",
                willChange: "transform, box-shadow",
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{plan.name}</h3>
              <div
                className={`text-5xl font-extrabold mb-4 tracking-tight ${
                  isHighlight ? "text-blue-700" : "text-blue-600"
                }`}
              >
                {plan.price}
              </div>
              <p className="text-gray-500 mb-8 text-center">{plan.description}</p>

              <ul className="mb-8 space-y-3 w-full text-gray-700 font-medium">
                {plan.features.map((feature: string) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-base sm:text-lg"
                  >
                    <span className="text-blue-600 text-xl leading-none">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => {
                  if (plan.name === "Enterprise") {
                    router.push("/checkout");
                  } else {
                    router.push("/checkout");
                  }
                }}
                variant="default"
                className="w-full py-4 text-lg font-semibold shadow-sm hover:shadow-md transition-transform duration-300 active:scale-95 bg-black text-white"
              >
                {plan.name === "Enterprise" ? "Get Started" : "Get Started"}
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
