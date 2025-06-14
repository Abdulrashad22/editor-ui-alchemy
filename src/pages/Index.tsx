
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CodeEditor } from "@/components/CodeEditor";
import { Sidebar } from "@/components/Sidebar";
import { StatusBar } from "@/components/StatusBar";
import { FeaturePanel } from "@/components/FeaturePanel";

const Index = () => {
  const [activeFile, setActiveFile] = useState("app.tsx");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleFeatures={() => setShowFeatures(!showFeatures)}
      />
      
      {showFeatures ? (
        <div className="container mx-auto px-4 py-8">
          <Hero />
          <FeaturePanel />
        </div>
      ) : (
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar 
            collapsed={sidebarCollapsed}
            activeFile={activeFile}
            onFileSelect={setActiveFile}
          />
          
          <div className="flex-1 flex flex-col">
            <CodeEditor activeFile={activeFile} />
            <StatusBar activeFile={activeFile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
