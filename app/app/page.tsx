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
  return (
    <main id="top" className="min-h-screen">
      <Hero />
      <section id="about" className="py-16 bg-secondary/30 dark:bg-secondary/10"><About /></section>
      <section id="skills" className="py-16"><Skills /></section>
      <section id="projects" className="py-16 bg-secondary/30 dark:bg-secondary/10"><Projects /></section>
      <section id="experience" className="py-16"><Experience /></section>
      <section id="education" className="py-16"><Education /></section>
      <section id="interests" className="py-16 bg-secondary/30 dark:bg-secondary/10"><Interests /></section>
      <section id="life-devotions" className="py-16"><LifeDevotions /></section>
      <section id="contact" className="py-16 bg-secondary/30 dark:bg-secondary/10"><Contact /></section>
    </main>
  );
}
