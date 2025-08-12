import { Button } from '@/components/ui/button'
import { Home, Monitor } from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="text-xl font-orbitron font-bold text-hologram">
            PM.TECH
          </div>
          <div className="h-6 w-px bg-border"></div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-rajdhani">
            <Monitor className="w-4 h-4" />
            Admin Panel
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost_cyber" size="sm">
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader