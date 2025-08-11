import { Star, Quote } from "lucide-react";

const Clients = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      company: "TechCorp Solutions",
      role: "CTO",
      testimonial: "Exceptional project management skills! Led our digital transformation with precision and delivered results beyond expectations. The team coordination was flawless.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      company: "InnovateX Labs",
      role: "Product Director",
      testimonial: "Outstanding strategic vision and execution. Transformed our development process and increased delivery speed by 300%. A true digital transformation expert.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Emily Foster",
      company: "HealthTech Innovations",
      role: "CEO",
      testimonial: "Brilliant project manager who understands both technology and business needs. Led our mobile app development with agile precision and clear communication.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "James Wilson",
      company: "DataFlow Systems",
      role: "VP Engineering",
      testimonial: "Incredible ability to manage complex technical projects. Delivered our cloud migration 2 months early and under budget. Highly recommend for any tech initiative.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const clients = [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateX", logo: "IX" },
    { name: "HealthTech", logo: "HT" },
    { name: "DataFlow", logo: "DF" },
    { name: "CloudSys", logo: "CS" },
    { name: "NextGen", logo: "NG" }
  ];

  return (
    <section id="clients" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              CLIENT <span className="text-hologram">TESTIMONIALS</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              What industry leaders say about my project management expertise
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="border-animate p-8 rounded-2xl bg-card/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary/20">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-cyber opacity-20"></div>
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-primary font-rajdhani font-medium">{testimonial.role}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.company}</p>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Client Logos */}
          <div className="text-center">
            <h3 className="text-2xl font-orbitron font-bold mb-8">
              TRUSTED BY <span className="text-secondary">INDUSTRY LEADERS</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clients.map((client, index) => (
                <div
                  key={client.name}
                  className="group flex flex-col items-center justify-center p-6 rounded-xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-cyber rounded-lg flex items-center justify-center mb-3 group-hover:shadow-neon transition-all duration-300">
                    <span className="text-xl font-orbitron font-bold text-primary-foreground">
                      {client.logo}
                    </span>
                  </div>
                  <span className="text-sm font-rajdhani font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-primary mb-2 animate-pulse-glow">
                98%
              </div>
              <div className="text-muted-foreground font-rajdhani">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-secondary mb-2 animate-pulse-glow">
                25+
              </div>
              <div className="text-muted-foreground font-rajdhani">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-accent mb-2 animate-pulse-glow">
                100%
              </div>
              <div className="text-muted-foreground font-rajdhani">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-orbitron font-bold text-primary mb-2 animate-pulse-glow">
                5.0
              </div>
              <div className="text-muted-foreground font-rajdhani">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;