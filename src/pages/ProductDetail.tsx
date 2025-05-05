
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { products } from '@/components/products/productsData';
import { ShoppingBag, Heart, Share2, ArrowLeft, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsCarousel from '@/components/products/ProductsCarousel';
import { toast } from 'sonner';

interface ProductDetailProps {}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the product by ID
    const foundProduct = products.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [productId]);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} × ${product?.name} to cart`);
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center py-20">
            <h1 className="text-3xl font-medium mb-4">Product Not Found</h1>
            <Button onClick={() => navigate('/products')}>
              Browse All Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </div>
        
        {/* Product Details */}
        <section className="container mx-auto px-4 md:px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="rounded-lg overflow-hidden bg-gray-50 p-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.category}
                </span>
              </div>
              
              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-medium">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(24 reviews)</span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-medium">${product.price.toFixed(2)}</div>
              
              {/* Description */}
              <p className="text-muted-foreground">
                Premium quality plastic {product.name.toLowerCase()} designed for everyday use. 
                Durable, lightweight, and easy to clean. Perfect addition to your modern home.
              </p>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-1 border-r"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    className="px-3 py-1 border-l"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Add to Wishlist
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
              
              {/* Details */}
              <div className="pt-8">
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="pt-4">
                    <div className="space-y-4">
                      <p>
                        Our {product.name} is crafted from high-quality, durable plastic that's built to last. 
                        With a sleek, minimalist design, it seamlessly integrates into any modern home or office space.
                      </p>
                      <p>
                        The ergonomic design ensures comfortable handling, while the premium finish resists scratches and stains. 
                        Easy to clean and maintain, this product is perfect for everyday use.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="specifications" className="pt-4">
                    <ul className="space-y-2">
                      <li className="flex justify-between py-2 border-b">
                        <span className="font-medium">Material</span>
                        <span className="text-muted-foreground">High-quality plastic</span>
                      </li>
                      <li className="flex justify-between py-2 border-b">
                        <span className="font-medium">Dimensions</span>
                        <span className="text-muted-foreground">10 × 8 × 3 inches</span>
                      </li>
                      <li className="flex justify-between py-2 border-b">
                        <span className="font-medium">Weight</span>
                        <span className="text-muted-foreground">0.5 lbs</span>
                      </li>
                      <li className="flex justify-between py-2 border-b">
                        <span className="font-medium">Color</span>
                        <span className="text-muted-foreground">White</span>
                      </li>
                      <li className="flex justify-between py-2">
                        <span className="font-medium">Warranty</span>
                        <span className="text-muted-foreground">1 year</span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="reviews" className="pt-4">
                    <div className="space-y-6">
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <h4 className="font-medium">Excellent product!</h4>
                        <p className="text-muted-foreground">
                          This is exactly what I needed for my kitchen. Great quality and design.
                        </p>
                        <p className="text-sm mt-2">John D. - 2 months ago</p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <h4 className="font-medium">Very satisfied</h4>
                        <p className="text-muted-foreground">
                          Good material, looks nice, and serves its purpose well.
                        </p>
                        <p className="text-sm mt-2">Sarah M. - 1 month ago</p>
                      </div>
                      
                      <Button variant="outline" className="w-full">View All 24 Reviews</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        <section className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-medium mb-8">Related Products</h2>
          
          {/* Products carousel */}
          <ProductsCarousel products={relatedProducts} />
        </section>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
