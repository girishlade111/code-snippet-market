
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryPage } from "@/components/CategoryPage";
import { ShoppingCart } from "lucide-react";

const Ecommerce = () => {
  const ecommerceSnippets = [
    {
      id: 1,
      title: "Product Card Collection",
      description: "Beautiful product cards with hover effects and animations",
      price: "$25",
      rating: 4.9,
      downloads: 2100,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tags: ["React", "CSS", "Shopping"]
    },
    {
      id: 2,
      title: "Shopping Cart Component",
      description: "Complete shopping cart with quantity controls and checkout",
      price: "$38",
      rating: 4.8,
      downloads: 1650,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      tags: ["JavaScript", "LocalStorage", "UI"]
    },
    {
      id: 3,
      title: "E-commerce Dashboard",
      description: "Admin dashboard for managing products and orders",
      price: "$55",
      rating: 4.7,
      downloads: 890,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["React", "Charts", "Admin"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <CategoryPage
        title="E-Commerce Solutions"
        description="Complete e-commerce components and templates for building online stores"
        icon={ShoppingCart}
        color="from-green-500 to-emerald-500"
        snippets={ecommerceSnippets}
      />
      <Footer />
    </div>
  );
};

export default Ecommerce;
