import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Futuristic workspace background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated Title */}
          <h1 className="text-6xl md:text-8xl font-orbitron font-black mb-6 leading-tight">
            <span className="block text-hologram glitch" data-text="PROJECT">
              PROJECT
            </span>
            <span className="block text-foreground mt-2">
              MANAGER
            </span>
          </h1>

          {/* Subtitle with Scanner Effect */}
          <div className="scanner-line mb-8">
            <p className="text-xl md:text-2xl font-rajdhani text-muted-foreground font-light tracking-wide">
              Orchestrating Digital Transformation & Innovation
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Bridging technology and strategy to deliver exceptional digital experiences. 
            Specialized in agile methodologies, cross-functional team leadership, 
            and cutting-edge project execution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="cyber" 
              size="xl"
              className="group"
            >
              <span className="relative z-10">View Projects</span>
            </Button>
            
            <Button 
              variant="hologram" 
              size="xl"
              className="group"
            >
              <span className="relative z-10">Contact Me</span>
            </Button>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="border-animate p-6 rounded-xl bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-orbitron font-bold text-primary mb-2 animate-pulse-glow">
                50+
              </div>
              <div className="text-muted-foreground font-rajdhani">
                Projects Delivered
              </div>
            </div>
            
            <div className="border-animate p-6 rounded-xl bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-orbitron font-bold text-secondary mb-2 animate-pulse-glow">
                15+
              </div>
              <div className="text-muted-foreground font-rajdhani">
                Teams Managed
              </div>
            </div>
            
            <div className="border-animate p-6 rounded-xl bg-card/50 backdrop-blur-sm">
              <div className="text-3xl font-orbitron font-bold text-accent mb-2 animate-pulse-glow">
                5+
              </div>
              <div className="text-muted-foreground font-rajdhani">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-secondary/30 rotate-12 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-accent/30 rotate-45 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 border border-primary/20 rotate-12 animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default Hero;