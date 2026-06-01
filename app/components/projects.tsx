"use client";

import { motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <FolderGit2 className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Featured Projects</h2>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="glass-card flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary">
            <FolderGit2 className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Projects Portfolio</h3>
          <p className="text-muted-foreground max-w-md">
            This section is currently being curated. Check back soon for deep dives into my open-source contributions, AI agent workflows, and system architecture projects.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
