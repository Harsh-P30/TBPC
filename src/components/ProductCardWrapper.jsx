import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductCardWrapper = (props) => {
  return (
    <Link to={`/products/${props.id}`} className="block group">
      <ProductCard {...props} />
    </Link>
  );
};

export default ProductCardWrapper;
