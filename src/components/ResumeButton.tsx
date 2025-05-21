
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function ResumeButton() {
  const { toast } = useToast();
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('about_me')
          .select('resume_url')
          .single();
          
        if (error) throw error;
        
        setResumeUrl(data?.resume_url || null);
      } catch (error) {
        console.error('Error fetching resume URL:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResumeUrl();
  }, []);
  
  const handleDownload = () => {
    if (!resumeUrl) {
      toast({
        title: "Resume not available",
        description: "The resume file is not available for download at this time.",
      });
      return;
    }
    
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume.pdf'; // Will use the server's filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Resume download started",
      description: "Your download should begin shortly.",
    });
  };
  
  return (
    <Button 
      onClick={handleDownload}
      variant="outline" 
      className="flex items-center gap-2 border-primary/20 hover:border-primary/80 transition-colors group"
      disabled={loading || !resumeUrl}
    >
      <Download size={16} className="group-hover:animate-bounce" />
      Download Resume
    </Button>
  );
}
