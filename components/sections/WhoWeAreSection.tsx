"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 22, delay: 0.1 },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 80, damping: 22, delay: 0.3 },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 180, damping: 18, delay: 0.5 },
  },
};

export default function WhoWeAreSection() {
  return (
    <motion.section
      id="whoarewe"
      className="bg-blue-600 py-20 px-4 sm:px-8 md:px-16 flex items-center justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          variants={leftVariants}
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
        >
          <h2 className="text-4xl font-extrabold tracking-tight mb-5 text-white drop-shadow-lg font-serif">
            WHO WE ARE
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-blue-50 font-medium">
            AI MARKETING helps companies professionalize their marketing and advertising processes, grow their business using the Internet, thus reaching new markets and increase sales.
          </p>
          <p className="text-lg leading-relaxed text-blue-50 font-medium">
            We use Artificial Intelligence (AI) and Machine Learning (ML) tools for marketing to help our customers reach their goals.
          </p>
        </motion.div>
        {/* Right: Badge */}
        <motion.div
          variants={rightVariants}
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left"
        >
          <p className="text-lg leading-relaxed mb-6 text-blue-50 font-medium">
            Founded by an experienced team of marketing professionals, AI MARKETING can provide you with the most sophisticated digital marketing tools to achieve your company's goals and objectives.
          </p>
          <motion.div
            variants={badgeVariants}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start"
          >
            <Link
              href="https://partners.google.com/partnerbadge/info/"
              rel="noopener noreferrer"
              aria-label="Google Partner Badge"
              className="block"
            >
              <Image
                src="/download.png"
                alt="Google Partner Badge"
                width={170}
                height={100}
                className="h-auto w-auto rounded shadow-lg border-4 border-blue-200 bg-blue-100"
                priority
              />
            </Link>
            <p className="text-blue-100 text-base max-w-md leading-snug font-semibold drop-shadow-sm">
              The Google Partner badge is awarded to companies with Google Ads skills, certifications and expertise.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}