import { Briefcase, Plus, Clock, CheckCircle, AlertCircle, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Work() {
  const projects = [
    {
      name: "E-commerce Dashboard",
      client: "TechStart Inc.",
      progress: 85,
      deadline: "20 stycznia",
      status: "in-progress",
      hoursWorked: 45,
      estimatedHours: 60,
      priority: "high"
    },
    {
      name: "Mobile App Redesign",
      client: "Creative Agency",
      progress: 60,
      deadline: "5 lutego",
      status: "in-progress", 
      hoursWorked: 28,
      estimatedHours: 50,
      priority: "medium"
    },
    {
      name: "Website Optimization",
      client: "Local Business",
      progress: 100,
      deadline: "Zakończony",
      status: "completed",
      hoursWorked: 25,
      estimatedHours: 25,
      priority: "completed"
    }
  ];

  const todayTasks = [
    {
      title: "Implementacja systemu płatności",
      project: "E-commerce Dashboard",
      estimatedTime: "3h",
      priority: "high",
      completed: false
    },
    {
      title: "Code review dla team lead",
      project: "Mobile App Redesign", 
      estimatedTime: "1h",
      priority: "medium",
      completed: false
    },
    {
      title: "Dokumentacja API",
      project: "E-commerce Dashboard",
      estimatedTime: "2h", 
      priority: "low",
      completed: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'in-progress': return 'bg-green-600/20 text-green-600';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background font-helvetica">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gianni-orange/20 rounded-lg">
              <Briefcase className="h-6 w-6 text-gianni-orange" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Praca</h1>
          </div>
          <p className="text-gianni-text-secondary">Zarządzaj projektami i rozwojem zawodowym</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gianni-text-primary">Projekty</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nowy projekt
              </Button>
            </div>

            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.name} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gianni-text-primary mb-1">{project.name}</h3>
                        <p className="text-gianni-text-secondary text-sm">{project.client}</p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status === 'completed' ? 'Zakończony' : 'W trakcie'}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gianni-text-secondary">Postęp</span>
                          <span className="text-gianni-text-primary">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gianni-text-secondary">Przepracowane: </span>
                          <span className="text-gianni-text-primary">{project.hoursWorked}h</span>
                        </div>
                        <div>
                          <span className="text-gianni-text-secondary">Szacowane: </span>
                          <span className="text-gianni-text-primary">{project.estimatedHours}h</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gianni-orange" />
                          <span className="text-sm text-gianni-text-secondary">
                            Termin: {project.deadline}
                          </span>
                        </div>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority === 'high' ? 'Pilne' : project.priority === 'medium' ? 'Średnie' : 'Niskie'}
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <BarChart className="h-3 w-3" />
                          Szczegóły
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Clock className="h-3 w-3" />
                          Śledź czas
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Today's Tasks */}
          <div>
            <h2 className="text-xl font-medium text-gianni-text-primary mb-6">Dzisiejsze zadania</h2>
            
            <div className="space-y-4">
              {todayTasks.map((task, index) => (
                <Card key={task.title} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <button 
                        className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          task.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-border hover:border-gianni-orange'
                        }`}
                      >
                        {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                      </button>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium mb-1 ${
                          task.completed 
                            ? 'text-gianni-text-secondary line-through' 
                            : 'text-gianni-text-primary'
                        }`}>
                          {task.title}
                        </h3>
                        <p className="text-gianni-text-secondary text-xs mb-2">{task.project}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 text-gianni-orange" />
                            <span className="text-xs text-gianni-text-secondary">{task.estimatedTime}</span>
                          </div>
                          <Badge className={getPriorityColor(task.priority)} style={{ fontSize: '10px', padding: '2px 6px' }}>
                            {task.priority === 'high' ? 'Pilne' : task.priority === 'medium' ? 'Średnie' : 'Niskie'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button className="w-full mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Dodaj zadanie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}