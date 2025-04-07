
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MoreVertical, Plus, Filter, Edit, Trash, Eye, Map, Clock, Tags, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Ground {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  status: 'active' | 'maintenance' | 'inactive';
  amenities: string[];
  rating: number;
  bookings: number;
  image: string;
}

const Grounds = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [newGroundOpen, setNewGroundOpen] = useState(false);
  
  // Mock grounds data
  const grounds: Ground[] = [
    {
      id: 'G1001',
      name: 'Green Valley Football Ground',
      location: 'Jayanagar, Bangalore',
      sport: 'Football',
      price: 1200,
      status: 'active',
      amenities: ['Changing Rooms', 'Floodlights', 'Parking'],
      rating: 4.7,
      bookings: 120,
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1002',
      name: 'Sports Arena Cricket Ground',
      location: 'Whitefield, Bangalore',
      sport: 'Cricket',
      price: 2500,
      status: 'active',
      amenities: ['Pavilion', 'Floodlights', 'Equipment Rental'],
      rating: 4.5,
      bookings: 85,
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1003',
      name: 'City Sports Badminton Court',
      location: 'Indiranagar, Bangalore',
      sport: 'Badminton',
      price: 400,
      status: 'active',
      amenities: ['Air Conditioned', 'Equipment Rental', 'Cafeteria'],
      rating: 4.8,
      bookings: 210,
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1004',
      name: 'Fitness Hub Basketball Court',
      location: 'HSR Layout, Bangalore',
      sport: 'Basketball',
      price: 700,
      status: 'maintenance',
      amenities: ['Changing Rooms', 'Shower', 'Cafeteria'],
      rating: 4.2,
      bookings: 65,
      image: 'https://images.unsplash.com/photo-1518134346374-184f9d21cea2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1005',
      name: 'Central Sports Zone Football Ground',
      location: 'Electronic City, Bangalore',
      sport: 'Football',
      price: 900,
      status: 'active',
      amenities: ['Changing Rooms', 'Floodlights', 'Parking', 'Cafeteria'],
      rating: 4.4,
      bookings: 98,
      image: 'https://images.unsplash.com/photo-1551854716-dc8a3a099271?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1006',
      name: 'Grand Slam Tennis Courts',
      location: 'Koramangala, Bangalore',
      sport: 'Tennis',
      price: 600,
      status: 'active',
      amenities: ['Pro Shop', 'Coaching', 'Shower'],
      rating: 4.6,
      bookings: 112,
      image: 'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1007',
      name: 'Smash & Score Volleyball Court',
      location: 'JP Nagar, Bangalore',
      sport: 'Volleyball',
      price: 500,
      status: 'inactive',
      amenities: ['Changing Rooms', 'Beach Sand', 'Shower'],
      rating: 4.1,
      bookings: 45,
      image: 'https://images.unsplash.com/photo-1593236752689-206dfb2c00a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'G1008',
      name: 'Hockey Heroes Field',
      location: 'Marathahalli, Bangalore',
      sport: 'Hockey',
      price: 1100,
      status: 'active',
      amenities: ['AstroTurf', 'Floodlights', 'Equipment Rental'],
      rating: 4.3,
      bookings: 72,
      image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];
  
  // Apply filters
  const filteredGrounds = grounds.filter(ground => {
    // Search filter
    const matchesSearch = 
      ground.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ground.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ground.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || ground.status === statusFilter;
    
    // Sport filter
    const matchesSport = sportFilter === 'all' || ground.sport === sportFilter;
    
    return matchesSearch && matchesStatus && matchesSport;
  });
  
  // Helper function to get unique sports from grounds data
  const uniqueSports = Array.from(new Set(grounds.map(ground => ground.sport)));
  
  // Handle ground actions
  const toggleGroundStatus = (groundId: string, newStatus: 'active' | 'maintenance' | 'inactive') => {
    toast.success(`Ground status updated to ${newStatus} successfully.`);
    // In a real app, this would update the ground's status in the database
  };
  
  const deleteGround = (groundId: string) => {
    toast.success('Ground deleted successfully.');
    // In a real app, this would delete the ground from the database
  };
  
  const addNewGround = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('New ground added successfully!');
    setNewGroundOpen(false);
    // In a real app, this would add a new ground to the database
  };
  
  // Status badge helper
  const renderStatusBadge = (status: Ground['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckSquare className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Maintenance
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Trash className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Grounds Management</h1>
        <Dialog open={newGroundOpen} onOpenChange={setNewGroundOpen}>
          <DialogTrigger asChild>
            <Button className="bg-pitch-green hover:bg-opacity-90 flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add New Ground
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Ground</DialogTitle>
              <DialogDescription>
                Enter the details for the new sports ground.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={addNewGround}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name">Ground Name</Label>
                    <Input id="name" placeholder="e.g., Green Valley Football Ground" required />
                  </div>
                  <div>
                    <Label htmlFor="sport">Sport</Label>
                    <Select defaultValue="football">
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="football">Football</SelectItem>
                        <SelectItem value="cricket">Cricket</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                        <SelectItem value="badminton">Badminton</SelectItem>
                        <SelectItem value="volleyball">Volleyball</SelectItem>
                        <SelectItem value="hockey">Hockey</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹/hr)</Label>
                    <Input id="price" type="number" placeholder="e.g., 1200" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Jayanagar, Bangalore" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Brief description of the ground..." />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="amenities">Amenities (comma separated)</Label>
                    <Input id="amenities" placeholder="e.g., Changing Rooms, Floodlights, Parking" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="URL to ground image" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setNewGroundOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-pitch-green hover:bg-opacity-90">
                  Add Ground
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        {/* Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search grounds..."
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
                  Status: {statusFilter === 'all' ? 'All' : statusFilter}
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
                <DropdownMenuItem onClick={() => setStatusFilter('maintenance')}>
                  Maintenance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Sport Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Sport: {sportFilter === 'all' ? 'All' : sportFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Sport</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSportFilter('all')}>
                  All
                </DropdownMenuItem>
                {uniqueSports.map((sport) => (
                  <DropdownMenuItem 
                    key={sport} 
                    onClick={() => setSportFilter(sport)}
                  >
                    {sport}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Grounds Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Ground</TableHead>
                <TableHead>Sport</TableHead>
                <TableHead>Price (₹/hr)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrounds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                    No grounds found
                  </TableCell>
                </TableRow>
              ) : (
                filteredGrounds.map((ground) => (
                  <TableRow key={ground.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-12 w-16 rounded overflow-hidden mr-3 bg-gray-100">
                          <img 
                            src={ground.image} 
                            alt={ground.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{ground.name}</div>
                          <div className="text-gray-500 text-sm flex items-center">
                            <Map className="h-3 w-3 mr-1" />
                            {ground.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ground.sport}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{ground.price}</TableCell>
                    <TableCell>
                      {renderStatusBadge(ground.status)}
                    </TableCell>
                    <TableCell>{ground.bookings}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        {ground.rating}
                      </div>
                    </TableCell>
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
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Ground
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Clock className="h-4 w-4 mr-2" />
                            Manage Slots
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {ground.status === 'active' ? (
                            <DropdownMenuItem 
                              className="flex items-center text-yellow-600"
                              onClick={() => toggleGroundStatus(ground.id, 'maintenance')}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Set to Maintenance
                            </DropdownMenuItem>
                          ) : ground.status === 'maintenance' ? (
                            <DropdownMenuItem 
                              className="flex items-center text-green-600"
                              onClick={() => toggleGroundStatus(ground.id, 'active')}
                            >
                              <CheckSquare className="h-4 w-4 mr-2" />
                              Set to Active
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="flex items-center text-green-600"
                              onClick={() => toggleGroundStatus(ground.id, 'active')}
                            >
                              <CheckSquare className="h-4 w-4 mr-2" />
                              Set to Active
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="flex items-center text-red-600"
                            onClick={() => deleteGround(ground.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete Ground
                          </DropdownMenuItem>
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
            Showing {filteredGrounds.length} of {grounds.length} grounds
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

export default Grounds;
