
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Code Builder
          </h1>
          <p className="text-gray-400 text-lg">
            Create applications with natural language prompts
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-gray-400 h-12"
            />
          </div>
          
          <Button
            onClick={handleNewProject}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 px-6"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-slate-800 border-slate-700 p-6 cursor-pointer hover:bg-slate-700 transition-all duration-300 hover:scale-105"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <FolderOpen className="h-8 w-8 text-purple-400 mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg text-white">{project.name}</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
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
            <FolderOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new project</p>
          </div>
        )}
      </div>
    </div>
  );
};
