
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import { products } from '@/components/products/productsData';

const NewArrivals = () => {
  // Filter products to show only those marked as new
  const newProducts = products.filter(product => product.isNew);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">New Arrivals</h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Discover our latest plastic products, fresh off the production line.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            {newProducts.length > 0 ? (
              <>
                <div className="mb-8">
                  <p className="text-muted-foreground">
                    Showing {newProducts.length} new products
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {newProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      className={`animate-fade-in animate-delay-${index * 100}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-2">No new products yet</h3>
                <p className="text-muted-foreground mb-8">
                  We're working on adding new products soon. Check back later!
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

export default NewArrivals;
