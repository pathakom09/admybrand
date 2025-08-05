"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function Header() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate background opacity (fade out image as we scroll)
  const bgImageOpacity = Math.max(1 - scrollY / 300, 0);
  // Calculate white background opacity (fade in white as we scroll)
  const whiteBgOpacity = Math.min(scrollY / 300, 1);

  // Helper for smooth scrolling to sections by id
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full z-50 sticky top-0 relative overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{
          backgroundImage: "url('/bg.jpg')",
          opacity: bgImageOpacity,
          filter: 'contrast(1.2) brightness(1.1) saturate(1.3)'
        }}
      />
      
      {/* White background layer with transparency when scrolled */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${whiteBgOpacity * 0.3})`, // 30% opacity
          backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none'
        }}
      />
      
      {/* Dark overlay for better text contrast when image is visible */}
      <div
        className="absolute inset-0 bg-black/20 transition-opacity duration-300"
        style={{ opacity: bgImageOpacity }}
      />

      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between text-base relative z-10">
        <div className="font-extrabold text-xl select-none tracking-tight pr-6 flex-shrink-0 flex items-center">
          <div className="relative mr-3">
            {/* Modern gradient background with glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur-sm opacity-75"></div>
            <div className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white rounded-xl px-3 py-2 font-black text-lg shadow-lg transform transition-transform hover:scale-105">
              <span className="relative z-10">AD</span>
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
            </div>
          </div>
          <span
            className="transition-colors duration-300 font-black text-xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            style={{
              color: bgImageOpacity > 0.5 ? 'white' : undefined,
              backgroundImage: bgImageOpacity > 0.5 ? 'none' : undefined,
              WebkitBackgroundClip: bgImageOpacity > 0.5 ? 'initial' : 'text',
              WebkitTextFillColor: bgImageOpacity > 0.5 ? 'white' : 'transparent'
            }}
          >
            myBRAND
          </span>
        </div>
        <ul className="hidden md:flex items-center space-x-8 font-medium h-full">
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition-colors duration-300 hover:text-blue-600"
              style={{
                color: bgImageOpacity > 0.5 ? 'white' : '#111827'
              }}
              onClick={() => scrollToSection("faq")}
            >
              FAQ
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition-colors duration-300 hover:text-blue-600"
              style={{
                color: bgImageOpacity > 0.5 ? 'white' : '#111827'
              }}
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition-colors duration-300 hover:text-blue-600"
              style={{
                color: bgImageOpacity > 0.5 ? 'white' : '#111827'
              }}
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition-colors duration-300 hover:text-blue-600"
              style={{
                color: bgImageOpacity > 0.5 ? 'white' : '#111827'
              }}
              onClick={() => scrollToSection("whoarewe")}
            >
              About
            </button>
          </li>
          <li>
            <button
              className="h-full px-3 py-2 flex items-center font-semibold transition-colors duration-300 hover:text-blue-600"
              style={{
                color: bgImageOpacity > 0.5 ? 'white' : '#111827'
              }}
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