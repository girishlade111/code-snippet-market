
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryPage } from "@/components/CategoryPage";
import { User } from "lucide-react";

const Personal = () => {
  const personalSnippets = [
    {
      id: 1,
      title: "Personal Blog Template",
      description: "Clean blog design with markdown support and comments",
      price: "$32",
      rating: 4.8,
      downloads: 1820,
      image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b5d6?w=400&h=250&fit=crop",
      tags: ["React", "Markdown", "Blog"]
    },
    {
      id: 2,
      title: "Resume Website",
      description: "Interactive resume with timeline and skill animations",
      price: "$28",
      rating: 4.9,
      downloads: 2340,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      tags: ["HTML", "CSS", "Animation"]
    },
    {
      id: 3,
      title: "Personal Brand Landing",
      description: "Professional personal brand page with contact forms",
      price: "$45",
      rating: 4.7,
      downloads: 1120,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=250&fit=crop",
      tags: ["Vue", "Forms", "Design"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <CategoryPage
        title="Personal Websites"
        description="Personal website templates for blogs, resumes, and individual branding"
        icon={User}
        color="from-purple-500 to-pink-500"
        snippets={personalSnippets}
      />
      <Footer />
    </div>
  );
};

export default Personal;
