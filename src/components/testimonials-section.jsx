
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Working with this developer was an absolute pleasure. Their attention to detail and creative problem-solving skills made our project a success.",
    author: "Alex Johnson",
    role: "Product Manager, TechCorp",
  },
  {
    text: "I was impressed by the clean code and innovative solutions. Our website's performance improved significantly after their contribution.",
    author: "Sarah Williams",
    role: "CEO, Design Studio",
  },
  {
    text: "Exceptional work and communication throughout the entire process. Delivered exactly what we needed on time and on budget.",
    author: "Michael Chen",
    role: "Tech Lead, Startup Inc",
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="container-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">What People Say</h2>
        <p className="text-muted-foreground mb-8 max-w-lg">
          Feedback from clients and colleagues I've had the pleasure to work with.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4 text-primary">
                    <Quote size={24} />
                  </div>
                  <p className="mb-4 italic">{testimonial.text}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.image} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
