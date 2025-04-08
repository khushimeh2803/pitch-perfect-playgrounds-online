
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CreditCard, Shield, Landmark, Wallet, Tag, Info } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Mock booking details (in a real app, this would come from state or context)
  const bookingDetails = {
    ground: 'Green Valley Football Ground',
    location: 'Jayanagar, Bangalore',
    date: '15 April, 2025',
    time: '6:00 PM - 7:00 PM',
    players: 10,
    price: 1200,
    discount: promoApplied ? 240 : 120, // 20% if promo applied, 10% otherwise
    total: promoApplied ? 960 : 1080,
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions to proceed');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! Your booking is confirmed.');
      navigate('/bookings');
    }, 2000);
  };
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'sports20') {
      setPromoApplied(true);
      toast.success('Promo code SPORTS20 applied! 20% discount added.');
    } else {
      toast.error('Invalid promo code. Please try again.');
    }
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-pitch-blue mb-8">Complete Your Payment</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="grid gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2 text-pitch-blue" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="venue" id="venue" />
                      <Label htmlFor="venue" className="flex items-center cursor-pointer">
                        <Landmark className="h-5 w-5 mr-2 text-pitch-blue" />
                        Pay at Venue
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              {paymentMethod === 'card' && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Card Details</CardTitle>
                    <CardDescription>
                      Enter your card information securely
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" required />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        required 
                        maxLength={19}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required maxLength={3} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Promo Code Section */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Promo Code
                  </CardTitle>
                  <CardDescription>
                    Enter a valid promo code to get a discount
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter promo code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={applyPromoCode}
                    disabled={!promoCode || promoApplied}
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </Button>
                </CardContent>
                {promoApplied && (
                  <CardFooter className="pt-0 text-green-600">
                    Promo code applied! You're saving ₹120 (20% off)
                  </CardFooter>
                )}
              </Card>
              
              {paymentMethod === 'venue' && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Pay at Venue</CardTitle>
                    <CardDescription>
                      Payment will be collected at the venue before your slot begins
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-yellow-50 p-4 rounded-md text-sm text-yellow-800 space-y-2">
                      <p className="flex items-center font-medium">
                        <Info className="h-4 w-4 mr-2" />
                        Important Information
                      </p>
                      <p>
                        Please arrive at least 15 minutes before your slot time for payment processing.
                      </p>
                      <p>
                        We accept cash, card, and UPI payments at the venue.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+91 9876543210" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Bangalore" required />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="Karnataka" required />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="560001" required />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreedToTerms} 
                        onCheckedChange={(checked) => {
                          if (typeof checked === 'boolean') {
                            setAgreedToTerms(checked);
                          }
                        }}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <Link to="/terms" className="text-pitch-blue underline">Terms and Conditions</Link>
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-6">
                      By checking this box, you agree to our cancellation policy, venue rules, and payment terms.
                      Cancellations are only allowed with admin confirmation.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex flex-col space-y-3 w-full">
                    <Button
                      type="submit"
                      className="w-full bg-pitch-green hover:bg-opacity-90"
                      disabled={isProcessing || !agreedToTerms}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${bookingDetails.total}`}
                    </Button>
                    <Link to="/membership" className="w-full">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-pitch-blue text-pitch-blue hover:bg-pitch-blue hover:text-white"
                      >
                        View Membership Plans & Save More
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{bookingDetails.ground}</h3>
                  <p className="text-gray-600">{bookingDetails.location}</p>
                </div>
                
                <div className="bg-gray-50 rounded-md p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{bookingDetails.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{bookingDetails.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Players:</span>
                    <span className="font-medium">{bookingDetails.players}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span>₹{bookingDetails.price}</span>
                  </div>
                  <div className="flex justify-between text-pitch-green">
                    <span>Discount {promoApplied ? '(20%)' : '(10%)'}:</span>
                    <span>-₹{bookingDetails.discount}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{bookingDetails.total}</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                  <p className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure Payment Guarantee
                  </p>
                  <p className="mt-1 text-blue-700">
                    Your payment information is processed securely. We do not store credit card details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
