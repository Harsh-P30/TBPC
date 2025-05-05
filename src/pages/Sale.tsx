
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import { products } from '@/components/products/productsData';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

// Generate sale products with discounted prices
const generateSaleProducts = () => {
  return products
    .slice(0, 8)
    .map(product => ({
      ...product,
      originalPrice: product.price,
      price: Math.round(product.price * 0.8 * 100) / 100, // 20% discount
      salePercentage: 20
    }));
};

const Sale = () => {
  const [saleProducts, setSaleProducts] = useState<any[]>([]);
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 8,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Set sale products
    setSaleProducts(generateSaleProducts());
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Sale Hero */}
        <section className="bg-black text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-red-600 text-white mb-4">
                Limited Time Offer
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Summer Sale</h1>
              <p className="text-white/80 text-lg md:text-xl mb-8">
                Enjoy up to 20% off on selected plastic products. Don't miss this opportunity!
              </p>
              
              {/* Countdown Timer */}
              <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                  <CountdownItem value={countdown.days} label="Days" />
                  <CountdownItem value={countdown.hours} label="Hours" />
                  <CountdownItem value={countdown.minutes} label="Minutes" />
                  <CountdownItem value={countdown.seconds} label="Seconds" />
                </div>
              </div>
              
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Shop Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Sale Products */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto text-center mb-12">
              <h2 className="text-3xl font-medium mb-4">Products on Sale</h2>
              <p className="text-muted-foreground">
                Grab these premium plastic products at discounted prices before the sale ends.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {saleProducts.map((product) => (
                <div key={product.id} className="relative">
                  <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                    {product.salePercentage}% OFF
                  </div>
                  <ProductCard
                    {...product}
                    originalPrice={product.originalPrice}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Sale Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Sale Information</h3>
                    <p className="text-muted-foreground">
                      Our Summer Sale is valid until stocks last. Prices are already discounted.
                      No additional coupon codes can be applied to items on sale.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium">Sale Period:</span>
                    <span className="text-muted-foreground">June 15 - July 15, 2024</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="font-medium">Return Policy:</span>
                    <span className="text-muted-foreground">
                      Standard 30-day return policy applies to all sale items.
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <span className="font-medium">Shipping:</span>
                    <span className="text-muted-foreground">
                      Free shipping on all orders over $50.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem = ({ value, label }: CountdownItemProps) => (
  <div className="flex flex-col items-center">
    <div className="bg-white/10 text-white px-3 py-2 rounded-md min-w-[60px]">
      <span className="text-2xl font-mono font-bold">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-xs text-white/70 mt-1">{label}</span>
  </div>
);

export default Sale;
