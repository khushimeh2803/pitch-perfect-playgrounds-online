
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const [notifications] = useState([
    { id: 1, text: 'New booking request', time: '5 minutes ago' },
    { id: 2, text: 'New user registered', time: '1 hour ago' },
    { id: 3, text: 'Payment received', time: '2 hours ago' },
  ]);
  
  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="px-4 py-3 focus:bg-gray-100 border-b border-gray-100">
                    <div>
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t text-center">
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
