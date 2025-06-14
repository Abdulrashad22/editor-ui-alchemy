
import { useState } from "react";
import { Copy, Download, Share, MoreHorizontal, Eye, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import sdk from "@stackblitz/sdk";

interface CodeEditorProps {
  activeFile: string;
}

// Dummy code files map for simplicity/demo
const initialFiles: Record<string, string> = {
  "app.tsx": `import React, { useState } from 'react';
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

export default App;`,
  "index.css": `body {
  background: #f0e8ff;
  margin: 0;
  font-family: system-ui, sans-serif;
}
.App-header {
  font-size: 2rem;
  color: #460045;
}`,
  "package.json": `{
  "name": "codeforge-demo",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.0.0",
    "react-dom": "18.0.0"
  }
}`
};

export const CodeEditor = ({ activeFile }: CodeEditorProps) => {
  const [code, setCode] = useState(initialFiles[activeFile] || "");

  // Track all file contents in a local state (multi-file support for preview & clone)
  const [files, setFiles] = useState<Record<string, string>>(initialFiles);

  // When user clicks a tab, update code state
  const handleTabChange = (tabVal: string) => {
    setCode(files[tabVal] || "");
  };

  // Store edits back to files state -- (not implemented: textarea for editing code, but ready)
  // const handleCodeChange = (value: string) => {
  //   setCode(value);
  //   setFiles({ ...files, [activeFile]: value });
  // };

  // Copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code copied to clipboard!",
    });
  };

  // Download code as file
  const handleDownload = () => {
    const element = document.createElement("a");
    const fileBlob = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = activeFile;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Download",
      description: `${activeFile} downloaded!`,
    });
  };

  // Clone project: Download all code as zip
  const handleClone = async () => {
    const zip = new JSZip();
    Object.entries(files).forEach(([filename, contents]) => {
      zip.file(filename, contents);
    });
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "flashio-project.zip");
    toast({ title: "Cloned", description: "Project ZIP downloaded!" });
  };

  // Preview code in new StackBlitz tab (React starter)
  const handlePreview = async () => {
    sdk.openProject(
      {
        title: "Flash.io Demo Preview",
        description: "Live preview from Flash.io",
        template: "create-react-app",
        files: {
          "src/App.tsx": files["app.tsx"] || "",
          "src/index.css": files["index.css"] || "",
          "package.json": files["package.json"] || ""
        }
      },
      {
        openFile: "src/App.tsx" // Show primary file in preview
      }
    );
    // No toast: a new tab will open
  };

  // Share code on StackBlitz - generate and open new link
  const handleShare = async () => {
    sdk.openProject(
      {
        title: "Flash.io Demo Shared",
        description: "Complete project from Flash.io",
        template: "create-react-app",
        files: {
          "src/App.tsx": files["app.tsx"] || "",
          "src/index.css": files["index.css"] || "",
          "package.json": files["package.json"] || ""
        }
      },
      { openFile: "src/App.tsx" }
    );
    toast({ title: "Share", description: "Project shared on StackBlitz (opens in new tab)!" });
  };

  // More: Show a toast with available actions
  const handleMore = () => {
    toast({
      title: "More Options",
      description: "Preview, Download, Clone, and Share are fully usable on client.",
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700">
        <Tabs defaultValue={activeFile} className="flex-1" onValueChange={handleTabChange}>
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
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleCopy} title="Copy">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleDownload} title="Download">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleShare} title="Share (StackBlitz)">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handleClone} title="Clone (ZIP)">
            <GitBranch className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" onClick={handlePreview} title="Preview (StackBlitz)">
            <Eye className="h-4 w-4" />
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
              {Array.from({ length: code.split('\n').length }, (_, i) => (
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
