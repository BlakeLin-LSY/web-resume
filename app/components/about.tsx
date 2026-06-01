"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function About() {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <User className="h-6 w-6 text-primary" />
        <h2 className="section-heading">About Me</h2>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="glass-card">
          <p className="text-base sm:text-lg leading-relaxed">
            I am an AI Software Engineer with a proven track record of delivering systems from MVP to factory-grade production. With an M.S. in Physics and deep expertise in signal processing and physical system modeling, I possess strong rapid domain transfer capabilities—successfully shipping cybersecurity, CFD simulation, and 3D metrology pipelines within months of onboarding. I am passionate about designing robust agentic workflows, multi-agent systems, and scalable ML infrastructures with a strong bias toward measurable outcomes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}