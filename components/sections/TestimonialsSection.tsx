"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaStar, FaLinkedin } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Marketing Lead, FinTech Co.",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQFbSkQKmZY5eQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714743580726?e=1757548800&v=beta&t=-QfVvQHsr-eDtqd9Iot7Vwjdu0XDXLrvgZB11V3YZ9Y",
    quote:
      "ADmyBRAND AI Suite transformed our marketing! Campaigns are smarter, faster, and our ROI has never been better.",
    rating: 5,
    linkedin: "https://linkedin.com/in/priyasharma",
  },
  {
    name: "Alex Kim",
    role: "Founder, StartupHub",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQFbSkQKmZY5eQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714743580726?e=1757548800&v=beta&t=-QfVvQHsr-eDtqd9Iot7Vwjdu0XDXLrvgZB11V3YZ9Y",
    quote:
      "The automation and analytics features are a game changer. Our team collaborates seamlessly and saves hours every week.",
    rating: 5,
    linkedin: "https://linkedin.com/in/alexkim",
  },
  {
    name: "Sara Lee",
    role: "CMO, RetailX",
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQFbSkQKmZY5eQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714743580726?e=1757548800&v=beta&t=-QfVvQHsr-eDtqd9Iot7Vwjdu0XDXLrvgZB11V3YZ9Y",
    quote:
      "We love the content generation tools! Our creatives are more engaging and our workflow is so much smoother.",
    rating: 4,
    linkedin: "https://linkedin.com/in/saralee",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Aos.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  // Autoplay logic
  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, paused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((current + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="py-20 bg-gradient-to-b from-gray-50 to-white px-4"
    >
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-700">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 text-lg">
          Real stories from teams using ADmyBRAND AI Suite.
        </p>
      </div>

      <div
        className="max-w-xl mx-auto relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Customer testimonials carousel"
      >
        <div
          data-aos="fade-up"
          data-aos-once="true"
          className="bg-blue-50 rounded-3xl shadow-lg p-10 flex flex-col items-center text-center transition-all duration-700 ease-in-out"
          key={testimonials[current].name}
          aria-live="polite"
        >
          <Image
            src={testimonials[current].photo}
            alt={testimonials[current].name}
            width={96}
            height={96}
            className="rounded-full mb-6 border-4 border-blue-200 object-cover shadow-sm"
            priority
          />

          <div className="flex items-center mb-4 space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-xl ${
                  i < testimonials[current].rating
                    ? "text-blue-400"
                    : "text-blue-100"
                }`}
                aria-hidden="true"
              />
            ))}
            <span className="sr-only">
              {testimonials[current].rating} out of 5 stars
            </span>
          </div>

          <p className="text-xl italic font-serif text-gray-900 mb-6">
            &ldquo;{testimonials[current].quote}&rdquo;
          </p>

          <div className="flex flex-col items-center gap-1">
            <div className="font-semibold text-blue-800 flex items-center gap-3">
              {testimonials[current].name}
              <a
                href={testimonials[current].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${testimonials[current].name}`}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-700 text-sm">{testimonials[current].role}</div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center mt-8 gap-5">
          <button
            aria-label="Previous testimonial"
            onClick={prev}
            className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 text-2xl shadow-md transition"
          >
            &#8592;
          </button>
          <button
            aria-label="Next testimonial"
            onClick={next}
            className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 text-2xl shadow-md transition"
          >
            &#8594;
          </button>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center mt-6 gap-3"
          aria-label="Testimonial navigation dots"
        >
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              aria-current={idx === current}
              className={`inline-block w-4 h-4 rounded-full transition-colors duration-300 border-2 ${
                idx === current
                  ? "bg-blue-600 border-blue-600"
                  : "bg-blue-100 border-blue-100"
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s;
        }
      `}</style>
    </section>
  );
}
