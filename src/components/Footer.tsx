import { Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-orbitron font-bold text-hologram mb-4">
                PM.TECH
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Digital Project Manager specialized in transforming ideas into 
                exceptional digital experiences through strategic leadership and innovation.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-orbitron font-bold mb-4 text-primary">Quick Links</h3>
              <div className="space-y-2">
                {["About", "Skills", "Projects", "Clients", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300 font-rajdhani"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-orbitron font-bold mb-4 text-secondary">Services</h3>
              <div className="space-y-2">
                {[
                  "Project Management",
                  "Digital Transformation",
                  "Team Leadership",
                  "Agile Consulting",
                  "Process Optimization"
                ].map((service) => (
                  <div
                    key={service}
                    className="text-muted-foreground font-rajdhani"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-rajdhani">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent animate-pulse" />
              <span>by PM.TECH © 2025</span>
            </div>

            {/* Back to Top */}
            <Button
              variant="ghost_cyber"
              size="sm"
              onClick={scrollToTop}
              className="mt-4 md:mt-0"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;