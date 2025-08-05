"use client";

import { useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    originalPrice: null,
    description: "Perfect for individuals and small teams starting out.",
    badge: "Most Popular",
    features: [
      "Basic AI automation",
      "Up to 3 campaigns/month",
      "Email support",
      "Community access",
    ],
    detailedFeatures: {
      "Core Features": [
        "AI-powered campaign creation",
        "Basic analytics dashboard",
        "3 active campaigns maximum",
        "Standard email templates",
        "Basic A/B testing",
        "Community forum access"
      ],
      "Integrations": [
        "Google Analytics",
        "Facebook Pixel",
        "Basic email platforms"
      ],
      "Support": [
        "Email support (48-hour response)",
        "Knowledge base access",
        "Community forum support",
        "Basic onboarding guide"
      ],
      "Limits": [
        "Up to 1,000 contacts",
        "3 campaigns per month",
        "Basic reporting only",
        "Standard templates only"
      ]
    },
    highlights: [
      "Perfect for testing our platform",
      "No credit card required",
      "Upgrade anytime",
      "Full feature trial for 14 days"
    ]
  },
  {
    name: "Pro",
    price: "$49",
    originalPrice: "$79",
    billing: "/ month",
    description: "Advanced features for growing businesses.",
    badge: "Best Value",
    features: [
      "Unlimited campaigns",
      "Advanced analytics",
      "Integrations",
      "Priority support",
    ],
    detailedFeatures: {
      "Core Features": [
        "Unlimited AI-powered campaigns",
        "Advanced analytics & insights",
        "Custom campaign templates",
        "Advanced A/B testing",
        "Conversion tracking",
        "Lead scoring & nurturing",
        "Multi-channel campaigns",
        "Custom landing pages"
      ],
      "Integrations": [
        "50+ marketing tool integrations",
        "CRM integrations (Salesforce, HubSpot)",
        "E-commerce platforms (Shopify, WooCommerce)",
        "Social media platforms",
        "Webhook & API access",
        "Zapier integration"
      ],
      "Support": [
        "Priority email support (24-hour response)",
        "Live chat support",
        "Phone support (business hours)",
        "Dedicated onboarding specialist",
        "Monthly strategy calls"
      ],
      "Advanced Features": [
        "Up to 50,000 contacts",
        "Custom reporting & dashboards",
        "Team collaboration tools",
        "Advanced segmentation",
        "Predictive analytics",
        "ROI tracking & attribution"
      ]
    },
    highlights: [
      "Save $30/month with annual billing",
      "Most popular choice for businesses",
      "Advanced AI capabilities",
      "Comprehensive analytics suite"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    originalPrice: null,
    description: "Tailored for large teams and enterprises.",
    badge: "Enterprise",
    features: [
      "Custom integrations",
      "Dedicated manager",
      "Enterprise security",
      "Onboarding & training",
    ],
    detailedFeatures: {
      "Enterprise Features": [
        "Unlimited everything",
        "Custom AI model training",
        "Advanced automation workflows",
        "Multi-brand management",
        "Custom reporting & dashboards",
        "Advanced user permissions",
        "Single Sign-On (SSO)",
        "API rate limit increases"
      ],
      "Security & Compliance": [
        "Enterprise-grade security",
        "SOC 2 Type II compliance",
        "GDPR & CCPA compliance",
        "Custom data retention policies",
        "Advanced audit logs",
        "IP whitelisting",
        "Custom security policies"
      ],
      "Support & Services": [
        "Dedicated customer success manager",
        "24/7 premium support",
        "Custom onboarding program",
        "Team training sessions",
        "Quarterly business reviews",
        "Custom implementation services",
        "Priority feature requests"
      ],
      "Custom Solutions": [
        "Custom integrations & APIs",
        "White-label solutions",
        "Custom contract terms",
        "Volume-based pricing",
        "Multi-location support",
        "Custom SLA agreements"
      ]
    },
    highlights: [
      "Tailored to your specific needs",
      "Dedicated success team",
      "Enterprise-grade security",
      "Custom implementation & training"
    ]
  },
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1]); // Default to Pro plan
  const [processing, setProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePurchase = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 2000));
    setProcessing(false);
    setShowPaymentModal(true);
  };

  const PaymentSuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl transform transition-all"
        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h3>
        <p className="text-gray-600 mb-8">
          Thank you for purchasing the <span className="font-semibold text-blue-600">{selectedPlan.name}</span> plan! 
          Your account has been upgraded and is ready to use.
        </p>
        <button
          onClick={() => setShowPaymentModal(false)}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );

  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 text-center">
          Choose Your Plan & Get Started
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Select the perfect plan for your business needs
        </p>

        <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-3 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 shadow-lg flex flex-col justify-between bg-white border-2 transition-all duration-300 cursor-pointer relative overflow-hidden
                ${selectedPlan.name === plan.name 
                  ? "border-blue-500 shadow-2xl scale-105" 
                  : "border-gray-200 hover:shadow-xl hover:scale-102"}
              `}
              onClick={() => setSelectedPlan(plan)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelectedPlan(plan)}
            >
              {plan.badge && (
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white rounded-bl-2xl
                  ${plan.badge === "Most Popular" ? "bg-green-500" : 
                    plan.badge === "Best Value" ? "bg-orange-500" : "bg-purple-500"}
                `}>
                  {plan.badge}
                </div>
              )}
              
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-800">{plan.name}</h2>
                <div className="mb-4">
                  {plan.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mr-2">{plan.originalPrice}</span>
                  )}
                  <span className="text-2xl font-extrabold text-blue-700">
                    {plan.price}
                    {plan.billing && <span className="text-lg font-normal text-gray-600">{plan.billing}</span>}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="text-gray-700 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedPlan.name === plan.name && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePurchase();
                  }}
                  disabled={processing}
                  className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-95 transition-all duration-200 disabled:opacity-60 shadow-lg"
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Proceed to Payment"
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Plan Information */}
        {selectedPlan && (
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedPlan.name} Plan Details
              </h2>
              <p className="text-gray-600">Everything included in your {selectedPlan.name.toLowerCase()} subscription</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(selectedPlan.detailedFeatures).map(([category, features]) => (
                <div key={category} className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Plan Highlights */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose {selectedPlan.name}?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedPlan.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help Deciding?</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                  Compare Plans
                </button>
                <button className="px-6 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors">
                  Contact Sales
                </button>
                <button className="px-6 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPaymentModal && <PaymentSuccessModal />}
    </main>
  );
}