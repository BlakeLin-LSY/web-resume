"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Senior AI Engineer @ DynaSafe Corp.",
    period: "Jan 2026 - Apr 2026",
    description: [
      "Profiled and debugged dataloader bottleneck using AI-assisted tooling, achieving 10x model training speedup",
      "Built and adapted a PCAP network anomaly detection pipeline using Nvidia Morpheus for cybersecurity threat detection",
      "Adapted model training scripts for an OpenFOAM CFD simulation usecase using Nvidia PhysicsNeMo",
      "Shipped cybersecurity and physical simulation pipelines within 1-month timeframes each"
    ]
  },
  {
    title: "AI Agent Side Project - Blake Fleet",
    period: "Apr 2026 - Present",
    description: [
      "Designed and built a multi-agent coworking architecture (Claude Code, GitHub Copilot, Gemini CLI, Codex, Antigravity)",
      "Implemented a shared memory system and explicit cross-agent handoff protocol",
      "Enforced agent governance reliably using structural hooks (pre-commit, PreToolUse interceptors)",
      "Designed multi-platform agent command routing for mobile-triggered CLI agent execution"
    ]
  },
  {
    title: "Study Group with Former LIPS Colleagues",
    period: "Jan 2021 - Present",
    description: [
      "Weekly peer-learning sessions spanning CoT, LoRA, 3D-Gaussian Splatting, SORA, Mamba, World Models, and VLMs",
      "Sustained multi-year practice across ML theory and emerging research"
    ]
  },
  {
    title: "Software Engineer @ MetGauge Co., Ltd.",
    period: "Sep 2023 - Aug 2024",
    description: [
      "Spearheaded transition of MVP algorithms to factory-ready production testing for a 3D measurement system (C++/Python)",
      "Led system design, hardware integration, and boundary condition exploration for a 12-stereo-camera production line",
      "Designed test specifications and evaluated success metrics to drive cross-functional hardware tuning"
    ]
  },
  {
    title: "Algorithm Engineer @ UTECHZONE Corp.",
    period: "Jun 2021 - Mar 2022",
    description: [
      "Developed Automated Optical Inspection (AOI) algorithm achieving 40% cycle time reduction on manufacturing lines (C#)",
      "Mentored 2 new engineers and collaborated with cross-functional team of 10+ to hit project milestones"
    ]
  },
  {
    title: "Software Engineer @ LIPS Corporation",
    period: "Jul 2019 - Apr 2020",
    description: [
      "Optimized stereo-camera real-time 3D metrology algorithms, improving measurement accuracy by 66%",
      "Conducted camera calibration for Intel RealSense D415/D435"
    ]
  },
  {
    title: "Software Engineer @ MetGauge Co., Ltd.",
    period: "Sep 2023 - Aug 2024",
    description: [
      "Actively developed and tested a 3D measurement and calibration system for a 12-stereo camera setup using C++ and Python",
      "Developed an advanced measurement machine to replace human presence in high-risk factory zones, enhancing safety and efficiency"
    ]
  },
  {
    title: "Algorithm Engineer @ UTECHZONE Co., Ltd.",
    period: "June 2021 - March 2022",
    description: [
      "Developed Automated Optical Inspection algorithm using C#",
      "Conducted testing and optimization of the algorithm (40% time reduced)",
      "Mentored two new team members and worked closely with a team of over 10 individuals to achieve project goals"
    ]
  },
  {
    title: "Software Engineer @ LIPS Corporation",
    period: "July 2019 - April 2020",
    description: [
      "Developed 3D metrology algorithm using stereo camera using C++",
      "Conducted camera calibration of Intel RealSense D415 | D435",
      "Optimized real-time 3D metrology algorithm (66% accuracy improved)"
    ]
  },
  {
    title: "Research Assistant @ National Central University",
    period: "Sep 2018 - Jan 2019",
    description: [
      "Conducted single-cell experiments using high-speed cameras with dark-field microscopy",
      "Performed particle tracking on large datasets of microscopy images"
    ]
  }
];

export default function Experience() {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <Briefcase className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Work Experience</h2>
      </motion.div>
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="timeline-item"
          >
            <div className="glass-card">
              <h3 className="text-xl font-semibold text-primary">{exp.title}</h3>
              <div className="flex items-center gap-1 text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>{exp.period}</span>
              </div>
              <ul className="space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2 shadow-[0_0_8px_rgba(59,130,246,0.5)] rounded-full">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}