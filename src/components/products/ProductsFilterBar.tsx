
import { cn } from "@/lib/utils";

interface ProductsFilterBarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ProductsFilterBar = ({ categories, activeCategory, setActiveCategory }: ProductsFilterBarProps) => {
  return (
    <div className="flex justify-center mb-12 overflow-x-auto pb-2 no-scrollbar">
      <div className="flex space-x-2 md:space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all duration-300",
              activeCategory.toLowerCase() === category.toLowerCase() 
                ? "bg-black text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsFilterBar;
