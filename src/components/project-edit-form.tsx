
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { showToast } from '@/hooks/use-toast';
import { projects } from '@/components/projects-section';

type ProjectFormValues = {
  title: string;
  description: string;
  fullDescription: string;
  challenges: string;
  tags: string[];
  technologies: string[];
  link: string;
};

type ProjectEditFormProps = {
  projectId: string;
  onSave: (updatedProject: any) => void;
  onCancel: () => void;
};

export function ProjectEditForm({ projectId, onSave, onCancel }: ProjectEditFormProps) {
  const project = projects.find(p => p.id === projectId);
  const navigate = useNavigate();
  
  const [newTag, setNewTag] = useState('');
  const [newTech, setNewTech] = useState('');
  
  const form = useForm<ProjectFormValues>({
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      fullDescription: project?.fullDescription || '',
      challenges: project?.challenges || '',
      tags: project?.tags || [],
      technologies: project?.technologies || [],
      link: project?.link || '#',
    },
  });
  
  const { tags, technologies } = form.watch();
  
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      form.setValue('tags', [...tags, newTag]);
      setNewTag('');
    }
  };
  
  const removeTag = (tag: string) => {
    form.setValue('tags', tags.filter(t => t !== tag));
  };
  
  const addTech = () => {
    if (newTech && !technologies.includes(newTech)) {
      form.setValue('technologies', [...technologies, newTech]);
      setNewTech('');
    }
  };
  
  const removeTech = (tech: string) => {
    form.setValue('technologies', technologies.filter(t => t !== tech));
  };
  
  const onSubmit = (data: ProjectFormValues) => {
    const updatedProject = {
      ...project,
      ...data,
    };
    
    onSave(updatedProject);
    showToast('Project updated', 'Your project has been successfully updated');
    
    // In a real app, you would save this to a database
    // For now, we'll just navigate back to the project detail
    navigate(`/project/${projectId}`);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type="button" onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <FormLabel>Technologies</FormLabel>
              <div className="flex gap-2 mb-2">
                <Input 
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add a technology"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTech();
                    }
                  }}
                />
                <Button type="button" onClick={addTech}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="outline" className="flex items-center gap-1">
                    {tech}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeTech(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
