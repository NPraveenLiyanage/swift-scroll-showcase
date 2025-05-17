
import { motion } from "framer-motion";
import { CalendarDays, Briefcase, GraduationCap } from "lucide-react";

const timelineItems = [
  {
    year: "2022 - Present",
    title: "Senior Frontend Developer",
    description: "Working on enterprise-scale React applications with modern tech stack.",
    type: "work"
  },
  {
    year: "2019 - 2022",
    title: "Frontend Developer",
    description: "Developed responsive web applications using React and TypeScript.",
    type: "work"
  },
  {
    year: "2018 - 2019",
    title: "UI/UX Designer",
    description: "Created user interfaces and experiences for web and mobile applications.",
    type: "work"
  },
  {
    year: "2014 - 2018",
    title: "B.Sc. Computer Science",
    description: "Graduated with honors, specialized in web development and UI design.",
    type: "education"
  }
];

export function Timeline() {
  return (
    <div className="space-y-6 mt-8">
      {timelineItems.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex gap-4"
        >
          <div className="flex flex-col items-center">
            <div className="rounded-full h-10 w-10 bg-primary/10 flex items-center justify-center text-primary">
              {item.type === "work" ? (
                <Briefcase size={20} />
              ) : (
                <GraduationCap size={20} />
              )}
            </div>
            {index < timelineItems.length - 1 && (
              <div className="w-0.5 grow bg-border mt-2" />
            )}
          </div>
          <div className="pb-6">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <CalendarDays size={14} className="mr-1" />
              {item.year}
            </div>
            <h3 className="font-medium text-lg">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
