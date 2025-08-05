"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { label: "AI Solutions", submenu: ["Conversational AI", "Automation Suite", "Contact Center AI"] },
  { label: "Agent Platform", submenu: ["Overview", "Integration", "Security"] },
  { label: "Agent Marketplace", submenu: ["Skills Catalog", "Partners", "For Developers"] },
  { label: "Resources", submenu: ["Documentation", "Webinars", "Blog", "Support"] },
  { label: "Company", submenu: ["About", "Careers", "Press", "Contact"] },
];

const languageOptions = ["EN", "FR", "DE"];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handlers to prevent flicker
  const openDropdown = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(label);
  };
  const delayedClose = () => {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 130);
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
        <ul className="hidden md:flex items-center space-x-8 font-medium h-full relative">
          {menuItems.map(({ label, submenu }) => (
            <li
              key={label}
              className="relative h-full"
              onMouseEnter={() => openDropdown(label)}
              onMouseLeave={delayedClose}
            >
              <Button
                variant="ghost"
                className={`h-full px-3 py-2 flex items-center font-semibold transition text-gray-900 hover:text-blue-600 ${
                  openMenu === label ? "text-blue-600" : ""
                }`}
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={openMenu === label}
              >
                {label}
              </Button>
              {/* Actual Dropdown */}
              {openMenu === label && (
                <div
                  onMouseEnter={() => openDropdown(label)}
                  onMouseLeave={delayedClose}
                  className="absolute left-0 top-full mt-2 min-w-[12rem] rounded-xl bg-white shadow-2xl ring-1 ring-blue-200 z-50 animate-fade-in"
                >
                  <ScrollArea className="max-h-56 rounded-md">
                    {submenu.map(item => (
                      <div
                        key={item}
                        tabIndex={0}
                        className="px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 text-gray-900 font-semibold cursor-pointer rounded transition duration-200"
                        role="menuitem"
                      >
                        {item}
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </li>
          ))}
          <li>
            <Button
              variant="link"
              className="text-gray-900 font-semibold px-4 py-2 hover:text-blue-600 transition"
            >
              Sign In
            </Button>
          </li>
          <li className="relative"
            onMouseEnter={() => openDropdown('lang')}
            onMouseLeave={delayedClose}
          >
            <Button
              variant="ghost"
              className={`flex items-center gap-1 text-gray-900 hover:text-blue-600 px-3 py-2 ${openMenu === 'lang' ? "text-blue-600" : ""}`}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={openMenu === 'lang'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.21 0 4 3.582 4 8s-1.79 8-4 8-4-3.582-4-8 1.79-8 4-8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12c0-1.333.667-4 4-4" />
              </svg>
              EN
            </Button>
            {openMenu === 'lang' && (
              <div
                onMouseEnter={() => openDropdown('lang')}
                onMouseLeave={delayedClose}
                className="absolute left-0 top-full mt-2 min-w-[6rem] rounded-xl bg-white shadow-2xl ring-1 ring-blue-200 z-50 animate-fade-in"
              >
                {languageOptions.map((lang) => (
                  <div
                    key={lang}
                    tabIndex={0}
                    className="px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 text-gray-900 font-semibold cursor-pointer rounded transition"
                    role="menuitem"
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </nav>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.22s cubic-bezier(.36,2,.58,.91) forwards;
        }
      `}</style>
    </header>
  );
}
