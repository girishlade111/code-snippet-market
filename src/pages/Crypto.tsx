
import { CategoryPage } from "@/components/CategoryPage";
import { Bitcoin } from "lucide-react";

const Crypto = () => {
  const cryptoSnippets = [
    {
      id: "1",
      title: "Crypto Portfolio Tracker",
      description: "Real-time portfolio tracking with price charts and analytics",
      downloads: 890,
      preview_image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      tags: ["React", "API", "Charts"],
      categories: { name: "Crypto", slug: "crypto" }
    },
    {
      id: "2",
      title: "Wallet Interface",
      description: "Modern crypto wallet UI with transaction history",
      downloads: 567,
      preview_image_url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop",
      tags: ["Web3", "Ethereum", "UI"],
      categories: { name: "Crypto", slug: "crypto" }
    },
    {
      id: "3",
      title: "NFT Marketplace",
      description: "Complete NFT marketplace with bidding and collections",
      downloads: 423,
      preview_image_url: "https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=400&h=250&fit=crop",
      tags: ["Blockchain", "NFT", "Marketplace"],
      categories: { name: "Crypto", slug: "crypto" }
    }
  ];

  return (
    <CategoryPage
      title="Crypto & Blockchain"
      description="Cryptocurrency dashboards, wallets, and blockchain application interfaces"
      icon={Bitcoin}
      color="from-yellow-500 to-orange-500"
      snippets={cryptoSnippets}
    />
  );
};

export default Crypto;
