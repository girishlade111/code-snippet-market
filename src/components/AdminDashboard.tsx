
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

const mockSnippets = [
  {
    id: 1,
    title: "Modern Dashboard Template",
    category: "Portfolio",
    price: "$29",
    downloads: 1240,
    status: "active"
  },
  {
    id: 2,
    title: "E-commerce Product Card",
    category: "E-Commerce",
    price: "$19",
    downloads: 890,
    status: "active"
  },
  {
    id: 3,
    title: "Crypto Portfolio Tracker",
    category: "Crypto",
    price: "$45",
    downloads: 567,
    status: "draft"
  }
];

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Successful",
        description: "Your code snippet has been uploaded successfully!",
      });
    }, 2000);
  };

  const stats = [
    { title: "Total Snippets", value: "156", icon: Code, color: "text-blue-600" },
    { title: "Total Downloads", value: "12.4K", icon: BarChart3, color: "text-green-600" },
    { title: "Active Users", value: "2.8K", icon: Users, color: "text-purple-600" },
    { title: "Revenue", value: "$8.9K", icon: DollarSign, color: "text-yellow-600" }
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

              <Card className="bg-white/70 backdrop-blur-sm border-0">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">New download: Modern Dashboard Template</p>
                        <p className="text-sm text-gray-600">2 minutes ago</p>
                      </div>
                      <Badge>$29</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">New user registration</p>
                        <p className="text-sm text-gray-600">15 minutes ago</p>
                      </div>
                      <Badge variant="outline">User</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                      <Input id="title" placeholder="Enter snippet title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portfolio">Portfolio</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="crypto">Crypto</SelectItem>
                          <SelectItem value="components">Components</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
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
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input id="price" type="number" placeholder="0.00" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input id="tags" placeholder="React, CSS, JavaScript" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code-file">Code Files</Label>
                    <Input id="code-file" type="file" multiple accept=".html,.css,.js,.jsx,.ts,.tsx" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="screenshot">Screenshot</Label>
                    <Input id="screenshot" type="file" accept="image/*" />
                  </div>

                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isUploading ? (
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
                  {mockSnippets.map((snippet) => (
                    <div key={snippet.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{snippet.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline">{snippet.category}</Badge>
                          <span className="text-sm text-gray-600">{snippet.downloads} downloads</span>
                          <span className="text-sm font-medium text-green-600">{snippet.price}</span>
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
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
