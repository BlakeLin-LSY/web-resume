"use client";

import { motion } from "framer-motion";
import { Lightbulb, Brain, LineChart, Bot, Cpu } from "lucide-react";

const interests = [
  {
    name: "Deep Learning",
    icon: <Brain className="h-5 w-5 text-primary" />,
    description: "Exploring neural networks and their applications in solving complex problems."
  },
  {
    name: "Computer Vision",
    icon: <Cpu className="h-5 w-5 text-primary" />,
    description: "Developing algorithms for image processing, object detection, and 3D reconstruction."
  },
  {
    name: "Quantum Trading",
    icon: <LineChart className="h-5 w-5 text-primary" />,
    description: "Investigating quantum computing applications in financial markets and trading strategies."
  },
  {
    name: "AI Agents",
    icon: <Bot className="h-5 w-5 text-primary" />,
    description: "Building autonomous agents that can learn, adapt, and interact with their environment."
  },
  {
    name: "Robotics",
    icon: <Bot className="h-5 w-5 text-primary" />,
    description: "Creating intelligent robotic systems that can perceive and interact with the physical world."
  }
];

export default function Interests() {
  return (
    <div className="section-container">
      <motion.div
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <Lightbulb className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Interests</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interests.map((interest, index) => (
          <motion.div
            key={interest.name}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card shadow-md dark:shadow-black/30 rounded-lg p-6 hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2 mb-3">
              {interest.icon}
              <h3 className="text-xl font-semibold">{interest.name}</h3>
            </div>
            <p className="text-muted-foreground">{interest.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}