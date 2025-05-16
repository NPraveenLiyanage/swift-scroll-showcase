
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ResumeButton() {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // In a real application, this would link to an actual resume file
    // For demo purposes, we'll just show a toast notification
    toast({
      title: "Resume download",
      description: "Your resume would download here. Add a real file path to enable actual downloads.",
    });
    
    // Uncomment this in a real application with an actual resume file
    // const link = document.createElement('a');
    // link.href = '/path-to-your-resume.pdf';
    // link.download = 'Your_Name_Resume.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };
  
  return (
    <Button 
      onClick={handleDownload}
      variant="outline" 
      className="flex items-center gap-2 border-primary/20 hover:border-primary/80 transition-colors group"
    >
      <Download size={16} className="group-hover:animate-bounce" />
      Download Resume
    </Button>
  );
}
