
import { CalendarCheck, Clock, MapPin, Trophy, UserCheck, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pitch-blue mb-4">About Pitch Perfect</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your one-stop platform for booking sports grounds and venues across the country
          </p>
        </div>
        
        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-pitch-blue to-pitch-green p-8 rounded-xl text-white mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed">
              We aim to connect sports enthusiasts with quality venues, making the booking process
              seamless and hassle-free. Our goal is to promote active lifestyles by making sports
              facilities more accessible to everyone.
            </p>
          </div>
        </div>
        
        {/* Story Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-pitch-blue mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Pitch Perfect was founded in 2020 by a group of sports enthusiasts who were frustrated
                with the challenges of finding and booking quality sports venues.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small project to help local communities access sports facilities has
                now grown into a nationwide platform serving thousands of users across multiple cities.
              </p>
              <p className="text-gray-600">
                We continuously work with venue owners and sports organizations to expand our offerings
                and improve the booking experience for our users.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Pitch Perfect team" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-pitch-blue mb-8 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CalendarCheck className="h-6 w-6 text-pitch-blue" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Easy Booking</h3>
              <p className="text-gray-600 text-center">
                Book your preferred sports ground with just a few clicks, anytime and anywhere.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-6 w-6 text-pitch-green" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Wide Coverage</h3>
              <p className="text-gray-600 text-center">
                Access to hundreds of sports venues across multiple cities in India.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-pitch-blue" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Real-time Availability</h3>
              <p className="text-gray-600 text-center">
                Check real-time availability of slots and make instant bookings.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-pitch-blue mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: 'Rahul Sharma',
                role: 'Founder & CEO',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
              {
                name: 'Priya Patel',
                role: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
              {
                name: 'Vikram Singh',
                role: 'Tech Lead',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
              {
                name: 'Anjali Desai',
                role: 'Marketing Director',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
              },
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-pitch-blue mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Happy Users', value: '10,000+' },
              { icon: MapPin, label: 'Sports Venues', value: '500+' },
              { icon: Trophy, label: 'Sports Categories', value: '25+' },
              { icon: UserCheck, label: 'Cities Covered', value: '20+' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-pitch-green" />
                <div className="text-3xl font-bold text-pitch-blue mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-pitch-blue rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book your next game?</h2>
          <p className="text-xl mb-6">Join thousands of sports enthusiasts who are already using Pitch Perfect</p>
          <button className="bg-white text-pitch-blue hover:bg-gray-100 px-8 py-3 rounded-md font-bold text-lg transition-colors duration-300">
            Book a Ground Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
