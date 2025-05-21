
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Briefcase, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define the type for timeline items, including an optional profile_pic_url
type TimelineItem = {
  year: string;
  title: string;
  description: string;
  type: "work" | "education";
  profile_pic_url?: string;
};

export function Timeline() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("start_date", { ascending: false });
      if (!error && data) {
        setTimelineItems(
          data.map((item: any) => ({
            year: item.is_current
              ? `${item.start_date} - Present`
              : `${item.start_date} - ${item.end_date || ""}`,
            title: item.title,
            description: item.description,
            type: item.type,
            profile_pic_url: item.profile_pic_url,
          }))
        );
      }
      setLoading(false);
    };
    fetchTimeline();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!timelineItems.length) {
    return <div>No timeline data available.</div>;
  }

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
            <div className="rounded-full h-10 w-10 bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
              {item.profile_pic_url ? (
                <img
                  src={item.profile_pic_url}
                  alt={item.title}
                  className="object-cover w-full h-full rounded-full"
                />
              ) : item.type === "work" ? (
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
