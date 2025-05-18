
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    title: "Designing for Accessibility",
    excerpt: "Creating websites that are accessible to everyone is not just a legal requirement but a moral imperative...",
    date: "May 10, 2025",
    readTime: "5 min read",
    link: "#"
  },
  {
    title: "The Future of Web Development",
    excerpt: "As we move into 2025, new technologies are reshaping how we build and experience the web...",
    date: "April 22, 2025",
    readTime: "7 min read",
    link: "#"
  },
  {
    title: "Optimizing Site Performance",
    excerpt: "Speed matters. Learn how to optimize your website for the best possible user experience...",
    date: "April 5, 2025",
    readTime: "6 min read",
    link: "#"
  }
];

export function BlogSection() {
  return (
    <section id="blog" className="container-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">Blog</h2>
        <p className="text-muted-foreground mb-8 max-w-lg">
          Thoughts, ideas, and insights on design, development, and technology.
        </p>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-serif">{post.title}</CardTitle>
                    <div className="text-xs text-muted-foreground">
                      {post.date} • {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <a href={post.link}>Read More</a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline">View All Posts</Button>
        </div>
      </motion.div>
    </section>
  );
}
