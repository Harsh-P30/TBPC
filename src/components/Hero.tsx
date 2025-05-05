
import React, { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !textRef.current) return;
      
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const parallaxValue = scrollY * 0.4;
      
      textRef.current.style.transform = `translateY(${parallaxValue}px)`;
      heroRef.current.style.opacity = `${1 - (scrollY / heroHeight) * 1.5}`;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pb-16">
      {/* Background image/gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 pt-28 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-black text-white opacity-90 animate-fade-in">
              New Collection 2024
            </span>
            
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight animate-fade-in-up animate-delay-100">
              Modern living with minimalist plastic designs
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl animate-fade-in-up animate-delay-200">
              Beautiful, functional products that blend seamlessly into your everyday life. Made with precision and care for your modern lifestyle.
            </p>
            
            <div className="flex gap-4 items-center pt-4 animate-fade-in-up animate-delay-300">
              <Button className="group rounded-full px-6">
                Shop Collection
                <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="rounded-full px-6">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center relative animate-blur-in">
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
              <div className="absolute inset-0 bg-black/5 rounded-xl -rotate-3 transform-gpu"></div>
              <div className="absolute inset-0 bg-white rounded-xl rotate-3 transform-gpu shadow-elegant"></div>
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Minimalist plastic products" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="absolute bottom-6 right-6 glass p-4 rounded-lg max-w-xs animate-slide-in-right animate-delay-500">
              <p className="font-medium text-sm">
                "Designed with intention, our products combine beauty and functionality."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-60 animate-fade-in animate-delay-500">
        <div className="w-[1px] h-10 bg-black/30 mb-2"></div>
        <span className="text-xs uppercase tracking-widest">Scroll</span>
      </div>
    </div>
  );
};

export default Hero;
