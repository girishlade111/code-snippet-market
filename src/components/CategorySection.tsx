
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, ShoppingCart, User, Bitcoin, Code, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Professional portfolio templates and components",
    icon: Palette,
    count: 24,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Shopping carts, product pages, and store layouts",
    icon: ShoppingCart,
    count: 18,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "personal",
    title: "Personal",
    description: "Blogs, profiles, and personal website templates",
    icon: User,
    count: 31,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "crypto",
    title: "Crypto",
    description: "Blockchain, wallet interfaces, and crypto dashboards",
    icon: Bitcoin,
    count: 12,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "components",
    title: "Components",
    description: "Reusable UI components and widgets",
    icon: Code,
    count: 45,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Responsive mobile-first designs and layouts",
    icon: Smartphone,
    count: 22,
    color: "from-teal-500 to-blue-500"
  }
];

export const CategorySection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect code snippets organized by category. Each snippet comes with 
            preview images, clean code, and instant download.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} to={`/${category.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.count} snippets</span>
                      <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                        Explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
