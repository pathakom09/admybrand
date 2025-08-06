"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Building2, Users, DollarSign, Zap, Settings, Shield, Sparkles, Calculator, ArrowRight, ChevronDown } from "lucide-react";

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
  { value: "startup", label: "Startup", subtitle: "1-10 employees", multiplier: 1, icon: Building2 },
  { value: "small", label: "Small Business", subtitle: "11-50 employees", multiplier: 1.5, icon: Building2 },
  { value: "medium", label: "Medium Business", subtitle: "51-200 employees", multiplier: 2.5, icon: Building2 },
  { value: "large", label: "Large Enterprise", subtitle: "200+ employees", multiplier: 4, icon: Building2 },
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
  { value: "google-ads", label: "Google Ads Management", price: 25, icon: "🎯" },
  { value: "facebook-ads", label: "Facebook/Meta Ads", price: 25, icon: "📘" },
  { value: "linkedin-ads", label: "LinkedIn Advertising", price: 35, icon: "💼" },
  { value: "content-marketing", label: "AI Content Generation", price: 20, icon: "✍️" },
  { value: "email-marketing", label: "Email Marketing Automation", price: 15, icon: "📧" },
  { value: "seo-optimization", label: "SEO Optimization", price: 30, icon: "🔍" },
  { value: "analytics", label: "Advanced Analytics & Reporting", price: 20, icon: "📊" },
  { value: "social-media", label: "Social Media Management", price: 25, icon: "📱" },
];

const integrationOptions = [
  { value: "crm", label: "CRM Integration", subtitle: "Salesforce, HubSpot", price: 50 },
  { value: "ecommerce", label: "E-commerce Platforms", subtitle: "Shopify, WooCommerce", price: 40 },
  { value: "analytics", label: "Analytics Tools", subtitle: "GA4, Adobe Analytics", price: 30 },
  { value: "email", label: "Email Platforms", subtitle: "Mailchimp, Klaviyo", price: 25 },
  { value: "social", label: "Social Media Platforms", subtitle: "All major platforms", price: 20 },
  { value: "custom-api", label: "Custom API Integrations", subtitle: "Tailored solutions", price: 100 },
];

const supportLevels = [
  { value: "basic", label: "Basic Support", subtitle: "Email support", multiplier: 1 },
  { value: "priority", label: "Priority Support", subtitle: "Email + Chat", multiplier: 1.2 },
  { value: "dedicated", label: "Dedicated Account Manager", subtitle: "Personal assistance", multiplier: 1.8 },
  { value: "enterprise", label: "Enterprise Support", subtitle: "24/7 premium support", multiplier: 2.5 },
];

const customFeatureOptions = [
  { value: "white-label", label: "White-label Solution", price: 200, icon: "🏷️" },
  { value: "custom-dashboard", label: "Custom Dashboard", price: 150, icon: "📋" },
  { value: "api-access", label: "Full API Access", price: 100, icon: "🔧" },
  { value: "training", label: "Team Training & Onboarding", price: 300, icon: "🎓" },
  { value: "consulting", label: "Marketing Strategy Consulting", price: 500, icon: "💡" },
];

export default function ProfessionalPricingCalculator() {
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
  const [currentStep, setCurrentStep] = useState(1);

  const calculatePrice = () => {
    let basePrice = 0;
    
    const budgetOption = budgetRanges.find(b => b.value === calculator.monthlyBudget);
    if (budgetOption) {
      basePrice = budgetOption.basePrice;
    }

    const sizeOption = businessSizes.find(s => s.value === calculator.businessSize);
    if (sizeOption) {
      basePrice *= sizeOption.multiplier;
    }

    const campaignCosts = calculator.campaignTypes.reduce((total, type) => {
      const campaign = campaignTypeOptions.find(c => c.value === type);
      return total + (campaign?.price || 0);
    }, 0);

    const integrationCosts = calculator.integrations.reduce((total, integration) => {
      const integ = integrationOptions.find(i => i.value === integration);
      return total + (integ?.price || 0);
    }, 0);

    const supportOption = supportLevels.find(s => s.value === calculator.supportLevel);
    const supportMultiplier = supportOption?.multiplier || 1;

    const additionalUserCost = Math.max(0, calculator.users - 5) * 10;

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

  const PaymentSuccessModal = () => (
    <AnimatePresence>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h3>
            <p className="text-gray-600 mb-8">
              Welcome to ADmyBRAND AI Suite! Your marketing transformation begins now.
            </p>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Access Dashboard
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const StepIndicator = () => (
    <div className="flex justify-center mb-12">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step}
            </div>
            {step < 4 && <div className={`w-12 h-0.5 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Calculator className="w-12 h-12 mr-3" />
              <h1 className="text-4xl font-bold">AI Marketing Pricing Calculator</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get a personalized quote for ADmyBRAND AI Suite based on your business needs and marketing goals
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Business Size */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Building2 className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Business Size</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessSizes.map((size) => {
                  const Icon = size.icon;
                  return (
                    <label 
                      key={size.value} 
                      className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        calculator.businessSize === size.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="businessSize"
                        value={size.value}
                        checked={calculator.businessSize === size.value}
                        onChange={(e) => setCalculator(prev => ({ ...prev, businessSize: e.target.value }))}
                        className="sr-only"
                      />
                      <Icon className="w-5 h-5 text-gray-500 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-900">{size.label}</div>
                        <div className="text-sm text-gray-600">{size.subtitle}</div>
                      </div>
                      {calculator.businessSize === size.value && (
                        <Check className="w-5 h-5 text-blue-600 ml-auto" />
                      )}
                    </label>
                  );
                })}
              </div>
            </motion.div>

            {/* Monthly Budget */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <DollarSign className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Monthly Marketing Budget</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetRanges.map((budget) => (
                  <label 
                    key={budget.value} 
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      calculator.monthlyBudget === budget.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="monthlyBudget"
                      value={budget.value}
                      checked={calculator.monthlyBudget === budget.value}
                      onChange={(e) => setCalculator(prev => ({ ...prev, monthlyBudget: e.target.value }))}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{budget.label}</div>
                    </div>
                    {calculator.monthlyBudget === budget.value && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Marketing Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Zap className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Marketing Services Needed</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignTypeOptions.map((campaign) => (
                  <label 
                    key={campaign.value} 
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      calculator.campaignTypes.includes(campaign.value)
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={calculator.campaignTypes.includes(campaign.value)}
                      onChange={() => handleCheckboxChange(campaign.value, 'campaignTypes')}
                      className="sr-only"
                    />
                    <div className="text-xl mr-3">{campaign.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{campaign.label}</div>
                      <div className="text-sm text-blue-600 font-medium">+${campaign.price}/month</div>
                    </div>
                    {calculator.campaignTypes.includes(campaign.value) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Required Integrations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrationOptions.map((integration) => (
                  <label 
                    key={integration.value} 
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      calculator.integrations.includes(integration.value)
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={calculator.integrations.includes(integration.value)}
                      onChange={() => handleCheckboxChange(integration.value, 'integrations')}
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{integration.label}</div>
                      <div className="text-sm text-gray-600">{integration.subtitle}</div>
                      <div className="text-sm text-blue-600 font-medium">+${integration.price}/month</div>
                    </div>
                    {calculator.integrations.includes(integration.value) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Users & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Number of Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Team Size</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Number of users</span>
                    <span className="text-2xl font-bold text-blue-600">{calculator.users}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calculator.users}
                    onChange={(e) => setCalculator(prev => ({ ...prev, users: parseInt(e.target.value) }))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <p className="text-sm text-gray-600">First 5 users included, $10/month for each additional user</p>
                </div>
              </motion.div>

              {/* Support Level */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Support Level</h3>
                </div>
                <div className="space-y-3">
                  {supportLevels.map((support) => (
                    <label 
                      key={support.value} 
                      className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        calculator.supportLevel === support.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="supportLevel"
                        value={support.value}
                        checked={calculator.supportLevel === support.value}
                        onChange={(e) => setCalculator(prev => ({ ...prev, supportLevel: e.target.value }))}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">{support.label}</div>
                        <div className="text-xs text-gray-600">{support.subtitle}</div>
                      </div>
                      {calculator.supportLevel === support.value && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Premium Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <div className="flex items-center mb-6">
                <Sparkles className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Premium Features</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {customFeatureOptions.map((feature) => (
                  <label 
                    key={feature.value} 
                    className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      calculator.customFeatures.includes(feature.value)
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={calculator.customFeatures.includes(feature.value)}
                      onChange={() => handleCheckboxChange(feature.value, 'customFeatures')}
                      className="sr-only"
                    />
                    <div className="text-xl mr-3">{feature.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{feature.label}</div>
                      <div className="text-sm text-blue-600 font-medium">+${feature.price}/month</div>
                    </div>
                    {calculator.customFeatures.includes(feature.value) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Calculate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
            >
              <button
                onClick={calculatePrice}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                disabled={!calculator.businessSize || !calculator.monthlyBudget}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate My Custom Price
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Custom Quote</h3>
                
                {showResults ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border">
                      <div className="text-5xl font-bold text-blue-600 mb-2">
                        ${estimatedPrice.toLocaleString()}
                      </div>
                      <div className="text-gray-700 font-medium">per month</div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Check className="w-5 h-5 text-green-600 mr-2" />
                        What's Included
                      </h4>
                      <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          AI-powered marketing automation
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {calculator.campaignTypes.length} marketing services
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {calculator.integrations.length} platform integrations
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {calculator.users} user accounts
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {supportLevels.find(s => s.value === calculator.supportLevel)?.label}
                        </li>
                        {calculator.customFeatures.length > 0 && (
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            {calculator.customFeatures.length} premium features
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="space-y-3 pt-6 border-t">
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                      >
                        Start Free Trial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                      <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold">
                        Schedule Demo
                      </button>
                    </div>

                    <div className="text-xs text-gray-600 text-center bg-gray-50 p-3 rounded-lg border">
                      <p className="mb-1">💡 Start with a 14-day free trial</p>
                      <p>Final pricing may vary based on specific requirements</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    <Calculator className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-700 font-medium">Configure your requirements above</p>
                    <p className="text-sm text-gray-600">Get your personalized pricing instantly</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
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