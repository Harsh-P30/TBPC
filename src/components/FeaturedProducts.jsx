import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CategoryFilter from './products/CategoryFilter';
import ProductsCarousel from './products/ProductsCarousel';
import ProductsGrid from './products/ProductsGrid';
import { categories, products } from './products/productsData';
import { useFilteredProducts } from './products/useFilteredProducts';

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  // Filtered products by category
  const filteredProducts = useFilteredProducts(activeCategory);

  // Only show top 4 as featured
  const featuredProducts = filteredProducts.slice(0, 4); // You can change 4 to 8

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

        {/* Products carousel for small screens */}
        <ProductsCarousel products={featuredProducts} />

        {/* Grid for large screens */}
        <ProductsGrid products={featuredProducts} />

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
