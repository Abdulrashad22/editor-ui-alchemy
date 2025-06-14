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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-indigo-100 text-slate-900 transition-colors">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-10">
          <h1 className="text-5xl font-serif font-extrabold mb-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent tracking-tight drop-shadow">
            Flash.io
          </h1>
          <p className="text-slate-500 text-lg font-medium">Build apps instantly — powered by AI</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-yellow-400" />
            <Input
              placeholder="Find a project…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-lg shadow"
            />
          </div>
          <Button
            onClick={handleNewProject}
            className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-bold h-12 px-8 rounded-lg shadow-lg transition-all"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-white border-2 border-yellow-50 hover:border-yellow-200 shadow-lg p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <FolderOpen className="h-7 w-7 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">{project.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-500 mb-3 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {project.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {project.lastModified}
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 text-yellow-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No projects found</h3>
            <p className="text-slate-400">Try a different search or create a new project.</p>
          </div>
        )}
      </div>
    </div>
  );
};
