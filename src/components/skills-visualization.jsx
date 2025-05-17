
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const skills = [
  { name: "UX/UI Design", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 92 },
  { name: "Node.js", level: 80 },
  { name: "Figma", level: 88 },
  { name: "TypeScript", level: 82 }
];

export function SkillsVisualization() {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{skill.name}</span>
            <span className="text-sm text-muted-foreground">{skill.level}%</span>
          </div>
          <Progress value={skill.level} className="h-2" />
        </motion.div>
      ))}
    </div>
  );
}
