
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

interface ProductsGridProps {
  products: Product[];
  title?: string;
}

const ProductsGrid = ({ products, title }: ProductsGridProps) => {
  return (
    <div>
      {title && <h2 className="text-2xl font-medium mb-6">{title}</h2>}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {products.map((product, index) => (
          <ProductCardWrapper
            key={product.id}
            {...product}
            className={`animate-delay-${index * 100}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
