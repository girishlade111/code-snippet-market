
import { Button } from "@/components/ui/button";
import { Code, Menu, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <Code className="h-8 w-8 text-blue-600" />
            <span>lovable.dev</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 transition-colors">Portfolio</Link>
            <Link to="/ecommerce" className="text-gray-700 hover:text-blue-600 transition-colors">E-Commerce</Link>
            <Link to="/personal" className="text-gray-700 hover:text-blue-600 transition-colors">Personal</Link>
            <Link to="/crypto" className="text-gray-700 hover:text-blue-600 transition-colors">Crypto</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Link to="/admin">
              <Button variant="outline" className="hidden md:flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/portfolio" className="text-gray-700 hover:text-blue-600 transition-colors">Portfolio</Link>
              <Link to="/ecommerce" className="text-gray-700 hover:text-blue-600 transition-colors">E-Commerce</Link>
              <Link to="/personal" className="text-gray-700 hover:text-blue-600 transition-colors">Personal</Link>
              <Link to="/crypto" className="text-gray-700 hover:text-blue-600 transition-colors">Crypto</Link>
              <Button variant="ghost" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Link to="/admin">
                <Button variant="outline" className="justify-start w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
