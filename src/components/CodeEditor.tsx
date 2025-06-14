
import { useState } from "react";
import { Copy, Download, Share, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface CodeEditorProps {
  activeFile: string;
}

export const CodeEditor = ({ activeFile }: CodeEditorProps) => {
  const [code, setCode] = useState(`import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CodeForge</h1>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </header>
    </div>
  );
}

export default App;`);

  // Copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code copied to clipboard!",
    });
  };

  // Download code as file (simulate)
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = activeFile;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Download",
      description: "Code file downloaded for editing!",
    });
  };

  // Share code
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Code sharing feature coming soon!",
    });
  };

  // More menu
  const handleMore = () => {
    toast({
      title: "More Options",
      description: "More features will be added soon!",
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
        <Tabs defaultValue={activeFile} className="flex-1">
          <TabsList className="bg-slate-900">
            <TabsTrigger value="app.tsx" className="data-[state=active]:bg-slate-700">
              app.tsx
            </TabsTrigger>
            <TabsTrigger value="index.css" className="data-[state=active]:bg-slate-700">
              index.css
            </TabsTrigger>
            <TabsTrigger value="package.json" className="data-[state=active]:bg-slate-700">
              package.json
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleMore}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-slate-900">
          <div className="flex h-full">
            <div className="w-12 bg-slate-800 flex flex-col items-center py-4 text-sm text-gray-500 font-mono">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i + 1} className="h-6 flex items-center">
                  {i + 1}
                </div>
              ))}
            </div>
            
            <div className="flex-1 p-4 overflow-auto">
              <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                <code>
                  {code.split('\n').map((line, i) => (
                    <div key={i} className="hover:bg-slate-800/50 px-2 -mx-2 rounded">
                      {line.split(/(\bimport\b|\bfrom\b|\bfunction\b|\bconst\b|\breturn\b|\bexport\b)/).map((part, j) => (
                        <span
                          key={j}
                          className={
                            ['import', 'from', 'function', 'const', 'return', 'export'].includes(part)
                              ? 'text-purple-400'
                              : part.startsWith("'") || part.startsWith('"')
                              ? 'text-green-400'
                              : part.includes('App') || part.includes('React')
                              ? 'text-blue-400'
                              : ''
                          }
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
