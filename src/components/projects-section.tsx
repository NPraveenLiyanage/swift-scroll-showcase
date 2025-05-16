
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js",
    tags: ["React", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    title: "Portfolio Template",
    description: "Clean and minimal portfolio template for creative professionals",
    tags: ["HTML/CSS", "JavaScript"],
    link: "#"
  },
  {
    title: "Task Manager",
    description: "A productivity app to help organize your daily tasks",
    tags: ["React", "Firebase", "Tailwind CSS"],
    link: "#"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="container-section bg-secondary/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Projects</h2>
        <p className="text-muted-foreground mb-8 max-w-lg">
          Here are some of my recent projects. Each reflects my passion for clean design
          and efficient development.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <a
                    href={project.link}
                    className="group inline-flex items-center text-sm font-medium text-primary"
                  >
                    View Project 
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
