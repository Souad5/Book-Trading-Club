import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/firebase/AuthProvider';

import { ModeToggle } from '@/pages/Theme/ModeToggle';
import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router';

const NavbarDashboard = () => {
  const { user } = useAuth();

  const photourl: string | null = user && user.photoURL;
  // console.log(photourl);
  return (
    <nav className="p-4 flex items-center justify-between">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <Link to={'/'}>Home</Link>
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={photourl ? photourl : ''} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className='flex gap-2' to={'/dashboard/users/Farhan'}>
                <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
