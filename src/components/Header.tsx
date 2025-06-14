import { Slash, Menu, Layers, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleFeatures: () => void;
}

export const Header = ({ onToggleSidebar, onToggleFeatures }: HeaderProps) => {
  return (
    <header className="bg-white/90 dark:bg-slate-900/70 shadow backdrop-blur-md border-b border-yellow-100 px-6 py-3 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Slash className="h-8 w-8 text-yellow-400 drop-shadow-md rounded-full ring-2 ring-pink-400" />
            <span className="text-3xl font-serif font-extrabold bg-gradient-to-r from-yellow-500 to-pink-400 bg-clip-text text-transparent drop-shadow tracking-tight select-none">
              Flash.io
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-2 ml-6">
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-yellow-700 hover:bg-yellow-50 rounded-full transition">File</Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-pink-700 hover:bg-pink-50 rounded-full transition">Edit</Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition">View</Button>
            <Button variant="ghost" size="sm" className="text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-full transition">Tools</Button>
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost" size="sm"
            onClick={onToggleFeatures}
            className="text-slate-500 hover:text-yellow-500 hover:bg-yellow-50"
            aria-label="Toggle features"
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost" size="sm"
            onClick={onToggleSidebar}
            className="text-slate-500 hover:text-slate-900 hover:bg-gray-100"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-500 hover:text-pink-600 hover:bg-pink-50">
            <User className="h-4 w-4" />
          </Button>
          <Button className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white border-0 shadow font-semibold transition-all rounded-full px-4">
            <Slash className="h-4 w-4 mr-2" />
            Pro
          </Button>
        </div>
      </div>
    </header>
  );
};
