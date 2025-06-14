import { useState } from "react";
import { MessageCircle, GitBranch, Download, Eye, X, Send, Slash } from "lucide-react";
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
      message: "Project created! Flash.io is ready for your commands. What would you like to build next?",
      timestamp: "9:00 AM"
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
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: "AI Agent",
        message: "I'll handle that for you – Flash.io is on it!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf8f2] via-[#fef9fb] to-[#f9f6fc] text-slate-900">
      <header className="bg-white/95 border-b border-yellow-100 px-8 py-3 shadow-lg z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-1">
              <Slash className="h-8 w-8 text-yellow-500 drop-shadow" />
              <span className="font-serif text-2xl font-bold tracking-tight bg-gradient-to-r from-yellow-600 to-pink-500 bg-clip-text text-transparent">
                Flash.io
              </span>
            </span>
            <div className="flex items-center space-x-1 text-sm text-slate-400 ml-4">
              <GitBranch className="h-4 w-4" />
              <span>main</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-100 rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Clone
            </Button>
            <Button variant="ghost" size="sm" className="text-pink-500 hover:text-pink-600 hover:bg-pink-100 rounded-full">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full"
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
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur py-4">
          <CodeEditor activeFile={activeFile} />
          <StatusBar activeFile={activeFile} />
        </div>
        {/* Chat Panel */}
        {showChat && (
          <div className="w-80 bg-white border-l border-yellow-100 shadow-2xl flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-yellow-100 bg-gradient-to-r from-yellow-50 to-pink-50">
              <h3 className="font-semibold text-slate-900">AI Assistant</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-slate-400 hover:text-slate-900"
                aria-label="Close Chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {chatHistory.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg transition ${
                    message.sender === 'You' 
                      ? 'bg-yellow-300/95 text-slate-900 font-semibold shadow'
                      : 'bg-yellow-100 text-slate-700 shadow-inner'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-50 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-yellow-100 bg-yellow-50">
              <div className="flex gap-2">
                <Input
                  placeholder="Chat with Flash.io AI…"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-white border-yellow-200 text-slate-900 placeholder:text-slate-400"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-yellow-400 hover:bg-yellow-500 text-white"
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
