
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { uploadFile } from '@/utils/fileUpload';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];

// Add this interface to extend the Project type
interface ProjectFormData extends Partial<Project> {
  tagsInput?: string;
  technologiesInput?: string;
}

export function AdminProjects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  // Update the type here
  const [currentProject, setCurrentProject] = useState<ProjectFormData>({
    title: '',
    description: '',
    full_description: '',
    tags: [],
    technologies: [],
    tagsInput: '',
    technologiesInput: '',
    link: '',
    challenges: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject(prev => ({ ...prev, [name]: value }));
  };

  // Replace the handleArrayInput function with these two separate functions
  const handleTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentProject(prev => ({ ...prev, tagsInput: value }));
  };

  const handleTechnologiesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCurrentProject(prev => ({ ...prev, technologiesInput: value }));
  };

  // Add this to your handleSubmit function before the supabase calls
  const prepareProjectData = () => {
    const tags = currentProject.tagsInput 
      ? currentProject.tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
      : currentProject.tags || [];
      
    const technologies = currentProject.technologiesInput
      ? currentProject.technologiesInput.split(',').map(tech => tech.trim()).filter(Boolean)
      : currentProject.technologies || [];
      
    return {
      ...currentProject,
      tags,
      technologies,
      tagsInput: undefined,
      technologiesInput: undefined
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Prepare data with properly processed arrays
      const projectData = prepareProjectData();
      
      // Upload image if provided
      let imageUrl = currentProject.image_url || null;
      if (projectImage) {
        const uploadedUrl = await uploadFile(projectImage, 'portfolio', 'projects');
        if (uploadedUrl) imageUrl = uploadedUrl;
      }
      
      if (currentProject.id) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            ...projectData,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentProject.id);
          
        if (error) throw error;
        
        toast.success('Project updated successfully!');
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert({
            ...projectData as any,
            image_url: imageUrl,
          });
          
        if (error) throw error;
        
        toast.success('Project added successfully!');
      }
      
      // Reset form and close dialog
      resetForm();
      setDialogOpen(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  // Update the editProject function to set the input fields
  const editProject = (project: Project) => {
    setCurrentProject({
      ...project,
      tagsInput: project.tags.join(', '),
      technologiesInput: project.technologies.join(', ')
    });
    setImagePreview(project.image_url);
    setDialogOpen(true);
  };

  // Update the resetForm function to clear the input fields
  const resetForm = () => {
    setCurrentProject({
      title: '',
      description: '',
      full_description: '',
      tags: [],
      technologies: [],
      tagsInput: '',
      technologiesInput: '',
      link: '',
      challenges: '',
    });
    setProjectImage(null);
    setImagePreview(null);
  };

  const handleNewProject = () => {
    resetForm();
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button onClick={handleNewProject}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardContent className="p-0">
              {project.image_url && (
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => editProject(project)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={async () => {
                      if (!confirm('Are you sure you want to delete this project?')) return;
                      try {
                        const { error } = await supabase
                          .from('projects')
                          .delete()
                          .eq('id', project.id);
                        if (error) throw error;
                        toast.success('Project deleted successfully');
                        fetchProjects();
                      } catch (error) {
                        console.error('Error deleting project:', error);
                        toast.error('Failed to delete project');
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentProject.id ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={currentProject.title || ''}
                    onChange={handleInputChange}
                    placeholder="Enter project title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Input 
                    id="description"
                    name="description"
                    value={currentProject.description || ''}
                    onChange={handleInputChange}
                    placeholder="Brief project description"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="link">Project Link</Label>
                  <Input 
                    id="link"
                    name="link"
                    value={currentProject.link || ''}
                    onChange={handleInputChange}
                    placeholder="https://yourproject.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags"
                    name="tags"
                    value={currentProject.tagsInput !== undefined 
                      ? currentProject.tagsInput 
                      : Array.isArray(currentProject.tags) ? currentProject.tags.join(', ') : ''}
                    onChange={handleTagsInput}
                    placeholder="UI/UX, Web App, Mobile"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input 
                    id="technologies"
                    name="technologies"
                    value={currentProject.technologiesInput !== undefined 
                      ? currentProject.technologiesInput 
                      : Array.isArray(currentProject.technologies) ? currentProject.technologies.join(', ') : ''}
                    onChange={handleTechnologiesInput}
                    placeholder="React, TypeScript, Node.js"
                    required
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_description">Full Description</Label>
                  <Textarea 
                    id="full_description"
                    name="full_description"
                    value={currentProject.full_description || ''}
                    onChange={handleInputChange}
                    placeholder="Detailed project description"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges</Label>
                  <Textarea 
                    id="challenges"
                    name="challenges"
                    value={currentProject.challenges || ''}
                    onChange={handleInputChange}
                    placeholder="Challenges faced during this project"
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project_image">Project Image</Label>
                  {imagePreview && (
                    <div className="aspect-video w-full max-h-48 overflow-hidden mb-2">
                      <img 
                        src={imagePreview} 
                        alt="Project preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <Input 
                    id="project_image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProjectImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : currentProject.id ? 'Update Project' : 'Add Project'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
