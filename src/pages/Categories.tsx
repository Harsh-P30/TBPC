
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

const CategoriesPage = () => {
  const categories: Category[] = [
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
      image: 'https://staranddaisy.in/wp-content/uploads/2023/04/newcupboard12423_8.jpg',
    },
    {
      id: 'furniture',
      name: 'Furniture',
      description: 'Modern pieces that complement any space',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    }, 
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Browse Our Categories</h1>
              <p className="text-lg text-muted-foreground mb-8 animate-fade-in animate-delay-100">
                Explore our premium collection of plastic products organized by category.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <Link to={`/products?category=${category.id}`} className={`group relative rounded-lg overflow-hidden cursor-pointer animate-scale-in animate-delay-${index * 100}`}>
      <div className="aspect-[4/3]">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-medium mb-2">{category.name}</h3>
        <p className="text-white/80 mb-4 max-w-xs">{category.description}</p>
        
        <div className="inline-flex items-center text-sm font-medium">
          <span className="border-b border-white/30 group-hover:border-white transition-colors">
            Browse Products
          </span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoriesPage;
