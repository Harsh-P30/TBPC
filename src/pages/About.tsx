
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-medium mb-8 animate-fade-in">About Us</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg animate-fade-in animate-delay-100">
                Founded in 2020, TECH BROTHERS POLYMER CORPORATION is dedicated to creating premium plastic products
                that combine aesthetic beauty with practical functionality. Our mission is to 
                transform how people perceive and use plastic in their everyday lives.
              </p>
              
              <h2 className="text-2xl font-medium mt-12 mb-4">Our Story</h2>
              <p>
                What began as a small studio with a handful of designers has grown into a 
                respected brand known for quality craftsmanship and sustainable practices.
                Our team of passionate designers and engineers work tirelessly to create
                products that are not only visually appealing but also durable and practical.
              </p>
              
              <h2 className="text-2xl font-medium mt-12 mb-4">Our Values</h2>
              <ul className="space-y-4 mt-6">
                <li>
                  <strong>Design Excellence</strong> - We believe that great design improves lives.
                  Every product we create undergoes rigorous design and usability testing.
                </li>
                <li>
                  <strong>Sustainability</strong> - We're committed to reducing environmental impact
                  through recycled materials, minimal packaging, and long-lasting products.
                </li>
                <li>
                  <strong>Innovation</strong> - We constantly explore new materials, technologies,
                  and manufacturing processes to stay at the cutting edge of our industry.
                </li>
                <li>
                  <strong>Customer Satisfaction</strong> - We design with our customers in mind,
                  creating products that solve real problems and bring joy to everyday tasks.
                </li>
              </ul>
              
              <h2 className="text-2xl font-medium mt-12 mb-4">Our Approach</h2>
              <p>
                Every TECH BROTHERS POLYMER CORPORATION product starts with identifying a need or opportunity to improve
                everyday living. Our design team then sketches, prototypes, and iterates until
                we've crafted something that perfectly balances form and function. We source
                high-quality, sustainable materials and work with trusted manufacturing partners
                who share our commitment to excellence.
              </p>
              
              <div className="mt-12 mb-8 bg-gray-50 p-8 rounded-lg">
                <blockquote className="text-xl italic">
                  "We don't just make plastic products—we're reimagining what plastic can be
                  in a world that demands both beauty and responsibility."
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
