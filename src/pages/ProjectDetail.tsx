
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects } from "@/components/projects-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
          <h1 className="text-3xl font-serif mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-20">
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
              
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">{project.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">{tag}</Badge>
                ))}
              </div>
              
              <div className="mb-8 overflow-hidden rounded-lg border border-border">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-lg mb-8">{project.fullDescription}</p>
                
                <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                <p className="text-lg mb-8">{project.challenges}</p>
                
                <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <Button asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Visit Project
                    <ExternalLink className="ml-2 h-4 w-4" />
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
