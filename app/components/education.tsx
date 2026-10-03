"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    degree: "Master of Science (MS) - Physics",
    institution: "National Central University",
    period: "2016 - 2018"
  },
  {
    degree: "Bachelor of Science (BS) - Physics",
    institution: "National Central University",
    period: "2012 - 2016"
  }
];

export default function Education() {
  return (
    <div className="section-container">
      <motion.div
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <GraduationCap className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Education</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card shadow-md dark:shadow-black/30 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
            <p className="text-lg mb-2">{edu.institution}</p>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{edu.period}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}