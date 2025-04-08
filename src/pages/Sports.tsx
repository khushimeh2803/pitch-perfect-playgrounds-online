
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Sport {
  id: string;
  name: string;
  icon: string;
  description: string;
  groundCount: number;
  popularTimes: string[];
  image: string;
}

const Sports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSports, setFilteredSports] = useState<Sport[]>([]);
  
  // Mock data for sports (removed Tennis and Table Tennis)
  const sports: Sport[] = [
    {
      id: '1',
      name: 'Football',
      icon: '⚽',
      description: 'Book football grounds for matches, training sessions, or casual play with friends.',
      groundCount: 24,
      popularTimes: ['Weekends', 'Evenings'],
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      name: 'Cricket',
      icon: '🏏',
      description: 'Find the perfect cricket pitch for your next match or practice session.',
      groundCount: 18,
      popularTimes: ['Weekends', 'Mornings'],
      image: 'https://images.unsplash.com/photo-1584223000746-0a4d95db272d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      name: 'Basketball',
      icon: '🏀',
      description: 'Shoot some hoops on our high-quality basketball courts available across the city.',
      groundCount: 15,
      popularTimes: ['Evenings', 'After School'],
      image: 'https://images.unsplash.com/photo-1505666287802-931dc83d5f5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '4',
      name: 'Badminton',
      icon: '🏸',
      description: 'Book indoor and outdoor badminton courts for singles or doubles matches.',
      groundCount: 20,
      popularTimes: ['Evenings', 'Weekends'],
      image: 'https://images.unsplash.com/photo-1570373289042-d3eccd7425de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '6',
      name: 'Volleyball',
      icon: '🏐',
      description: 'Book volleyball courts for recreational play or competitive matches.',
      groundCount: 8,
      popularTimes: ['Evenings', 'Weekends'],
      image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '7',
      name: 'Hockey',
      icon: '🏑',
      description: 'Find hockey fields for team practice or competitive matches.',
      groundCount: 6,
      popularTimes: ['Evenings', 'Weekends'],
      image: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];
  
  // Filter sports based on search query
  useEffect(() => {
    const filtered = sports.filter(sport => 
      sport.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSports(filtered);
  }, [searchQuery]);
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pitch-blue">Explore Sports</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and book venues for your favorite sports activities
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search sports..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Sports Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredSports.map((sport) => (
            <Card key={sport.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
              <div className="h-48 overflow-hidden">
                <img 
                  src={sport.image} 
                  alt={sport.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{sport.name}</CardTitle>
                  <span className="text-2xl">{sport.icon}</span>
                </div>
                <CardDescription>
                  {sport.groundCount} Grounds Available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{sport.description}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">Popular Times:</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {sport.popularTimes.map((time, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/grounds?sport=${sport.name.toLowerCase()}`} className="w-full">
                  <Button className="w-full bg-pitch-green hover:bg-opacity-90">
                    Browse {sport.name} Grounds
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* No Results */}
        {filteredSports.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-500">No sports found matching "{searchQuery}"</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search term</p>
            <Button
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sports;
