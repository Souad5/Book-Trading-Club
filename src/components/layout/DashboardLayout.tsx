// DashboardLayout.tsx (large project)
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/pages/Dashboards/Shared/AppSidebar';
import NavbarDashboard from '@/pages/Dashboards/Shared/NavbarDashboard';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <NavbarDashboard />
          <div className="px-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
