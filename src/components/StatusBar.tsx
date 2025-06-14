
import { CheckCircle, GitBranch, Zap, Wifi } from "lucide-react";

interface StatusBarProps {
  activeFile: string;
}

export const StatusBar = ({ activeFile }: StatusBarProps) => {
  return (
    <div className="bg-slate-800 border-t border-slate-700 px-4 py-2 text-xs text-gray-400 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <CheckCircle className="h-3 w-3 text-green-400" />
          <span>No errors</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <GitBranch className="h-3 w-3" />
          <span>main</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Zap className="h-3 w-3 text-yellow-400" />
          <span>TypeScript</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span>Ln 12, Col 24</span>
        <span>UTF-8</span>
        <div className="flex items-center space-x-1">
          <Wifi className="h-3 w-3 text-green-400" />
          <span>Connected</span>
        </div>
        <span>{activeFile}</span>
      </div>
    </div>
  );
};
