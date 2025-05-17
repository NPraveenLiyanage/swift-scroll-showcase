
import { motion } from "framer-motion";
import { Award } from "lucide-react";

const achievements = [
  {
    title: "Certified Web Developer",
    issuer: "Web Development Institute",
    date: "2023"
  },
  {
    title: "Frontend Excellence Award",
    issuer: "React Conference",
    date: "2022"
  },
  {
    title: "Best UI/UX Design",
    issuer: "Design Awards",
    date: "2021"
  }
];

export function Achievements() {
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
          <div>
            <h4 className="font-medium">{achievement.title}</h4>
            <p className="text-sm text-muted-foreground">{achievement.issuer} • {achievement.date}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
