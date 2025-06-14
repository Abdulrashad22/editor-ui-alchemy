
import { Code, Palette, Zap, Users, Shield, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FeaturePanel = () => {
  const features = [
    {
      icon: Code,
      title: "Syntax Highlighting",
      description: "Beautiful syntax highlighting for 100+ programming languages with customizable themes",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with instant file loading and real-time code analysis",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Code together with your team in real-time with live cursors and chat",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Palette,
      title: "Customizable Interface",
      description: "Personalize your coding environment with themes, layouts, and extensions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with end-to-end encryption and secure cloud sync",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: Rocket,
      title: "Deploy Anywhere",
      description: "One-click deployment to popular platforms like Vercel, Netlify, and AWS",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="bg-white/5 backdrop-blur-sm border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20"
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
            <feature.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
          <p className="text-gray-400 leading-relaxed">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};
