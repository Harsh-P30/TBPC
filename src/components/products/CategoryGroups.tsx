
import ProductCardWrapper from '@/components/ProductCardWrapper';
import ProductsCarousel from './ProductsCarousel';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  originalPrice?: number;
}

interface CategoryGroupsProps {
  categoryGroups: Record<string, Product[]>;
  getSortedProducts: (products: Product[]) => Product[];
  setActiveCategory: (category: string) => void;
}

const CategoryGroups = ({ categoryGroups, getSortedProducts, setActiveCategory }: CategoryGroupsProps) => {
  return (
    <div className="space-y-16">
      {Object.entries(categoryGroups).map(([category, categoryProducts]) => (
        categoryProducts.length > 0 && (
          <div key={category} className="category-group">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium">Plastic {category}</h2>
              <button 
                onClick={() => setActiveCategory(category)}
                className="text-sm font-medium hover:underline"
              >
                View all {category} products
              </button>
            </div>
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {getSortedProducts(categoryProducts).map((product) => (
                <ProductCardWrapper
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
            <ProductsCarousel products={getSortedProducts(categoryProducts)} />
          </div>
        )
      ))}
    </div>
  );
};

export default CategoryGroups;
