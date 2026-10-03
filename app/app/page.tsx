"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Education from "@/components/education";
import Contact from "@/components/contact";
import LifeDevotions from "@/components/life-devotions";
import Interests from "@/components/interests";

export default function Home() {
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [experienceRef, experienceInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [educationRef, educationInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [interestsRef, interestsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [devotionsRef, devotionsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="min-h-screen">
      <Hero />
      
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="about"
        className="py-16 bg-secondary/30 dark:bg-secondary/10"
      >
        <About />
      </motion.div>
      
      <motion.div
        ref={skillsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="skills"
        className="py-16"
      >
        <Skills />
      </motion.div>
      
      <motion.div
        ref={projectsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="projects"
        className="py-16 scroll-mt-16 bg-secondary/30 dark:bg-secondary/10"
      >
        <Projects />
      </motion.div>
      
      <motion.div
        ref={experienceRef}
        initial={{ opacity: 0, y: 50 }}
        animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="experience"
        className="py-16"
      >
        <Experience />
      </motion.div>
      
      <motion.div
        ref={educationRef}
        initial={{ opacity: 0, y: 50 }}
        animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="education"
        className="py-16"
      >
        <Education />
      </motion.div>
      
      <motion.div
        ref={interestsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={interestsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="interests"
        className="py-16 bg-secondary/30 dark:bg-secondary/10"
      >
        <Interests />
      </motion.div>
      
      <motion.div
        ref={devotionsRef}
        initial={{ opacity: 0, y: 50 }}
        animate={devotionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="life-devotions"
        className="py-16"
      >
        <LifeDevotions />
      </motion.div>
      
      <motion.div
        ref={contactRef}
        initial={{ opacity: 0, y: 50 }}
        animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        id="contact"
        className="py-16 bg-secondary/30 dark:bg-secondary/10"
      >
        <Contact />
      </motion.div>
    </main>
  );
}
