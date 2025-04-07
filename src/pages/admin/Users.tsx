
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MoreVertical, User, Shield, Filter, Download, UserX, UserCheck, BadgeCheck, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'active' | 'inactive';
  role: 'admin' | 'user';
  bookings: number;
  image?: string;
  membership?: string;
}

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Mock users data
  const users: UserType[] = [
    {
      id: 'U1001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 9876543210',
      joinDate: '12 Mar 2025',
      status: 'active',
      role: 'user',
      bookings: 12,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      membership: 'Gold',
    },
    {
      id: 'U1002',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 8765432109',
      joinDate: '20 Feb 2025',
      status: 'active',
      role: 'user',
      bookings: 8,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      membership: 'Platinum',
    },
    {
      id: 'U1003',
      name: 'Sanjay Kumar',
      email: 'sanjay.kumar@example.com',
      phone: '+91 7654321098',
      joinDate: '5 Jan 2025',
      status: 'inactive',
      role: 'user',
      bookings: 3,
    },
    {
      id: 'U1004',
      name: 'Ananya Singh',
      email: 'ananya.singh@example.com',
      phone: '+91 6543210987',
      joinDate: '18 Feb 2025',
      status: 'active',
      role: 'user',
      bookings: 6,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      membership: 'Basic',
    },
    {
      id: 'U1005',
      name: 'Vikram Reddy',
      email: 'vikram.reddy@example.com',
      phone: '+91 5432109876',
      joinDate: '3 Mar 2025',
      status: 'active',
      role: 'admin',
      bookings: 0,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'U1006',
      name: 'Neha Gupta',
      email: 'neha.gupta@example.com',
      phone: '+91 4321098765',
      joinDate: '25 Jan 2025',
      status: 'active',
      role: 'user',
      bookings: 15,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      membership: 'Gold',
    },
    {
      id: 'U1007',
      name: 'Ravi Verma',
      email: 'ravi.verma@example.com',
      phone: '+91 3210987654',
      joinDate: '10 Feb 2025',
      status: 'inactive',
      role: 'user',
      bookings: 2,
    },
    {
      id: 'U1008',
      name: 'Admin User',
      email: 'admin@pitchperfect.com',
      phone: '+91 1234567890',
      joinDate: '1 Jan 2025',
      status: 'active',
      role: 'admin',
      bookings: 0,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
  ];
  
  // Apply filters
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // Role filter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });
  
  // Handle user actions
  const toggleUserStatus = (userId: string, newStatus: 'active' | 'inactive') => {
    const actionText = newStatus === 'active' ? 'activated' : 'deactivated';
    toast.success(`User account ${actionText} successfully.`);
    // In a real app, this would update the user's status in the database
  };
  
  const promoteToAdmin = (userId: string) => {
    toast.success('User promoted to admin successfully.');
    // In a real app, this would update the user's role in the database
  };
  
  const demoteToUser = (userId: string) => {
    toast.success('Admin demoted to regular user successfully.');
    // In a real app, this would update the user's role in the database
  };
  
  const exportUsersList = () => {
    toast.success('Users list exported successfully. Downloading CSV file...');
    // In a real app, this would generate and download a CSV file
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">User Management</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={exportUsersList}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Status: {statusFilter === 'all' ? 'All' : statusFilter === 'active' ? 'Active' : 'Inactive'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Role Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Role: {roleFilter === 'all' ? 'All' : roleFilter === 'admin' ? 'Admin' : 'User'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setRoleFilter('all')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('admin')}>
                  Admin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter('user')}>
                  User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Users Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[240px]">User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.image} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center">
                            {user.name}
                            {user.membership && (
                              <Badge variant="outline" className="ml-2 text-xs bg-yellow-50">
                                {user.membership}
                              </Badge>
                            )}
                          </div>
                          <div className="text-gray-500 text-sm">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.email}</div>
                        <div className="text-gray-500">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <Badge className={`${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                      }`}>
                        {user.status === 'active' ? (
                          <UserCheck className="h-3 w-3 mr-1" />
                        ) : (
                          <UserX className="h-3 w-3 mr-1" />
                        )}
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${
                        user.role === 'admin' 
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                      }`}>
                        {user.role === 'admin' ? (
                          <Shield className="h-3 w-3 mr-1" />
                        ) : (
                          <User className="h-3 w-3 mr-1" />
                        )}
                        {user.role === 'admin' ? 'Admin' : 'User'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.bookings}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            Email User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem 
                              className="flex items-center text-red-600"
                              onClick={() => toggleUserStatus(user.id, 'inactive')}
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Deactivate User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="flex items-center text-green-600"
                              onClick={() => toggleUserStatus(user.id, 'active')}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          {user.role === 'user' ? (
                            <DropdownMenuItem 
                              className="flex items-center text-blue-600"
                              onClick={() => promoteToAdmin(user.id)}
                            >
                              <BadgeCheck className="h-4 w-4 mr-2" />
                              Promote to Admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="flex items-center"
                              onClick={() => demoteToUser(user.id)}
                            >
                              <User className="h-4 w-4 mr-2" />
                              Demote to User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
