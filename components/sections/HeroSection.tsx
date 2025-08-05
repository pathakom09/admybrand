"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Variants } from "framer-motion";

export default function HeroSection() {
  const [bgOpacity, setBgOpacity] = useState(1);

  // Fade background opacity based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setBgOpacity(Math.max(1 - scrollY / 300, 0));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll handlers for buttons
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Intersection observer + animation controls for content
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Variants for staggered animation inside text container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  // Button hover animation variants
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 8px 15px rgba(59, 130, 246, 0.4)",
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden py-0 px-6 sm:px-12"
      style={{
        background: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Text Container */}
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{ opacity: bgOpacity }}
      >
        <motion.div
          className="flex-1 text-center"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow-2xl tracking-tight"
            style={{
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.7)'
            }}
            variants={itemVariants}
          >
            Unlock{" "}
            <motion.span
              className="text-cyan-300"
              whileHover={{ scale: 1.1, color: "#67E8F9" }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 0, 0, 0.7)'
              }}
            >
              AI-Powered
            </motion.span>{" "}
            Marketing Excellence
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-100 mb-10 max-w-xl mx-auto font-medium tracking-wide"
            style={{
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.6)'
            }}
            variants={itemVariants}
          >
            Automate campaigns, generate content, and analyze results faster and
            smarter than ever before with the{" "}
            <span 
              className="text-cyan-300 font-semibold"
              style={{
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.6)'
              }}
            >
              ADmyBRAND AI Suite
            </span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={buttonHover}
              className="rounded-lg shadow-md"
            >
              <Button
                variant="default"
                size="lg"
                className="bg-cyan-500 text-white px-12 font-semibold rounded-lg hover:bg-cyan-600 transition shadow-2xl border-2 border-cyan-400"
                onClick={() => handleScrollTo("pricing")}
              >
                Get Started
              </Button>
            </motion.div>
            <motion.div
              whileHover={buttonHover}
              className="rounded-lg shadow-md"
            >
              <Button
                variant="default"
                size="lg"
                className="bg-white/90 text-gray-900 px-12 font-semibold rounded-lg hover:bg-white transition shadow-2xl border-2 border-white"
                onClick={() => handleScrollTo("whoarewe")}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative animated blobs */}
      <div className="absolute -top-12 left-12 w-28 h-28 bg-white/20 rounded-full opacity-60 animate-bounce-slow pointer-events-none backdrop-blur-sm"></div>
      <div className="absolute bottom-0 right-10 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-white/20 opacity-40 blur-xl pointer-events-none"></div>

      <style jsx>{`
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