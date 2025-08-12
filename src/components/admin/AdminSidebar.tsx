import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FolderOpen, 
  Users, 
  Mail, 
  MessageSquare,
  LogOut,
  Settings
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const { logout, user } = useAuth()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'Manage About', icon: User },
    { id: 'skills', label: 'Manage Skills', icon: Briefcase },
    { id: 'projects', label: 'Manage Projects', icon: FolderOpen },
    { id: 'clients', label: 'Manage Clients', icon: Users },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card/50 backdrop-blur-md border-r border-border/50 z-40">
      <div className="p-6">
        {/* User Info */}
        <div className="mb-8 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground font-orbitron">
                {user?.username || 'Admin'}
              </p>
              <p className="text-xs text-muted-foreground font-rajdhani">
                System Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'cyber' : 'ghost'}
                className="w-full justify-start font-rajdhani"
                onClick={() => setActiveSection(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="destructive"
            className="w-full font-rajdhani"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar