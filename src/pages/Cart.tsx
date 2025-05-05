
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';
import { toast } from 'sonner';

// Sample cart items for demonstration
const initialCartItems = [
  {
    id: '1',
    name: 'Minimalist Storage Container',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1605117882932-f9e32b3b4493?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Modern Kitchen Utensil Holder',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    quantity: 1,
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, amount: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + amount;
        if (newQuantity >= 1 && newQuantity <= 10) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    toast.success("Item removed from cart");
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toLowerCase() === 'plastic10') {
      setDiscount(10);
      toast.success("Promo code applied: 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl font-medium mb-6">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 text-sm font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b last:border-b-0">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                        {/* Mobile Remove Button */}
                        <div className="md:hidden absolute top-4 right-4">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Product */}
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <Link to={`/products/${item.id}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 md:hidden">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="hidden md:block col-span-2 text-center">
                          ${item.price.toFixed(2)}
                        </div>
                        
                        {/* Quantity */}
                        <div className="col-span-2">
                          <div className="flex items-center justify-center md:justify-center border rounded-md max-w-[120px] mx-auto">
                            <button 
                              className="p-1.5 border-r"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button 
                              className="p-1.5 border-l"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="col-span-2 text-center font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        {/* Remove (Desktop) */}
                        <div className="hidden md:block absolute right-4">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <Link to="/products">
                    <Button variant="outline">Continue Shopping</Button>
                  </Link>
                  <Button variant="ghost" onClick={() => setCartItems([])}>Clear Cart</Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>-${((calculateSubtotal() * discount) / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <label htmlFor="promo-code" className="text-sm font-medium mb-2 block">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="promo-code"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button variant="outline" onClick={handleApplyPromoCode}>Apply</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Try "PLASTIC10" for 10% off
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                  
                  {/* Shipping & Payment Info */}
                  <div className="text-xs text-muted-foreground space-y-2 mt-6">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      <span>Free shipping on all orders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
