
import { motion } from "framer-motion";
import { Award, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

// Define a default placeholder image
const PLACEHOLDER_IMAGE = "/placeholder.svg";

export function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      const { data, error } = await supabase
        .from("certifications") // <-- changed from "achievements" to "certifications"
        .select("*")
        .order("date", { ascending: false });
      if (!error && data) {
        setAchievements(data);
      }
      setLoading(false);
    };
    fetchAchievements();
  }, []);

  const openDialog = (achievement) => {
    setSelectedAchievement(achievement);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <motion.div 
          key={achievement.id || achievement.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex items-start gap-3 p-3 rounded-lg border bg-card"
        >
          <div className="mt-1 text-primary">
            <Award size={20} />
          </div>
          <div className="flex-grow">
            <h4 className="font-medium">{achievement.title}</h4>
            <p className="text-sm text-muted-foreground">{achievement.issuer} • {achievement.date}</p>
          </div>
          <button 
            onClick={() => openDialog(achievement)}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label={`View details for ${achievement.title}`}
          >
            <Eye size={18} />
          </button>
        </motion.div>
      ))}
      
      <Dialog open={!!selectedAchievement} onOpenChange={() => setSelectedAchievement(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedAchievement && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAchievement.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-md overflow-hidden">
                  <img 
                    src={selectedAchievement.image_url || PLACEHOLDER_IMAGE} 
                    alt={selectedAchievement.title} 
                    className="w-full h-40 object-cover" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {selectedAchievement.issuer} • {selectedAchievement.date}
                  </p>
                  <p>{selectedAchievement.details}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
