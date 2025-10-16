import { Outlet } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';

const HomePageLayout = () => {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;
