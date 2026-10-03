"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import caseStudies from "../../content/project-case-studies.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Projects() {
  return (
    <div className="section-container">
      <motion.div
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <FolderGit2 className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Featured Projects</h2>
      </motion.div>
      
      <p className="text-muted-foreground max-w-2xl mb-8">
        Personal projects built around research that is easier to navigate,
        voice workflows that keep the author in control, and developer tools
        with visible assumptions. Explore the problem, the design choice, and
        the result each project produces.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card flex flex-col"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Personal project · Engineering case study
            </p>
            <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">
              {project.card.summary}
            </p>
            <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-2 mb-5">
              {project.card.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-primary/10 border border-primary/20 text-primary px-2.5 py-1 text-xs">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground border-t border-border pt-4 mb-5">
              {project.card.evidence}
            </p>
            <a
              href={`${basePath}/projects/${project.id}.html`}
              className="mt-auto inline-flex items-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              aria-label={`Read the ${project.title} introduction in English or Traditional Chinese`}
            >
              Read introduction
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
