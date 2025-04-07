
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, MapPin, Calendar, CreditCard } from 'lucide-react';

const Home = () => {
  // Mock data for featured grounds
  const featuredGrounds = [
    {
      id: '1',
      name: 'Green Valley Football Ground',
      image: 'https://images.unsplash.com/photo-1546608235-5aaa3054adbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      sport: 'Football',
      location: 'Delhi',
      price: '₹1200/hour',
    },
    {
      id: '2',
      name: 'Ace Cricket Stadium',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      sport: 'Cricket',
      location: 'Mumbai',
      price: '₹1500/hour',
    },
    {
      id: '3',
      name: 'Prime Badminton Court',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      sport: 'Badminton',
      location: 'Bangalore',
      price: '₹800/hour',
    },
    {
      id: '4',
      name: 'City Basketball Arena',
      image: 'https://images.unsplash.com/photo-1573012663577-5c7cc95e8a4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      sport: 'Basketball',
      location: 'Chennai',
      price: '₹1000/hour',
    },
  ];
  
  // Mock data for sports
  const sports = [
    {
      id: '1',
      name: 'Football',
      icon: '⚽',
      groundCount: 24,
    },
    {
      id: '2',
      name: 'Cricket',
      icon: '🏏',
      groundCount: 18,
    },
    {
      id: '3',
      name: 'Basketball',
      icon: '🏀',
      groundCount: 15,
    },
    {
      id: '4',
      name: 'Badminton',
      icon: '🏸',
      groundCount: 20,
    },
  ];
  
  // Steps for booking
  const bookingSteps = [
    {
      icon: <Search className="h-8 w-8 text-pitch-green" />,
      title: 'Find Your Ground',
      description: 'Search for sports grounds by location, sport type, or availability.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-pitch-green" />,
      title: 'Book Your Slot',
      description: 'Select your preferred date and time slot for playing.',
    },
    {
      icon: <CreditCard className="h-8 w-8 text-pitch-green" />,
      title: 'Make Payment',
      description: 'Complete your booking by making a secure payment.',
    },
    {
      icon: <MapPin className="h-8 w-8 text-pitch-green" />,
      title: 'Play & Enjoy',
      description: 'Arrive at the ground and enjoy your game!',
    },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pitch-blue to-pitch-light-blue py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Book Your Perfect Sports Ground
              </h1>
              <p className="mt-4 text-lg text-gray-200 max-w-lg">
                Find and book the best sports grounds in your city. Easy booking, secure payments, and a perfect game day experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/sports">
                  <Button className="bg-pitch-green hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium text-lg">
                    Explore Sports
                  </Button>
                </Link>
                <Link to="/grounds">
                  <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-pitch-blue px-6 py-3 rounded-md font-medium text-lg">
                    Find Grounds
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Sports Ground" 
                className="rounded-lg shadow-xl object-cover h-96 w-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* How it Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pitch-blue">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Book your favorite sports ground in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4 p-3 bg-gray-100 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-pitch-blue">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sports Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pitch-blue">Explore Sports</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover sports grounds for your favorite games
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sports.map((sport) => (
              <Link key={sport.id} to={`/sports?category=${sport.name.toLowerCase()}`}>
                <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center h-full flex flex-col items-center justify-center hover:bg-pitch-green hover:text-white group">
                  <div className="text-4xl mb-3">{sport.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-white">{sport.name}</h3>
                  <p className="text-gray-600 group-hover:text-white">{sport.groundCount} Grounds</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/sports">
              <Button className="bg-pitch-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium">
                View All Sports
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Grounds Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pitch-blue">Featured Grounds</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Top-rated sports grounds with great facilities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGrounds.map((ground) => (
              <Card key={ground.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={ground.image} 
                    alt={ground.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-pitch-green text-white px-2 py-1 rounded text-sm">
                    {ground.sport}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{ground.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {ground.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-lg font-semibold text-pitch-blue">{ground.price}</p>
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
          
          <div className="mt-12 text-center">
            <Link to="/grounds">
              <Button className="bg-pitch-blue hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-medium">
                View All Grounds
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Membership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pitch-blue to-pitch-light-blue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Membership Plans</h2>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
              Join our membership program and enjoy exclusive benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20">
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Basic</h3>
                <div className="mt-4 text-4xl font-bold">₹999</div>
                <p className="text-sm text-gray-300 mt-1">per month</p>
                <ul className="mt-6 space-y-2 text-left">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    5 Bookings per month
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    10% discount on all bookings
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    24/7 Customer support
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white/5 text-center">
                <Link to="/membership">
                  <Button className="w-full bg-white text-pitch-blue hover:bg-opacity-90">
                    Choose Plan
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 transform scale-105 shadow-lg">
              <div className="bg-pitch-green text-white py-2 text-center text-sm font-semibold">
                MOST POPULAR
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Premium</h3>
                <div className="mt-4 text-4xl font-bold">₹1999</div>
                <p className="text-sm text-gray-300 mt-1">per month</p>
                <ul className="mt-6 space-y-2 text-left">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    15 Bookings per month
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    20% discount on all bookings
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Priority booking
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Free equipment rental
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white/5 text-center">
                <Link to="/membership">
                  <Button className="w-full bg-white text-pitch-blue hover:bg-opacity-90">
                    Choose Plan
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20">
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Pro</h3>
                <div className="mt-4 text-4xl font-bold">₹3999</div>
                <p className="text-sm text-gray-300 mt-1">per month</p>
                <ul className="mt-6 space-y-2 text-left">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited bookings
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    30% discount on all bookings
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    VIP access to new grounds
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Personal coach (2 sessions/month)
                  </li>
                </ul>
              </div>
              <div className="p-6 bg-white/5 text-center">
                <Link to="/membership">
                  <Button className="w-full bg-white text-pitch-blue hover:bg-opacity-90">
                    Choose Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pitch-blue">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our happy customers about their experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Testimonial" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Rahul Sharma</h4>
                  <p className="text-gray-600 text-sm">Football Enthusiast</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Pitch Perfect made it super easy to find and book football grounds. The interface is user-friendly and the booking process is seamless. Highly recommended!"
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Testimonial" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Priya Patel</h4>
                  <p className="text-gray-600 text-sm">Badminton Player</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "I love the membership program! It saves me a lot of money as I play regularly. The quality of the courts is excellent and customer service is always helpful."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/67.jpg" 
                    alt="Testimonial" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">Vikram Singh</h4>
                  <p className="text-gray-600 text-sm">Cricket Team Captain</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a cricket team captain, I need reliable venues for our matches. Pitch Perfect has been a game-changer with its wide selection of grounds and easy group booking system."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pitch-green">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Perfect Ground?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of sports enthusiasts who have found their perfect playing venue with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-pitch-green hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/grounds">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-pitch-green px-8 py-3 rounded-md font-medium text-lg">
                Browse Grounds
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
