
import { Code, Menu, Layers, Settings, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleFeatures: () => void;
}

export const Header = ({ onToggleSidebar, onToggleFeatures }: HeaderProps) => {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeForge
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              File
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              Edit
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              View
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              Tools
            </Button>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFeatures}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Layers className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
            <User className="h-4 w-4" />
          </Button>
          
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
            <Zap className="h-4 w-4 mr-2" />
            Pro
          </Button>
        </div>
      </div>
    </header>
  );
};
