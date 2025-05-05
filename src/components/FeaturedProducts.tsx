
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CategoryFilter from './products/CategoryFilter';
import ProductsCarousel from './products/ProductsCarousel';
import ProductsGrid from './products/ProductsGrid';
import { categories } from './products/productsData';
import { useFilteredProducts } from './products/useFilteredProducts';

// Export products from the new location to maintain backward compatibility
export { products } from './products/productsData';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();
  
  const filteredProducts = useFilteredProducts(activeCategory);
  
  const handleViewAllClick = () => {
    navigate('/products', { state: { initialCategory: activeCategory } });
  };
  
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 animate-fade-in">Featured Products</h2>
          <p className="text-muted-foreground animate-fade-in animate-delay-100">
            Our collection of premium plastic products designed with simplicity and functionality in mind.
          </p>
        </div>
        
        {/* Category filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        
        {/* Products carousel for smaller screens */}
        <ProductsCarousel products={filteredProducts} />
        
        {/* Products grid for larger screens */}
        <ProductsGrid products={filteredProducts} />
        
        {/* View all button */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-6"
            onClick={handleViewAllClick}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
