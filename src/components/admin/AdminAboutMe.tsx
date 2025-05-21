
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { uploadFile } from '@/utils/fileUpload';
import { Loader2 } from 'lucide-react';

export function AdminAboutMe() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    full_name: '',
    headline: '',
    bio: '',
    location: '',
    email: '',
    phone: '',
  });
  
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const { data, error } = await supabase
          .from('about_me')
          .select('*')
          .single();
          
        if (error) throw error;
        
        setFormData({
          id: data.id,
          full_name: data.full_name || '',
          headline: data.headline || '',
          bio: data.bio || '',
          location: data.location || '',
          email: data.email || '',
          phone: data.phone || '',
        });
        
        setProfilePreview(data.profile_pic_url);
        setResumeFileName(data.resume_url ? data.resume_url.split('/').pop() : null);
      } catch (error) {
        console.error('Error fetching about me data:', error);
        toast.error('Failed to load about me data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAboutMe();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Upload profile picture if changed
      let profilePicUrl = profilePreview;
      if (profilePic) {
        const uploadedUrl = await uploadFile(profilePic, 'portfolio', 'profile');
        if (uploadedUrl) profilePicUrl = uploadedUrl;
      }
      
      // Upload resume if changed
      let resumeUrl = formData.id ? await getResumeUrl() : null;
      if (resume) {
        const uploadedUrl = await uploadFile(resume, 'portfolio', 'resume');
        if (uploadedUrl) resumeUrl = uploadedUrl;
      }
      
      // Update database
      const { error } = await supabase
        .from('about_me')
        .upsert({
          id: formData.id,
          full_name: formData.full_name,
          headline: formData.headline,
          bio: formData.bio,
          location: formData.location,
          email: formData.email,
          phone: formData.phone,
          profile_pic_url: profilePicUrl,
          resume_url: resumeUrl,
          updated_at: new Date().toISOString(),
        });
        
      if (error) throw error;
      
      toast.success('About me information saved successfully!');
    } catch (error) {
      console.error('Error saving about me data:', error);
      toast.error('Failed to save about me data');
    } finally {
      setSaving(false);
    }
  };

  const getResumeUrl = async (): Promise<string | null> => {
    try {
      const { data } = await supabase
        .from('about_me')
        .select('resume_url')
        .eq('id', formData.id)
        .single();
      return data?.resume_url || null;
    } catch (error) {
      console.error('Error getting resume URL:', error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Edit About Me Information</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input 
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Your Full Name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="headline">Headline</Label>
          <Input 
            id="headline"
            name="headline"
            value={formData.headline}
            onChange={handleInputChange}
            placeholder="Your professional headline"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Tell your story..."
            rows={5}
            required
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              placeholder="City, Country"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="flex-1">
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleInputChange}
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="profile_pic">Profile Picture</Label>
          <div className="flex items-center gap-4 mt-2">
            {profilePreview && (
              <img 
                src={profilePreview} 
                alt="Profile preview" 
                className="w-16 h-16 object-cover rounded-full"
              />
            )}
            <Input 
              id="profile_pic"
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="resume">Resume</Label>
          <div className="flex items-center gap-4 mt-2">
            {resumeFileName && (
              <span className="text-sm text-muted-foreground">{resumeFileName}</span>
            )}
            <Input 
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />
          </div>
        </div>
      </div>
      
      <Button type="submit" disabled={saving}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          'Save Changes'
        )}
      </Button>
    </form>
  );
}
