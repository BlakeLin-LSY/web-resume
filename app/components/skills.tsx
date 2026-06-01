"use client";

import { motion } from "framer-motion";
import { Code, Brain, Wrench, Camera } from "lucide-react";

const skills = {
  programmingLanguages: ["Python", "C++", "Rust", "Kotlin"],
  aiAndAgents: [
    "Context Engineering",
    "Multi-agent Systems",
    "Claude Code / Copilot / Gemini",
    "Codex / Antigravity",
    "MCP Servers",
  ],
  toolsAndFrameworks: [
    "TensorFlow",
    "Nvidia Morpheus",
    "PhysicsNeMo",
    "Docker & Cloud (GCP/AWS)",
    "Git & CI/CD"
  ],
  computerVision: [
    "OpenCV",
    "RealSense",
    "3D Metrology",
    "Signal Analysis & FFT",
    "CFD (OpenFOAM)"
  ]
};

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <Code className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Technical Skills</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">AI & Agent Systems</h3>
          </div>
          <div className="flex flex-wrap">
            {skills.aiAndAgents.map((skill) => (
              <motion.span key={skill} variants={item} className="skill-tag">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Programming Languages</h3>
          </div>
          <div className="flex flex-wrap">
            {skills.programmingLanguages.map((skill) => (
              <motion.span key={skill} variants={item} className="skill-tag">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Tools & Frameworks</h3>
          </div>
          <div className="flex flex-wrap">
            {skills.toolsAndFrameworks.map((skill) => (
              <motion.span key={skill} variants={item} className="skill-tag">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Computer Vision</h3>
          </div>
          <div className="flex flex-wrap">
            {skills.computerVision.map((skill) => (
              <motion.span key={skill} variants={item} className="skill-tag">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}