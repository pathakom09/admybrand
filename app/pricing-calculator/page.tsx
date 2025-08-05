"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CalculatorState {
  businessSize: string;
  monthlyBudget: string;
  campaignTypes: string[];
  integrations: string[];
  supportLevel: string;
  users: number;
  customFeatures: string[];
}

const businessSizes = [
  { value: "startup", label: "Startup (1-10 employees)", multiplier: 1 },
  { value: "small", label: "Small Business (11-50 employees)", multiplier: 1.5 },
  { value: "medium", label: "Medium Business (51-200 employees)", multiplier: 2.5 },
  { value: "large", label: "Large Enterprise (200+ employees)", multiplier: 4 },
];

const budgetRanges = [
  { value: "500", label: "Under $500/month", basePrice: 29 },
  { value: "2000", label: "$500 - $2,000/month", basePrice: 49 },
  { value: "5000", label: "$2,000 - $5,000/month", basePrice: 99 },
  { value: "10000", label: "$5,000 - $10,000/month", basePrice: 199 },
  { value: "25000", label: "$10,000 - $25,000/month", basePrice: 399 },
  { value: "unlimited", label: "$25,000+/month", basePrice: 799 },
];

const campaignTypeOptions = [
  { value: "google-ads", label: "Google Ads Management", price: 25 },
  { value: "facebook-ads", label: "Facebook/Meta Ads", price: 25 },
  { value: "linkedin-ads", label: "LinkedIn Advertising", price: 35 },
  { value: "content-marketing", label: "AI Content Generation", price: 20 },
  { value: "email-marketing", label: "Email Marketing Automation", price: 15 },
  { value: "seo-optimization", label: "SEO Optimization", price: 30 },
  { value: "analytics", label: "Advanced Analytics & Reporting", price: 20 },
  { value: "social-media", label: "Social Media Management", price: 25 },
];

const integrationOptions = [
  { value: "crm", label: "CRM Integration (Salesforce, HubSpot)", price: 50 },
  { value: "ecommerce", label: "E-commerce Platforms (Shopify, WooCommerce)", price: 40 },
  { value: "analytics", label: "Analytics Tools (GA4, Adobe Analytics)", price: 30 },
  { value: "email", label: "Email Platforms (Mailchimp, Klaviyo)", price: 25 },
  { value: "social", label: "Social Media Platforms", price: 20 },
  { value: "custom-api", label: "Custom API Integrations", price: 100 },
];

const supportLevels = [
  { value: "basic", label: "Basic Support (Email)", multiplier: 1 },
  { value: "priority", label: "Priority Support (Email + Chat)", multiplier: 1.2 },
  { value: "dedicated", label: "Dedicated Account Manager", multiplier: 1.8 },
  { value: "enterprise", label: "Enterprise Support (24/7)", multiplier: 2.5 },
];

const customFeatureOptions = [
  { value: "white-label", label: "White-label Solution", price: 200 },
  { value: "custom-dashboard", label: "Custom Dashboard", price: 150 },
  { value: "api-access", label: "Full API Access", price: 100 },
  { value: "training", label: "Team Training & Onboarding", price: 300 },
  { value: "consulting", label: "Marketing Strategy Consulting", price: 500 },
];

export default function PricingCalculatorPage() {
  const [calculator, setCalculator] = useState<CalculatorState>({
    businessSize: "",
    monthlyBudget: "",
    campaignTypes: [],
    integrations: [],
    supportLevel: "basic",
    users: 1,
    customFeatures: [],
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price from budget range
    const budgetOption = budgetRanges.find(b => b.value === calculator.monthlyBudget);
    if (budgetOption) {
      basePrice = budgetOption.basePrice;
    }

    // Business size multiplier
    const sizeOption = businessSizes.find(s => s.value === calculator.businessSize);
    if (sizeOption) {
      basePrice *= sizeOption.multiplier;
    }

    // Add campaign types
    const campaignCosts = calculator.campaignTypes.reduce((total, type) => {
      const campaign = campaignTypeOptions.find(c => c.value === type);
      return total + (campaign?.price || 0);
    }, 0);

    // Add integrations
    const integrationCosts = calculator.integrations.reduce((total, integration) => {
      const integ = integrationOptions.find(i => i.value === integration);
      return total + (integ?.price || 0);
    }, 0);

    // Support level multiplier
    const supportOption = supportLevels.find(s => s.value === calculator.supportLevel);
    const supportMultiplier = supportOption?.multiplier || 1;

    // Additional users (after first 5 users, $10 per additional user)
    const additionalUserCost = Math.max(0, calculator.users - 5) * 10;

    // Custom features
    const customFeatureCosts = calculator.customFeatures.reduce((total, feature) => {
      const feat = customFeatureOptions.find(f => f.value === feature);
      return total + (feat?.price || 0);
    }, 0);

    const totalPrice = Math.round(
      (basePrice + campaignCosts + integrationCosts + additionalUserCost + customFeatureCosts) * supportMultiplier
    );

    setEstimatedPrice(totalPrice);
    setShowResults(true);
  };

  const handleCheckboxChange = (value: string, field: 'campaignTypes' | 'integrations' | 'customFeatures') => {
    setCalculator(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handlePayment = () => {
    setShowPaymentModal(true);
  };

  const PaymentSuccessModal = () => (
    <AnimatePresence>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h3>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase! Your AI Marketing plan is now active and ready to transform your business.
            </p>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            AI Marketing Pricing Calculator
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto drop-shadow">
            Get a personalized quote based on your business needs and marketing goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
            >
              {/* Business Size */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Size</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {businessSizes.map((size) => (
                    <label key={size.value} className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <input
                        type="radio"
                        name="businessSize"
                        value={size.value}
                        checked={calculator.businessSize === size.value}
                        onChange={(e) => setCalculator(prev => ({ ...prev, businessSize: e.target.value }))}
                        className="mr-3 text-blue-600 w-4 h-4"
                      />
                      <span className="font-medium text-gray-800">{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Monthly Budget */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Marketing Budget</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {budgetRanges.map((budget) => (
                    <label key={budget.value} className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <input
                        type="radio"
                        name="monthlyBudget"
                        value={budget.value}
                        checked={calculator.monthlyBudget === budget.value}
                        onChange={(e) => setCalculator(prev => ({ ...prev, monthlyBudget: e.target.value }))}
                        className="mr-3 text-blue-600 w-4 h-4"
                      />
                      <span className="font-medium text-gray-800">{budget.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Campaign Types */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Marketing Services Needed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {campaignTypeOptions.map((campaign) => (
                    <label key={campaign.value} className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <input
                        type="checkbox"
                        checked={calculator.campaignTypes.includes(campaign.value)}
                        onChange={() => handleCheckboxChange(campaign.value, 'campaignTypes')}
                        className="mr-3 text-blue-600 w-4 h-4"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{campaign.label}</span>
                        <span className="text-blue-600 font-semibold ml-2">+${campaign.price}/mo</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {integrationOptions.map((integration) => (
                    <label key={integration.value} className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <input
                        type="checkbox"
                        checked={calculator.integrations.includes(integration.value)}
                        onChange={() => handleCheckboxChange(integration.value, 'integrations')}
                        className="mr-3 text-blue-600 w-4 h-4"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{integration.label}</span>
                        <span className="text-blue-600 font-semibold ml-2">+${integration.price}/mo</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Users */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Number of Users</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calculator.users}
                    onChange={(e) => setCalculator(prev => ({ ...prev, users: parseInt(e.target.value) }))}
                    className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-xl font-bold text-blue-600 min-w-[80px] bg-blue-50 px-3 py-1 rounded-lg">{calculator.users} users</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">First 5 users included, $10/month for each additional user</p>
              </div>

              {/* Support Level */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Level</h3>
                <div className="space-y-3">
                  {supportLevels.map((support) => (
                    <label key={support.value} className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <input
                        type="radio"
                        name="supportLevel"
                        value={support.value}
                        checked={calculator.supportLevel === support.value}
                        onChange={(e) => setCalculator(prev => ({ ...prev, supportLevel: e.target.value }))}
                        className="mr-3 text-blue-600 w-4 h-4"
                      />
                      <span className="font-medium text-gray-800">{support.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Features */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {customFeatureOptions.map((feature) => (
                    <label key={feature.value} className="flex items-center p-4 border-2 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <input
                        type="checkbox"
                        checked={calculator.customFeatures.includes(feature.value)}
                        onChange={() => handleCheckboxChange(feature.value, 'customFeatures')}
                        className="mr-3 text-blue-600 w-4 h-4"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">{feature.label}</span>
                        <span className="text-blue-600 font-semibold ml-2">+${feature.price}/mo</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={calculatePrice}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!calculator.businessSize || !calculator.monthlyBudget}
              >
                Calculate My Custom Price
              </button>
            </motion.div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 sticky top-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Custom Quote</h3>
              
              {showResults ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                      ${estimatedPrice}
                    </div>
                    <div className="text-gray-700 font-medium">per month</div>
                  </div>

                  <div className="border-t-2 border-gray-100 pt-6 space-y-4">
                    <h4 className="font-semibold text-gray-900">Included:</h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        AI-powered marketing automation
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {calculator.campaignTypes.length} marketing services
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {calculator.integrations.length} integrations
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {calculator.users} user accounts
                      </li>
                      <li className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {supportLevels.find(s => s.value === calculator.supportLevel)?.label}
                      </li>
                      {calculator.customFeatures.length > 0 && (
                        <li className="flex items-center">
                          <span className="text-green-500 mr-2">✓</span>
                          {calculator.customFeatures.length} premium features
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handlePayment}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Proceed to Payment
                    </button>
                    <button
                      className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold"
                    >
                      Contact Sales
                    </button>
                  </div>

                  <p className="text-xs text-gray-600 text-center bg-gray-50 p-3 rounded-lg">
                    * Prices are estimates. Final pricing may vary based on specific requirements.
                  </p>
                </motion.div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">💰</div>
                  <p className="text-gray-700 font-medium">Fill out the form to see your personalized pricing</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <button
            className="px-8 py-3 text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-xl font-medium backdrop-blur-sm"
          >
            ← Back to Pricing
          </button>
        </motion.div>
      </div>

      <PaymentSuccessModal />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}