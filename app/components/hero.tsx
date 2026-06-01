"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/10 to-background dark:from-indigo-500/10 dark:via-purple-500/5 dark:to-background"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      <div className="section-container relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            SSU-YUAN LIN
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">(Blake)</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl md:text-3xl font-medium text-primary">
            AI Software Engineer
          </h2>
          <p className="text-lg mt-2 max-w-2xl text-muted-foreground px-4">
            LLM Agents & System Architecture | Specializing in applied AI, complex autonomous workflows, and scalable AI infrastructure.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-24"
        >
          <a
            href="mailto:ssu.yuan.lin@gmail.com"
            className="flex items-center gap-2 bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground px-4 py-2 rounded-md transition-colors"
          >
            <Mail size={18} />
            <span>ssu.yuan.lin@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/ssu-yuan-lin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary hover:bg-primary text-secondary-foreground hover:text-primary-foreground px-4 py-2 rounded-md transition-colors"
          >
            <Linkedin size={18} />
            <span>LinkedIn</span>
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="absolute bottom-12 md:bottom-10"
        >
          <motion.a
            href="#about"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}