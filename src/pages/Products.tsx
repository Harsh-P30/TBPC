
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsGrid from '@/components/products/ProductsGrid';
import Newsletter from '@/components/Newsletter';
import { products, categories } from '@/components/products/productsData';
import ProductCardWrapper from '@/components/ProductCardWrapper';
import { toast } from "sonner";
import ProductsHero from '@/components/products/ProductsHero';
import ProductsFilterBar from '@/components/products/ProductsFilterBar';
import ProductsControls from '@/components/products/ProductsControls';
import CategoryGroups from '@/components/products/CategoryGroups';
import { useProductFiltering } from '@/hooks/useProductFiltering';

interface LocationState {
  initialCategory?: string;
}

const Products = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const { initialCategory = 'All' } = (location.state as LocationState) || {};
  const initialCategoryToUse = queryCategory || initialCategory;
  
  const {
    activeCategory, 
    setActiveCategory,
    sortBy,
    setSortBy,
    showFeatured,
    setShowFeatured,
    showNew,
    setShowNew,
    showDiscount,
    setShowDiscount,
    filteredProducts,
    featuredProducts,
    newProducts,
    discountedProducts,
    getSortedProducts,
    groupProductsByCategory
  } = useProductFiltering(products, initialCategoryToUse);
  
  const productGroups = groupProductsByCategory(categories);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Show toast notification when category changes via URL
    if (queryCategory) {
      toast.success(`Viewing ${queryCategory} products`);
    }
  }, [queryCategory]);
  
  // Debug log to see what's happening
  console.log({
    activeCategory,
    filteredProductsCount: filteredProducts.length,
    showFeatured,
    showNew,
    showDiscount
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <ProductsHero />
        
        {/* Products listing */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <ProductsFilterBar 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            
            <ProductsControls 
              showFeatured={showFeatured}
              setShowFeatured={setShowFeatured}
              showNew={showNew}
              setShowNew={setShowNew}
              showDiscount={showDiscount}
              setShowDiscount={setShowDiscount}
              sortBy={sortBy}
              setSortBy={setSortBy}
              productCount={filteredProducts.length}
            />
            
            {/* Featured Products Section */}
            {showFeatured && featuredProducts.length > 0 && (
              <div className="mb-16">
                <ProductsGrid products={featuredProducts} title="Featured Products" />
              </div>
            )}
            
            {/* New Arrivals Section */}
            {showNew && newProducts.length > 0 && (
              <div className="mb-16">
                <ProductsGrid products={newProducts} title="New Arrivals" />
              </div>
            )}
            
            {/* On Sale Section */}
            {showDiscount && discountedProducts.length > 0 && (
              <div className="mb-16">
                <ProductsGrid products={discountedProducts} title="On Sale" />
              </div>
            )}
            
            {/* If viewing "All" and no filters active, show products grouped by category */}
            {activeCategory === 'All' && !showFeatured && !showNew && !showDiscount && productGroups && (
              <CategoryGroups 
                categoryGroups={productGroups}
                getSortedProducts={getSortedProducts}
                setActiveCategory={setActiveCategory}
              />
            )}
            
            {/* If not viewing "All" or no filters active, show standard product grid */}
            {activeCategory !== 'All' && !showFeatured && !showNew && !showDiscount && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {getSortedProducts(filteredProducts).map((product) => (
                  <ProductCardWrapper
                    key={product.id}
                    {...product}
                  />
                ))}
              </div>
            )}
            
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
