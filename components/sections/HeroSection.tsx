"use client";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  // Smooth scroll handler
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden py-0 px-6 sm:px-12 bg-gradient-to-br from-blue-100 via-white to-blue-200"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left animate-fade-slide-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-gray-900 drop-shadow-md tracking-tight">
            Unlock{" "}
            <span className="text-blue-600">AI-Powered</span> Marketing Excellence
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-10 max-w-xl mx-auto md:mx-0 font-medium tracking-wide">
            Automate campaigns, generate content, and analyze results—faster and smarter with ADmyBRAND AI Suite.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Button
              variant="default"
              size="lg"
              className="px-12 text-blue-700 border-blue-700 font-semibold hover:text-blue-900 hover:border-blue-900"
              onClick={() => handleScroll("pricing")}
            >
              Get Started Free
            </Button>
            <Button
              variant="default"
              size="lg"
              className="px-12 text-blue-700 border-blue-700 font-semibold hover:text-blue-900 hover:border-blue-900"
              onClick={() => handleScroll("Marketing")}
            >
              See Features
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end animate-fade-slide-right">
          <div className="relative w-full max-w-2xl rounded-3xl shadow-2xl p-6 bg-white/90 backdrop-blur-md border border-gray-200">
            <Image
              src="/download.png"
              alt="ADmyBRAND AI Suite dashboard"
              width={720}
              height={420}
              className="rounded-2xl drop-shadow-lg animate-float"
              priority
            />
            <div className="absolute -inset-5 -z-10 rounded-3xl bg-gradient-to-tr from-blue-300/60 via-white/40 to-blue-500/60 blur-4xl animate-pulse-slow"></div>
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
        @keyframes fade-slide-right {
          from { opacity: 0; transform: translateX(40px);}
          to { opacity: 1; transform: translateX(0);}
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5;}
          50% { opacity: 1;}
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-15%);}
        }
        .animate-fade-slide-left {
          animation: fade-slide-left 1s ease forwards;
        }
        .animate-fade-slide-right {
          animation: fade-slide-right 1s ease forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
