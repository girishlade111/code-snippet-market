
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryPage } from "@/components/CategoryPage";
import { Bitcoin } from "lucide-react";

const Crypto = () => {
  const cryptoSnippets = [
    {
      id: 1,
      title: "Crypto Portfolio Tracker",
      description: "Real-time portfolio tracking with price charts and analytics",
      price: "$65",
      rating: 4.8,
      downloads: 890,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      tags: ["React", "API", "Charts"]
    },
    {
      id: 2,
      title: "Wallet Interface",
      description: "Modern crypto wallet UI with transaction history",
      price: "$48",
      rating: 4.7,
      downloads: 567,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop",
      tags: ["Web3", "Ethereum", "UI"]
    },
    {
      id: 3,
      title: "NFT Marketplace",
      description: "Complete NFT marketplace with bidding and collections",
      price: "$85",
      rating: 4.9,
      downloads: 423,
      image: "https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=400&h=250&fit=crop",
      tags: ["Blockchain", "NFT", "Marketplace"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <CategoryPage
        title="Crypto & Blockchain"
        description="Cryptocurrency dashboards, wallets, and blockchain application interfaces"
        icon={Bitcoin}
        color="from-yellow-500 to-orange-500"
        snippets={cryptoSnippets}
      />
      <Footer />
    </div>
  );
};

export default Crypto;
