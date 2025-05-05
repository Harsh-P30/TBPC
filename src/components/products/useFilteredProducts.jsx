
import { useMemo } from 'react';
import { products } from './productsData';

export function useFilteredProducts(activeCategory) {
  const filteredProducts = useMemo(() => {
    // Return all products if 'All' is selected
    if (activeCategory === 'All') {
      return products.slice(0, 8); // Limit to 8 products for featured section
    }
    
    // Filter products by category and limit to 8
    return products
      .filter(product => product.category === activeCategory)
      .slice(0, 8);
  }, [activeCategory]);
  
  return filteredProducts;
}
