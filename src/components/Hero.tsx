
import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="container mx-auto relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6 border border-gray-200">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span>Premium Source Code Marketplace</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
          Beautiful Code<br />
          <span className="text-4xl md:text-6xl">Ready to Use</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover premium source code snippets, templates, and components. 
          Preview before you buy, download instantly, and build amazing projects faster.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
            <Code className="mr-2 h-5 w-5" />
            Browse Code Snippets
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all">
            View Categories
          </Button>
        </div>

        <div className="flex justify-center animate-bounce">
          <ArrowDown className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </section>
  );
};
