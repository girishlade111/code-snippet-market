
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CategoryPageProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  color?: string;
  snippets?: any[];
}

interface Snippet {
  id: string;
  title: string;
  description: string;
  preview_image_url?: string;
  code_content?: string;
  downloads: number;
  tags?: string[];
  categories?: {
    name: string;
    slug: string;
  };
}

export const CategoryPage = ({ title, description, icon: Icon, color, snippets: staticSnippets }: CategoryPageProps) => {
  const { categoryId } = useParams();
  const { toast } = useToast();

  const { data: snippets = [], isLoading } = useQuery({
    queryKey: ['category-snippets', categoryId],
    queryFn: async () => {
      if (staticSnippets) return staticSnippets;
      if (!categoryId) return [];
      
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
    },
    enabled: !staticSnippets
  });

  const { data: categoryInfo } = useQuery({
    queryKey: ['category-info', categoryId],
    queryFn: async () => {
      if (title && description) return { name: title, description };
      if (!categoryId) return null;
      
      const { data, error } = await supabase
        .from('categories')
        .select('name, description')
        .eq('slug', categoryId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !title && !description
  });

  const handleDownload = async (snippet: Snippet) => {
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

  const handlePreview = (snippet: Snippet) => {
    if (snippet.preview_image_url) {
      window.open(snippet.preview_image_url, '_blank');
    } else {
      toast({
        title: "Preview",
        description: `Viewing ${snippet.title}`,
      });
    }
  };

  const displayTitle = title || categoryInfo?.name || 'Category';
  const displayDescription = description || categoryInfo?.description || 'Browse our collection of code snippets';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            {Icon && (
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${color || 'from-blue-500 to-purple-500'} flex items-center justify-center shadow-lg`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{displayTitle}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{displayDescription}</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-gray-200 h-64"></Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet: Snippet) => (
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
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {snippet.categories?.name || 'General'}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Download className="h-4 w-4" />
                      <span>{snippet.downloads || 0}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {snippet.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-2">
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
                        onClick={() => handlePreview(snippet)}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </Button>
                      <Button
                        onClick={() => handleDownload(snippet)}
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 flex items-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-green-600">FREE</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {snippets.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Snippets Available</h3>
            <p className="text-gray-500">Check back soon for new code snippets in this category!</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};
