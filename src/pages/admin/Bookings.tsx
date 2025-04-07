
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
import { 
  Search, 
  MoreVertical, 
  Filter, 
  Download, 
  Calendar, 
  CreditCard, 
  Check, 
  X, 
  Clock,
  MapPin,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Booking {
  id: string;
  groundName: string;
  location: string;
  sport: string;
  date: Date;
  time: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: number;
  paymentStatus: 'paid' | 'refunded' | 'pending';
  paymentMethod: string;
  bookingDate: Date;
}

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  
  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: 'BK2503',
      groundName: 'Green Valley Football Ground',
      location: 'Jayanagar, Bangalore',
      sport: 'Football',
      date: new Date(2025, 3, 15), // April 15, 2025
      time: '6:00 PM - 7:00 PM',
      userName: 'Rahul Sharma',
      userEmail: 'rahul.sharma@example.com',
      userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'confirmed',
      price: 1080,
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      bookingDate: new Date(2025, 3, 10), // April 10, 2025
    },
    {
      id: 'BK2498',
      groundName: 'Sports Arena Cricket Ground',
      location: 'Whitefield, Bangalore',
      sport: 'Cricket',
      date: new Date(2025, 3, 20), // April 20, 2025
      time: '10:00 AM - 12:00 PM',
      userName: 'Priya Patel',
      userEmail: 'priya.patel@example.com',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'pending',
      price: 2500,
      paymentStatus: 'pending',
      paymentMethod: 'UPI',
      bookingDate: new Date(2025, 3, 5), // April 5, 2025
    },
    {
      id: 'BK2432',
      groundName: 'City Sports Badminton Court',
      location: 'Indiranagar, Bangalore',
      sport: 'Badminton',
      date: new Date(2025, 3, 2), // April 2, 2025
      time: '7:30 PM - 9:30 PM',
      userName: 'Vikram Singh',
      userEmail: 'vikram.singh@example.com',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'completed',
      price: 800,
      paymentStatus: 'paid',
      paymentMethod: 'UPI',
      bookingDate: new Date(2025, 2, 28), // March 28, 2025
    },
    {
      id: 'BK2367',
      groundName: 'Fitness Hub Basketball Court',
      location: 'HSR Layout, Bangalore',
      sport: 'Basketball',
      date: new Date(2025, 2, 25), // March 25, 2025
      time: '5:00 PM - 6:00 PM',
      userName: 'Ananya Singh',
      userEmail: 'ananya.singh@example.com',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'completed',
      price: 700,
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      bookingDate: new Date(2025, 2, 20), // March 20, 2025
    },
    {
      id: 'BK2289',
      groundName: 'Central Sports Zone Football Ground',
      location: 'Electronic City, Bangalore',
      sport: 'Football',
      date: new Date(2025, 2, 15), // March 15, 2025
      time: '4:00 PM - 5:00 PM',
      userName: 'Ravi Verma',
      userEmail: 'ravi.verma@example.com',
      status: 'cancelled',
      price: 900,
      paymentStatus: 'refunded',
      paymentMethod: 'Net Banking',
      bookingDate: new Date(2025, 2, 10), // March 10, 2025
    },
    {
      id: 'BK2275',
      groundName: 'Grand Slam Tennis Courts',
      location: 'Koramangala, Bangalore',
      sport: 'Tennis',
      date: new Date(2025, 3, 18), // April 18, 2025
      time: '7:00 AM - 8:00 AM',
      userName: 'Neha Gupta',
      userEmail: 'neha.gupta@example.com',
      userImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'confirmed',
      price: 600,
      paymentStatus: 'paid',
      paymentMethod: 'UPI',
      bookingDate: new Date(2025, 3, 1), // April 1, 2025
    },
  ];
  
  // Apply filters
  const filteredBookings = bookings.filter(booking => {
    // Search filter
    const matchesSearch = 
      booking.groundName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    // Payment filter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });
  
  // Handle booking actions
  const confirmBooking = (bookingId: string) => {
    toast.success(`Booking ${bookingId} has been confirmed.`);
    // In a real app, this would update the booking status in the database
  };
  
  const cancelBooking = (bookingId: string) => {
    toast.success(`Booking ${bookingId} has been cancelled. Refund initiated.`);
    // In a real app, this would update the booking status in the database
  };
  
  const sendReminder = (bookingId: string, userEmail: string) => {
    toast.success(`Reminder sent to ${userEmail} for booking ${bookingId}.`);
    // In a real app, this would send an email to the user
  };
  
  const exportBookings = () => {
    toast.success('Bookings exported successfully. Downloading CSV file...');
    // In a real app, this would generate and download a CSV file
  };
  
  // Status badge helper
  const renderStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <Check className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
    }
  };
  
  // Payment status badge helper
  const renderPaymentBadge = (status: Booking['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CreditCard className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'refunded':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CreditCard className="h-3 w-3 mr-1" />
            Refunded
          </Badge>
        );
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Bookings Management</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={exportBookings}
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
                placeholder="Search bookings..."
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
                <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                  Cancelled
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('completed')}>
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Payment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Payment: {paymentFilter === 'all' ? 'All' : paymentFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Payment</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setPaymentFilter('all')}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter('paid')}>
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter('pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPaymentFilter('refunded')}>
                  Refunded
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[220px]">Booking Details</TableHead>
                <TableHead>Ground & Slot</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-gray-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{booking.id}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(booking.bookingDate, 'dd MMM yyyy')}
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {booking.sport}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.groundName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {booking.location}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(booking.date, 'dd MMM yyyy')} • {booking.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={booking.userImage} />
                          <AvatarFallback className="bg-gray-200">
                            <User className="h-4 w-4 text-gray-500" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{booking.userName}</div>
                          <div className="text-sm text-gray-500">{booking.userEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {renderStatusBadge(booking.status)}
                    </TableCell>
                    <TableCell>
                      <div>
                        {renderPaymentBadge(booking.paymentStatus)}
                        <div className="text-sm mt-1">₹{booking.price}</div>
                        <div className="text-xs text-gray-500">{booking.paymentMethod}</div>
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
                            <Calendar className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {booking.status === 'pending' && (
                            <DropdownMenuItem 
                              className="flex items-center text-green-600"
                              onClick={() => confirmBooking(booking.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Confirm Booking
                            </DropdownMenuItem>
                          )}
                          {(booking.status === 'confirmed' || booking.status === 'pending') && (
                            <DropdownMenuItem 
                              className="flex items-center text-red-600"
                              onClick={() => cancelBooking(booking.id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Cancel Booking
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => sendReminder(booking.id, booking.userEmail)}
                          >
                            <Calendar className="h-4 w-4 mr-2" />
                            Send Reminder
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
            Showing {filteredBookings.length} of {bookings.length} bookings
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

export default Bookings;
