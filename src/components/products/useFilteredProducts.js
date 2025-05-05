
import { products, categories } from './productsData';

export const useFilteredProducts = (activeCategory) => {
  // Only show 3 products per category in the featured section
  const getFilteredProducts = () => {
    if (activeCategory === 'All') {
      // For 'All' category, show 3 products from each category (total 12)
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
      // For specific categories, show the first 3 products
      return products
        .filter(product => product.category === activeCategory)
        .slice(0, 3);
    }
  };

  return getFilteredProducts();
};
