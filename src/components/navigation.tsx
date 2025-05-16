
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update header background when scrolled
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine which section is currently visible
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const visibleSection = sectionElements.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (visibleSection) {
        setActiveSection(visibleSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-serif font-semibold">
          Portfolio
        </a>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`text-sm font-medium transition-colors hover:text-primary relative ${
                      activeSection === section.id
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {section.label}
                    {activeSection === section.id && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <ThemeToggle />
          <MobileMenu activeSection={activeSection} sections={sections} />
        </div>
      </div>
    </header>
  );
}
