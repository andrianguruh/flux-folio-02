import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "contact@pmtech.dev",
      href: "mailto:contact@pmtech.dev"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+62 812 3456 7890",
      href: "tel:+6281234567890"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Jakarta, Indonesia",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      name: "LinkedIn",
      href: "https://linkedin.com/in/pmtech",
      color: "hover:text-blue-400"
    },
    {
      icon: <Github className="w-6 h-6" />,
      name: "GitHub",
      href: "https://github.com/pmtech",
      color: "hover:text-gray-400"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      name: "Twitter",
      href: "https://twitter.com/pmtech",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              GET IN <span className="text-hologram">TOUCH</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to transform your next project? Let's discuss how we can achieve extraordinary results together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-orbitron font-bold mb-6 text-primary">
                  Let's Connect
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking to modernize your digital infrastructure, 
                  implement agile methodologies, or lead complex technical initiatives, 
                  I'm here to help turn your vision into reality.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-12 h-12 bg-gradient-cyber rounded-lg flex items-center justify-center text-primary-foreground">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-rajdhani font-medium">
                        {item.label}
                      </div>
                      <a
                        href={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-orbitron font-bold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className={`w-12 h-12 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:shadow-neon ${social.color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                  <span className="font-orbitron font-bold text-accent">Available for Projects</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Currently accepting new project opportunities for Q2 2025
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="relative">
              <div className="border-animate p-8 rounded-2xl bg-card/50 backdrop-blur-sm">
                <h3 className="text-2xl font-orbitron font-bold mb-6">
                  Start a <span className="text-secondary">Conversation</span>
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-rajdhani font-medium mb-2">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-input/50 border-border/50 focus:border-primary"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-input/50 border-border/50 focus:border-primary"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-input/50 border-border/50 focus:border-primary"
                      placeholder="Project Discussion"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-rajdhani font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-input/50 border-border/50 focus:border-primary min-h-32 resize-none"
                      placeholder="Tell me about your project requirements..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cyber"
                    size="lg"
                    className="w-full group"
                  >
                    <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-secondary/30 rounded-lg rotate-12 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-accent/30 rounded-lg rotate-45 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;