
import { CategoryPage } from "@/components/CategoryPage";
import { ShoppingCart } from "lucide-react";

const Ecommerce = () => {
  const ecommerceSnippets = [
    {
      id: "1",
      title: "Product Card Collection",
      description: "Beautiful product cards with hover effects and animations",
      downloads: 2100,
      preview_image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tags: ["React", "CSS", "Shopping"],
      categories: { name: "E-Commerce", slug: "ecommerce" }
    },
    {
      id: "2",
      title: "Shopping Cart Component",
      description: "Complete shopping cart with quantity controls and checkout",
      downloads: 1650,
      preview_image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      tags: ["JavaScript", "LocalStorage", "UI"],
      categories: { name: "E-Commerce", slug: "ecommerce" }
    },
    {
      id: "3",
      title: "E-commerce Dashboard",
      description: "Admin dashboard for managing products and orders",
      downloads: 890,
      preview_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["React", "Charts", "Admin"],
      categories: { name: "E-Commerce", slug: "ecommerce" }
    }
  ];

  return (
    <CategoryPage
      title="E-Commerce Solutions"
      description="Complete e-commerce components and templates for building online stores"
      icon={ShoppingCart}
      color="from-green-500 to-emerald-500"
      snippets={ecommerceSnippets}
    />
  );
};

export default Ecommerce;
