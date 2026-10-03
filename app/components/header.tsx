"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Life Devotions", href: "#life-devotions" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="section-container flex items-center justify-between h-16">
        <a href="#top" className="font-bold text-xl text-primary">Blake Lin</a>
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {navItems.map(item => <a key={item.href} href={item.href} className="px-3 py-2 rounded-md text-sm hover:bg-secondary">{item.name}</a>)}
          <ThemeToggle />
        </nav>
        <div className="flex items-center md:hidden gap-2">
          <ThemeToggle />
          <button ref={menuButton} type="button" aria-label="Menu"
            aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="p-2 rounded-md hover:bg-secondary">
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className="md:hidden bg-background section-container pb-4">
        {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block px-3 py-2">{item.name}</a>)}
      </nav>
      <noscript><nav aria-label="Navigation without JavaScript" className="section-container flex flex-wrap gap-3 md:hidden bg-background py-2">
        {navItems.map(item => <a key={item.href} href={item.href}>{item.name}</a>)}
      </nav></noscript>
    </header>
  );
}
