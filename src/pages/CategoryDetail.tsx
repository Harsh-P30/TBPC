
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsGrid from '@/components/products/ProductsGrid';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/components/products/productsData';

interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
}

const categories: CategoryData[] = [
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Stylish and practical solutions for modern kitchens',
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'organization',
    name: 'Organization',
    description: 'Elegant storage for a clutter-free environment',
    image: 'https://images.unsplash.com/photo-1578382371622-eb6a616692dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'furniture',
    name: 'Furniture',
    description: 'Modern pieces that complement any space',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the category
    const foundCategory = categories.find(cat => cat.id === categoryId);
    if (foundCategory) {
      setCategory(foundCategory);
      
      // Filter products by category name
      const filteredProducts = products.filter(
        product => product.category.toLowerCase() === foundCategory.name.toLowerCase()
      );
      setCategoryProducts(filteredProducts);
    }
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center py-20">
            <h1 className="text-3xl font-medium mb-4">Category Not Found</h1>
            <Button onClick={() => navigate('/categories')}>
              Back to Categories
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Banner */}
        <div className="relative h-80 md:h-96">
          <div className="absolute inset-0">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 container mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">{category.name}</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">{category.description}</p>
          </div>
        </div>
        
        {/* Products Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                onClick={() => navigate('/categories')}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Categories
              </Button>
              <h2 className="text-2xl font-medium">{category.name} Products</h2>
            </div>
            
            {/* Products carousel for smaller screens */}
            <ProductsCarousel products={categoryProducts} />
            
            {/* Products grid for larger screens */}
            <ProductsGrid products={categoryProducts} />
            
            {/* Empty state */}
            {categoryProducts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-xl font-medium mb-4">No products in this category yet</h3>
                <p className="text-muted-foreground mb-8">
                  We're working on adding new products to this category. Check back soon!
                </p>
                <Button onClick={() => navigate('/products')}>
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryDetail;
