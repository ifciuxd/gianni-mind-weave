import { GraduationCap, Plus, Calendar, Book, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function University() {
  const subjects = [
    {
      name: "Algorytmy i Struktury Danych",
      code: "ASD",
      nextClass: "Jutro 09:00",
      grade: 4.5,
      progress: 75,
      assignments: 2,
      color: "bg-green-500/20 text-green-400"
    },
    {
      name: "Matematyka Dyskretna", 
      code: "MD",
      nextClass: "Środa 11:00",
      grade: 4.0,
      progress: 60,
      assignments: 3,
      color: "bg-green-600/20 text-green-600"
    },
    {
      name: "Bazy Danych",
      code: "BD",
      nextClass: "Piątek 13:00",
      grade: 5.0,
      progress: 90,
      assignments: 1,
      color: "bg-purple-500/20 text-purple-400"
    }
  ];

  const upcomingDeadlines = [
    {
      title: "Projekt z Algorytmów - implementacja",
      subject: "ASD",
      dueDate: "15 stycznia",
      priority: "high",
      daysLeft: 3
    },
    {
      title: "Sprawozdanie z laboratorium BD",
      subject: "BD", 
      dueDate: "20 stycznia",
      priority: "medium",
      daysLeft: 8
    },
    {
      title: "Kolokwium z Matematyki Dyskretnej",
      subject: "MD",
      dueDate: "25 stycznia", 
      priority: "high",
      daysLeft: 13
    }
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-400" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Uczelnia</h1>
          </div>
          <p className="text-gianni-text-secondary">Zarządzaj studiami i projektami akademickimi</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subjects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gianni-text-primary">Przedmioty</h2>
              <Button size="sm" className="gap-2">
                <Plus className="h-3 w-3" />
                Dodaj przedmiot
              </Button>
            </div>

            <div className="space-y-4">
              {subjects.map((subject) => (
                <Card key={subject.code} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gianni-text-primary mb-1">{subject.name}</h3>
                        <p className="text-gianni-text-secondary text-sm">{subject.code}</p>
                      </div>
                      <Badge className={subject.color}>
                        Ocena: {subject.grade}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gianni-orange" />
                        <span className="text-gianni-text-secondary">Następne zajęcia: {subject.nextClass}</span>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gianni-text-secondary">Postęp semestru</span>
                          <span className="text-gianni-text-primary">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Book className="h-4 w-4 text-gianni-orange" />
                          <span className="text-sm text-gianni-text-secondary">
                            {subject.assignments} zadań do oddania
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Szczegóły
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <h2 className="text-xl font-medium text-gianni-text-primary mb-6">Nadchodzące terminy</h2>
            
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <Card key={deadline.title} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-gianni-text-primary">{deadline.title}</h3>
                      <Badge 
                        className={deadline.priority === 'high' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                        }
                      >
                        {deadline.priority === 'high' ? 'Pilne' : 'Średnie'}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Book className="h-4 w-4 text-gianni-orange" />
                        <span className="text-gianni-text-secondary">{deadline.subject}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gianni-orange" />
                        <span className="text-gianni-text-secondary">Termin: {deadline.dueDate}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-gianni-text-primary">
                          Zostało {deadline.daysLeft} dni
                        </span>
                        <Button variant="outline" size="sm" className="gap-2">
                          <CheckCircle className="h-3 w-3" />
                          Oznacz jako gotowe
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}