
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star } from "lucide-react";

const featuredSnippets = [
  {
    id: 1,
    title: "Modern Dashboard Template",
    description: "Complete admin dashboard with dark mode support and responsive design",
    category: "Portfolio",
    price: "$29",
    rating: 4.8,
    downloads: 1240,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    tags: ["React", "Tailwind", "Dashboard"]
  },
  {
    id: 2,
    title: "E-commerce Product Card",
    description: "Beautiful product cards with hover effects and shopping cart integration",
    category: "E-Commerce",
    price: "$19",
    rating: 4.9,
    downloads: 890,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    tags: ["CSS", "JavaScript", "Shopping"]
  },
  {
    id: 3,
    title: "Crypto Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracker with charts and analytics",
    category: "Crypto",
    price: "$45",
    rating: 4.7,
    downloads: 567,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    tags: ["React", "Charts", "API"]
  }
];

export const FeaturedSnippets = () => {
  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Code Snippets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked premium code snippets that developers love. 
            High quality, well-documented, and ready to use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSnippets.map((snippet) => (
            <Card key={snippet.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white">
              <div className="relative overflow-hidden">
                <img 
                  src={snippet.image} 
                  alt={snippet.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {snippet.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                    {snippet.price}
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {snippet.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  {snippet.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{snippet.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{snippet.downloads}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
            View All Snippets
          </Button>
        </div>
      </div>
    </section>
  );
};
