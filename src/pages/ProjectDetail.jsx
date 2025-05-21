
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, GithubIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";

export default function ProjectDetail() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) {
        setProjectData(data);
        document.title = `${data.title} | Portfolio`;
      } else {
        document.title = "Project Not Found | Portfolio";
      }
    };
    fetchProject();
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);

  // Sample project stats for visualization
  const projectStats = [
    { name: "Development", progress: 100 },
    { name: "Design", progress: 100 },
    { name: "Testing", progress: 90 },
    { name: "Documentation", progress: 85 }
  ];

  if (!projectData) {
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
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section with Title - Animated project name on image */}
      <div className="relative w-full" style={{ height: "290px" }}>
        {projectData.image_url && (
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={projectData.image_url}
              alt=""
              className="w-full h-full object-cover pointer-events-none"
              style={{ filter: "blur(0px)" }}
            />
            <div className="absolute inset-0 bg-background/60 pointer-events-none"></div>
          </div>
        )}
        {/* Animated Project Name */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg text-center">
            {projectData.title}
          </h1>
        </motion.div>
      </div>
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>
      
      {/* Tags */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {projectData.tags && projectData.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm px-3 py-1 rounded-full bg-secondary/20">{tag}</Badge>
          ))}
        </div>
      </div>
      
      {/* Main Content - Single Column, No Cards */}
      <main className="container mx-auto px-2 md:px-8 pb-16 my-12">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-12 space-y-24 border border-border/20">
          <section className="py-6 md:py-10">
            <h2 className="text-3xl font-extrabold mb-4 text-foreground">Overview</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {projectData.full_description || projectData.description}
            </p>
          </section>
          <Separator className="my-8" />
          <section className="py-6 md:py-10">
            <h2 className="text-3xl font-extrabold mb-4 text-foreground">Challenges & Solutions</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {projectData.challenges || "Implementing real-time inventory updates and optimizing database queries for large product catalogs were significant challenges successfully addressed in this project."}
            </p>
          </section>
          <Separator className="my-8" />
          {/* Technologies section without animation */}
          <section className="py-6 md:py-10">
            <h2 className="text-3xl font-extrabold mb-4 text-foreground">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {projectData.technologies && projectData.technologies.map((tech) => (
                <Badge key={tech} className="px-4 py-2 text-base rounded-lg flex items-center justify-center">{tech}</Badge>
              ))}
              {(!projectData.technologies || projectData.technologies.length === 0) && (
                <>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">React</Badge>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">Node.js</Badge>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">Express</Badge>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">MongoDB</Badge>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">Redux</Badge>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">Stripe API</Badge>
                  <Badge className="px-4 py-2 text-base rounded-lg bg-secondary/20 flex items-center justify-center">AWS S3</Badge>
                </>
              )}
            </div>
          </section>
          <Separator className="my-8" />
          {/* Project Stats */}
          <section className="py-6 md:py-10">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Project Stats</h2>
            <div className="space-y-8">
              {projectStats.map((stat) => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{stat.name}</span>
                    <span className="text-primary font-bold">{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2 rounded-full bg-secondary/20" />
                </div>
              ))}
            </div>
          </section>
          <Separator className="my-8" />
          {/* Project Timeline */}
          <section className="py-6 md:py-10">
            <h3 className="text-xl font-bold mb-4 text-foreground">Project Timeline</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started:</span>
                <span className="font-medium">Jan 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed:</span>
                <span className="font-medium">Mar 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Update:</span>
                <span className="font-medium">Apr 2023</span>
              </div>
            </div>
          </section>
          <Separator className="my-8" />
          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mt-4">
            {projectData.link && (
              <Button size="lg" className="gap-2 rounded-md" asChild>
                <a href={projectData.link} target="_blank" rel="noopener noreferrer">
                  Visit Project <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            )}
            {projectData.source && (
              <Button size="lg" variant="outline" className="gap-2 rounded-md" asChild>
                <a href={projectData.source} target="_blank" rel="noopener noreferrer">
                  View Source <GithubIcon className="h-4 w-4 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer section remains unchanged */}
      <footer className="py-8 border-t border-border/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 Portfolio. All rights reserved.</p>
          
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Twitter</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <span className="sr-only">Portfolio</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
