import AppSidebar from '@/pages/Dashboards/Shared/AppSidebar';
import NavbarDashboard from '@/pages/Dashboards/Shared/NavbarDashboard';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="h-full bg-white flex">
      <AppSidebar />
      <main className='w-full'>
        <NavbarDashboard />
        <div className='px-4'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
