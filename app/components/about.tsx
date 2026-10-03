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
            I am an AI Software Engineer with 3+ years of professional software and algorithm experience and an M.S. in Physics. My work spans model-training pipelines, optical inspection, stereo 3D measurement, and hardware integration. I have diagnosed training bottlenecks, improved inspection cycle time and measurement accuracy, and helped advance a multi-camera MVP to factory-ready production testing.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mt-4">
            My personal projects explore a related question: how can an AI-assisted workflow leave a result people can inspect and use? I build research-reading tools, a local voice-to-text workflow, and developer utilities with explicit assumptions and visible failure states. These projects complement my professional work and ongoing peer learning.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
