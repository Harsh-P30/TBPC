
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}: CategoryFilterProps) => {
  return (
    <div className="flex justify-center mb-10 overflow-x-auto pb-2 no-scrollbar">
      <div className="flex space-x-2 md:space-x-4">
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-all duration-300 animate-fade-in",
              `animate-delay-${index * 100}`,
              activeCategory === category 
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

export default CategoryFilter;
