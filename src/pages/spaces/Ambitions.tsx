import { Target, Plus, TrendingUp, Calendar, CheckCircle, Star, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Ambitions() {
  const goals = [
    {
      title: "Nauczyć się React Native",
      category: "Rozwój",
      progress: 65,
      deadline: "Marzec 2024",
      status: "in-progress",
      priority: "high",
      description: "Chcę stworzyć mobilną aplikację"
    },
    {
      title: "Przebiec maraton",
      category: "Sport",
      progress: 30,
      deadline: "Wrzesień 2024",
      status: "in-progress", 
      priority: "medium",
      description: "42km w czasie poniżej 4 godzin"
    },
    {
      title: "Założyć startup",
      category: "Kariera",
      progress: 15,
      deadline: "Grudzień 2024",
      status: "planning",
      priority: "high",
      description: "Aplikacja do zarządzania finansami"
    }
  ];

  const habits = [
    {
      name: "Czytanie przez 30 min",
      streak: 12,
      target: 30,
      todayCompleted: true,
      category: "Rozwój"
    },
    {
      name: "Medytacja 10 min",
      streak: 8,
      target: 21,
      todayCompleted: false,
      category: "Zdrowie"
    },
    {
      name: "Nauka nowego języka",
      streak: 25,
      target: 100,
      todayCompleted: true,
      category: "Rozwój"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Target className="h-6 w-6 text-purple-400" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Ambicje</h1>
          </div>
          <p className="text-gianni-text-secondary">Śledź swoje cele i rozwijaj pozytywne nawyki</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Goals */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gianni-text-primary">Cele długoterminowe</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nowy cel
              </Button>
            </div>

            <div className="space-y-4">
              {goals.map((goal) => (
                <Card key={goal.title} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gianni-text-primary mb-1">{goal.title}</h3>
                        <p className="text-gianni-text-secondary text-sm">{goal.description}</p>
                      </div>
                      <Badge className={
                        goal.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }>
                        {goal.priority === 'high' ? 'Priorytet' : goal.priority === 'medium' ? 'Średnie' : 'Niskie'}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gianni-text-secondary">Postęp</span>
                          <span className="text-gianni-text-primary">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gianni-orange" />
                          <span className="text-gianni-text-secondary">Do: {goal.deadline}</span>
                        </div>
                        <Badge variant="outline">{goal.category}</Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <TrendingUp className="h-3 w-3" />
                          Aktualizuj
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <BarChart3 className="h-3 w-3" />
                          Statystyki
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Habits */}
          <div>
            <h2 className="text-xl font-medium text-gianni-text-primary mb-6">Nawyki dzienne</h2>
            
            <div className="space-y-4">
              {habits.map((habit) => (
                <Card key={habit.name} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gianni-text-primary mb-1">{habit.name}</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm text-gianni-text-secondary">
                            Seria: {habit.streak} dni
                          </span>
                        </div>
                      </div>
                      <button 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          habit.todayCompleted 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-border hover:border-gianni-orange'
                        }`}
                      >
                        {habit.todayCompleted && <CheckCircle className="h-4 w-4 text-white" />}
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gianni-text-secondary">Cel: {habit.target} dni</span>
                          <span className="text-gianni-text-primary">{Math.round((habit.streak / habit.target) * 100)}%</span>
                        </div>
                        <Progress value={(habit.streak / habit.target) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{habit.category}</Badge>
                        <span className="text-xs text-gianni-text-secondary">
                          {habit.target - habit.streak} dni do celu
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button className="w-full mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Dodaj nawyk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}