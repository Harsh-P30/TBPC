
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  originalPrice?: number;
  className?: string;
}

const ProductCardWrapper = (props: Product) => {
  return (
    <Link to={`/products/${props.id}`} className="block group">
      <ProductCard {...props} />
    </Link>
  );
};

export default ProductCardWrapper;
