import DashboardOverview from '@/components/admin/sections/DashboardOverview'
import ManageAbout from '@/components/admin/sections/ManageAbout'
import ManageSkills from '@/components/admin/sections/ManageSkills'
import ManageProjects from '@/components/admin/sections/ManageProjects'
import ManageClients from '@/components/admin/sections/ManageClients'
import ManageContact from '@/components/admin/sections/ManageContact'
import ManageMessages from '@/components/admin/sections/ManageMessages'
import AdminSettings from '@/components/admin/sections/AdminSettings'

interface AdminDashboardProps {
  activeSection: string
}

const AdminDashboard = ({ activeSection }: AdminDashboardProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />
      case 'about':
        return <ManageAbout />
      case 'skills':
        return <ManageSkills />
      case 'projects':
        return <ManageProjects />
      case 'clients':
        return <ManageClients />
      case 'contact':
        return <ManageContact />
      case 'messages':
        return <ManageMessages />
      case 'settings':
        return <AdminSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="space-y-6">
      {renderSection()}
    </div>
  )
}

export default AdminDashboard