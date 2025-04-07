
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { BadgeCheck, Edit, Key, LogOut, User } from 'lucide-react';

const UserProfile = () => {
  const { user, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+91 9876543210',
    location: 'Bangalore, India',
    bio: 'Sports enthusiast and regular Pitch Perfect user.',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };
  
  const saveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };
  
  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }
    
    toast.success('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-16 w-16 mr-4 border-2 border-pitch-green">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
              <AvatarFallback className="bg-pitch-blue text-white text-xl">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold flex items-center">
                {profileData.name}
                {isAdmin && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pitch-blue text-white">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Admin
                  </span>
                )}
              </h1>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button 
                    onClick={saveProfile} 
                    className="ml-auto bg-pitch-green hover:bg-opacity-90"
                  >
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
                <CardDescription>
                  Your activity on Pitch Perfect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Bookings', value: '24' },
                    { label: 'Favorite Sport', value: 'Football' },
                    { label: 'Member Since', value: 'Jan 2023' },
                    { label: 'Membership', value: 'Silver' },
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-2xl font-bold text-pitch-blue">{stat.value}</p>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={updatePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="mt-2 bg-pitch-green hover:bg-opacity-90"
                  >
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
                <CardDescription>
                  Recent login activity on your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: 'Windows PC - Chrome', location: 'Bangalore, India', time: 'Just now' },
                    { device: 'iPhone 13 - Safari', location: 'Bangalore, India', time: '2 days ago' },
                    { device: 'Android - Chrome', location: 'Mumbai, India', time: '1 week ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start justify-between p-3 border border-gray-200 rounded-md">
                      <div>
                        <p className="font-medium">{activity.device}</p>
                        <p className="text-sm text-gray-600">{activity.location}</p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
