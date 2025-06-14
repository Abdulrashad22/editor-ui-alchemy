import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface AgentAction {
  id: string;
  title: string;
  description: string;
  status: 'ongoing' | 'todo' | 'finished';
  timestamp?: string;
}

export const ProjectBuilder = () => {
  const navigate = useNavigate();
  const [projectPrompt, setProjectPrompt] = useState("");
  const [isBuilding, setIsBuilding] = useState(false);
  const [actions, setActions] = useState<AgentAction[]>([]);

  const handleStartBuilding = () => {
    if (!projectPrompt.trim()) return;
    
    setIsBuilding(true);
    
    // Simulate AI agent actions
    const initialActions: AgentAction[] = [
      {
        id: "1",
        title: "Analyzing project requirements",
        description: "Understanding the scope and technical requirements",
        status: "ongoing"
      },
      {
        id: "2",
        title: "Setting up project structure",
        description: "Creating folder hierarchy and initial files",
        status: "todo"
      },
      {
        id: "3",
        title: "Installing dependencies",
        description: "Adding required packages and libraries",
        status: "todo"
      },
      {
        id: "4",
        title: "Generating components",
        description: "Creating React components based on requirements",
        status: "todo"
      },
      {
        id: "5",
        title: "Implementing business logic",
        description: "Adding functionality and data handling",
        status: "todo"
      },
      {
        id: "6",
        title: "Styling and UI polish",
        description: "Applying design system and responsive layouts",
        status: "todo"
      }
    ];

    setActions(initialActions);
    
    // Simulate progression
    simulateProgress(initialActions);
  };

  const simulateProgress = (initialActions: AgentAction[]) => {
    let currentIndex = 0;
    
    const progressInterval = setInterval(() => {
      if (currentIndex < initialActions.length) {
        setActions(prev => prev.map((action, index) => {
          if (index === currentIndex) {
            return { ...action, status: 'finished', timestamp: new Date().toLocaleTimeString() };
          } else if (index === currentIndex + 1) {
            return { ...action, status: 'ongoing' };
          }
          return action;
        }));
        
        currentIndex++;
      } else {
        clearInterval(progressInterval);
        setIsBuilding(false);
        // Navigate to project view after completion
        setTimeout(() => {
          navigate('/project/new');
        }, 2000);
      }
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing': return <Play className="h-4 w-4 text-yellow-400 animate-pulse" />;
      case 'finished': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'todo': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'border-yellow-400 bg-yellow-400/10';
      case 'finished': return 'border-green-400 bg-green-400/10';
      case 'todo': return 'border-gray-600 bg-slate-800';
      default: return 'border-gray-600 bg-slate-800';
    }
  };

  const filterActionsByStatus = (status: string) => {
    return actions.filter(action => action.status === status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-yellow-50 to-pink-100 text-slate-900">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-yellow-500 hover:text-slate-900 mb-4 hover:bg-yellow-100"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Projects
          </Button>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            AI Project Builder
          </h1>
          <p className="text-gray-500 text-lg">
            Describe your project and let Flash.io build it for you.
          </p>
        </div>

        {/* INPUT CARD */}
        {!isBuilding && actions.length === 0 && (
          <div className="max-w-xl mx-auto">
            <Card className="bg-white/70 border-yellow-100 p-8 shadow-xl">
              <h2 className="text-lg font-semibold mb-3 text-yellow-500">What do you want to build?</h2>
              <Input
                placeholder="E.g. Blogging platform, dashboard, portfolio site…"
                value={projectPrompt}
                onChange={(e) => setProjectPrompt(e.target.value)}
                className="bg-white border-slate-200 text-slate-900 placeholder-gray-400 mb-4"
              />
              <Button
                onClick={handleStartBuilding}
                disabled={!projectPrompt.trim()}
                className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-semibold rounded-lg text-lg transition-all py-3"
              >
                <Play className="h-5 w-5 mr-1" /> Start Building
              </Button>
            </Card>
          </div>
        )}

        {/* STEPPER-LIKE STATUS BOARD */}
        {(isBuilding || actions.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Ongoing */}
            <div>
              <h2 className="text-base font-semibold mb-4 text-yellow-500">Ongoing Action</h2>
              <div className="space-y-3">
                {filterActionsByStatus('ongoing').map((action) => (
                  <Card key={action.id} className={`p-4 border-2 border-yellow-300 bg-yellow-50/60`}>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(action.status)}
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-xs text-yellow-800 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            {/* TODO */}
            <div>
              <h2 className="text-base font-semibold mb-4 text-pink-500">To-Do</h2>
              <div className="space-y-3">
                {filterActionsByStatus('todo').map((action) => (
                  <Card key={action.id} className="p-4 border-2 border-pink-200 bg-pink-50/60">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(action.status)}
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-xs text-pink-800 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            {/* FINISHED */}
            <div>
              <h2 className="text-base font-semibold mb-4 text-green-500">Finished</h2>
              <div className="space-y-3">
                {filterActionsByStatus('finished').map((action) => (
                  <Card key={action.id} className="p-4 border-2 border-green-200 bg-green-50/60">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(action.status)}
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-xs text-green-800 mt-1">{action.description}</p>
                        {action.timestamp && (
                          <p className="text-xs text-green-400 mt-1">Completed at {action.timestamp}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
