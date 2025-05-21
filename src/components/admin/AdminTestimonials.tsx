
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { uploadFile } from '@/utils/fileUpload';
import { Loader2, Plus, Pencil, Trash2, Quote } from 'lucide-react';
import { Database } from "@/integrations/supabase/types";

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

export function AdminTestimonials() {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({
    text: '',
    author: '',
    role: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTestimonial(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Upload image if provided
      let imageUrl = currentTestimonial.image_url || null;
      if (avatarImage) {
        const uploadedUrl = await uploadFile(avatarImage, 'portfolio', 'testimonials');
        if (uploadedUrl) imageUrl = uploadedUrl;
      }
      
      if (currentTestimonial.id) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            ...currentTestimonial,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentTestimonial.id);
          
        if (error) throw error;
        
        toast.success('Testimonial updated successfully!');
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert({
            ...currentTestimonial as any,
            image_url: imageUrl,
          });
          
        if (error) throw error;
        
        toast.success('Testimonial added successfully!');
      }
      
      // Reset form and close dialog
      resetForm();
      setDialogOpen(false);
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const editTestimonial = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setImagePreview(testimonial.image_url);
    setDialogOpen(true);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Testimonial deleted successfully!');
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast.error('Failed to delete testimonial');
    }
  };

  const resetForm = () => {
    setCurrentTestimonial({
      text: '',
      author: '',
      role: '',
    });
    setAvatarImage(null);
    setImagePreview(null);
  };

  const handleNewTestimonial = () => {
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
        <h2 className="text-xl font-semibold">Testimonials</h2>
        <Button onClick={handleNewTestimonial}>
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="mb-4 text-primary flex-shrink-0">
                  <Quote className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <p className="italic mb-4">{testimonial.text}</p>
                  
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {testimonial.image_url ? (
                        <AvatarImage src={testimonial.image_url} alt={testimonial.author} />
                      ) : null}
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => editTestimonial(testimonial)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteTestimonial(testimonial.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
              {currentTestimonial.id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text">Testimonial Text</Label>
              <Textarea 
                id="text"
                name="text"
                value={currentTestimonial.text || ''}
                onChange={handleInputChange}
                placeholder="What the person said about you"
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author Name</Label>
              <Input 
                id="author"
                name="author"
                value={currentTestimonial.author || ''}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position</Label>
              <Input 
                id="role"
                name="role"
                value={currentTestimonial.role || ''}
                onChange={handleInputChange}
                placeholder="CEO, Company Name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avatar_image">Person's Photo</Label>
              <div className="flex items-center gap-4 mb-2">
                {imagePreview && (
                  <Avatar>
                    <AvatarImage src={imagePreview} alt="Preview" />
                    <AvatarFallback>{currentTestimonial.author?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <Input 
                  id="avatar_image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
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
                ) : currentTestimonial.id ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
