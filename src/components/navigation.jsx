import { useState, useEffect, useContext } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { useTheme } from "./theme-provider"; // Fix the import path
import { useLocation } from "react-router-dom";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme(); // Get current theme
  
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

  // Theme-aware styling
  const getHeaderStyle = () => {
    if (!scrolled) return { backgroundColor: 'transparent' };
    
    return theme === 'dark' 
      ? {
          backgroundColor: 'rgba(20, 20, 20, 0.5)',
          backdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }
      : {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        };
  };

  const location = useLocation();
  // Check if current path matches /project/:id (assuming your route is /project/:id)
  const isProjectDetail = /^\/project\/[^/]+$/.test(location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300`}
      style={getHeaderStyle()}
    >
      <div className="container mx-auto py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-serif font-semibold">
          Portfolio
        </a>
        
        <div className="flex items-center gap-6">
          {/* Hide navbar items on ProjectDetail page */}
          {!isProjectDetail && (
            <nav className="hidden md:block">
              <ul className="flex space-x-16">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`text-sm font-medium transition-colors hover:text-primary relative px-2 ${
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
          )}
          
          <ThemeToggle />
          <MobileMenu activeSection={activeSection} sections={sections} />
        </div>
      </div>
    </header>
  );
}