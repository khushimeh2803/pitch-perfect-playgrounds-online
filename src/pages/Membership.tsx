
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronRight, Crown, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  duration: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  color: string;
}

const Membership = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  // Define membership plans
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      icon: <Shield className="h-6 w-6" />,
      price: billingPeriod === 'monthly' ? 399 : 3999,
      duration: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'Perfect for casual players who book occasionally',
      color: 'bg-gray-100 text-gray-800',
      features: [
        { name: 'Book up to 5 slots per month', included: true },
        { name: '5% discount on all bookings', included: true },
        { name: 'Access to basic grounds', included: true },
        { name: 'Customer support via email', included: true },
        { name: 'Slot cancellation up to 12 hours', included: true },
        { name: 'Early access to new grounds', included: false },
        { name: 'Priority booking on weekends', included: false },
        { name: 'Exclusive member events', included: false }
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: <Crown className="h-6 w-6" />,
      price: billingPeriod === 'monthly' ? 899 : 8999,
      duration: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'For regular players who want the best value',
      color: 'bg-yellow-100 text-yellow-800',
      popular: true,
      features: [
        { name: 'Unlimited bookings', included: true },
        { name: '15% discount on all bookings', included: true },
        { name: 'Access to all premium grounds', included: true },
        { name: 'Priority customer support', included: true },
        { name: 'Slot cancellation up to 4 hours', included: true },
        { name: 'Early access to new grounds', included: true },
        { name: 'Priority booking on weekends', included: true },
        { name: 'Exclusive member events', included: false }
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: <Crown className="h-6 w-6" />,
      price: billingPeriod === 'monthly' ? 1499 : 14999,
      duration: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'For professionals and serious players',
      color: 'bg-blue-100 text-blue-800',
      features: [
        { name: 'Unlimited bookings', included: true },
        { name: '25% discount on all bookings', included: true },
        { name: 'Access to all premium grounds', included: true },
        { name: '24/7 dedicated customer support', included: true },
        { name: 'Flexible cancellation policy', included: true },
        { name: 'Early access to new grounds', included: true },
        { name: 'Priority booking on weekends', included: true },
        { name: 'Exclusive member events', included: true }
      ]
    }
  ];
  
  const selectPlan = (plan: Plan) => {
    toast.success(`${plan.name} plan selected! Redirecting to payment...`);
    // In a real app, we would redirect to payment page with the plan details
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pitch-blue mb-4">Membership Plans</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership plan to enhance your sports experience with Pitch Perfect
          </p>
        </div>
        
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              className={`px-6 py-2 rounded-full ${
                billingPeriod === 'monthly' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full ${
                billingPeriod === 'yearly' 
                  ? 'bg-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly <span className="text-pitch-green font-medium">Save 20%</span>
            </button>
          </div>
        </div>
        
        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden hover:shadow-lg transition-shadow ${
                plan.popular ? 'border-2 border-pitch-green ring-4 ring-pitch-green ring-opacity-20' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute top-4 right-4 bg-pitch-green text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader className={`${plan.color} pb-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {plan.icon}
                    <CardTitle className="ml-2">{plan.name}</CardTitle>
                  </div>
                </div>
                <CardDescription className="font-medium">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-pitch-blue">₹{plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.duration}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {billingPeriod === 'yearly' ? 'Billed annually' : 'Billed monthly'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className={`h-5 w-5 mr-2 flex-shrink-0 ${
                        feature.included ? 'text-pitch-green' : 'text-gray-300'
                      }`} />
                      <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-pitch-green hover:bg-opacity-90' 
                      : 'bg-pitch-blue hover:bg-opacity-90'
                  }`}
                  onClick={() => selectPlan(plan)}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-pitch-blue mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: 'How do memberships work?',
                answer: 'Memberships give you access to special perks like discounted rates, priority booking, and exclusive access to premium grounds. You can choose between monthly or annual billing.'
              },
              {
                question: 'Can I upgrade my plan later?',
                answer: 'Yes, you can upgrade your membership plan at any time. Your new benefits will be available immediately, and we\'ll prorate the difference in price.'
              },
              {
                question: 'Is there a free trial available?',
                answer: 'We offer a 7-day free trial for new users to experience our Gold membership benefits. You can cancel anytime during the trial period.'
              },
              {
                question: 'How do I cancel my membership?',
                answer: 'You can cancel your membership at any time from your account settings. If you cancel, you\'ll continue to have access to your benefits until the end of your current billing period.'
              },
              {
                question: 'Are there any hidden fees?',
                answer: 'No, the price you see is the price you pay. There are no hidden fees or additional charges beyond the listed membership prices.'
              },
              {
                question: 'Can I share my membership with friends?',
                answer: 'Memberships are for individual use only and cannot be shared. However, we offer group discounts for teams or organizations - contact us for details.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-pitch-blue mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-pitch-blue mb-8 text-center">What Our Members Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rahul Sharma',
                role: 'Gold Member',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                quote: 'The Gold membership has paid for itself multiple times over with the discounts I get. Plus, the priority booking means I always get my preferred slots!'
              },
              {
                name: 'Priya Patel',
                role: 'Platinum Member',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                quote: 'As a professional athlete, I need reliable access to quality grounds. The Platinum membership gives me all that and more. Worth every rupee.'
              },
              {
                name: 'Vikram Singh',
                role: 'Basic Member',
                image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
                quote: 'Started with the Basic plan as a casual player. It\'s perfect for my needs and the discounts make it practically pay for itself.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-pitch-blue to-pitch-green rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to elevate your sports experience?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of players who are already enjoying the benefits of Pitch Perfect membership.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-pitch-blue hover:bg-gray-100">
              Get Started Today
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Membership;
