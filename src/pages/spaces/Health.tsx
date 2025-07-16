import { Heart, Plus, Activity, Zap, Calendar, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Health() {
  const workouts = [
    {
      name: "Siłownia - Upper Body",
      date: "Dzisiaj",
      duration: "90 min",
      calories: 450,
      completed: true,
      exercises: ["Wyciskanie", "Wiosłowanie", "Martwy ciąg"]
    },
    {
      name: "Bieganie",
      date: "Wczoraj", 
      duration: "45 min",
      calories: 380,
      completed: true,
      exercises: ["5km tempo run"]
    },
    {
      name: "Siłownia - Legs",
      date: "Jutro",
      duration: "75 min",
      calories: null,
      completed: false,
      exercises: ["Przysiady", "Wykroki", "Łydki"]
    }
  ];

  const healthMetrics = [
    {
      name: "Kroki dzienne",
      current: 8450,
      target: 10000,
      unit: "kroków",
      icon: Activity,
      color: "text-blue-400"
    },
    {
      name: "Woda",
      current: 1.8,
      target: 2.5,
      unit: "L",
      icon: Zap,
      color: "text-cyan-400"
    },
    {
      name: "Sen",
      current: 7.5,
      target: 8,
      unit: "h",
      icon: Calendar,
      color: "text-purple-400"
    }
  ];

  const moodData = [
    { day: "Pon", mood: 8 },
    { day: "Wt", mood: 7 },
    { day: "Śr", mood: 9 },
    { day: "Czw", mood: 6 },
    { day: "Pt", mood: 8 },
    { day: "Sob", mood: 9 },
    { day: "Ndz", mood: 7 }
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Heart className="h-6 w-6 text-red-400" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Zdrowie & Sport</h1>
          </div>
          <p className="text-gianni-text-secondary">Śledź swoją aktywność i dbaj o dobre samopoczucie</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Health Metrics */}
          <div>
            <h2 className="text-xl font-medium text-gianni-text-primary mb-6">Dzisiejsze cele</h2>
            
            <div className="space-y-4">
              {healthMetrics.map((metric) => (
                <Card key={metric.name} className="bg-gianni-card border-border/50">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      <h3 className="font-medium text-gianni-text-primary">{metric.name}</h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gianni-text-secondary">
                          {metric.current} / {metric.target} {metric.unit}
                        </span>
                        <span className="text-gianni-text-primary">
                          {Math.round((metric.current / metric.target) * 100)}%
                        </span>
                      </div>
                      <Progress value={(metric.current / metric.target) * 100} className="h-2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mood Tracker */}
            <Card className="bg-gianni-card border-border/50 mt-6">
              <div className="p-4">
                <h3 className="font-medium text-gianni-text-primary mb-4">Nastrój w tym tygodniu</h3>
                <div className="flex justify-between items-end h-16">
                  {moodData.map((day) => (
                    <div key={day.day} className="flex flex-col items-center">
                      <div 
                        className="w-4 bg-gianni-orange rounded-t"
                        style={{ height: `${day.mood * 6}px` }}
                      />
                      <span className="text-xs text-gianni-text-secondary mt-1">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Workouts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gianni-text-primary">Plan treningowy</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nowy trening
              </Button>
            </div>

            <div className="space-y-4">
              {workouts.map((workout, index) => (
                <Card key={workout.name + index} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gianni-text-primary mb-1">{workout.name}</h3>
                        <p className="text-gianni-text-secondary text-sm">{workout.date}</p>
                      </div>
                      <Badge className={workout.completed ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                        {workout.completed ? 'Ukończone' : 'Zaplanowane'}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gianni-orange" />
                        <span className="text-sm text-gianni-text-secondary">
                          Czas: {workout.duration}
                        </span>
                      </div>
                      {workout.calories && (
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-gianni-orange" />
                          <span className="text-sm text-gianni-text-secondary">
                            {workout.calories} kcal
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-gianni-orange" />
                        <span className="text-sm text-gianni-text-secondary">
                          {workout.exercises.length} ćwiczeń
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gianni-text-primary mb-2">Ćwiczenia:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workout.exercises.map((exercise) => (
                          <Badge key={exercise} variant="outline" className="text-xs">
                            {exercise}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <TrendingUp className="h-3 w-3" />
                        {workout.completed ? 'Zobacz wyniki' : 'Rozpocznij'}
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Calendar className="h-3 w-3" />
                        Edytuj
                      </Button>
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