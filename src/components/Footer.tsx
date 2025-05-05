
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <Link to="/" className="font-bold text-xl tracking-tight">TECH BROTHERS POLYMER CORPORATION</Link>
              <p className="mt-4 text-muted-foreground text-sm max-w-xs">
                We create premium plastic products that combine aesthetic beauty with functional design.
              </p>
            </div>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" Icon={Instagram} />
              <SocialLink href="https://facebook.com" Icon={Facebook} />
              <SocialLink href="https://twitter.com" Icon={Twitter} />
              <SocialLink href="https://youtube.com" Icon={Youtube} />
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Shop</h3>
            <ul className="space-y-3">
              <FooterLink to="/products" label="All Products" />
              <FooterLink to="/categories/kitchen" label="Kitchen" />
              <FooterLink to="/categories/organization" label="Organization" />
              <FooterLink to="/categories/furniture" label="Furniture" />
              <FooterLink to="/new-arrivals" label="New Arrivals" />
              <FooterLink to="/sale" label="Sale" />
            </ul>
          </div>
          
          {/* About Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/sustainability" label="Sustainability" />
              <FooterLink to="/careers" label="Careers" />
              <FooterLink to="/press" label="Press" />
              <FooterLink to="/blog" label="Blog" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 flex-shrink-0 text-foreground" />
                <span>Plot No. 303,Subhas Nagar,IDA Jeedimetla, Medchal, Telangana,500055</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Phone className="w-5 h-5 flex-shrink-0 text-foreground" />
                <span>040-74861458</span>
              </li>
              <li className="flex gap-3 text-sm text-muted-foreground">
                <Mail className="w-5 h-5 flex-shrink-0 text-foreground" />
                <span>customercare.tbpc@gmail.com</span>
              </li>
              <li className="pt-2">
                <Button variant="outline" className="w-full rounded-md" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} TECH BROTHERS POLYMER CORPORATION. All rights reserved.
          </div>
          <div className="order-1 md:order-2 flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/shipping" className="hover:underline">Shipping & Returns</Link>
            <Link to="/faq" className="hover:underline">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const SocialLink = ({ href, Icon }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 flex items-center justify-center rounded-full bg-background hover:bg-gray-200 transition-colors"
  >
    <Icon className="w-5 h-5" />
  </a>
);

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink = ({ to, label }: FooterLinkProps) => (
  <li>
    <Link 
      to={to} 
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
