
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Eye, Edit, Trash2, Plus, Code, BarChart3, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category_id: '',
    tags: '',
    code_content: '',
    preview_image_url: ''
  });
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Fetch snippets
  const { data: snippets = [] } = useQuery({
    queryKey: ['admin-snippets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: typeof uploadForm) => {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const { error } = await supabase
        .from('snippets')
        .insert({
          title: formData.title,
          description: formData.description,
          category_id: formData.category_id,
          tags: tagsArray,
          code_content: formData.code_content,
          preview_image_url: formData.preview_image_url,
          created_by: user?.id,
          status: 'active'
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-snippets'] });
      queryClient.invalidateQueries({ queryKey: ['featured-snippets'] });
      queryClient.invalidateQueries({ queryKey: ['snippet-counts'] });
      setUploadForm({
        title: '',
        description: '',
        category_id: '',
        tags: '',
        code_content: '',
        preview_image_url: ''
      });
      toast({
        title: "Upload Successful",
        description: "Your code snippet has been uploaded successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: `Error: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (snippetId: string) => {
      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', snippetId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-snippets'] });
      queryClient.invalidateQueries({ queryKey: ['featured-snippets'] });
      toast({
        title: "Deleted Successfully",
        description: "Snippet has been deleted.",
      });
    }
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    uploadMutation.mutate(uploadForm);
  };

  const stats = [
    { title: "Total Snippets", value: snippets.length.toString(), icon: Code, color: "text-blue-600" },
    { title: "Total Downloads", value: snippets.reduce((sum, s) => sum + (s.downloads || 0), 0).toString(), icon: BarChart3, color: "text-green-600" },
    { title: "Active Snippets", value: snippets.filter(s => s.status === 'active').length.toString(), icon: Users, color: "text-purple-600" },
    { title: "Categories", value: categories?.length.toString() || "0", icon: DollarSign, color: "text-yellow-600" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your lovable.dev marketplace</p>
          </div>
          <Link to="/">
            <Button variant="outline">
              Back to Site
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/50 backdrop-blur-sm border-r border-gray-200 min-h-screen p-6">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "upload" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("upload")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Code
            </Button>
            <Button
              variant={activeTab === "manage" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("manage")}
            >
              <Edit className="mr-2 h-4 w-4" />
              Manage Content
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={index} className="bg-white/70 backdrop-blur-sm border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <IconComponent className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Upload New Code Snippet</CardTitle>
                <CardDescription>
                  Add a new code snippet to the marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input 
                        id="title" 
                        placeholder="Enter snippet title" 
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={uploadForm.category_id} 
                        onValueChange={(value) => setUploadForm(prev => ({ ...prev, category_id: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your code snippet"
                      className="min-h-20"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code-content">Code Content</Label>
                    <Textarea
                      id="code-content"
                      placeholder="Paste your code here..."
                      className="min-h-32 font-mono text-sm"
                      value={uploadForm.code_content}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, code_content: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input 
                        id="tags" 
                        placeholder="React, CSS, JavaScript" 
                        value={uploadForm.tags}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preview-image">Preview Image URL</Label>
                      <Input 
                        id="preview-image" 
                        placeholder="https://example.com/image.jpg" 
                        value={uploadForm.preview_image_url}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, preview_image_url: e.target.value }))}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={uploadMutation.isPending}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {uploadMutation.isPending ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Snippet
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "manage" && (
            <Card className="bg-white/70 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle>Manage Code Snippets</CardTitle>
                <CardDescription>
                  View and manage all uploaded snippets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {snippets.map((snippet) => (
                    <div key={snippet.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{snippet.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline">{snippet.categories?.name}</Badge>
                          <span className="text-sm text-gray-600">{snippet.downloads || 0} downloads</span>
                          <span className="text-sm font-medium text-green-600">FREE</span>
                          <Badge variant={snippet.status === "active" ? "default" : "secondary"}>
                            {snippet.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => deleteMutation.mutate(snippet.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {snippets.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No snippets uploaded yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
