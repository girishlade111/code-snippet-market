
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, ShoppingCart, User, Bitcoin, Code, Smartphone, Briefcase, Camera, BookOpen, Users, Wrench, Calendar, Heart, Scale, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  {
    id: "personal-portfolio",
    title: "Personal & Portfolio",
    description: "Personal portfolios, resumes, blogs, and freelancer showcases",
    icon: Palette,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "business-corporate",
    title: "Business & Corporate",
    description: "Startup websites, agency sites, SaaS landing pages",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    description: "Online stores, marketplaces, and digital product platforms",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "creative-media",
    title: "Creative & Media",
    description: "Photography, design portfolios, musician sites",
    icon: Camera,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: "blogging-content",
    title: "Blogging & Content",
    description: "News sites, magazines, tutorial blogs, and reviews",
    icon: BookOpen,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "technology-software",
    title: "Technology & Software",
    description: "Tech products, app showcases, AI tools, and software pages",
    icon: Code,
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "crypto-web3",
    title: "Crypto & Web3",
    description: "NFT pages, DeFi apps, crypto exchanges, and blockchain sites",
    icon: Bitcoin,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "education-learning",
    title: "Education & Learning",
    description: "Course platforms, schools, LMS, and educational sites",
    icon: BookOpen,
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: "community-social",
    title: "Community & Social",
    description: "Forums, social media clones, chat apps, and dating platforms",
    icon: Users,
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "utility-tools",
    title: "Utility & Tools",
    description: "To-do apps, calculators, converters, and productivity tools",
    icon: Wrench,
    color: "from-gray-500 to-slate-500"
  },
  {
    id: "events-booking",
    title: "Events & Booking",
    description: "Event pages, booking systems, calendars, and schedulers",
    icon: Calendar,
    color: "from-red-500 to-pink-500"
  },
  {
    id: "health-fitness",
    title: "Health & Fitness",
    description: "Fitness coaches, health trackers, gym sites, and wellness",
    icon: Heart,
    color: "from-green-500 to-teal-500"
  },
  {
    id: "nonprofit-ngo",
    title: "Non-Profit & NGO",
    description: "Charity organizations, donation pages, and campaigns",
    icon: Heart,
    color: "from-rose-500 to-red-500"
  },
  {
    id: "legal-finance",
    title: "Legal, Finance & Consulting",
    description: "Law firms, financial advisors, insurance, and consulting",
    icon: Scale,
    color: "from-slate-500 to-gray-500"
  },
  {
    id: "error-pages",
    title: "Coming Soon / Error Pages",
    description: "Coming soon pages, maintenance mode, and error designs",
    icon: AlertCircle,
    color: "from-orange-500 to-red-500"
  }
];

export const CategorySection = () => {
  const { data: snippetCounts } = useQuery({
    queryKey: ['snippet-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select('category_id, categories!inner(slug)')
        .eq('status', 'active');
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(snippet => {
        const slug = snippet.categories?.slug;
        if (slug) {
          counts[slug] = (counts[slug] || 0) + 1;
        }
      });
      
      return counts;
    }
  });

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect code snippets organized by category. Each snippet comes with 
            preview images, clean code, and free download.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const count = snippetCounts?.[category.id] || 0;
            return (
              <Link key={category.id} to={`/${category.id}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{count} snippets</span>
                      <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                        Explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
