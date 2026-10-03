"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <div className="section-container">
      <motion.div
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-6"
      >
        <Mail className="h-6 w-6 text-primary" />
        <h2 className="section-heading">Contact Me</h2>
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card shadow-md dark:shadow-black/30 rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:ssu.yuan.lin@gmail.com" className="hover:text-primary transition-colors">
                ssu.yuan.lin@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a href="tel:+886923777015" className="hover:text-primary transition-colors">
                (+886) 923-777-015
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Linkedin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">LinkedIn</p>
              <a 
                href="https://www.linkedin.com/in/ssu-yuan-lin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                linkedin.com/in/ssu-yuan-lin
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}