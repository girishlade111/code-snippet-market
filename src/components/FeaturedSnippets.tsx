
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const FeaturedSnippets = () => {
  const [previewSnippet, setPreviewSnippet] = useState<any>(null);

  const { data: snippets, isLoading } = useQuery({
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
        .order('downloads', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleDownload = async (snippet: any) => {
    // Increment download count
    const { error } = await supabase
      .from('snippets')
      .update({ downloads: (snippet.downloads || 0) + 1 })
      .eq('id', snippet.id);

    if (!error) {
      // Create download file
      const element = document.createElement('a');
      const file = new Blob([snippet.code_content || ''], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${snippet.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured snippets...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Code Snippets</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hand-picked premium code snippets that developers love. 
            High quality, well-documented, and completely free to download.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {snippets?.map((snippet) => (
            <Card key={snippet.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white">
              <div className="relative overflow-hidden">
                {snippet.preview_image_url ? (
                  <img 
                    src={snippet.preview_image_url} 
                    alt={snippet.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No preview available</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {snippet.categories?.name || 'General'}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
                    FREE
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {snippet.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  {snippet.description || 'No description available'}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-4">
                  {snippet.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>5.0</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{snippet.downloads || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setPreviewSnippet(snippet)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    onClick={() => handleDownload(snippet)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {snippets?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No snippets available yet. Check back soon!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
            View All Snippets
          </Button>
        </div>

        {/* Preview Modal */}
        {previewSnippet && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{previewSnippet.title}</h3>
                  <Button variant="outline" onClick={() => setPreviewSnippet(null)}>
                    Close
                  </Button>
                </div>
                {previewSnippet.preview_image_url && (
                  <img 
                    src={previewSnippet.preview_image_url} 
                    alt={previewSnippet.title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                )}
                <p className="text-gray-600 mb-4">{previewSnippet.description}</p>
                <div className="bg-gray-100 p-4 rounded">
                  <h4 className="font-semibold mb-2">Code Preview:</h4>
                  <pre className="text-sm overflow-auto">
                    {previewSnippet.code_content?.substring(0, 500) || 'No code preview available'}
                    {previewSnippet.code_content?.length > 500 && '...'}
                  </pre>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    onClick={() => handleDownload(previewSnippet)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Full Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
