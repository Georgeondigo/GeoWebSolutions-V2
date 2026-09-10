"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-geoweb-indigo/10 text-geoweb-indigo"
      >
        <span className="sr-only">
          {isOpen ? "Close menu" : "Open menu"}
        </span>

        <span className="flex flex-col gap-1.5">
          <span
            className={`block h-px w-5 bg-current transition-transform duration-200 ${
              isOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-opacity duration-200 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-transform duration-200 ${
              isOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="flex h-full flex-col px-6 pb-8 pt-28">
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-geoweb-indigo/10 py-5 text-3xl font-display font-normal text-geoweb-text"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto">
              <Button
                href="/contact"
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Start a project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}