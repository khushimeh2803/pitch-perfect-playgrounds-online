
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar } from 'lucide-react';
import { Star, MapPin, Users, Filter } from 'lucide-react';

// Define types for our data
interface Ground {
  id: string;
  name: string;
  image: string;
  sport: string;
  location: {
    city: string;
    address: string;
  };
  price: number;
  rating: number;
  reviewCount: number;
  capacity: number;
  amenities: string[];
  availableSlots: number;
}

// Mock data for grounds
const initialGrounds: Ground[] = [
  {
    id: '1',
    name: 'Green Valley Football Ground',
    image: 'https://images.unsplash.com/photo-1546608235-5aaa3054adbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Football',
    location: {
      city: 'Delhi',
      address: '123 Green Valley, South Delhi',
    },
    price: 1200,
    rating: 4.8,
    reviewCount: 124,
    capacity: 22,
    amenities: ['Changing Rooms', 'Floodlights', 'Parking', 'Cafeteria'],
    availableSlots: 6,
  },
  {
    id: '2',
    name: 'Ace Cricket Stadium',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Cricket',
    location: {
      city: 'Mumbai',
      address: '456 Sporting Lane, Andheri',
    },
    price: 1500,
    rating: 4.5,
    reviewCount: 98,
    capacity: 30,
    amenities: ['Changing Rooms', 'Equipment Rental', 'Parking', 'Cafeteria'],
    availableSlots: 4,
  },
  {
    id: '3',
    name: 'Prime Badminton Court',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Badminton',
    location: {
      city: 'Bangalore',
      address: '789 Play Street, Koramangala',
    },
    price: 800,
    rating: 4.7,
    reviewCount: 76,
    capacity: 8,
    amenities: ['Air Conditioning', 'Equipment Rental', 'Changing Rooms', 'Cafeteria'],
    availableSlots: 8,
  },
  {
    id: '4',
    name: 'City Basketball Arena',
    image: 'https://images.unsplash.com/photo-1573012663577-5c7cc95e8a4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Basketball',
    location: {
      city: 'Chennai',
      address: '101 Sports Complex, T Nagar',
    },
    price: 1000,
    rating: 4.4,
    reviewCount: 52,
    capacity: 15,
    amenities: ['Changing Rooms', 'Water Dispenser', 'Parking', 'Scoreboard'],
    availableSlots: 5,
  },
  {
    id: '5',
    name: 'Royal Tennis Club',
    image: 'https://images.unsplash.com/photo-1544298754-0a94cce7d64c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Tennis',
    location: {
      city: 'Delhi',
      address: '202 Elite Street, Vasant Kunj',
    },
    price: 1300,
    rating: 4.9,
    reviewCount: 135,
    capacity: 6,
    amenities: ['Changing Rooms', 'Equipment Rental', 'Club House', 'Coaching Available'],
    availableSlots: 3,
  },
  {
    id: '6',
    name: 'Riverside Cricket Ground',
    image: 'https://images.unsplash.com/photo-1567367181013-5a4273a601ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Cricket',
    location: {
      city: 'Kolkata',
      address: '303 River View, Salt Lake',
    },
    price: 1400,
    rating: 4.6,
    reviewCount: 87,
    capacity: 22,
    amenities: ['Changing Rooms', 'Equipment Rental', 'Parking', 'View Deck'],
    availableSlots: 6,
  },
  {
    id: '7',
    name: 'Downtown Football Center',
    image: 'https://images.unsplash.com/photo-1566404791232-af9159420054?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Football',
    location: {
      city: 'Hyderabad',
      address: '404 Central Avenue, Banjara Hills',
    },
    price: 1100,
    rating: 4.3,
    reviewCount: 61,
    capacity: 16,
    amenities: ['Changing Rooms', 'Floodlights', 'Cafeteria'],
    availableSlots: 7,
  },
  {
    id: '8',
    name: 'Grand Badminton Hall',
    image: 'https://images.unsplash.com/photo-1603742434556-7e0c2c9e1482?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    sport: 'Badminton',
    location: {
      city: 'Pune',
      address: '505 Sports Village, Viman Nagar',
    },
    price: 900,
    rating: 4.7,
    reviewCount: 92,
    capacity: 12,
    amenities: ['Air Conditioning', 'Equipment Rental', 'Changing Rooms', 'Coaching Available'],
    availableSlots: 9,
  },
];

// Unique sports and cities for filter options
const sportOptions = Array.from(new Set(initialGrounds.map(ground => ground.sport)));
const cityOptions = Array.from(new Set(initialGrounds.map(ground => ground.location.city)));

const Grounds = () => {
  const [searchParams] = useSearchParams();
  const sportParam = searchParams.get('sport');
  
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [filteredGrounds, setFilteredGrounds] = useState<Ground[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState<string>(sportParam || 'all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [amenityFilters, setAmenityFilters] = useState<Record<string, boolean>>({});
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique amenities for filter options
  const allAmenities = Array.from(
    new Set(initialGrounds.flatMap(ground => ground.amenities))
  );
  
  // Initialize amenity filters
  useEffect(() => {
    const initialAmenityFilters: Record<string, boolean> = {};
    allAmenities.forEach(amenity => {
      initialAmenityFilters[amenity] = false;
    });
    setAmenityFilters(initialAmenityFilters);
  }, []);
  
  // Initial load of grounds
  useEffect(() => {
    setGrounds(initialGrounds);
    
    // Apply initial sport filter if provided in URL
    if (sportParam) {
      const filtered = initialGrounds.filter(ground => 
        ground.sport.toLowerCase() === sportParam.toLowerCase()
      );
      setFilteredGrounds(filtered);
    } else {
      setFilteredGrounds(initialGrounds);
    }
  }, [sportParam]);
  
  // Apply filters when they change
  useEffect(() => {
    let result = [...grounds];
    
    // Apply search query
    if (searchQuery) {
      result = result.filter(ground => 
        ground.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ground.location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sport filter
    if (selectedSport !== 'all') {
      result = result.filter(ground => ground.sport === selectedSport);
    }
    
    // Apply city filter
    if (selectedCity !== 'all') {
      result = result.filter(ground => ground.location.city === selectedCity);
    }
    
    // Apply price range filter
    result = result.filter(ground => 
      ground.price >= priceRange[0] && ground.price <= priceRange[1]
    );
    
    // Apply amenity filters
    const selectedAmenities = Object.entries(amenityFilters)
      .filter(([_, selected]) => selected)
      .map(([amenity]) => amenity);
    
    if (selectedAmenities.length > 0) {
      result = result.filter(ground => 
        selectedAmenities.every(amenity => ground.amenities.includes(amenity))
      );
    }
    
    setFilteredGrounds(result);
  }, [grounds, searchQuery, selectedSport, selectedCity, priceRange, amenityFilters]);
  
  const handleAmenityChange = (amenity: string) => {
    setAmenityFilters(prev => ({
      ...prev,
      [amenity]: !prev[amenity]
    }));
  };
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSport('all');
    setSelectedCity('all');
    setPriceRange([0, 2000]);
    
    const resetAmenities: Record<string, boolean> = {};
    allAmenities.forEach(amenity => {
      resetAmenities[amenity] = false;
    });
    setAmenityFilters(resetAmenities);
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pitch-blue">Sports Grounds</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Find and book the perfect sports ground for your next game
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="mb-8">
          <div className="md:flex justify-between items-center mb-4">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <Input
                type="text"
                placeholder="Search grounds by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              {(searchQuery || selectedSport !== 'all' || selectedCity !== 'all' || 
                priceRange[0] > 0 || priceRange[1] < 2000 || 
                Object.values(amenityFilters).some(Boolean)) && (
                <Button
                  variant="outline"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              )}
            </div>
          </div>
          
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                  <Select
                    value={selectedSport}
                    onValueChange={(value) => setSelectedSport(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      {sportOptions.map(sport => (
                        <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Select
                    value={selectedCity}
                    onValueChange={(value) => setSelectedCity(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cityOptions.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    defaultValue={[0, 2000]}
                    min={0}
                    max={2000}
                    step={100}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as number[])}
                    className="py-4"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="space-y-2 max-h-24 overflow-y-auto pr-2">
                    {allAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center">
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={amenityFilters[amenity]}
                          onCheckedChange={() => handleAmenityChange(amenity)}
                        />
                        <Label
                          htmlFor={`amenity-${amenity}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredGrounds.length} {filteredGrounds.length === 1 ? 'ground' : 'grounds'}
            {selectedSport !== 'all' ? ` for ${selectedSport}` : ''}
            {selectedCity !== 'all' ? ` in ${selectedCity}` : ''}
          </p>
        </div>
        
        {/* Grounds Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredGrounds.map((ground) => (
            <Card key={ground.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in h-full flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={ground.image} 
                  alt={ground.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-pitch-green text-white px-2 py-1 rounded text-sm">
                  {ground.sport}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{ground.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{ground.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({ground.reviewCount})</span>
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {ground.location.city}, {ground.location.address}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-lg font-semibold text-pitch-blue">₹{ground.price}/hour</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Up to {ground.capacity}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ground.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {amenity}
                    </span>
                  ))}
                  {ground.amenities.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      +{ground.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{ground.availableSlots} slots available today</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/grounds/${ground.id}`} className="w-full">
                  <Button className="w-full bg-pitch-blue hover:bg-opacity-90">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* No Results */}
        {filteredGrounds.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-600">No grounds found matching your criteria</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search term</p>
            <Button
              className="mt-4 bg-pitch-blue"
              onClick={resetFilters}
            >
              Reset All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grounds;
