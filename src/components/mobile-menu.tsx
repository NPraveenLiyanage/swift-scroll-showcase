
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

type NavigationItem = {
  id: string;
  label: string;
};

type MobileMenuProps = {
  activeSection: string;
  sections: NavigationItem[];
};

export function MobileMenu({ activeSection, sections }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  
  const handleNavigation = (sectionId: string) => {
    setOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
        <div className="flex flex-col h-full py-6">
          <div className="flex justify-end mb-8">
            <button onClick={() => setOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-grow">
            <ul className="space-y-6 text-lg">
              {sections.map((section) => (
                <motion.li 
                  key={section.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-border pb-2"
                >
                  <button
                    onClick={() => handleNavigation(section.id)}
                    className={`w-full text-left py-2 ${
                      activeSection === section.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary transition-colors"
                    }`}
                  >
                    {section.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="pt-6 mt-auto text-center text-sm text-muted-foreground">
            Portfolio © {new Date().getFullYear()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
