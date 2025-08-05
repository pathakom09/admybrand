"use client";
import Image from "next/image";
import Link from "next/link";

export default function WhoWeAreSection() {
  return (
    <section id="whoarewe" className="bg-blue-600 py-15 px-4 sm:px-8 md:px-16 flex items-center justify-center">
        
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl font-extrabold tracking-tight mb-5 text-white">
            WHO WE ARE
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-100">
            AI MARKETING helps companies professionalize their marketing and advertising processes, grow their business using the Internet, thus reaching new markets and increase sales.
          </p>
          <p className="text-lg leading-relaxed text-gray-100">
            We use Artificial Intelligence (AI) and Machine Learning (ML) tools for marketing to help our customers reach their goals.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <p className="text-lg leading-relaxed mb-6 text-gray-100">
            Founded by an experienced team of marketing professionals, AI MARKETING can provide you with the most sophisticated digital marketing tools to achieve your company's goals and objectives.
          </p>
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <Link
              href="https://partners.google.com/partnerbadge/info/"
              rel="noopener noreferrer"
              aria-label="Google Partner Badge"
              className="block"
            >
              <Image
                src="data:image/png;base64,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"
                alt="Google Partner Badge"
                width={170}
                height={100}
                className="h-auto w-auto rounded shadow-lg"
                priority
              />
            </Link>
            <p className="text-gray-300 text-base max-w-md leading-snug">
              The Google Partner badge is awarded to companies with Google Ads skills, certifications and expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
