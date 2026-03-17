"use client";

import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/siteConfig";

import { NAVIGATION_LINKS } from "./data";

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Nomes do casal */}
          <a
            className="font-script text-2xl md:text-3xl text-primary hover:text-secondary transition-colors"
            href="#inicio"
            onClick={(e) => handleLinkClick(e, "#inicio")}
          >
            {SITE_CONFIG.couple.person1} & {SITE_CONFIG.couple.person2}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAVIGATION_LINKS.map((link) => (
              <a
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                href={link.href}
                key={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            variant="ghost"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAVIGATION_LINKS.map((link) => (
            <a
              className="block px-4 py-3 text-foreground/80 hover:text-primary hover:bg-secondary/10 rounded-lg transition-colors"
              href={link.href}
              key={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
