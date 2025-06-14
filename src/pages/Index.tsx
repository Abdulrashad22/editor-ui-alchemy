
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CodeEditor } from "@/components/CodeEditor";
import { Sidebar } from "@/components/Sidebar";
import { StatusBar } from "@/components/StatusBar";
import { FeaturePanel } from "@/components/FeaturePanel";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [activeFile, setActiveFile] = useState("app.tsx");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18122B] via-[#DBCDF0] to-[#D6D6F5] text-slate-900 font-serif">
      <Header 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onToggleFeatures={() => setShowFeatures(!showFeatures)}
      />
      {showFeatures ? (
        <div className="container mx-auto px-4 py-16">
          <div className="mb-14 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-600 bg-clip-text text-transparent mb-3 drop-shadow-lg tracking-tight">
              Welcome to Flash.io
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium mb-6 max-w-2xl mx-auto">
              Build apps instantly with an AI-powered code editor. Creativity powered by simplicity.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-bold h-14 px-10 rounded-full shadow-xl text-xl transition-all hover:scale-105"
              onClick={() => setShowFeatures(false)}
            >
              <span className="mr-2">🚀</span>Start Exploring
            </Button>
          </div>
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
          <div className="flex-1 flex flex-col bg-white/40">
            <CodeEditor activeFile={activeFile} />
            <StatusBar activeFile={activeFile} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
