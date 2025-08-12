import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Users, Star, Quote } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface Client {
  id: number
  name: string
  company: string
  testimonial: string
  photo?: string
  created_at: string
}

const ManageClients = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    testimonial: '',
    photo: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error('Error loading clients:', error)
      toast({
        title: "Error",
        description: "Failed to load clients",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.name || !formData.company || !formData.testimonial) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const clientData = {
        name: formData.name,
        company: formData.company,
        testimonial: formData.testimonial,
        photo: formData.photo || null
      }

      if (editingClient) {
        const { error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', editingClient.id)

        if (error) throw error
        toast({
          title: "Success",
          description: "Client testimonial updated successfully"
        })
      } else {
        const { error } = await supabase
          .from('clients')
          .insert(clientData)

        if (error) throw error
        toast({
          title: "Success",
          description: "Client testimonial added successfully"
        })
      }

      setIsDialogOpen(false)
      resetForm()
      loadClients()
    } catch (error) {
      console.error('Error saving client:', error)
      toast({
        title: "Error",
        description: "Failed to save client testimonial",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this client testimonial?')) return

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast({
        title: "Success",
        description: "Client testimonial deleted successfully"
      })
      loadClients()
    } catch (error) {
      console.error('Error deleting client:', error)
      toast({
        title: "Error",
        description: "Failed to delete client testimonial",
        variant: "destructive"
      })
    }
  }

  const openEditDialog = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      company: client.company,
      testimonial: client.testimonial,
      photo: client.photo || ''
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      testimonial: '',
      photo: ''
    })
    setEditingClient(null)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
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
            Manage Clients
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            Showcase client testimonials and build trust
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button variant="cyber" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card/95 backdrop-blur-md border-primary/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-orbitron text-hologram">
                {editingClient ? 'Edit Testimonial' : 'Add Client Testimonial'}
              </DialogTitle>
              <DialogDescription className="font-rajdhani">
                Share positive feedback from satisfied clients
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-rajdhani font-medium">
                    Client Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. John Smith"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="font-rajdhani font-medium">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Tech Solutions Inc."
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="font-rajdhani font-medium">
                  Photo URL
                </Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.value }))}
                  placeholder="https://example.com/photo.jpg"
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial" className="font-rajdhani font-medium">
                  Testimonial *
                </Label>
                <Textarea
                  id="testimonial"
                  value={formData.testimonial}
                  onChange={(e) => setFormData(prev => ({ ...prev, testimonial: e.target.value }))}
                  placeholder="Write the client's testimonial here..."
                  rows={6}
                  className="bg-background/50"
                />
                <p className="text-xs text-muted-foreground font-mono">
                  {formData.testimonial.length} characters
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} variant="cyber" className="flex-1">
                  {editingClient ? 'Update Testimonial' : 'Add Testimonial'}
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
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-primary">
                  {clients.length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Total Testimonials
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
                  {clients.length > 0 
                    ? Math.round(clients.reduce((sum, client) => sum + client.testimonial.length, 0) / clients.length)
                    : 0
                  }
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Avg Length
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <Quote className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-accent">
                  {clients.filter(c => c.photo).length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  With Photos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clients.map(client => (
          <Card key={client.id} className="border-hologram/20 bg-card/50 backdrop-blur-sm group hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 overflow-hidden flex-shrink-0">
                    {client.photo ? (
                      <img 
                        src={client.photo} 
                        alt={client.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-hologram">
                      {client.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-rajdhani">
                      {client.company}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEditDialog(client)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(client.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Testimonial */}
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/30" />
                <blockquote className="pl-8 text-muted-foreground italic leading-relaxed">
                  {client.testimonial}
                </blockquote>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {new Date(client.created_at).toLocaleDateString()}
                </Badge>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-secondary text-secondary" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {clients.length === 0 && (
          <div className="col-span-full">
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-lg mb-2">No Testimonials Added</h3>
                <p className="text-muted-foreground font-rajdhani mb-4">
                  Start building trust by adding client testimonials
                </p>
                <Button 
                  variant="cyber" 
                  onClick={() => setIsDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Testimonial
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageClients