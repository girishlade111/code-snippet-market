
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryPage } from "@/components/CategoryPage";
import { Palette } from "lucide-react";

const Portfolio = () => {
  const portfolioSnippets = [
    {
      id: 1,
      title: "Modern Portfolio Template",
      description: "Professional portfolio with dark mode and animations",
      price: "$35",
      rating: 4.9,
      downloads: 1450,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tags: ["React", "Tailwind", "Framer Motion"]
    },
    {
      id: 2,
      title: "Creative Agency Landing",
      description: "Bold design with smooth scrolling and parallax effects",
      price: "$42",
      rating: 4.8,
      downloads: 980,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: 3,
      title: "Minimalist Developer Portfolio",
      description: "Clean, minimal design focused on content and readability",
      price: "$28",
      rating: 4.7,
      downloads: 1120,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop",
      tags: ["Vue", "CSS", "TypeScript"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <CategoryPage
        title="Portfolio Templates"
        description="Professional portfolio templates and components to showcase your work beautifully"
        icon={Palette}
        color="from-blue-500 to-cyan-500"
        snippets={portfolioSnippets}
      />
      <Footer />
    </div>
  );
};

export default Portfolio;
