
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects } from '@/components/projects-section';
import { ProjectEditForm } from '@/components/project-edit-form';

export default function ProjectDetail() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState(() => 
    projects.find(project => project.id === id)
  );
  
  if (!projectData) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-4">The project you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }
  
  const handleSaveProject = (updatedProject: any) => {
    setProjectData(updatedProject);
    setIsEditing(false);
    // In a real app, you would save this to a database
  };
  
  if (isEditing) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => setIsEditing(false)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>
        
        <ProjectEditForm 
          projectId={id || ''}
          onSave={handleSaveProject}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col space-y-4 mb-8 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-between sm:items-center">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        
        <Button 
          variant="outline"
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">{projectData.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{projectData.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {projectData.tags.map((tag: string) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="mb-8 overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            </Card>

            <h2 className="text-xl font-semibold mb-2">Technologies Used</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {projectData.technologies.map((tech: string) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            
            {projectData.link && (
              <Button className="gap-2" asChild>
                <a href={projectData.link} target="_blank" rel="noopener noreferrer">
                  View Live Demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
            <p className="mb-6 text-muted-foreground">{projectData.fullDescription}</p>
            
            <h2 className="text-xl font-semibold mb-2">Challenges & Solutions</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">{projectData.challenges}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
