import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar, Users, Target } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform Modernization",
      description: "Led digital transformation of legacy e-commerce system, implementing microservices architecture and improving performance by 300%.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "Digital Transformation",
      techStack: ["React", "Node.js", "AWS", "Docker"],
      timeline: "8 months",
      teamSize: "12 members",
      impact: "300% performance boost",
      status: "Completed",
      featured: true
    },
    {
      id: 2,
      title: "Mobile App Development Program",
      description: "Orchestrated cross-platform mobile app development using agile methodologies, delivered 3 months ahead of schedule.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      category: "Mobile Development",
      techStack: ["React Native", "Firebase", "Redux"],
      timeline: "6 months",
      teamSize: "8 members",
      impact: "Early delivery",
      status: "Completed",
      featured: true
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      description: "Managed development of real-time analytics platform for business intelligence and decision making.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "Data Analytics",
      techStack: ["Python", "D3.js", "PostgreSQL"],
      timeline: "4 months",
      teamSize: "6 members",
      impact: "40% faster insights",
      status: "Completed",
      featured: false
    },
    {
      id: 4,
      title: "Cloud Migration Initiative",
      description: "Leading enterprise cloud migration project with zero downtime strategy and comprehensive security implementation.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      category: "Cloud Infrastructure",
      techStack: ["AWS", "Terraform", "Kubernetes"],
      timeline: "12 months",
      teamSize: "15 members",
      impact: "60% cost reduction",
      status: "In Progress",
      featured: true
    }
  ];

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              PROJECT <span className="text-hologram">PORTFOLIO</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how I've transformed businesses through strategic project management and innovative solutions
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-lg font-orbitron font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-gradient-cyber text-primary-foreground shadow-neon"
                    : "bg-card/50 text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative rounded-2xl overflow-hidden border-animate bg-card/50 backdrop-blur-sm hover:scale-105 transition-all duration-500 ${
                  project.featured ? "lg:col-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-orbitron font-bold ${
                    project.status === "Completed" 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {project.status}
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-orbitron font-bold">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-sm text-primary font-rajdhani font-bold tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-orbitron font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                      <div className="text-xs font-rajdhani font-bold">{project.timeline}</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-5 h-5 text-secondary mx-auto mb-1" />
                      <div className="text-xs font-rajdhani font-bold">{project.teamSize}</div>
                    </div>
                    <div className="text-center">
                      <Target className="w-5 h-5 text-accent mx-auto mb-1" />
                      <div className="text-xs font-rajdhani font-bold">{project.impact}</div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full font-rajdhani font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="neon" size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects CTA */}
          <div className="text-center mt-16">
            <Button variant="cyber" size="xl">
              Explore All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;