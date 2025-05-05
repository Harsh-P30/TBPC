
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  SlidersHorizontal, 
  Star, 
  Clock,
  ShoppingBag, 
  ChevronDown
} from 'lucide-react';

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'featured';

interface ProductsControlsProps {
  showFeatured: boolean;
  setShowFeatured: (show: boolean) => void;
  showNew: boolean;
  setShowNew: (show: boolean) => void;
  showDiscount: boolean;
  setShowDiscount: (show: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  productCount: number;
}

const ProductsControls = ({
  showFeatured,
  setShowFeatured,
  showNew,
  setShowNew,
  showDiscount,
  setShowDiscount,
  sortBy,
  setSortBy,
  productCount
}: ProductsControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={showFeatured ? "default" : "outline"}
          size="sm"
          onClick={() => setShowFeatured(!showFeatured)}
          className="flex items-center gap-1"
        >
          <Star className="h-4 w-4" />
          Featured
        </Button>
        <Button 
          variant={showNew ? "default" : "outline"}
          size="sm"
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-1"
        >
          <Clock className="h-4 w-4" />
          New Arrivals
        </Button>
        <Button 
          variant={showDiscount ? "default" : "outline"}
          size="sm"
          onClick={() => setShowDiscount(!showDiscount)}
          className="flex items-center gap-1"
        >
          <ShoppingBag className="h-4 w-4" />
          On Sale
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {productCount} products
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem onClick={() => setSortBy('featured')}>
              Featured
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('newest')}>
              Newest first
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('price-low-high')}>
              Price: Low to high
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('price-high-low')}>
              Price: High to low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ProductsControls;
