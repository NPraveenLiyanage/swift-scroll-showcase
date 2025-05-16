
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export const projects = [
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with React and Node.js",
    tags: ["React", "Node.js", "MongoDB"],
    fullDescription: "This comprehensive e-commerce solution features user authentication, product management, shopping cart functionality, and secure payment processing. Built with a React frontend and Node.js backend, it leverages MongoDB for flexible data storage and retrieval.",
    image: "/placeholder.svg",
    challenges: "Implementing real-time inventory updates and optimizing database queries for large product catalogs were significant challenges successfully addressed in this project.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux", "Stripe API", "AWS S3"],
    link: "#"
  },
  {
    id: "portfolio-template",
    title: "Portfolio Template",
    description: "Clean and minimal portfolio template for creative professionals",
    tags: ["HTML/CSS", "JavaScript"],
    fullDescription: "A highly customizable portfolio template designed for creative professionals who need to showcase their work. Features responsive design, dark/light theme options, and animated transitions between sections.",
    image: "/placeholder.svg",
    challenges: "Ensuring a consistent user experience across all devices while maintaining smooth animations and transitions required iterative performance optimization.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP Animation Library", "Responsive Design"],
    link: "#"
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description: "A productivity app to help organize your daily tasks",
    tags: ["React", "Firebase", "Tailwind CSS"],
    fullDescription: "This intuitive task management application helps users organize their daily workflows with features such as task categorization, priority levels, deadline reminders, and progress tracking.",
    image: "/placeholder.svg",
    challenges: "Implementing the drag-and-drop functionality for task reordering while maintaining real-time synchronization across devices was a key technical challenge.",
    technologies: ["React", "Firebase", "Firestore", "Tailwind CSS", "React DnD", "Firebase Authentication"],
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
              key={project.id}
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
                  <Link
                    to={`/project/${project.id}`}
                    className="group inline-flex items-center text-sm font-medium text-primary"
                  >
                    View Project 
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
