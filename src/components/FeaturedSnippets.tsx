
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star, Code, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const FeaturedSnippets = () => {
  const { toast } = useToast();

  const { data: snippets = [], isLoading } = useQuery({
    queryKey: ['featured-snippets'],
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
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(9);
      
      if (error) throw error;
      return data;
    }
  });

  const handleDownload = async (snippet: any) => {
    // Increment download count
    const { error } = await supabase
      .from('snippets')
      .update({ downloads: (snippet.downloads || 0) + 1 })
      .eq('id', snippet.id);

    if (!error) {
      toast({
        title: "Download Started",
        description: `${snippet.title} code is being prepared for download!`,
      });
      
      // Create and trigger download
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

  const handlePreview = (snippet: any) => {
    if (snippet.preview_image_url) {
      window.open(snippet.preview_image_url, '_blank');
    } else {
      toast({
        title: "Preview",
        description: `Viewing ${snippet.title}`,
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Snippets</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-gray-200 h-64"></Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Snippets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-quality, free code snippets and templates uploaded by our admins. 
            Download instantly and use in your projects.
          </p>
        </div>

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

        {snippets.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Snippets Yet</h3>
            <p className="text-gray-500">Check back soon for new code snippets and templates!</p>
          </div>
        )}
      </div>
    </section>
  );
};
