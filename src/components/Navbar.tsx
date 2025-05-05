
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            <button className="p-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/sale" className="p-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <Heart className="w-5 h-5" />
            </Link>
            <button className="p-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <User className="w-5 h-5" />
            </button>
            <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full" asChild>
              <Link to="/cart">
                <ShoppingBag className="w-4 h-4" />
                <span>2</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white flex flex-col pt-24 px-6 pb-6 transition-all duration-300 ease-in-out transform",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col space-y-6 text-lg">
          <Link to="/" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
          <Link to="/categories" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Categories</Link>
          <Link to="/about" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/new-arrivals" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
          <Link to="/sale" className="py-2 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Sale</Link>
        </nav>
        <div className="flex justify-around mt-auto pt-8">
          <button className="p-2 flex flex-col items-center text-xs">
            <Search className="w-6 h-6 mb-1" />
            Search
          </button>
          <Link to="/sale" className="p-2 flex flex-col items-center text-xs" onClick={() => setIsMobileMenuOpen(false)}>
            <Heart className="w-6 h-6 mb-1" />
            Wishlist
          </Link>
          <button className="p-2 flex flex-col items-center text-xs">
            <User className="w-6 h-6 mb-1" />
            Account
          </button>
          <Link to="/cart" className="p-2 flex flex-col items-center text-xs" onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingBag className="w-6 h-6 mb-1" />
            Cart (2)
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
