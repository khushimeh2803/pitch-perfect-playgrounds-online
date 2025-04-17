
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Filter } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

type ValueType = number | string;

// Modify any toFixed calls to ensure type safety
const formatValue = (value: ValueType): string => {
  if (typeof value === 'number') {
    return value.toFixed(2);
  }
  return String(value);
};

// Mock data for reports
const bookingData = [
  { id: 1, user: 'John Doe', ground: 'Green Valley', date: '2023-04-10', amount: 1200, status: 'Completed' },
  { id: 2, user: 'Jane Smith', ground: 'Central Court', date: '2023-04-12', amount: 1500, status: 'Completed' },
  { id: 3, user: 'Michael Brown', ground: 'Red Field', date: '2023-04-15', amount: 1800, status: 'Pending' },
  { id: 4, user: 'Sarah Johnson', ground: 'Blue Turf', date: '2023-04-18', amount: 1300, status: 'Cancelled' },
  { id: 5, user: 'Robert Wilson', ground: 'Green Valley', date: '2023-04-20', amount: 1200, status: 'Completed' },
];

const revenueData = [
  { id: 1, month: 'January', bookings: 45, revenue: 54000, avgBookingValue: 1200 },
  { id: 2, month: 'February', bookings: 52, revenue: 65000, avgBookingValue: 1250 },
  { id: 3, month: 'March', bookings: 58, revenue: 72500, avgBookingValue: 1250 },
  { id: 4, month: 'April', bookings: 48, revenue: 63600, avgBookingValue: 1325 },
];

const groundData = [
  { id: 1, name: 'Green Valley', bookings: 24, revenue: 28800, utilization: '68%' },
  { id: 2, name: 'Central Court', bookings: 32, revenue: 48000, utilization: '75%' },
  { id: 3, name: 'Red Field', bookings: 18, revenue: 32400, utilization: '45%' },
  { id: 4, name: 'Blue Turf', bookings: 28, revenue: 36400, utilization: '62%' },
];

// Function to generate PDF
const generatePDF = (reportType: string, data: any[]) => {
  const doc = new jsPDF();
  
  const title = `${reportType} Report`;
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  
  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
  
  // Define columns based on report type
  let columns: any[] = [];
  let rows: any[] = [];
  
  if (reportType === 'Bookings') {
    columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'User', dataKey: 'user' },
      { header: 'Ground', dataKey: 'ground' },
      { header: 'Date', dataKey: 'date' },
      { header: 'Amount (₹)', dataKey: 'amount' },
      { header: 'Status', dataKey: 'status' }
    ];
    
    rows = data.map(item => [
      item.id,
      item.user,
      item.ground,
      item.date,
      `₹${item.amount}`,
      item.status
    ]);
  } else if (reportType === 'Revenue') {
    columns = [
      { header: 'Month', dataKey: 'month' },
      { header: 'Bookings', dataKey: 'bookings' },
      { header: 'Revenue (₹)', dataKey: 'revenue' },
      { header: 'Avg. Booking (₹)', dataKey: 'avgBookingValue' }
    ];
    
    rows = data.map(item => [
      item.month,
      item.bookings,
      `₹${item.revenue}`,
      `₹${item.avgBookingValue}`
    ]);
  } else if (reportType === 'Grounds') {
    columns = [
      { header: 'Name', dataKey: 'name' },
      { header: 'Bookings', dataKey: 'bookings' },
      { header: 'Revenue (₹)', dataKey: 'revenue' },
      { header: 'Utilization', dataKey: 'utilization' }
    ];
    
    rows = data.map(item => [
      item.name,
      item.bookings,
      `₹${item.revenue}`,
      item.utilization
    ]);
  }
  
  // @ts-ignore - jspdf-autotable is not properly typed
  doc.autoTable({
    head: [columns.map(col => col.header)],
    body: rows,
    startY: 40,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [22, 78, 99], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });
  
  doc.save(`${reportType.toLowerCase()}_report.pdf`);
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter Data
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="grounds">Grounds</TabsTrigger>
        </TabsList>
        
        {/* Bookings Report */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Booking Reports</CardTitle>
                <CardDescription>
                  View all booking transactions and their status
                </CardDescription>
              </div>
              <Button 
                className="mt-4 sm:mt-0 gap-2" 
                onClick={() => generatePDF('Bookings', bookingData)}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Ground</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingData.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>#{booking.id}</TableCell>
                        <TableCell>{booking.user}</TableCell>
                        <TableCell>{booking.ground}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>₹{booking.amount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Revenue Report */}
        <TabsContent value="revenue">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>
                  Monthly revenue breakdown and trends
                </CardDescription>
              </div>
              <Button 
                className="mt-4 sm:mt-0 gap-2"
                onClick={() => generatePDF('Revenue', revenueData)}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Revenue</TableHead>
                      <TableHead>Avg. Booking Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.month}</TableCell>
                        <TableCell>{item.bookings}</TableCell>
                        <TableCell>₹{formatValue(item.revenue)}</TableCell>
                        <TableCell>₹{formatValue(item.avgBookingValue)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Grounds Report */}
        <TabsContent value="grounds">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Ground Performance</CardTitle>
                <CardDescription>
                  Analysis of each ground's bookings and revenue
                </CardDescription>
              </div>
              <Button 
                className="mt-4 sm:mt-0 gap-2"
                onClick={() => generatePDF('Grounds', groundData)}
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ground Name</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Revenue</TableHead>
                      <TableHead>Utilization Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groundData.map((ground) => (
                      <TableRow key={ground.id}>
                        <TableCell>{ground.name}</TableCell>
                        <TableCell>{ground.bookings}</TableCell>
                        <TableCell>₹{formatValue(ground.revenue)}</TableCell>
                        <TableCell>{ground.utilization}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
