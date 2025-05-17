
import { motion } from "framer-motion";
import { Timeline } from "./timeline";
import { SkillsVisualization } from "./skills-visualization";
import { ResumeButton } from "./resume-button";

export function AboutSection() {
  return (
    <section id="about" className="container-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="animate-fade-in"
      >
        <h2 className="section-title">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="aspect-square w-full max-w-[300px] mx-auto rounded-full overflow-hidden bg-muted flex items-center justify-center mb-6 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground/60"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          
          <div>
            <p className="text-lg mb-4">
              Hello! I'm a passionate designer and developer focused on creating
              beautiful, functional digital experiences.
            </p>
            <p className="mb-6 text-muted-foreground">
              With over 5 years of experience in web development and design, I
              specialize in building modern, responsive websites and applications
              that deliver exceptional user experiences.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <ResumeButton />
            </div>

            <h3 className="font-medium text-lg mb-4">Skills</h3>
            <SkillsVisualization />
            
            <h3 className="font-medium text-lg mt-8 mb-2">Experience & Education</h3>
            <Timeline />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
