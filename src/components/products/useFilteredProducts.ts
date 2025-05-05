
import { useMemo } from 'react';
import { products, categories } from './productsData';

export const useFilteredProducts = (activeCategory: string) => {
  // Use useMemo to cache the filtered products based on the activeCategory
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      // For 'All' category, show a balanced selection from each category (up to 12 total)
      const result = [];
      categories.forEach(category => {
        if (category !== 'All') {
          const categoryProducts = products
            .filter(product => product.category === category)
            .slice(0, 3);
          result.push(...categoryProducts);
        }
      });
      return result;
    } else {
      // For specific categories, show the products from that category
      return products
        .filter(product => product.category === activeCategory)
        .slice(0, 12); // Show more products when a specific category is selected
    }
  }, [activeCategory]);

  return filteredProducts;
};
