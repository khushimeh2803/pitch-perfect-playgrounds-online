
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Calendar, CalendarCheck, CalendarX, ChevronRight, Clock, MapPin, Users, Star, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Booking {
  id: string;
  groundName: string;
  location: string;
  sport: string;
  date: string;
  time: string;
  price: number;
  players: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentMethod: string;
  bookingDate: string;
  rating?: number;
}

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK2503',
      groundName: 'Green Valley Football Ground',
      location: 'Jayanagar, Bangalore',
      sport: 'Football',
      date: '15 April, 2025',
      time: '6:00 PM - 7:00 PM',
      price: 1080,
      players: 10,
      status: 'upcoming',
      paymentMethod: 'Credit Card',
      bookingDate: '10 April, 2025',
    },
    {
      id: 'BK2498',
      groundName: 'Sport Arena Cricket Ground',
      location: 'Whitefield, Bangalore',
      sport: 'Cricket',
      date: '20 April, 2025',
      time: '10:00 AM - 12:00 PM',
      price: 2500,
      players: 16,
      status: 'upcoming',
      paymentMethod: 'UPI',
      bookingDate: '5 April, 2025',
    },
    {
      id: 'BK2432',
      groundName: 'City Sports Badminton Court',
      location: 'Indiranagar, Bangalore',
      sport: 'Badminton',
      date: '2 April, 2025',
      time: '7:30 PM - 9:30 PM',
      price: 800,
      players: 4,
      status: 'completed',
      paymentMethod: 'UPI',
      bookingDate: '28 March, 2025',
    },
    {
      id: 'BK2367',
      groundName: 'Fitness Hub Basketball Court',
      location: 'HSR Layout, Bangalore',
      sport: 'Basketball',
      date: '25 March, 2025',
      time: '5:00 PM - 6:00 PM',
      price: 700,
      players: 8,
      status: 'completed',
      paymentMethod: 'Credit Card',
      bookingDate: '20 March, 2025',
      rating: 4,
    },
    {
      id: 'BK2289',
      groundName: 'Central Sports Zone Football Ground',
      location: 'Electronic City, Bangalore',
      sport: 'Football',
      date: '15 March, 2025',
      time: '4:00 PM - 5:00 PM',
      price: 900,
      players: 12,
      status: 'cancelled',
      paymentMethod: 'Net Banking',
      bookingDate: '10 March, 2025',
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState('');
  
  const filteredBookings = bookings.filter(booking => booking.status === activeTab);
  
  const cancelBooking = (bookingId: string) => {
    setIsDialogOpen(false);
    toast.success(`Cancellation request for booking ${bookingId} has been sent to admin for confirmation.`);
    // In a real app, this would call an API to request cancellation
  };
  
  const requestCancellation = (bookingId: string) => {
    setCancelBookingId(bookingId);
    setIsDialogOpen(true);
  };
  
  const rateBooking = (bookingId: string, rating: number) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? {...booking, rating} : booking
    );
    setBookings(updatedBookings);
    toast.success(`Thanks for rating your experience for booking ${bookingId}!`);
  };
  
  const rebookSlot = (bookingId: string) => {
    toast.success(`Booking details for ${bookingId} have been copied to a new booking. Redirecting...`);
    // In a real app, this would redirect to the booking page with prefilled details
  };
  
  const renderStarRating = (bookingId: string, currentRating: number | undefined) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`h-5 w-5 cursor-pointer ${star <= (currentRating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            onClick={() => rateBooking(bookingId, star)}
          />
        ))}
      </div>
    );
  };
  
  const renderStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CalendarCheck className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CalendarCheck className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <CalendarX className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
    }
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-pitch-blue mb-2">My Bookings</h1>
            <p className="text-gray-600">View and manage all your ground bookings in one place</p>
          </div>
          <Link to="/grounds">
            <Button className="mt-4 md:mt-0 bg-pitch-green hover:bg-opacity-90">
              Book New Ground
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger 
              value="upcoming"
              className="flex items-center"
              data-count={bookings.filter(b => b.status === 'upcoming').length}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming
              <span className="ml-2 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                {bookings.filter(b => b.status === 'upcoming').length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="flex items-center"
              data-count={bookings.filter(b => b.status === 'completed').length}
            >
              <CalendarCheck className="h-4 w-4 mr-2" />
              Completed
              <span className="ml-2 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                {bookings.filter(b => b.status === 'completed').length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled"
              className="flex items-center"
              data-count={bookings.filter(b => b.status === 'cancelled').length}
            >
              <CalendarX className="h-4 w-4 mr-2" />
              Cancelled
              <span className="ml-2 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                {bookings.filter(b => b.status === 'cancelled').length}
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {filteredBookings.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-4">You don't have any upcoming bookings</p>
                  <Link to="/grounds">
                    <Button className="bg-pitch-green hover:bg-opacity-90">
                      Book a Ground Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{booking.groundName}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStatusBadge(booking.status)}
                        <Badge variant="outline">
                          {booking.sport}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{booking.players} Players</span>
                      </div>
                      <div className="text-pitch-blue font-bold">
                        ₹{booking.price}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                      <div>
                        <span>Booking ID: {booking.id}</span>
                        <span className="mx-2">•</span>
                        <span>Booked on {booking.bookingDate}</span>
                      </div>
                      <div>
                        Paid with {booking.paymentMethod}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => requestCancellation(booking.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Request Cancellation
                    </Button>
                    <Link to={`/grounds/${booking.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {filteredBookings.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CalendarCheck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-4">You don't have any completed bookings</p>
                  <Link to="/grounds">
                    <Button className="bg-pitch-green hover:bg-opacity-90">
                      Book a Ground Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{booking.groundName}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStatusBadge(booking.status)}
                        <Badge variant="outline">
                          {booking.sport}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{booking.players} Players</span>
                      </div>
                      <div className="text-pitch-blue font-bold">
                        ₹{booking.price}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                      <div>
                        <span>Booking ID: {booking.id}</span>
                        <span className="mx-2">•</span>
                        <span>Booked on {booking.bookingDate}</span>
                      </div>
                      <div>
                        Paid with {booking.paymentMethod}
                      </div>
                    </div>
                    
                    {/* Rating Section */}
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2">Rate your experience:</h4>
                      {renderStarRating(booking.id, booking.rating)}
                      {booking.rating && (
                        <p className="text-xs text-gray-500 mt-1">Thank you for your rating!</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 flex flex-wrap gap-2">
                    <Link to={`/grounds/${booking.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => rebookSlot(booking.id)}
                      className="border-green-200 text-green-600 hover:bg-green-50"
                    >
                      Book Again
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="cancelled" className="space-y-6">
            {filteredBookings.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CalendarX className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-4">You don't have any cancelled bookings</p>
                  <Link to="/grounds">
                    <Button className="bg-pitch-green hover:bg-opacity-90">
                      Book a Ground Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{booking.groundName}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStatusBadge(booking.status)}
                        <Badge variant="outline">
                          {booking.sport}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{booking.players} Players</span>
                      </div>
                      <div className="text-pitch-blue font-bold">
                        ₹{booking.price}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                      <div>
                        <span>Booking ID: {booking.id}</span>
                        <span className="mx-2">•</span>
                        <span>Booked on {booking.bookingDate}</span>
                      </div>
                      <div>
                        Paid with {booking.paymentMethod}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 flex flex-wrap gap-2">
                    <Link to="/grounds">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        Book Again
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Cancellation Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              Confirm Cancellation Request
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to request cancellation of this booking? The admin will need to confirm your cancellation request.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <p className="text-gray-600">Cancellation Policy:</p>
            <ul className="list-disc list-inside mt-1 text-gray-600 space-y-1">
              <li>Cancellations need admin approval</li>
              <li>Refunds may take 3-5 business days to process</li>
              <li>Cancellations within 24 hours of the slot may incur charges</li>
            </ul>
          </div>
          <DialogFooter>
            <Button 
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Go Back
            </Button>
            <Button 
              variant="destructive"
              onClick={() => cancelBooking(cancelBookingId)}
            >
              Confirm Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookings;
