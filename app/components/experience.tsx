"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const professionalExperiences = [
  {
    title: "Senior AI Engineer @ DynaSafe Corp.",
    period: "Jan 2026 - Apr 2026",
    description: [
      "Unblocked model iteration by profiling a dataloader bottleneck, tracing its root cause, and rebuilding the training data pipeline; achieved a 10× model-training speedup.",
      "Studied and adapted Nvidia Morpheus to build a network-anomaly detection workflow using real PCAP capture data.",
      "Ran and adapted Nvidia PhysicsNeMo training scripts for an OpenFOAM CFD use case in Omniverse. Built working cybersecurity and physical-simulation workflows within about one month each."
    ]
  },
  {
    title: "Software Engineer @ MetGauge Co., Ltd.",
    period: "Sep 2023 - Aug 2024",
    description: [
      "Advanced a C++/Python 3D-measurement MVP to factory-ready production testing.",
      "Led system design, hardware integration, and boundary-condition exploration for a 12-stereo-camera production line.",
      "Defined test specifications, evaluated success metrics, and produced data-analysis reports for cross-functional hardware tuning."
    ]
  },
  {
    title: "Algorithm Engineer @ UTECHZONE Corp.",
    period: "Jun 2021 - Mar 2022",
    description: [
      "Developed C# Automated Optical Inspection (AOI) algorithms, achieving a 40% reduction in manufacturing-line inspection cycle time.",
      "Mentored 2 new engineers and worked with a cross-functional team of 10+ on project-integration milestones."
    ]
  },
  {
    title: "Software Engineer @ LIPS Corporation",
    period: "Jul 2019 - Apr 2020",
    description: [
      "Optimized real-time stereo 3D-metrology algorithms, improving measurement accuracy by 66%.",
      "Calibrated Intel RealSense D415/D435 cameras as part of the measurement work."
    ]
  }
];

const researchAndLearning = [
  {
    title: "Research Assistant @ National Central University",
    period: "Sep 2018 - Jan 2019",
    description: [
      "Studied bacterial flagellar motors using high-speed cameras and dark-field microscopy.",
      "Performed particle tracking on large microscopy-image datasets."
    ]
  },
  {
    title: "Peer Learning with Former LIPS Colleagues",
    period: "Jan 2021 - Present",
    description: [
      "Participate in remote weekly peer-learning sessions on ML theory and emerging research.",
      "Topics include CoT, LoRA, 3D Gaussian Splatting, Mamba, World Models, and VLMs."
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
        <h2 className="section-heading">Experience</h2>
      </motion.div>
      
      {[
        { heading: "Professional Engineering", entries: professionalExperiences },
        { heading: "Research & Ongoing Learning", entries: researchAndLearning }
      ].map((group) => (
      <div key={group.heading} className="mb-10">
        <h3 className="text-xl font-semibold mb-6">{group.heading}</h3>
        <div className="space-y-6">
        {group.entries.map((exp, index) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="timeline-item"
          >
            <div className="glass-card">
              <h4 className="text-xl font-semibold text-primary">{exp.title}</h4>
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
      ))}
    </div>
  );
}
