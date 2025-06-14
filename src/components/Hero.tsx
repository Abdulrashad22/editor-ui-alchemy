
import { ArrowRight, Play, Star, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Hero = () => {
  return (
    <div className="text-center mb-16">
      <div className="mb-8">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Code Like Never Before
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Experience the future of coding with our AI-powered editor featuring intelligent 
          autocomplete, real-time collaboration, and lightning-fast performance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8">
            <Play className="h-5 w-5 mr-2" />
            Start Coding Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
            View Demo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 mx-auto">
            <GitBranch className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Git Integration</h3>
          <p className="text-gray-400">Seamless version control with visual diff and merge tools</p>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 mb-4 mx-auto">
            <Star className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">AI Assistant</h3>
          <p className="text-gray-400">Smart code completion and bug detection powered by AI</p>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mb-4 mx-auto">
            <Play className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Live Preview</h3>
          <p className="text-gray-400">See your changes instantly with hot reload and live preview</p>
        </Card>
      </div>
    </div>
  );
};
