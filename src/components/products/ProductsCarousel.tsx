
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCardWrapper from '@/components/ProductCardWrapper';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  originalPrice?: number;
}

interface ProductsCarouselProps {
  products: Product[];
}

const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  if (products.length === 0) return null;
  
  return (
    <div className="relative md:hidden mb-12">
      {/* Navigation buttons */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/80 shadow-sm"
          onClick={scrollLeft}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/80 shadow-sm"
          onClick={scrollRight}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Carousel */}
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory"
      >
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="min-w-[80%] px-2 snap-start first:pl-0 last:pr-0"
          >
            <ProductCardWrapper
              {...product}
              className={`animate-delay-${index * 100}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsCarousel;
