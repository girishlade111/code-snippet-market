
import { Code, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 text-2xl font-bold mb-4">
              <Code className="h-8 w-8 text-blue-400" />
              <span>lovable.dev</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              The ultimate marketplace for premium source code snippets. 
              Build faster, code smarter, and create amazing projects with our curated collection.
            </p>
            <div className="flex space-x-4">
              <Github className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Mail className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/ecommerce" className="hover:text-white transition-colors">E-Commerce</Link></li>
              <li><Link to="/personal" className="hover:text-white transition-colors">Personal</Link></li>
              <li><Link to="/crypto" className="hover:text-white transition-colors">Crypto</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 lovable.dev. All rights reserved. Built with ❤️ for developers.</p>
        </div>
      </div>
    </footer>
  );
};
