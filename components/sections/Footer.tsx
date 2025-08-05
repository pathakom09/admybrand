"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaTwitter, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/Button";

export default function Footer() {
  const router = useRouter();

  // Smooth scroll helper
  function smoothScroll(id: string) {
    const element = document.getElementById(id);
    if (element) {  
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <span className="font-bold text-blue-700 text-xl select-none">ADmyBRAND AI Suite</span>
          <div className="text-gray-500 mt-2 text-sm select-text">
            &copy; {new Date().getFullYear()} ADmyBRAND. All rights reserved.
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6 text-gray-600 text-sm justify-center md:justify-start">
          <Button variant="link" onClick={() => smoothScroll("features")}>
            Features
          </Button>
          <Button variant="link" onClick={() => smoothScroll("pricing")}>
            Pricing
          </Button>
          <Button variant="link" onClick={() => smoothScroll("faq")}>
            FAQ
          </Button>
          <Button variant="link" onClick={() => router.push("/sales-contact")}>
            Contact
          </Button>
        </nav>

        {/* Social Icons with Tooltips */}
        <div className="flex gap-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={`${buttonVariants({ variant: "ghost" })} text-blue-500 hover:text-blue-700`}
              >
                <FaTwitter className="text-xl" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Twitter</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                //variant="ghost"
                aria-label="LinkedIn"
                className={`${buttonVariants({ variant: "ghost" })} text-blue-500 hover:text-blue-700`}
              >
                <FaLinkedin className="text-xl" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">LinkedIn</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                //variant="ghost"
                aria-label="Facebook"
                className={`${buttonVariants({ variant: "ghost" })} text-blue-500 hover:text-blue-700`}
              >
                <FaFacebook className="text-xl" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">Facebook</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:contact@admybrand.com"
                //variant="ghost"
                aria-label="Email"
                className={`${buttonVariants({ variant: "ghost" })} text-blue-500 hover:text-blue-700`}
              >
                <FaEnvelope className="text-xl" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">Email</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
}

