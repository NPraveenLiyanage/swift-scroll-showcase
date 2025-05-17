
import { motion } from "framer-motion";
import { Timeline } from "./timeline";
import { SkillsVisualization } from "./skills-visualization";
import { ResumeButton } from "./resume-button";
import { TechStack } from "./tech-stack";
import { Achievements } from "./achievements";
import { Card, CardContent } from "./ui/card";
import { FileText, Eye } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";

export function AboutSection() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  
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
          <div className="space-y-6">
            <div className="aspect-square w-full max-w-[300px] mx-auto rounded-full overflow-hidden bg-muted flex items-center justify-center mb-6">
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
            
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium mb-4">Developer Stats</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Projects Completed</span>
                      <span className="font-medium">36+</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Client Satisfaction</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Years Experience</span>
                      <span className="font-medium">5+</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Collapsible open={isStatsOpen} onOpenChange={setIsStatsOpen} className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 border rounded-md bg-card hover:bg-accent transition-colors">
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <span className="font-medium">More About Me</span>
                </div>
                <Eye size={18} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 mt-2 border rounded-md bg-card">
                <p className="text-sm">
                  Beyond coding, I'm passionate about design, photography, and staying updated with the latest tech trends. 
                  I contribute to open-source projects and enjoy mentoring aspiring developers. 
                  When I'm not in front of a screen, you can find me hiking or exploring new cuisines.
                </p>
              </CollapsibleContent>
            </Collapsible>
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
            
            <h3 className="font-medium text-lg mt-8 mb-4">My Tech Stack & Tools</h3>
            <TechStack />
            
            <h3 className="font-medium text-lg mt-8 mb-4">Certifications & Awards</h3>
            <Achievements />
            
            <h3 className="font-medium text-lg mt-8 mb-2">Experience & Education</h3>
            <Timeline />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
