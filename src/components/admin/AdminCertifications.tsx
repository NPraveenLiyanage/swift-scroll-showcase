
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { uploadFile } from '@/utils/fileUpload';
import { Loader2, Plus, Pencil, Trash2, Award } from 'lucide-react';
import { Database } from "@/integrations/supabase/types";

type Certification = Database['public']['Tables']['certifications']['Row'];

export function AdminCertifications() {
  const [loading, setLoading] = useState(true);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [certImage, setCertImage] = useState<File | null>(null);
  const [currentCert, setCurrentCert] = useState<Partial<Certification>>({
    title: '',
    issuer: '',
    date: '',
    details: '',
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      setCertifications(data || []);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentCert(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCertImage(file);
      
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
      let imageUrl = currentCert.image_url || null;
      if (certImage) {
        const uploadedUrl = await uploadFile(certImage, 'portfolio', 'certifications');
        if (uploadedUrl) imageUrl = uploadedUrl;
      }
      
      if (currentCert.id) {
        // Update existing certification
        const { error } = await supabase
          .from('certifications')
          .update({
            ...currentCert,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentCert.id);
          
        if (error) throw error;
        
        toast.success('Certification updated successfully!');
      } else {
        // Create new certification
        const { error } = await supabase
          .from('certifications')
          .insert({
            ...currentCert as any,
            image_url: imageUrl,
          });
          
        if (error) throw error;
        
        toast.success('Certification added successfully!');
      }
      
      // Reset form and close dialog
      resetForm();
      setDialogOpen(false);
      fetchCertifications();
    } catch (error) {
      console.error('Error saving certification:', error);
      toast.error('Failed to save certification');
    } finally {
      setSaving(false);
    }
  };

  const editCertification = (cert: Certification) => {
    setCurrentCert(cert);
    setImagePreview(cert.image_url);
    setDialogOpen(true);
  };

  const deleteCertification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    
    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success('Certification deleted successfully!');
      fetchCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
      toast.error('Failed to delete certification');
    }
  };

  const resetForm = () => {
    setCurrentCert({
      title: '',
      issuer: '',
      date: '',
      details: '',
    });
    setCertImage(null);
    setImagePreview(null);
  };

  const handleNewCertification = () => {
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
        <h2 className="text-xl font-semibold">Certifications & Awards</h2>
        <Button onClick={handleNewCertification}>
          <Plus className="mr-2 h-4 w-4" /> Add Certification
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <Card key={cert.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{cert.title}</h3>
                  <p className="text-sm font-medium">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mb-2">{cert.date}</p>
                  
                  {cert.details && (
                    <p className="text-sm mb-4">{cert.details}</p>
                  )}
                  
                  {cert.image_url && (
                    <img 
                      src={cert.image_url} 
                      alt={cert.title} 
                      className="rounded-md max-h-32 object-contain mb-4" 
                    />
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => editCertification(cert)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteCertification(cert.id)}
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
              {currentCert.id ? 'Edit Certification' : 'Add New Certification'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                name="title"
                value={currentCert.title || ''}
                onChange={handleInputChange}
                placeholder="Certification or Award Title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issuer">Issuer/Organization</Label>
              <Input 
                id="issuer"
                name="issuer"
                value={currentCert.issuer || ''}
                onChange={handleInputChange}
                placeholder="Organization that issued the certification"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                name="date"
                value={currentCert.date || ''}
                onChange={handleInputChange}
                placeholder="May 2022"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="details">Details</Label>
              <Textarea 
                id="details"
                name="details"
                value={currentCert.details || ''}
                onChange={handleInputChange}
                placeholder="Additional information about this certification"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cert_image">Certificate Image</Label>
              {imagePreview && (
                <div className="overflow-hidden mb-2">
                  <img 
                    src={imagePreview} 
                    alt="Certificate preview" 
                    className="h-32 object-contain"
                  />
                </div>
              )}
              <Input 
                id="cert_image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
                ) : currentCert.id ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
