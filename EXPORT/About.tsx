// src/components/About.tsx
import { Button } from "@/components/ui/button";
import { Download, MapPin, Calendar } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              <span className="text-hologram">ABOUT</span> ME
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-2xl bg-gradient-cyber p-1">
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-neon flex items-center justify-center">
                      <span className="text-4xl font-orbitron font-bold text-background">
                        PM
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-primary/30 rounded-lg rotate-12 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-accent/30 rounded-lg rotate-45 animate-pulse delay-1000"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-orbitron font-bold mb-4">
                  Digital Project <span className="text-primary">Architect</span>
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  I am a passionate project manager specializing in digital transformation and technology innovation. 
                  With over 5 years of experience leading cross-functional teams, I bridge the gap between 
                  technical excellence and business objectives.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My expertise lies in agile methodologies, stakeholder management, and delivering 
                  complex digital solutions that drive growth and efficiency. I thrive in fast-paced 
                  environments where innovation meets execution.
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">5+ Years Experience</span>
                </div>
              </div>

              {/* Specializations */}
              <div>
                <h4 className="text-xl font-orbitron font-bold mb-4 text-secondary">
                  Core Specializations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Agile & Scrum Management",
                    "Digital Transformation",
                    "Cross-functional Leadership",
                    "Product Strategy",
                    "Risk Management",
                    "Stakeholder Alignment"
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="neon" size="lg" className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  Download Resume
                </Button>
                <Button variant="outline" size="lg">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;