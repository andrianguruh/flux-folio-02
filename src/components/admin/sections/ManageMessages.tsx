import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  MessageSquare, 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Trash2,
  Calendar,
  User,
  ArrowUpDown
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

const ManageMessages = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadMessages()
  }, [])

  useEffect(() => {
    filterMessages()
  }, [messages, searchTerm, filterRead])

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterMessages = () => {
    let filtered = messages

    // Filter by read status
    if (filterRead === 'read') {
      filtered = filtered.filter(msg => msg.read)
    } else if (filterRead === 'unread') {
      filtered = filtered.filter(msg => !msg.read)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredMessages(filtered)
  }

  const toggleRead = async (messageId: number, currentReadStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: !currentReadStatus })
        .eq('id', messageId)

      if (error) throw error

      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, read: !currentReadStatus } : msg
      ))

      toast({
        title: "Success",
        description: `Message marked as ${!currentReadStatus ? 'read' : 'unread'}`
      })
    } catch (error) {
      console.error('Error updating message:', error)
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive"
      })
    }
  }

  const deleteMessage = async (messageId: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)

      if (error) throw error

      setMessages(prev => prev.filter(msg => msg.id !== messageId))
      setSelectedMessage(null)

      toast({
        title: "Success",
        description: "Message deleted successfully"
      })
    } catch (error) {
      console.error('Error deleting message:', error)
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive"
      })
    }
  }

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('read', false)

      if (error) throw error

      setMessages(prev => prev.map(msg => ({ ...msg, read: true })))

      toast({
        title: "Success",
        description: "All messages marked as read"
      })
    } catch (error) {
      console.error('Error marking all as read:', error)
      toast({
        title: "Error",
        description: "Failed to mark all messages as read",
        variant: "destructive"
      })
    }
  }

  const unreadCount = messages.filter(msg => !msg.read).length

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
            Manage Messages
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            View and manage contact form submissions
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button variant="cyber" onClick={markAllAsRead} className="gap-2">
            <Eye className="w-4 h-4" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-primary">
                  {messages.length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Total Messages
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-secondary/10">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-secondary">
                  {unreadCount}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Unread
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-accent">
                  {messages.length - unreadCount}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Read
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-hologram/20 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-hologram/10">
                <Calendar className="w-6 h-6 text-hologram" />
              </div>
              <div>
                <p className="text-2xl font-orbitron font-bold text-hologram">
                  {messages.filter(msg => {
                    const today = new Date()
                    const msgDate = new Date(msg.created_at)
                    return msgDate.toDateString() === today.toDateString()
                  }).length}
                </p>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  Today
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-hologram/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={filterRead === 'all' ? 'cyber' : 'ghost'}
                onClick={() => setFilterRead('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterRead === 'unread' ? 'cyber' : 'ghost'}
                onClick={() => setFilterRead('unread')}
                size="sm"
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filterRead === 'read' ? 'cyber' : 'ghost'}
                onClick={() => setFilterRead('read')}
                size="sm"
              >
                Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMessages.length === 0 ? (
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-lg mb-2">
                  {messages.length === 0 ? 'No Messages' : 'No Messages Found'}
                </h3>
                <p className="text-muted-foreground font-rajdhani">
                  {messages.length === 0 
                    ? 'Contact form submissions will appear here'
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map(message => (
              <Card 
                key={message.id} 
                className={`border-hologram/20 bg-card/50 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-primary/40 ${
                  selectedMessage?.id === message.id ? 'border-primary ring-1 ring-primary/20' : ''
                } ${!message.read ? 'border-l-4 border-l-secondary' : ''}`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-orbitron font-bold text-hologram">
                          {message.name}
                        </h3>
                        {!message.read && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground font-rajdhani">
                        {message.email}
                      </p>
                      
                      <p className="font-semibold">
                        {message.subject}
                      </p>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {message.message.length > 100 
                          ? `${message.message.substring(0, 100)}...`
                          : message.message
                        }
                      </p>
                      
                      <p className="text-xs text-muted-foreground font-mono">
                        {new Date(message.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleRead(message.id, message.read)
                        }}
                      >
                        {message.read ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteMessage(message.id)
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="font-orbitron text-hologram">
                  Message Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                      From
                    </Label>
                    <p className="font-semibold">{selectedMessage.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                      Subject
                    </Label>
                    <p className="font-semibold">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                      Date
                    </Label>
                    <p className="text-sm">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                      Status
                    </Label>
                    <Badge variant={selectedMessage.read ? "default" : "secondary"}>
                      {selectedMessage.read ? "Read" : "Unread"}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                    Message
                  </Label>
                  <div className="mt-2 p-4 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="cyber"
                    size="sm"
                    className="flex-1"
                    onClick={() => toggleRead(selectedMessage.id, selectedMessage.read)}
                  >
                    {selectedMessage.read ? 'Mark Unread' : 'Mark Read'}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-muted-foreground/30">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-orbitron font-bold text-lg mb-2">Select a Message</h3>
                <p className="text-muted-foreground font-rajdhani">
                  Click on any message to view its details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageMessages