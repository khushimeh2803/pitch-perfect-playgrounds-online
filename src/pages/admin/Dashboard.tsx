
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Activity,
  Users,
  Map
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for dashboard stats
const stats = [
  {
    title: 'Total Users',
    value: '1,482',
    icon: User,
    change: '+12%',
    trend: 'up',
  },
  {
    title: 'Total Bookings',
    value: '3,274',
    icon: Calendar,
    change: '+18%',
    trend: 'up',
  },
  {
    title: 'Total Revenue',
    value: '₹5.2L',
    icon: DollarSign,
    change: '+24%',
    trend: 'up',
  },
  {
    title: 'Active Grounds',
    value: '48',
    icon: Map,
    change: '+6%',
    trend: 'up',
  },
];

// Mock data for charts
const bookingData = [
  { name: 'Jan', bookings: 120 },
  { name: 'Feb', bookings: 145 },
  { name: 'Mar', bookings: 180 },
  { name: 'Apr', bookings: 210 },
  { name: 'May', bookings: 260 },
  { name: 'Jun', bookings: 320 },
  { name: 'Jul', bookings: 390 },
  { name: 'Aug', bookings: 410 },
  { name: 'Sep', bookings: 385 },
  { name: 'Oct', bookings: 450 },
  { name: 'Nov', bookings: 420 },
  { name: 'Dec', bookings: 380 },
];

// Recent activity mock data
const recentActivity = [
  {
    id: 1,
    type: 'booking',
    user: 'Rahul Sharma',
    action: 'booked Green Valley Football Ground',
    time: '10 minutes ago',
  },
  {
    id: 2,
    type: 'signup',
    user: 'Priya Patel',
    action: 'created a new account',
    time: '32 minutes ago',
  },
  {
    id: 3,
    type: 'payment',
    user: 'Vikram Singh',
    action: 'made a payment of ₹1,800',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'booking',
    user: 'Kiran Reddy',
    action: 'booked Prime Badminton Court',
    time: '2 hours ago',
  },
  {
    id: 5,
    type: 'cancel',
    user: 'Arun Kumar',
    action: 'cancelled their booking',
    time: '3 hours ago',
  },
];

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              } flex items-center mt-1`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Booking Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isClient && (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#38D65B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="mr-4">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${
                      activity.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'signup' ? 'bg-green-100 text-green-600' :
                      activity.type === 'payment' ? 'bg-purple-100 text-purple-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {activity.type === 'booking' && <Calendar className="h-5 w-5" />}
                      {activity.type === 'signup' && <User className="h-5 w-5" />}
                      {activity.type === 'payment' && <DollarSign className="h-5 w-5" />}
                      {activity.type === 'cancel' && <Users className="h-5 w-5" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex flex-col items-center justify-center transition-colors">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Manage Users</span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg flex flex-col items-center justify-center transition-colors">
              <Map className="h-6 w-6 text-green-600 mb-2" />
              <span className="text-sm font-medium">Add Ground</span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex flex-col items-center justify-center transition-colors">
              <Calendar className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium">View Bookings</span>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg flex flex-col items-center justify-center transition-colors">
              <TrendingUp className="h-6 w-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium">Generate Report</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
