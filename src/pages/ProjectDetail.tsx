
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/components/projects-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);
  
  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Portfolio`;
    } else {
      document.title = "Project Not Found | Portfolio";
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [project]);
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl font-serif mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sample project stats for visualization
  const projectStats = [
    { name: "Development", progress: 100 },
    { name: "Design", progress: 100 },
    { name: "Testing", progress: 90 },
    { name: "Documentation", progress: 85 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Image Banner */}
        <div className="w-full h-[40vh] bg-secondary/30 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="w-full h-full bg-secondary/70 absolute z-10" />
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold font-serif text-center text-white drop-shadow-lg"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/#projects" 
                className="inline-flex items-center text-sm text-muted-foreground mb-8 hover:text-primary transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">{tag}</Badge>
                ))}
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                  <p className="text-lg mb-8">{project.fullDescription}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                  <p className="text-lg mb-8">{project.challenges}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Project Stats</h2>
                  <div className="space-y-4 mb-8">
                    {projectStats.map((stat, index) => (
                      <div key={stat.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{stat.name}</span>
                          <span>{stat.progress}%</span>
                        </div>
                        <Progress value={stat.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} className="py-1.5">{tech}</Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <Separator className="my-8" />
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Visit Project
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View Source
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
