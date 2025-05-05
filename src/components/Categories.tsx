
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const categories = [
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

const Categories = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-md mx-auto text-center mb-12">
          <h2 className="text-3xl font-medium mb-4 animate-fade-in">Shop by Category</h2>
          <p className="text-muted-foreground animate-fade-in animate-delay-100">
            Browse our curated collections of premium plastic products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
  };
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <div className={cn(
      "group relative rounded-lg overflow-hidden aspect-[3/4] animate-scale-in",
      `animate-delay-${index * 200}`
    )}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-medium mb-2">{category.name}</h3>
        <p className="text-white/80 mb-4 max-w-xs">{category.description}</p>
        
        <Link 
          to={`/categories/${category.id}`}
          className="inline-flex items-center text-sm font-medium group"
        >
          <span className="border-b border-white/30 group-hover:border-white transition-colors">
            Shop Now
          </span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Categories;
