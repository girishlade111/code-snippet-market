
import { CategoryPage } from "@/components/CategoryPage";
import { User } from "lucide-react";

const Personal = () => {
  const personalSnippets = [
    {
      id: "1",
      title: "Personal Blog Template",
      description: "Clean blog design with markdown support and comments",
      downloads: 1820,
      preview_image_url: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b5d6?w=400&h=250&fit=crop",
      tags: ["React", "Markdown", "Blog"],
      categories: { name: "Personal", slug: "personal" }
    },
    {
      id: "2",
      title: "Resume Website",
      description: "Interactive resume with timeline and skill animations",
      downloads: 2340,
      preview_image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      tags: ["HTML", "CSS", "Animation"],
      categories: { name: "Personal", slug: "personal" }
    },
    {
      id: "3",
      title: "Personal Brand Landing",
      description: "Professional personal brand page with contact forms",
      downloads: 1120,
      preview_image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=250&fit=crop",
      tags: ["Vue", "Forms", "Design"],
      categories: { name: "Personal", slug: "personal" }
    }
  ];

  return (
    <CategoryPage
      title="Personal Websites"
      description="Personal website templates for blogs, resumes, and individual branding"
      icon={User}
      color="from-purple-500 to-pink-500"
      snippets={personalSnippets}
    />
  );
};

export default Personal;
