
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pitch-blue mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or need assistance? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-pitch-blue mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-pitch-green hover:bg-opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-gradient-to-r from-pitch-blue to-pitch-green rounded-lg shadow-lg p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Our Office</h3>
                    <p className="text-white text-opacity-90">
                      123 Sports Avenue, Tech Park<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-white text-opacity-90">
                      +91 1234 567 890<br />
                      +91 9876 543 210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-white text-opacity-90">
                      info@pitchperfect.com<br />
                      support@pitchperfect.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-pitch-blue mb-6">Business Hours</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-2">Customer Support</h3>
                <p className="text-gray-600">
                  Our customer support team is available 24/7 via email at support@pitchperfect.com
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-pitch-blue mb-6">Find Us</h2>
          <div className="h-96 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            {/* Placeholder for map */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Map integration would be placed here.<br />
                (Google Maps, Mapbox, etc.)
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-pitch-blue mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: 'How do I book a sports ground?',
                answer: 'You can book a sports ground by creating an account, selecting your preferred sport, choosing a ground, and selecting available time slots. Follow the booking flow and complete the payment to confirm your booking.'
              },
              {
                question: 'Can I cancel my booking?',
                answer: 'Yes, you can cancel your booking up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours of the booking time may be subject to cancellation fees.'
              },
              {
                question: 'How can I contact ground owners directly?',
                answer: 'You can find contact information for ground owners on the specific ground detail page. Alternatively, you can reach out to our customer support team who can facilitate communication with ground owners.'
              },
              {
                question: 'Do you offer membership plans?',
                answer: 'Yes, we offer various membership plans that provide benefits such as discounted booking rates, priority slot selection, and other perks. Visit our Membership page to learn more about the available plans.'
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-pitch-blue mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
