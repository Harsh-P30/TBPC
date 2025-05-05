
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically send the email to your backend
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };
  
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
              <div className="w-full h-full grid grid-cols-10 grid-rows-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-gray-500/10"></div>
                ))}
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-2xl md:text-3xl font-medium mb-4 animate-fade-in">
                  Stay Updated
                </h2>
                <p className="text-muted-foreground animate-fade-in animate-delay-100">
                  Subscribe to our newsletter for new product announcements, design insights, and exclusive offers.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-white/80 border-gray-200"
                    required
                  />
                  <Button type="submit" className="rounded-md">
                    {submitted ? (
                      <span className="flex items-center">
                        <Check className="w-4 h-4 mr-2" />
                        Subscribed
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-center mt-4 text-muted-foreground">
                  By subscribing, you agree to our privacy policy. We respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
