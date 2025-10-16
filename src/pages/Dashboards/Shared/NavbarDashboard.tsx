import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/firebase/AuthProvider';
import { ModeToggle } from '@/pages/Theme/ModeToggle';
import { LogOut, Settings, User } from 'lucide-react';
import { Link } from 'react-router';

const NavbarDashboard = () => {
  const { user } = useAuth();
  if (!user) return null;
  const photo: string | null = user?.photoURL;
  console.log(user);
  return (
    <div className="p-4 flex items-center justify-between">
      {/* Left */}
      collapsebutton
      {/* Right */}
      <div className="flex items-center gap-4">
        <Link to={'/'}>Dashboard</Link>
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={photo ?? ''} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900">
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NavbarDashboard;
