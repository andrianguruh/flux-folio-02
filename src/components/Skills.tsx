import { useState } from "react";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Management");

  const skillCategories = {
    Management: [
      { name: "Project Management", level: 9, color: "text-primary" },
      { name: "Agile/Scrum", level: 9, color: "text-primary" },
      { name: "Team Leadership", level: 8, color: "text-primary" },
      { name: "Risk Management", level: 8, color: "text-primary" },
      { name: "Stakeholder Management", level: 9, color: "text-primary" },
      { name: "Budget Management", level: 7, color: "text-primary" },
    ],
    Technical: [
      { name: "JIRA/Confluence", level: 9, color: "text-secondary" },
      { name: "Microsoft Project", level: 8, color: "text-secondary" },
      { name: "Slack/Teams", level: 9, color: "text-secondary" },
      { name: "Git/GitHub", level: 7, color: "text-secondary" },
      { name: "Data Analytics", level: 6, color: "text-secondary" },
      { name: "Cloud Platforms", level: 7, color: "text-secondary" },
    ],
    Strategy: [
      { name: "Product Strategy", level: 8, color: "text-accent" },
      { name: "Digital Transformation", level: 9, color: "text-accent" },
      { name: "Process Optimization", level: 8, color: "text-accent" },
      { name: "Change Management", level: 7, color: "text-accent" },
      { name: "Business Analysis", level: 8, color: "text-accent" },
      { name: "Innovation Management", level: 7, color: "text-accent" },
    ],
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
              CORE <span className="text-hologram">SKILLS</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expertise across project management, technology, and strategic planning
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-orbitron font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-cyber text-primary-foreground shadow-neon"
                    : "bg-card/50 text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories[activeCategory as keyof typeof skillCategories].map((skill, index) => (
              <div
                key={skill.name}
                className="border-animate p-6 rounded-xl bg-card/50 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-orbitron font-bold text-lg">{skill.name}</h3>
                  <span className={`text-2xl font-bold ${skill.color}`}>
                    {skill.level}/10
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-neon rounded-full transition-all duration-1000 ease-out animate-pulse-glow`}
                      style={{ 
                        width: `${skill.level * 10}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                  
                  {/* Skill Level Indicators */}
                  <div className="flex justify-between mt-2">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                          i < skill.level ? 'bg-primary' : 'bg-muted'
                        }`}
                        style={{ animationDelay: `${(index * 0.1) + (i * 0.05)}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-20">
            <h3 className="text-2xl font-orbitron font-bold text-center mb-8">
              <span className="text-secondary">CERTIFICATIONS</span> & ACHIEVEMENTS
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "PMP Certified",
                "Scrum Master",
                "Agile Practitioner",
                "Digital Transformation"
              ].map((cert, index) => (
                <div
                  key={cert}
                  className="text-center p-6 rounded-xl bg-gradient-to-b from-card/50 to-card/30 border border-primary/30 hover:border-primary hover:shadow-neon transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-cyber rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-orbitron font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="font-rajdhani font-bold text-sm">{cert}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;