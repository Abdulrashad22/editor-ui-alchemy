
import { useState } from "react";
import { MessageCircle, GitBranch, Download, Eye, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { CodeEditor } from "@/components/CodeEditor";
import { StatusBar } from "@/components/StatusBar";

export const ProjectView = () => {
  const [activeFile, setActiveFile] = useState("app.tsx");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: "1",
      sender: "AI Agent",
      message: "Project successfully created! I've set up a React application with TypeScript and Tailwind CSS. What would you like to modify?",
      timestamp: "10:30 AM"
    }
  ]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: "You",
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: "AI Agent",
        message: "I'll help you with that! Let me make the necessary changes to your project.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Task Manager Project
            </h1>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <GitBranch className="h-4 w-4" />
              <span>main</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" />
              Clone
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              AI Chat
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] relative">
        <Sidebar 
          collapsed={sidebarCollapsed}
          activeFile={activeFile}
          onFileSelect={setActiveFile}
        />
        
        <div className="flex-1 flex flex-col">
          <CodeEditor activeFile={activeFile} />
          <StatusBar activeFile={activeFile} />
        </div>

        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-slate-800 border-l border-slate-700 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {chatHistory.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'You' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-700 text-gray-300'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask the AI agent..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
