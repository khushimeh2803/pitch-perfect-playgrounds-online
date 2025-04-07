
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  Calendar, 
  FileText, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: LayoutDashboard 
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: Users 
    },
    { 
      name: 'Grounds', 
      path: '/admin/grounds', 
      icon: Map 
    },
    { 
      name: 'Bookings', 
      path: '/admin/bookings', 
      icon: Calendar 
    },
    { 
      name: 'Reports', 
      path: '/admin/reports', 
      icon: FileText 
    },
  ];
  
  return (
    <div className="w-64 bg-pitch-blue min-h-screen flex flex-col transition-all duration-300 shadow-lg">
      <div className="p-4 border-b border-blue-800">
        <Link to="/admin" className="flex items-center">
          <span className="text-white font-bold text-xl">Pitch</span>
          <span className="text-pitch-green font-bold text-xl">Perfect</span>
          <span className="text-white ml-2 text-sm">Admin</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center p-3 text-base font-medium rounded-md transition-colors group",
                  isActive(item.path)
                    ? "bg-blue-800 text-white"
                    : "text-gray-300 hover:bg-blue-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{item.name}</span>
                {isActive(item.path) && <ChevronRight className="w-4 h-4" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t border-blue-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-blue-800"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
