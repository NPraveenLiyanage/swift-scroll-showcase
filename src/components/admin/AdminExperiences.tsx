
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { Database } from "@/integrations/supabase/types";

type Experience = Database['public']['Tables']['experiences']['Row'];

export function AdminExperiences() {
  const [loading, setLoading] = useState(true);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Partial<Experience>>({
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    type: 'work', // default to work experience
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });
        
      if (error) throw error;
      
      setExperiences(data || []);
    } catch (error) {
      console.error('Error fetching experiences:', error);
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentExperience(prev => ({ 
      ...prev, 
      is_current: checked,
      end_date: checked ? null : prev.end_date
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (currentExperience.id) {
        // Update existing experience
        const { error } = await supabase
          .from('experiences')
          .update({
            ...currentExperience,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentExperience.id);
          
        if (error) throw error;
        
        toast.success('Experience updated successfully!');
      } else {
        // Create new experience
        const { error } = await supabase
          .from('experiences')
          .insert({
            ...currentExperience as any,
          });
          
        if (error) throw error;
        
        toast.success('Experience added successfully!');
      }
      
      // Reset form and close dialog
      resetForm();
      setDialogOpen(false);
      fetchExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const editExperience = (experience: Experience) => {
    setCurrentExperience(experience);
    setDialogOpen(true);
  };

  const deleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Experience deleted successfully!');
      fetchExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
      toast.error('Failed to delete experience');
    }
  };

  const resetForm = () => {
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      type: 'work',
    });
  };

  const handleNewExperience = () => {
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
        <h2 className="text-xl font-semibold">Experience & Education</h2>
        <Button onClick={handleNewExperience}>
          <Plus className="mr-2 h-4 w-4" /> Add Experience
        </Button>
      </div>
      
      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1 gap-2">
                    <h3 className="text-lg font-semibold">{experience.title}</h3>
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md">
                      {experience.type === 'work' ? 'Work' : 'Education'}
                    </span>
                  </div>
                  <p className="text-base font-medium">{experience.company}</p>
                  {experience.location && (
                    <p className="text-sm text-muted-foreground">{experience.location}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">
                    {experience.start_date} - {experience.is_current ? 'Present' : experience.end_date}
                  </p>
                  {experience.description && (
                    <p className="mt-2 text-sm">{experience.description}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => editExperience(experience)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => deleteExperience(experience.id)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentExperience.id ? 'Edit Experience' : 'Add New Experience'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={currentExperience.type}
                onValueChange={(value) => setCurrentExperience(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work Experience</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">
                {currentExperience.type === 'work' ? 'Job Title' : 'Degree/Program'}
              </Label>
              <Input 
                id="title"
                name="title"
                value={currentExperience.title || ''}
                onChange={handleInputChange}
                placeholder={currentExperience.type === 'work' ? "Software Engineer" : "Bachelor of Science"}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">
                {currentExperience.type === 'work' ? 'Company' : 'Institution'}
              </Label>
              <Input 
                id="company"
                name="company"
                value={currentExperience.company || ''}
                onChange={handleInputChange}
                placeholder={currentExperience.type === 'work' ? "Company Name" : "University Name"}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                name="location"
                value={currentExperience.location || ''}
                onChange={handleInputChange}
                placeholder="City, Country"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date</Label>
                <Input 
                  id="start_date"
                  name="start_date"
                  value={currentExperience.start_date || ''}
                  onChange={handleInputChange}
                  placeholder="May 2020"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date</Label>
                <Input 
                  id="end_date"
                  name="end_date"
                  value={currentExperience.end_date || ''}
                  onChange={handleInputChange}
                  placeholder="June 2022"
                  disabled={currentExperience.is_current}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="is_current"
                checked={currentExperience.is_current || false}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="is_current">
                {currentExperience.type === 'work' ? 'I currently work here' : 'I am currently studying here'}
              </Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={currentExperience.description || ''}
                onChange={handleInputChange}
                placeholder="Describe your role or studies"
                rows={4}
              />
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
                ) : currentExperience.id ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
