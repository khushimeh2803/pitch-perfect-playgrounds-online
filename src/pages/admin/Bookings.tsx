
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
  User,
  Phone,
  Mail,
  AlertCircle,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface Booking {
  id: string;
  groundName: string;
  location: string;
  sport: string;
  date: Date;
  time: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  userImage?: string;
  userAddress?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  price: number;
  paymentStatus: 'paid' | 'refunded' | 'pending';
  paymentMethod: string;
  bookingDate: Date;
  cancellationRequested?: boolean;
}

interface BookingReportData {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  totalRevenue: number;
  sportDistribution: { name: string; value: number }[];
  paymentMethodDistribution: { name: string; value: number }[];
}

const Bookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  
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
      userPhone: '+91 9876543210',
      userAddress: '123 Main St, Jayanagar, Bangalore - 560011',
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
      userPhone: '+91 9876543211',
      userAddress: '456 Park Avenue, Whitefield, Bangalore - 560066',
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
      userPhone: '+91 9876543212',
      userAddress: '789 Brigade Road, Indiranagar, Bangalore - 560038',
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
      userPhone: '+91 9876543213',
      userAddress: '101 HSR Layout, Sector 3, Bangalore - 560102',
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
      userPhone: '+91 9876543214',
      userAddress: '202 Electronic City, Phase 1, Bangalore - 560100',
      status: 'cancelled',
      price: 900,
      paymentStatus: 'refunded',
      paymentMethod: 'Pay at Venue',
      bookingDate: new Date(2025, 2, 10), // March 10, 2025
    },
    {
      id: 'BK2275',
      groundName: 'Grand Slam Volleyball Courts',
      location: 'Koramangala, Bangalore',
      sport: 'Volleyball',
      date: new Date(2025, 3, 18), // April 18, 2025
      time: '7:00 AM - 8:00 AM',
      userName: 'Neha Gupta',
      userEmail: 'neha.gupta@example.com',
      userPhone: '+91 9876543215',
      userAddress: '303 Koramangala, 6th Block, Bangalore - 560095',
      userImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'confirmed',
      price: 600,
      paymentStatus: 'paid',
      paymentMethod: 'UPI',
      bookingDate: new Date(2025, 3, 1), // April 1, 2025
    },
    {
      id: 'BK2245',
      groundName: 'Green Valley Football Ground',
      location: 'Jayanagar, Bangalore',
      sport: 'Football',
      date: new Date(2025, 3, 25), // April 25, 2025
      time: '7:00 PM - 8:00 PM',
      userName: 'Arjun Nair',
      userEmail: 'arjun.nair@example.com',
      userPhone: '+91 9876543216',
      userAddress: '404 Residency Road, Richmond Town, Bangalore - 560025',
      userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      status: 'pending',
      price: 1080,
      paymentStatus: 'pending',
      paymentMethod: 'Pay at Venue',
      bookingDate: new Date(2025, 3, 18), // April 18, 2025
      cancellationRequested: true,
    },
  ];
  
  // Generate report data
  const generateReport = (): BookingReportData => {
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, booking) => sum + booking.price, 0);
    
    // Sport distribution
    const sportCounts: Record<string, number> = {};
    bookings.forEach(booking => {
      sportCounts[booking.sport] = (sportCounts[booking.sport] || 0) + 1;
    });
    
    const sportDistribution = Object.entries(sportCounts).map(([name, value]) => ({
      name,
      value,
    }));
    
    // Payment method distribution
    const paymentCounts: Record<string, number> = {};
    bookings.forEach(booking => {
      paymentCounts[booking.paymentMethod] = (paymentCounts[booking.paymentMethod] || 0) + 1;
    });
    
    const paymentMethodDistribution = Object.entries(paymentCounts).map(([name, value]) => ({
      name,
      value,
    }));
    
    return {
      totalBookings: bookings.length,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue,
      sportDistribution,
      paymentMethodDistribution,
    };
  };
  
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
    setIsCancelDialogOpen(false);
    toast.success(`Booking ${bookingId} has been cancelled. Refund initiated.`);
    // In a real app, this would update the booking status in the database
  };
  
  const sendReminder = (bookingId: string, userEmail: string) => {
    toast.success(`Reminder sent to ${userEmail} for booking ${bookingId}.`);
    // In a real app, this would send an email to the user
  };
  
  const handleViewUserDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsUserDialogOpen(true);
  };
  
  const handleCancellationRequest = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsCancelDialogOpen(true);
  };
  
  const generatePdfReport = () => {
    toast.success('Generating PDF report. It will be downloaded shortly...');
    // In a real app, this would generate a PDF and download it
    setTimeout(() => {
      setIsReportDialogOpen(false);
    }, 1500);
  };
  
  // Status badge helper
  const renderStatusBadge = (status: Booking['status'], cancellationRequested?: boolean) => {
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
          <div className="space-y-1">
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </Badge>
            {cancellationRequested && (
              <Badge className="bg-red-50 text-red-600 hover:bg-red-50 block mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                Cancellation Requested
              </Badge>
            )}
          </div>
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
            onClick={() => setIsReportDialogOpen(true)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={() => {
              toast.success('Bookings exported successfully. Downloading CSV file...');
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
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
                      <div className="flex items-center cursor-pointer" onClick={() => handleViewUserDetails(booking)}>
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
                      {renderStatusBadge(booking.status, booking.cancellationRequested)}
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
                          <DropdownMenuItem 
                            className="flex items-center"
                            onClick={() => handleViewUserDetails(booking)}
                          >
                            <User className="h-4 w-4 mr-2" />
                            View User Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            View Booking Details
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
                              onClick={() => booking.cancellationRequested 
                                ? handleCancellationRequest(booking)
                                : cancelBooking(booking.id)
                              }
                            >
                              <X className="h-4 w-4 mr-2" />
                              {booking.cancellationRequested 
                                ? 'Approve Cancellation' 
                                : 'Cancel Booking'
                              }
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
      
      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete profile information for this user
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedBooking.userImage} />
                  <AvatarFallback className="bg-gray-200 text-lg">
                    {selectedBooking.userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg">{selectedBooking.userName}</h3>
                  <p className="text-gray-500">Customer ID: {selectedBooking.id.replace('BK', 'U')}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p>{selectedBooking.userEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p>{selectedBooking.userPhone || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p>{selectedBooking.userAddress || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium mb-2">Booking History</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cancellations:</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Close
            </Button>
            <Link to="/admin/users" className="w-full sm:w-auto">
              <Button>View Full Profile</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancellation Request Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              Confirm Cancellation Request
            </DialogTitle>
            <DialogDescription>
              {selectedBooking?.cancellationRequested 
                ? 'A user has requested cancellation for this booking. Please review the details before approving.' 
                : 'Are you sure you want to cancel this booking?'
              }
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Booking ID:</p>
                    <p className="font-medium">{selectedBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">User:</p>
                    <p className="font-medium">{selectedBooking.userName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ground:</p>
                    <p className="font-medium">{selectedBooking.groundName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date & Time:</p>
                    <p className="font-medium">{format(selectedBooking.date, 'dd MMM yyyy')} • {selectedBooking.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Payment Method:</p>
                    <p className="font-medium">{selectedBooking.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Amount:</p>
                    <p className="font-medium">₹{selectedBooking.price}</p>
                  </div>
                </div>
              </div>
              
              {selectedBooking.paymentStatus === 'paid' && (
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-yellow-800 text-sm">
                    <AlertCircle className="h-4 w-4 inline mr-2" />
                    This booking has been paid. Cancellation will initiate a refund.
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCancelDialogOpen(false)}
            >
              Go Back
            </Button>
            <Button 
              variant="destructive"
              onClick={() => cancelBooking(selectedBooking?.id || '')}
            >
              {selectedBooking?.cancellationRequested ? 'Approve Cancellation' : 'Cancel Booking'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Generate Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Booking Report</DialogTitle>
            <DialogDescription>
              Create and download a PDF report of your bookings data
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Date Range Picker */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Select Date Range</h3>
              <DateRangePicker />
            </div>
            
            {/* Report Options */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Include in Report</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeFinancials" className="rounded" defaultChecked />
                  <label htmlFor="includeFinancials">Financial Summary</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeCharts" className="rounded" defaultChecked />
                  <label htmlFor="includeCharts">Charts and Graphs</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeBookingList" className="rounded" defaultChecked />
                  <label htmlFor="includeBookingList">Detailed Booking List</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeUserDetails" className="rounded" defaultChecked />
                  <label htmlFor="includeUserDetails">User Details</label>
                </div>
              </div>
            </div>
            
            {/* Report Preview */}
            <div className="border rounded-md p-4 space-y-3">
              <h3 className="font-medium">Report Preview</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="text-lg font-bold">{bookings.length}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-lg font-bold">₹{bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.price : 0), 0)}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-lg font-bold">{bookings.filter(b => b.status === 'completed').length}</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-lg font-bold">{bookings.filter(b => b.status === 'pending').length}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 p-2 border border-dashed rounded text-center">
                <p>Charts and detailed booking information will be included in the PDF report</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={generatePdfReport}
              className="bg-pitch-blue hover:bg-opacity-90"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate PDF Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
