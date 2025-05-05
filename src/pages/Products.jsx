
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import { products, categories } from '@/components/products/productsData';
import { cn } from '@/lib/utils';

const Products = () => {
  const location = useLocation();
  const { initialCategory = 'All' } = (location.state) || {};
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  
  const categories = ['All', 'Kitchen', 'Furniture', 'Organization'];
  
  // Show all products for the selected category (no limit)
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Products Hero */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Browse our collection of premium plastic products designed with simplicity and functionality in mind.
              </p>
            </div>
          </div>
        </section>
        
        {/* Products listing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {/* Category filter */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex space-x-2 md:space-x-4">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all duration-300",
                      activeCategory === category 
                        ? "bg-black text-white" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product count */}
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
            
            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </div>
        </section>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
