
import { useState } from "react";
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileText, 
  Image, 
  Settings, 
  Search,
  ChevronRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  activeFile: string;
  onFileSelect: (file: string) => void;
}

export const Sidebar = ({ collapsed, activeFile, onFileSelect }: SidebarProps) => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['src']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => 
      prev.includes(folder) 
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    );
  };

  const fileTree = [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'components', type: 'folder', children: [
          { name: 'Header.tsx', type: 'file' },
          { name: 'Sidebar.tsx', type: 'file' },
          { name: 'CodeEditor.tsx', type: 'file' }
        ]},
        { name: 'pages', type: 'folder', children: [
          { name: 'Index.tsx', type: 'file' }
        ]},
        { name: 'App.tsx', type: 'file' },
        { name: 'index.css', type: 'file' }
      ]
    },
    { name: 'public', type: 'folder', children: [
      { name: 'favicon.ico', type: 'file' },
      { name: 'logo.png', type: 'image' }
    ]},
    { name: 'package.json', type: 'file' },
    { name: 'README.md', type: 'file' }
  ];

  const renderFileIcon = (type: string, name: string) => {
    if (type === 'folder') {
      return expandedFolders.includes(name) ? 
        <FolderOpen className="h-4 w-4 text-blue-400" /> : 
        <Folder className="h-4 w-4 text-blue-400" />;
    }
    if (type === 'image') return <Image className="h-4 w-4 text-green-400" />;
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return <File className="h-4 w-4 text-blue-300" />;
    if (name.endsWith('.css')) return <File className="h-4 w-4 text-purple-400" />;
    if (name.endsWith('.json')) return <File className="h-4 w-4 text-yellow-400" />;
    return <FileText className="h-4 w-4 text-gray-400" />;
  };

  const renderTree = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index} className="select-none">
        <div
          className={cn(
            "flex items-center py-1 px-2 hover:bg-slate-700/50 cursor-pointer rounded-sm transition-colors",
            activeFile === item.name && "bg-slate-700 text-white",
            level > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.name);
            } else {
              onFileSelect(item.name);
            }
          }}
        >
          {item.type === 'folder' && (
            expandedFolders.includes(item.name) ? 
              <ChevronDown className="h-3 w-3 mr-1 text-gray-400" /> :
              <ChevronRight className="h-3 w-3 mr-1 text-gray-400" />
          )}
          {renderFileIcon(item.type, item.name)}
          {!collapsed && (
            <span className="ml-2 text-sm text-gray-300 truncate">
              {item.name}
            </span>
          )}
        </div>
        
        {item.children && expandedFolders.includes(item.name) && (
          <div className="ml-2">
            {renderTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={cn(
      "bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300",
      collapsed ? "w-12" : "w-64"
    )}>
      {!collapsed && (
        <div className="p-3 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-900 border-slate-600 text-gray-300 placeholder-gray-500"
            />
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto p-2">
        {renderTree(fileTree)}
      </div>
      
      {!collapsed && (
        <div className="p-3 border-t border-slate-700">
          <Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      )}
    </div>
  );
};
