
import { motion } from "framer-motion";
import { Award, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const achievements = [
  {
    title: "Certified Web Developer",
    issuer: "Web Development Institute",
    date: "2023",
    details: "Certification in modern web development technologies including React, Node.js, and database management.",
    image: "/placeholder.svg"
  },
  {
    title: "Frontend Excellence Award",
    issuer: "React Conference",
    date: "2022",
    details: "Recognized for outstanding contributions to frontend development and innovative UI solutions.",
    image: "/placeholder.svg"
  },
  {
    title: "Best UI/UX Design",
    issuer: "Design Awards",
    date: "2021",
    details: "Awarded for exceptional user interface design and user experience implementation.",
    image: "/placeholder.svg"
  }
];

export function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  
  const openDialog = (achievement) => {
    setSelectedAchievement(achievement);
  };

  return (
    <div className="space-y-4">
      {achievements.map((achievement, index) => (
        <motion.div 
          key={achievement.title}
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
                    src={selectedAchievement.image} 
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
