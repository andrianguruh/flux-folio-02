import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Plus, Edit, Trash2, Briefcase, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface Skill {
  id: number
  name: string
  level: number
  category: string
  created_at: string
}

const ManageSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    level: 5,
    category: ''
  })
  const { toast } = useToast()

  const categories = [
    'Management',
    'Technical',
    'Strategy',
    'Communication',
    'Leadership',
    'Tools',
    'Methodologies'
  ]

  useEffect(() => {
    loadSkills()
  }, [])

  const loadSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })

      if (error) throw error
      setSkills(data || [])
    } catch (error) {
      console.error('Error loading skills:', error)
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      if (editingSkill) {
        // Update existing skill
        const { error } = await supabase
          .from('skills')
          .update({
            name: formData.name,
            level: formData.level,
            category: formData.category
          })
          .eq('id', editingSkill.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Skill updated successfully"
        })
      } else {
        // Create new skill
        const { error } = await supabase
          .from('skills')
          .insert({
            name: formData.name,
            level: formData.level,
            category: formData.category
          })

        if (error) throw error
        toast({
          title: "Success",
          description: "Skill added successfully"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadSkills()
    } catch (error) {
      console.error('Error saving skill:', error)
      toast({
        title: "Error",
        description: "Failed to save skill",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return

    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast({
        title: "Success",
        description: "Skill deleted successfully"
      })
      loadSkills()
    } catch (error) {
      console.error('Error deleting skill:', error)
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({ name: '', level: 5, category: '' })
    setEditingSkill(null)
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const getLevelLabel = (level: number) => {
    if (level <= 2) return 'Beginner'
    if (level <= 4) return 'Intermediate'
    if (level <= 6) return 'Proficient'
    if (level <= 8) return 'Advanced'
    return 'Expert'
  }

  const getLevelColor = (level: number) => {
    if (level <= 2) return 'bg-red-500'
    if (level <= 4) return 'bg-orange-500'
    if (level <= 6) return 'bg-yellow-500'
    if (level <= 8) return 'bg-green-500'
    return 'bg-blue-500'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-48 bg-muted rounded"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-hologram">
            Manage Skills
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            Add, edit, and organize your professional skills
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button variant="cyber" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/95 backdrop-blur-md border-primary/20">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-hologram">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </DialogTitle>
              <DialogDescription className="font-rajdhani">
                Define your skill level and category
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skillName" className="font-rajdhani font-medium">
                  Skill Name
                </Label>
                <Input
                  id="skillName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Project Management"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="font-rajdhani font-medium">
                  Category
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="font-rajdhani font-medium">
                  Proficiency Level: {formData.level}/10 ({getLevelLabel(formData.level)})
                </Label>
                <Slider
                  value={[formData.level]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, level: value[0] }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono">
                  <span>1 - Beginner</span>
                  <span>10 - Expert</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} variant="cyber" className="flex-1">
                  {editingSkill ? 'Update Skill' : 'Add Skill'}
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
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-primary">
                  {skills.length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Total Skills
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-secondary/10">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-secondary">
                  {Object.keys(groupedSkills).length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Categories
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-accent">
                  {skills.length > 0 ? Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length) : 0}/10
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Avg Level
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.keys(groupedSkills).map(category => (
          <Card key={category} className="border-hologram/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {category}
              </CardTitle>
              <CardDescription className="font-rajdhani">
                {groupedSkills[category].length} skills in this category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedSkills[category].map(skill => (
                  <div 
                    key={skill.id}
                    className="p-4 rounded-lg bg-background/50 border border-border/50 hover:bg-background/70 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold font-rajdhani">{skill.name}</h4>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => openEditDialog(skill)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-mono">{skill.level}/10</span>
                        <Badge variant="secondary" className="text-xs">
                          {getLevelLabel(skill.level)}
                        </Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getLevelColor(skill.level)} transition-all duration-300`}
                          style={{ width: `${(skill.level / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {skills.length === 0 && (
          <Card className="border-dashed border-2 border-muted-foreground/30">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-orbitron font-bold text-lg mb-2">No Skills Added</h3>
              <p className="text-muted-foreground font-rajdhani mb-4">
                Start building your skills portfolio by adding your first skill
              </p>
              <Button 
                variant="cyber" 
                onClick={() => setIsDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Skill
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ManageSkills