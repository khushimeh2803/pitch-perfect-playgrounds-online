
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Star, MapPin, Clock, Users, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

// Types
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  selected?: boolean;
}

interface Ground {
  id: string;
  name: string;
  sport: string;
  images: string[];
  description: string;
  location: {
    city: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  rules: string[];
  capacity: number;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
}

// Mock data for a single ground
const groundData: Ground = {
  id: '1',
  name: 'Green Valley Football Ground',
  sport: 'Football',
  images: [
    'https://images.unsplash.com/photo-1546608235-5aaa3054adbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1488778578932-0f84d315fcae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  ],
  description: 'Green Valley Football Ground is a premier football facility located in South Delhi. The ground features a FIFA-approved synthetic turf that provides excellent playing conditions in all weather. Perfect for matches, training sessions, or casual play with friends.',
  location: {
    city: 'Delhi',
    address: '123 Green Valley, South Delhi',
    coordinates: {
      lat: 28.6139,
      lng: 77.2090,
    },
  },
  price: 1200,
  rating: 4.8,
  reviewCount: 124,
  amenities: [
    'Changing Rooms',
    'Floodlights',
    'Parking',
    'Cafeteria',
    'Spectator Seating',
    'Equipment Rental',
    'First Aid Kit',
    'Water Dispenser',
  ],
  rules: [
    'Proper sports shoes required',
    'No food or drinks on the field',
    'Arrive 15 minutes before booking time',
    'Maximum 22 players allowed',
    'Cancellation allowed up to 24 hours before booking',
  ],
  capacity: 22,
  openingHours: {
    weekdays: '6:00 AM - 10:00 PM',
    weekends: '5:00 AM - 11:00 PM',
  },
};

// Generate mock time slots
const generateTimeSlots = (date: Date): TimeSlot[] => {
  // Start from 6 AM to 10 PM with 1-hour slots
  const slots: TimeSlot[] = [];
  const today = new Date();
  const isToday = date.getDate() === today.getDate() && 
                 date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear();
  
  const currentHour = today.getHours();
  
  for (let hour = 6; hour < 22; hour++) {
    // For today, only show future time slots
    if (isToday && hour <= currentHour) {
      continue;
    }
    
    // Randomly make some slots unavailable
    const available = Math.random() > 0.3;
    
    slots.push({
      id: `slot-${hour}`,
      time: `${hour}:00 - ${hour + 1}:00`,
      available,
      selected: false,
    });
  }
  
  return slots;
};

const GroundDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [ground, setGround] = useState<Ground | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Fetch ground data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGround(groundData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Generate time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate));
      setTotalPrice(0); // Reset price when date changes
    }
  }, [selectedDate]);
  
  // Update total price when time slots are selected/deselected
  useEffect(() => {
    if (ground) {
      const selectedCount = timeSlots.filter(slot => slot.selected).length;
      setTotalPrice(selectedCount * ground.price);
    }
  }, [timeSlots, ground]);
  
  const handleTimeSlotToggle = (slotId: string) => {
    setTimeSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.id === slotId && slot.available
          ? { ...slot, selected: !slot.selected }
          : slot
      )
    );
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setShowCalendar(false);
    }
  };
  
  const nextImage = () => {
    if (ground) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === ground.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const prevImage = () => {
    if (ground) {
      setCurrentImageIndex(prevIndex => 
        prevIndex === 0 ? ground.images.length - 1 : prevIndex - 1
      );
    }
  };
  
  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to book a ground');
      navigate('/signin');
      return;
    }
    
    const selectedSlots = timeSlots.filter(slot => slot.selected);
    
    if (selectedSlots.length === 0) {
      toast.error('Please select at least one time slot');
      return;
    }
    
    // In a real app, this would make an API call to create a booking
    toast.success('Redirecting to payment page...');
    
    // Format selected slots for display
    const slotsInfo = selectedSlots.map(slot => slot.time).join(', ');
    
    // Navigate to payment page with booking details
    navigate('/payment', {
      state: {
        groundId: ground?.id,
        groundName: ground?.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        slots: selectedSlots,
        totalPrice,
        formattedDate: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        formattedSlots: slotsInfo,
      }
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded w-36"></div>
        </div>
      </div>
    );
  }
  
  if (!ground) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Ground not found</h2>
          <p className="mt-2 text-gray-500">The ground you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="mt-4 bg-pitch-blue hover:bg-pitch-blue/90"
            onClick={() => navigate('/grounds')}
          >
            Back to Grounds
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500">
            <ol className="flex items-center space-x-2">
              <li><a href="/" className="hover:text-gray-700">Home</a></li>
              <li><span className="mx-2">/</span></li>
              <li><a href="/grounds" className="hover:text-gray-700">Grounds</a></li>
              <li><span className="mx-2">/</span></li>
              <li className="text-gray-700 font-medium">{ground.name}</li>
            </ol>
          </nav>
        </div>
        
        {/* Ground Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-pitch-blue">{ground.name}</h1>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="mr-2 bg-pitch-green/10 text-pitch-green border-pitch-green/20">
                  {ground.sport}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{ground.rating}</span>
                  <span className="text-gray-500 ml-1">({ground.reviewCount} reviews)</span>
                </div>
              </div>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{ground.location.address}, {ground.location.city}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-pitch-blue">₹{ground.price}</span>
                <span className="text-gray-600 ml-1">/hour</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="mb-10 relative rounded-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 md:aspect-h-6">
            <img 
              src={ground.images[currentImageIndex]} 
              alt={ground.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image navigation */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {ground.images.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ground Info */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="animate-fade-in">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">About this ground</h3>
                  <p className="text-gray-700">{ground.description}</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center text-pitch-blue">
                        <Users className="h-5 w-5 mr-2" />
                        Capacity
                      </h4>
                      <p className="mt-1">Up to {ground.capacity} players</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium flex items-center text-pitch-blue">
                        <Clock className="h-5 w-5 mr-2" />
                        Opening Hours
                      </h4>
                      <p className="mt-1">Weekdays: {ground.openingHours.weekdays}</p>
                      <p>Weekends: {ground.openingHours.weekends}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ground.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-pitch-green mr-3" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="rules" className="animate-fade-in">
                <h3 className="text-xl font-semibold mb-4">Ground Rules</h3>
                <ul className="space-y-3">
                  {ground.rules.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-pitch-green/10 rounded-full h-6 w-6 text-pitch-green text-sm mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column - Booking Card */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Book this ground</h3>
                
                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-between"
                      onClick={() => setShowCalendar(prev => !prev)}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    
                    {showCalendar && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={handleDateSelect}
                          disabled={(date) => 
                            date < new Date() || 
                            date > addDays(new Date(), 30)
                          }
                          initialFocus
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Time Slots */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2">
                    {timeSlots.length > 0 ? (
                      timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          className={`py-2 px-3 rounded-md text-sm border transition-colors ${
                            slot.selected
                              ? 'bg-pitch-green text-white border-pitch-green'
                              : slot.available
                                ? 'border-gray-300 hover:border-pitch-green'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          onClick={() => handleTimeSlotToggle(slot.id)}
                          disabled={!slot.available}
                        >
                          {slot.time}
                        </button>
                      ))
                    ) : (
                      <p className="col-span-2 text-center text-gray-500 py-4">
                        No available slots for this date
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    You can select multiple time slots
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                {/* Price Summary */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Price per hour</span>
                    <span>₹{ground.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Selected slots</span>
                    <span>{timeSlots.filter(slot => slot.selected).length}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total price</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
                
                {/* Book Button */}
                <Button 
                  className="w-full bg-pitch-green hover:bg-pitch-green/90"
                  onClick={handleBooking}
                  disabled={timeSlots.filter(slot => slot.selected).length === 0}
                >
                  {isAuthenticated ? 'Proceed to Payment' : 'Login to Book'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroundDetail;

// Helper component for Gallery
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
