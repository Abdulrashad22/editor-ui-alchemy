import { useState } from "react";
import { Search, Plus, FolderOpen, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  author: string;
  status: 'completed' | 'building' | 'draft';
}

export const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "E-commerce Dashboard",
      description: "React dashboard with analytics and inventory management",
      lastModified: "2024-06-13",
      author: "AI Agent",
      status: "completed"
    },
    {
      id: "2", 
      name: "Blog Platform",
      description: "Full-stack blog with authentication and CMS",
      lastModified: "2024-06-12",
      author: "AI Agent",
      status: "completed"
    },
    {
      id: "3",
      name: "Task Manager",
      description: "Kanban-style project management tool",
      lastModified: "2024-06-11",
      author: "AI Agent",
      status: "building"
    }
  ]);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewProject = () => {
    navigate("/build");
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'building': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#fafffb] to-[#f9f5f6] text-slate-900 transition-colors">
      <div className="container mx-auto px-6 py-16 flex flex-col items-center">
        {/* HERO */}
        <div className="w-full max-w-xl text-center mb-14">
          <h1 className="text-[3.5rem] sm:text-6xl md:text-7xl font-serif font-extrabold mb-3 tracking-tight bg-gradient-to-br from-yellow-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow">
            Flash.io
          </h1>
          <p className="sm:text-xl md:text-2xl text-slate-600 font-medium mb-7 leading-relaxed">
            Instantly turn your idea into working code. 
          </p>
          <Button
            onClick={handleNewProject}
            className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-bold h-14 px-10 rounded-full shadow-2xl text-lg tracking-tight transition-all hover:scale-105"
          >
            <span className="mr-2">✨</span> Start New Project
          </Button>
        </div>
        {/* PROJECTS & SEARCH */}
        <div className="w-full max-w-3xl bg-white/50 shadow-lg rounded-3xl p-8 mb-8 border border-yellow-100 flex flex-col gap-4">
          <div className="relative mb-4">
            <Input
              placeholder="Find a project…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-lg shadow focus:ring-4 focus:ring-yellow-100"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-yellow-400" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-white border-2 border-yellow-50 hover:border-yellow-200 shadow-md p-5 hover:scale-[1.015] transition transform rounded-xl cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <FolderOpen className="h-6 w-6 text-yellow-400 mr-2" />
                    <h3 className="font-semibold text-lg text-slate-900">{project.name}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-slate-500 mb-1 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" /> {project.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> {project.lastModified}
                  </span>
                </div>
              </Card>
            ))}
            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-yellow-200 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-slate-400">No projects found</h3>
                <p className="text-slate-400">Try a different search or create a new project.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
