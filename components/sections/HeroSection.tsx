"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Fade out as we scroll the first 300px, then stay at 0
      setBgOpacity(Math.max(1 - scrollY / 300, 0));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-0 px-6 sm:px-12 bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Fading Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-200"
        style={{
          backgroundImage: "url(/vimal-s-ZhVUAUc8V4s-unsplash.jpg)",
          opacity: bgOpacity,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center animate-fade-slide-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900 drop-shadow-md tracking-tight">
            Unlock{" "}
            <span className="text-blue-600">AI-Powered</span> Marketing Excellence
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-10 max-w-xl mx-auto font-medium tracking-wide">
            Automate campaigns, generate content, and analyze results faster and smarter than ever before with the <span className="text-blue-600 font-semibold">ADmyBRAND AI Suite</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button
              variant="default"
              size="lg"
              className="bg-blue-600 text-white px-12 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => handleScrollTo("pricing")}
            >
              Get Started
            </Button>
            <Button
              variant="default"
              size="lg"
              className="bg-blue-600 text-white px-12 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={() => handleScrollTo("whoarewe")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative animated blobs */}
      <div className="absolute -top-12 left-12 w-28 h-28 bg-blue-300 rounded-full opacity-30 animate-bounce-slow pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-gradient-to-tr from-blue-300 to-blue-400 opacity-25 blur-xl pointer-events-none"></div>

      <style jsx>{`
        @keyframes fade-slide-left {
          from { opacity: 0; transform: translateX(-40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        .animate-fade-slide-left {
          animation: fade-slide-left 1s ease forwards;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-15%);}
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
