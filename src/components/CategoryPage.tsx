
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const { toast } = useToast();

  const { data: snippets = [], isLoading } = useQuery({
    queryKey: ['category-snippets', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('categories.slug', categoryId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleDownload = async (snippet: any) => {
    const { error } = await supabase
      .from('snippets')
      .update({ downloads: (snippet.downloads || 0) + 1 })
      .eq('id', snippet.id);

    if (!error) {
      toast({
        title: "Download Started",
        description: `${snippet.title} code is being prepared for download!`,
      });
      
      const blob = new Blob([snippet.code_content || ''], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${snippet.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const categoryName = snippets[0]?.categories?.name || categoryId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-lg text-gray-600">
            Browse {snippets.length} free code snippets in this category
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-gray-200 h-64"></Card>
            ))}
          </div>
        ) : snippets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <Card key={snippet.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  {snippet.preview_image_url && (
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={snippet.preview_image_url} 
                        alt={snippet.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {snippet.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags?.slice(0, 3).map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => snippet.preview_image_url && window.open(snippet.preview_image_url, '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleDownload(snippet)}
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                    <span className="text-lg font-bold text-green-600">FREE</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Snippets Yet</h3>
            <p className="text-gray-500">Check back soon for new {categoryName} snippets!</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};
