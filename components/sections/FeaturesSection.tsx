import { FaRobot, FaChartLine, FaPlug, FaShieldAlt, FaMagic, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <FaRobot className="text-blue-600 text-3xl" />,
    title: "AI Campaign Automation",
    description: "Automate your marketing campaigns with intelligent workflows that save time and boost efficiency.",
  },
  {
    icon: <FaChartLine className="text-green-500 text-3xl" />,
    title: "Real-Time Analytics",
    description: "Track performance and gain actionable insights with live dashboards and detailed reports.",
  },
  {
    icon: <FaPlug className="text-purple-500 text-3xl" />,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools and platforms effortlessly for a unified marketing experience.",
  },
  {
    icon: <FaShieldAlt className="text-yellow-500 text-3xl" />,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with industry-leading security protocols and privacy controls.",
  },
  {
    icon: <FaMagic className="text-pink-500 text-3xl" />,
    title: "Smart Content Generation",
    description: "Generate high-converting copy, creatives, and ads with the power of generative AI.",
  },
  {
    icon: <FaUsers className="text-indigo-500 text-3xl" />,
    title: "Collaboration Tools",
    description: "Work together with your team in real-time, assign tasks, and streamline approvals.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-700">
          Powerful Features to Elevate Your Marketing
        </h2>
        <p className="text-gray-600 text-lg">
          Everything you need to automate, analyze, and accelerate your campaigns.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col items-center hover:shadow-xl transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}