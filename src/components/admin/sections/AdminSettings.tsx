import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Settings, 
  Download, 
  Upload, 
  Database, 
  Shield, 
  Trash2,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

const AdminSettings = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const { toast } = useToast()

  const exportData = async () => {
    setIsExporting(true)
    try {
      // Fetch all data
      const [aboutRes, skillsRes, projectsRes, clientsRes, contactRes, messagesRes] = await Promise.all([
        supabase.from('about').select('*'),
        supabase.from('skills').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('clients').select('*'),
        supabase.from('contact_info').select('*'),
        supabase.from('messages').select('*')
      ])

      const exportData = {
        about: aboutRes.data || [],
        skills: skillsRes.data || [],
        projects: projectsRes.data || [],
        clients: clientsRes.data || [],
        contact_info: contactRes.data || [],
        messages: messagesRes.data || [],
        exported_at: new Date().toISOString(),
        version: '1.0'
      }

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Success",
        description: "Data exported successfully"
      })
    } catch (error) {
      console.error('Error exporting data:', error)
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive"
      })
    } finally {
      setIsExporting(false)
    }
  }

  const clearAllData = async () => {
    if (!confirm('Are you sure you want to clear ALL data? This action cannot be undone!')) return
    if (!confirm('This will delete everything including messages, projects, skills, and client data. Are you absolutely sure?')) return

    setIsClearing(true)
    try {
      // Clear all tables
      await Promise.all([
        supabase.from('messages').delete().neq('id', 0),
        supabase.from('projects').delete().neq('id', 0),
        supabase.from('skills').delete().neq('id', 0),
        supabase.from('clients').delete().neq('id', 0)
      ])

      toast({
        title: "Success",
        description: "All data cleared successfully"
      })
    } catch (error) {
      console.error('Error clearing data:', error)
      toast({
        title: "Error",
        description: "Failed to clear data",
        variant: "destructive"
      })
    } finally {
      setIsClearing(false)
    }
  }

  const systemInfo = [
    { label: 'Database', value: 'Supabase PostgreSQL', status: 'Connected' },
    { label: 'Authentication', value: 'Session-based', status: 'Active' },
    { label: 'File Storage', value: 'Supabase Storage', status: 'Available' },
    { label: 'API Version', value: 'v1.0', status: 'Current' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-orbitron font-bold text-hologram">
          Admin Settings
        </h1>
        <p className="text-muted-foreground font-rajdhani mt-2">
          System configuration and data management
        </p>
      </div>

      {/* System Status */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
            <Shield className="w-5 h-5" />
            System Status
          </CardTitle>
          <CardDescription className="font-rajdhani">
            Current system health and configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemInfo.map((info, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/50">
                <div>
                  <p className="font-semibold font-rajdhani">{info.label}</p>
                  <p className="text-sm text-muted-foreground">{info.value}</p>
                </div>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {info.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Backup & Export */}
        <Card className="border-secondary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Backup
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Export and backup your portfolio data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-accent/50 bg-accent/10">
              <FileText className="w-4 h-4" />
              <AlertDescription className="font-rajdhani">
                Regular backups help protect your data. Export includes all portfolio content, 
                skills, projects, client testimonials, and messages.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Button 
                onClick={exportData}
                disabled={isExporting}
                variant="cyber"
                className="w-full gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Export All Data'}
              </Button>

              <div className="text-sm text-muted-foreground font-mono">
                <p>• Includes all portfolio content</p>
                <p>• JSON format for easy import</p>
                <p>• Timestamped filename</p>
                <p>• Version information included</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-orbitron text-destructive flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="font-rajdhani">
              Irreversible actions that affect your data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="font-rajdhani">
                <strong>Warning:</strong> These actions cannot be undone. Make sure to export 
                your data before performing any destructive operations.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <Button 
                onClick={clearAllData}
                disabled={isClearing}
                variant="destructive"
                className="w-full gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {isClearing ? 'Clearing...' : 'Clear All Data'}
              </Button>

              <div className="text-sm text-muted-foreground font-mono">
                <p>• Deletes all portfolio content</p>
                <p>• Removes all messages</p>
                <p>• Clears skills and projects</p>
                <p>• Cannot be reversed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Credentials */}
      <Card className="border-hologram/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Admin Access
          </CardTitle>
          <CardDescription className="font-rajdhani">
            Current admin credentials and security information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                  Username
                </Label>
                <p className="font-mono bg-background/50 px-3 py-2 rounded border">andri</p>
              </div>
              
              <div>
                <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                  Password
                </Label>
                <p className="font-mono bg-background/50 px-3 py-2 rounded border">4ndr!4n</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                  Session Duration
                </Label>
                <p className="text-sm">24 hours</p>
              </div>
              
              <div>
                <Label className="text-sm font-rajdhani font-medium text-muted-foreground">
                  Security Level
                </Label>
                <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Basic Authentication
                </Badge>
              </div>
            </div>
          </div>

          <Alert className="mt-6 border-amber-500/50 bg-amber-500/10">
            <Shield className="w-4 h-4" />
            <AlertDescription className="font-rajdhani">
              <strong>Security Note:</strong> These are demo credentials. In a production environment, 
              use strong passwords and consider implementing two-factor authentication.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-orbitron text-hologram flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription className="font-rajdhani">
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="ghost_cyber" className="gap-2 h-auto p-4 flex-col">
              <Database className="w-6 h-6" />
              <span className="font-rajdhani">Check Database</span>
            </Button>
            
            <Button variant="ghost_cyber" className="gap-2 h-auto p-4 flex-col">
              <Upload className="w-6 h-6" />
              <span className="font-rajdhani">Import Data</span>
            </Button>
            
            <Button variant="ghost_cyber" className="gap-2 h-auto p-4 flex-col">
              <FileText className="w-6 h-6" />
              <span className="font-rajdhani">View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <label className={className}>{children}</label>
)

export default AdminSettings