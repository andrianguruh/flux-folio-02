import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface ContactData {
  id?: number
  email: string
  phone: string
  location: string
  linkedin?: string
  github?: string
  twitter?: string
}

const ManageContact = () => {
  const [contactData, setContactData] = useState<ContactData>({
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    twitter: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadContactData()
  }, [])

  const loadContactData = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setContactData(data)
      }
    } catch (error) {
      console.error('Error loading contact data:', error)
      toast({
        title: "Error",
        description: "Failed to load contact information",
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
        .from('contact_info')
        .select('id')
        .single()

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('contact_info')
          .update({
            email: contactData.email,
            phone: contactData.phone,
            location: contactData.location,
            linkedin: contactData.linkedin,
            github: contactData.github,
            twitter: contactData.twitter,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id)

        if (error) throw error
      } else {
        // Create new record
        const { error } = await supabase
          .from('contact_info')
          .insert({
            email: contactData.email,
            phone: contactData.phone,
            location: contactData.location,
            linkedin: contactData.linkedin,
            github: contactData.github,
            twitter: contactData.twitter
          })

        if (error) throw error
      }

      toast({
        title: "Success",
        description: "Contact information updated successfully"
      })
    } catch (error) {
      console.error('Error saving contact data:', error)
      toast({
        title: "Error",
        description: "Failed to save contact information",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setContactData(prev => ({ ...prev, [field]: value }))
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
            Manage Contact
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            Update your contact information and social links
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
        {/* Primary Contact Information */}
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Primary Contact
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Essential contact information for clients
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-rajdhani font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-rajdhani font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="font-rajdhani font-medium">
                Location
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={contactData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <Linkedin className="w-5 h-5" />
              Social Media
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Professional social media profiles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="font-rajdhani font-medium">
                LinkedIn Profile
              </Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="linkedin"
                  value={contactData.linkedin || ''}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="font-rajdhani font-medium">
                GitHub Profile
              </Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="github"
                  value={contactData.github || ''}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter" className="font-rajdhani font-medium">
                Twitter Profile
              </Label>
              <div className="relative">
                <Twitter className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="twitter"
                  value={contactData.twitter || ''}
                  onChange={(e) => handleInputChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/yourusername"
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="border-hologram/20 bg-card/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-orbitron text-hologram">
            Contact Preview
          </CardTitle>
          <CardDescription className="font-rajdhani">
            How your contact information will appear on the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-orbitron font-bold text-hologram mb-4">
                Contact Information
              </h3>
              
              {contactData.email && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-rajdhani font-medium">Email</p>
                    <p className="text-muted-foreground">{contactData.email}</p>
                  </div>
                </div>
              )}

              {contactData.phone && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-rajdhani font-medium">Phone</p>
                    <p className="text-muted-foreground">{contactData.phone}</p>
                  </div>
                </div>
              )}

              {contactData.location && (
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-rajdhani font-medium">Location</p>
                    <p className="text-muted-foreground">{contactData.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-orbitron font-bold text-hologram mb-4">
                Social Media
              </h3>
              
              <div className="flex gap-3">
                {contactData.linkedin && (
                  <a 
                    href={contactData.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-md bg-[#0077B5]/10 border border-[#0077B5]/30 hover:bg-[#0077B5]/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-[#0077B5]" />
                  </a>
                )}

                {contactData.github && (
                  <a 
                    href={contactData.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-md bg-foreground/10 border border-foreground/30 hover:bg-foreground/20 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}

                {contactData.twitter && (
                  <a 
                    href={contactData.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-md bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 hover:bg-[#1DA1F2]/20 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                  </a>
                )}
              </div>

              {!contactData.linkedin && !contactData.github && !contactData.twitter && (
                <p className="text-muted-foreground text-sm italic">
                  No social media links added yet
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageContact