import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, FolderOpen, ExternalLink, Github, Star } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface Project {
  id: number
  title: string
  description: string
  image?: string
  tech_stack: string[]
  live_url?: string
  github_url?: string
  featured: boolean
  created_at: string
}

const ManageProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech_stack: '',
    live_url: '',
    github_url: '',
    featured: false
  })
  const { toast } = useToast()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error loading projects:', error)
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in title and description",
        variant: "destructive"
      })
      return
    }

    const techStackArray = formData.tech_stack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech.length > 0)

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        image: formData.image || null,
        tech_stack: techStackArray,
        live_url: formData.live_url || null,
        github_url: formData.github_url || null,
        featured: formData.featured
      }

      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Project updated successfully"
        })
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(projectData)

        if (error) throw error
        toast({
          title: "Success",
          description: "Project added successfully"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast({
        title: "Success",
        description: "Project deleted successfully"
      })
      loadProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image || '',
      tech_stack: project.tech_stack.join(', '),
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      featured: project.featured
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      tech_stack: '',
      live_url: '',
      github_url: '',
      featured: false
    })
    setEditingProject(null)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-48 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-hologram">
            Manage Projects
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            Showcase your portfolio projects and achievements
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button variant="cyber" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/95 backdrop-blur-md border-primary/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-hologram">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
              <DialogDescription className="font-rajdhani">
                Showcase your latest work and achievements
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-rajdhani font-medium">
                    Project Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. E-commerce Platform Redesign"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="font-rajdhani font-medium">
                    Project Image URL
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-rajdhani font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the project, your role, challenges, and outcomes..."
                  rows={4}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="techStack" className="font-rajdhani font-medium">
                  Tech Stack (comma-separated)
                </Label>
                <Input
                  id="techStack"
                  value={formData.tech_stack}
                  onChange={(e) => setFormData(prev => ({ ...prev, tech_stack: e.target.value }))}
                  placeholder="React, TypeScript, Node.js, PostgreSQL"
                  className="bg-background/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl" className="font-rajdhani font-medium">
                    Live URL
                  </Label>
                  <Input
                    id="liveUrl"
                    value={formData.live_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                    placeholder="https://project-demo.com"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl" className="font-rajdhani font-medium">
                    GitHub URL
                  </Label>
                  <Input
                    id="githubUrl"
                    value={formData.github_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                    placeholder="https://github.com/user/repo"
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured" className="font-rajdhani font-medium">
                  Featured Project
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} variant="cyber" className="flex-1">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-primary">
                  {projects.length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Total Projects
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Star className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-secondary">
                  {projects.filter(p => p.featured).length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Featured
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <ExternalLink className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-accent">
                  {projects.filter(p => p.live_url).length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Live Projects
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="border-hologram/20 bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-0">
              {/* Project Image */}
              <div className="aspect-video bg-muted/30 rounded-t-lg overflow-hidden relative">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderOpen className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="bg-secondary text-secondary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEditDialog(project)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-hologram mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description.length > 100 
                      ? `${project.description.substring(0, 100)}...`
                      : project.description
                    }
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1">
                  {project.tech_stack.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech_stack.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tech_stack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {project.live_url && (
                    <Button variant="ghost_cyber" size="sm" className="flex-1" asChild>
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button variant="ghost" size="sm" className="flex-1" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full">
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-12 text-center">
                <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-lg mb-2">No Projects Added</h3>
                <p className="text-muted-foreground font-rajdhani mb-4">
                  Start showcasing your work by adding your first project
                </p>
                <Button 
                  variant="cyber" 
                  onClick={() => setIsDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Project
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageProjects