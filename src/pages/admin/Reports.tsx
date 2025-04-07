
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Download, TrendingUp, Users, Calendar, CreditCard, MapPin, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for reports
const revenueData = [
  { month: 'Jan', revenue: 82400 },
  { month: 'Feb', revenue: 95600 },
  { month: 'Mar', revenue: 114800 },
  { month: 'Apr', revenue: 128000 },
  { month: 'May', revenue: 147200 },
  { month: 'Jun', revenue: 156800 },
  { month: 'Jul', revenue: 169600 },
  { month: 'Aug', revenue: 176000 },
  { month: 'Sep', revenue: 164800 },
  { month: 'Oct', revenue: 142400 },
  { month: 'Nov', revenue: 134400 },
  { month: 'Dec', revenue: 112000 },
];

const bookingsBySportData = [
  { name: 'Football', value: 35 },
  { name: 'Cricket', value: 25 },
  { name: 'Badminton', value: 15 },
  { name: 'Basketball', value: 10 },
  { name: 'Tennis', value: 8 },
  { name: 'Volleyball', value: 4 },
  { name: 'Hockey', value: 3 },
];

const bookingsTrendData = [
  { month: 'Jan', bookings: 210 },
  { month: 'Feb', bookings: 245 },
  { month: 'Mar', bookings: 290 },
  { month: 'Apr', bookings: 320 },
  { month: 'May', bookings: 368 },
  { month: 'Jun', bookings: 392 },
  { month: 'Jul', bookings: 424 },
  { month: 'Aug', bookings: 440 },
  { month: 'Sep', bookings: 412 },
  { month: 'Oct', bookings: 356 },
  { month: 'Nov', bookings: 336 },
  { month: 'Dec', bookings: 280 },
];

const paymentMethodData = [
  { name: 'Credit/Debit Card', value: 45 },
  { name: 'UPI', value: 35 },
  { name: 'Net Banking', value: 15 },
  { name: 'Cash', value: 5 },
];

const topGroundsData = [
  { name: 'Green Valley Football Ground', bookings: 126, revenue: 151200 },
  { name: 'Sports Arena Cricket Ground', bookings: 98, revenue: 245000 },
  { name: 'City Sports Badminton Court', bookings: 215, revenue: 86000 },
  { name: 'Fitness Hub Basketball Court', bookings: 76, revenue: 53200 },
  { name: 'Grand Slam Tennis Courts', bookings: 112, revenue: 67200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('revenue');
  const [timeRange, setTimeRange] = useState('year');
  
  const generatePDF = () => {
    toast.success('Generating PDF report. Download will start shortly.');
    // In a real app, this would generate and download a PDF file
  };
  
  const generateCSV = () => {
    toast.success('Generating CSV report. Download will start shortly.');
    // In a real app, this would generate and download a CSV file
  };
  
  const getReportTitle = () => {
    switch (selectedReport) {
      case 'revenue':
        return 'Revenue Report';
      case 'bookings':
        return 'Bookings Report';
      case 'users':
        return 'User Activity Report';
      case 'grounds':
        return 'Ground Performance Report';
      default:
        return 'Report';
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">{getReportTitle()}</h1>
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={generatePDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={generateCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹16,24,000</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,673</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.2% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.7% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Grounds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +4 from last quarter
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <Tabs value={selectedReport} onValueChange={setSelectedReport} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="revenue" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="grounds" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Grounds
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex space-x-2">
              <Select
                defaultValue={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              
              {timeRange === 'custom' && (
                <DateRangePicker />
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <TabsContent value="revenue" className="mt-0">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis 
                    tickFormatter={(value) => `₹${value/1000}K`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#38D65B" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Revenue Breakdown</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Revenue by Payment Method</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={paymentMethodData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {paymentMethodData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Top Performing Grounds</h4>
                    <div className="space-y-4">
                      {topGroundsData.slice(0, 5).map((ground, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div className="truncate max-w-[200px]">{ground.name}</div>
                          </div>
                          <div className="font-medium">₹{ground.revenue.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bookings" className="mt-0">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bookingsTrendData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#38D65B" activeDot={{ r: 8 }} name="Bookings" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Bookings Analysis</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Bookings by Sport</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookingsBySportData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {bookingsBySportData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Most Booked Grounds</h4>
                    <div className="space-y-4">
                      {topGroundsData.slice(0, 5).map((ground, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div className="truncate max-w-[200px]">{ground.name}</div>
                          </div>
                          <div className="font-medium">{ground.bookings} bookings</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>
                    New user registrations over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData.map(item => ({ month: item.month, users: Math.floor(item.revenue / 1100) }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#1e40af" activeDot={{ r: 8 }} name="New Users" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    Active users and booking frequency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { category: '1-5', value: 420, name: 'Bookings per User' },
                          { category: '6-10', value: 280, name: 'Bookings per User' },
                          { category: '11-20', value: 180, name: 'Bookings per User' },
                          { category: '21-30', value: 80, name: 'Bookings per User' },
                          { category: '30+', value: 40, name: 'Bookings per User' },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#38D65B" name="Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Membership Distribution</CardTitle>
                  <CardDescription>
                    Users by membership type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'No Membership', value: 60 },
                            { name: 'Basic', value: 20 },
                            { name: 'Gold', value: 15 },
                            { name: 'Platinum', value: 5 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {paymentMethodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Retention</CardTitle>
                  <CardDescription>
                    Return booking rate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData.map(item => ({ month: item.month, retention: 75 + Math.random() * 15 }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Retention Rate']} />
                        <Line type="monotone" dataKey="retention" stroke="#9333ea" activeDot={{ r: 8 }} name="Retention Rate" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="grounds" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Grounds</CardTitle>
                  <CardDescription>
                    By revenue and bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topGroundsData.map(ground => ({
                          name: ground.name.split(' ').slice(0, 2).join(' '), // Shorten names for better display
                          revenue: ground.revenue / 1000, // Convert to thousands
                        }))}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `₹${value}K`} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip formatter={(value) => [`₹${value}K`, 'Revenue']} />
                        <Bar dataKey="revenue" fill="#38D65B" name="Revenue (₹K)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Sport</CardTitle>
                  <CardDescription>
                    Distribution across different sports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Football', value: 40 },
                            { name: 'Cricket', value: 30 },
                            { name: 'Badminton', value: 12 },
                            { name: 'Basketball', value: 8 },
                            { name: 'Tennis', value: 6 },
                            { name: 'Others', value: 4 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {bookingsBySportData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Rate</CardTitle>
                  <CardDescription>
                    Average ground utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { time: '6 AM', weekday: 20, weekend: 35 },
                          { time: '8 AM', weekday: 35, weekend: 60 },
                          { time: '10 AM', weekday: 45, weekend: 85 },
                          { time: '12 PM', weekday: 50, weekend: 75 },
                          { time: '2 PM', weekday: 40, weekend: 65 },
                          { time: '4 PM', weekday: 65, weekend: 80 },
                          { time: '6 PM', weekday: 85, weekend: 95 },
                          { time: '8 PM', weekday: 70, weekend: 90 },
                          { time: '10 PM', weekday: 40, weekend: 50 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, 'Occupancy']} />
                        <Legend />
                        <Line type="monotone" dataKey="weekday" stroke="#1e40af" name="Weekday" />
                        <Line type="monotone" dataKey="weekend" stroke="#38D65B" name="Weekend" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Ground Ratings</CardTitle>
                  <CardDescription>
                    Average user ratings by sport
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { sport: 'Football', rating: 4.5 },
                          { sport: 'Cricket', rating: 4.3 },
                          { sport: 'Badminton', rating: 4.7 },
                          { sport: 'Basketball', rating: 4.2 },
                          { sport: 'Tennis', rating: 4.6 },
                          { sport: 'Volleyball', rating: 4.1 },
                          { sport: 'Hockey', rating: 4.4 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sport" />
                        <YAxis domain={[3.5, 5]} />
                        <Tooltip />
                        <Bar dataKey="rating" fill="#38D65B" name="Average Rating">
                          {bookingsBySportData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Generate Custom Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Report Type
            </label>
            <Select defaultValue="summary">
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary Report</SelectItem>
                <SelectItem value="detailed">Detailed Report</SelectItem>
                <SelectItem value="revenue">Revenue Report</SelectItem>
                <SelectItem value="booking">Booking Report</SelectItem>
                <SelectItem value="user">User Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <Select defaultValue="last30">
              <SelectTrigger>
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7">Last 7 days</SelectItem>
                <SelectItem value="last30">Last 30 days</SelectItem>
                <SelectItem value="last90">Last 90 days</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Format
            </label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button className="mt-6 bg-pitch-green hover:bg-opacity-90">
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default Reports;
