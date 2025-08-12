import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Save, Upload, User, FileText, Link as LinkIcon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface AboutData {
  id?: number
  name: string
  tagline: string
  description: string
  photo?: string
  resume?: string
}

const ManageAbout = () => {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: '',
    tagline: '',
    description: '',
    photo: '',
    resume: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setAboutData(data)
      }
    } catch (error) {
      console.error('Error loading about data:', error)
      toast({
        title: "Error",
        description: "Failed to load about data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { data: existing } = await supabase
        .from('about')
        .select('id')
        .single()

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('about')
          .update({
            name: aboutData.name,
            tagline: aboutData.tagline,
            description: aboutData.description,
            photo: aboutData.photo,
            resume: aboutData.resume,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        if (error) throw error
      } else {
        // Create new record
        const { error } = await supabase
          .from('about')
          .insert({
            name: aboutData.name,
            tagline: aboutData.tagline,
            description: aboutData.description,
            photo: aboutData.photo,
            resume: aboutData.resume
          })

        if (error) throw error
      }

      toast({
        title: "Success",
        description: "About information updated successfully"
      })
    } catch (error) {
      console.error('Error saving about data:', error)
      toast({
        title: "Error",
        description: "Failed to save about information",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof AboutData, value: string) => {
    setAboutData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
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
            Manage About
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            Update your personal information and profile details
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          variant="cyber"
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Your core profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-rajdhani font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                value={aboutData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline" className="font-rajdhani font-medium">
                Professional Tagline
              </Label>
              <Input
                id="tagline"
                value={aboutData.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                placeholder="e.g. Senior Project Manager & Digital Strategist"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="font-rajdhani font-medium">
                Profile Photo URL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="photo"
                  value={aboutData.photo || ''}
                  onChange={(e) => handleInputChange('photo', e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-background/50"
                />
                <Button variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume" className="font-rajdhani font-medium">
                Resume/CV URL
              </Label>
              <div className="flex gap-2">
                <Input
                  id="resume"
                  value={aboutData.resume || ''}
                  onChange={(e) => handleInputChange('resume', e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  className="bg-background/50"
                />
                <Button variant="outline" size="icon">
                  <LinkIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <FileText className="w-5 h-5" />
              About Description
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Tell your professional story
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description" className="font-rajdhani font-medium">
                Professional Summary
              </Label>
              <Textarea
                id="description"
                value={aboutData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Write a compelling description about your experience, expertise, and achievements..."
                rows={12}
                className="bg-background/50 resize-none"
              />
              <p className="text-xs text-muted-foreground font-mono">
                {aboutData.description.length} characters
              </p>
            </div>

            <Alert className="border-accent/50 bg-accent/10">
              <FileText className="w-4 h-4" />
              <AlertDescription className="font-rajdhani">
                <strong>Tips:</strong> Include your experience, key achievements, 
                management philosophy, and what makes you unique as a project manager.
                Keep it engaging and professional.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      {aboutData.name && (
        <Card className="border-hologram/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram">
              Preview
            </CardTitle>
            <CardDescription className="font-rajdhani">
              How your information will appear on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 p-6 rounded-lg bg-background/50">
              {aboutData.photo && (
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 overflow-hidden">
                    <img 
                      src={aboutData.photo} 
                      alt={aboutData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-orbitron font-bold text-hologram">
                  {aboutData.name}
                </h3>
                <p className="text-primary font-rajdhani font-medium">
                  {aboutData.tagline}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {aboutData.description.substring(0, 200)}
                  {aboutData.description.length > 200 && '...'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ManageAbout