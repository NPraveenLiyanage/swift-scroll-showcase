
import { motion } from "framer-motion";

const technologies = [
  {
    category: "Frontend",
    items: ["React", "JavaScript", "HTML5", "CSS3", "TailwindCSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "REST API"]
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Figma", "Webpack", "npm"]
  }
];

export function TechStack() {
  return (
    <div className="space-y-6">
      {technologies.map((tech, categoryIndex) => (
        <motion.div
          key={tech.category}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-medium mb-3">{tech.category}</h4>
          <div className="flex flex-wrap gap-2">
            {tech.items.map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 + categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
