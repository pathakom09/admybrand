"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const router = useRouter();

  // Helper for smooth scrolling to sections by id
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white border-b shadow-sm w-full z-50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between text-base text-gray-900">
        <div className="font-extrabold text-xl select-none tracking-tight pr-6 flex-shrink-0">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-lg px-2 py-1 mr-2">
            AD
          </span>
          myBRAND
        </div>
        <ul className="hidden md:flex items-center space-x-8 font-medium h-full">
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition text-gray-900 hover:text-blue-600"
              onClick={() => scrollToSection("faq")}
            >
              FAQ
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition text-gray-900 hover:text-blue-600"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition text-gray-900 hover:text-blue-600"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition text-gray-900 hover:text-blue-600"
              onClick={() => scrollToSection("whoarewe")}
            >
              About
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition text-gray-900 hover:text-blue-600"
              onClick={() => scrollToSection("testimonials")}
            >
              Blog
            </button>
          </li>
          <li>
            <Button
              onClick={() => router.push("/sales-contact")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Contact
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
