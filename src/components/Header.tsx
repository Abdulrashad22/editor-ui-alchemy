import { Slash, Menu, Layers, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleFeatures: () => void;
}

export const Header = ({ onToggleSidebar, onToggleFeatures }: HeaderProps) => {
  return (
    <header className="bg-white/80 dark:bg-black/20 backdrop-blur-lg border-b border-black/10 dark:border-white/10 px-6 py-3 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Slash className="h-8 w-8 text-yellow-400 drop-shadow-md" />
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
              Flash.io
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-yellow-600 hover:bg-yellow-50">File</Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-pink-600 hover:bg-pink-50">Edit</Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">View</Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-purple-600 hover:bg-purple-50">Tools</Button>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFeatures}
            className="text-slate-500 hover:text-yellow-500 hover:bg-yellow-50"
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-slate-500 hover:text-slate-900 hover:bg-gray-100"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-pink-600 hover:bg-pink-50">
            <User className="h-4 w-4" />
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white border-0 shadow font-semibold transition-all">
            <Slash className="h-4 w-4 mr-2" />
            Pro
          </Button>
        </div>
      </div>
    </header>
  );
};
