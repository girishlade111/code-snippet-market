
import { CategoryPage } from "@/components/CategoryPage";
import { Palette } from "lucide-react";

const Portfolio = () => {
  const portfolioSnippets = [
    {
      id: "1",
      title: "Modern Portfolio Template",
      description: "Professional portfolio with dark mode and animations",
      downloads: 1450,
      preview_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["React", "Tailwind", "Framer Motion"],
      categories: { name: "Portfolio", slug: "portfolio" }
    },
    {
      id: "2", 
      title: "Creative Agency Landing",
      description: "Bold design with smooth scrolling and parallax effects",
      downloads: 980,
      preview_image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      tags: ["HTML", "CSS", "JavaScript"],
      categories: { name: "Portfolio", slug: "portfolio" }
    },
    {
      id: "3",
      title: "Minimalist Developer Portfolio",
      description: "Clean, minimal design focused on content and readability",
      downloads: 1120,
      preview_image_url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
      tags: ["Vue", "CSS", "TypeScript"],
      categories: { name: "Portfolio", slug: "portfolio" }
    }
  ];

  return (
    <CategoryPage
      title="Portfolio Templates"
      description="Professional portfolio templates and components to showcase your work beautifully"
      icon={Palette}
      color="from-blue-500 to-cyan-500"
      snippets={portfolioSnippets}
    />
  );
};

export default Portfolio;
