import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FolderOpen, 
  MessageSquare, 
  Briefcase,
  TrendingUp,
  Clock,
  Star,
  Mail
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Stats {
  projects: number
  skills: number
  clients: number
  messages: number
  unreadMessages: number
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    clients: 0,
    messages: 0,
    unreadMessages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [projectsRes, skillsRes, clientsRes, messagesRes] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('skills').select('id', { count: 'exact' }),
        supabase.from('clients').select('id', { count: 'exact' }),
        supabase.from('messages').select('id, read', { count: 'exact' })
      ])

      const unreadCount = messagesRes.data?.filter(msg => !msg.read).length || 0

      setStats({
        projects: projectsRes.count || 0,
        skills: skillsRes.count || 0,
        clients: clientsRes.count || 0,
        messages: messagesRes.count || 0,
        unreadMessages: unreadCount
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      description: 'Active projects in portfolio',
      color: 'text-primary'
    },
    {
      title: 'Skills Listed',
      value: stats.skills,
      icon: Briefcase,
      description: 'Technical & management skills',
      color: 'text-secondary'
    },
    {
      title: 'Client Testimonials',
      value: stats.clients,
      icon: Users,
      description: 'Happy clients feedback',
      color: 'text-accent'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      description: `${stats.unreadMessages} unread messages`,
      color: 'text-hologram',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null
    }
  ]

  const quickActions = [
    { title: 'Add New Project', description: 'Showcase your latest work', icon: FolderOpen },
    { title: 'Update Skills', description: 'Keep your expertise current', icon: Briefcase },
    { title: 'Check Messages', description: 'Respond to client inquiries', icon: Mail },
    { title: 'Edit About', description: 'Update your profile info', icon: Users }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded"></div>
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
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground font-rajdhani mt-2">
            Monitor your portfolio performance and manage content
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Clock className="w-4 h-4" />
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-animate bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-rajdhani text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className={`text-3xl font-orbitron font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      {stat.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {stat.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-primary/10 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Actions
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border border-border/50"
                >
                  <div className="p-2 rounded-md bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm font-rajdhani">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <Star className="w-5 h-5" />
              System Status
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Portfolio health and performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-rajdhani">Portfolio Content</span>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-rajdhani">Database Connection</span>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-rajdhani">Contact Form</span>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-rajdhani">Admin Panel</span>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardOverview