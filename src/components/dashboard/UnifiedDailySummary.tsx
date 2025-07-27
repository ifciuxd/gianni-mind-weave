import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Sun, 
  Calendar, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Heart,
  Clock,
  Battery,
  Brain,
  CheckCircle,
  AlertTriangle,
  Star
} from "lucide-react";
import { getTimeBasedGreeting } from "@/lib/greetings";

export function UnifiedDailySummary() {
  const currentTime = new Date().toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const currentDate = new Date().toLocaleDateString('pl-PL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Unified data from all spaces
  const dailyMetrics = {
    energy: 75,
    focus: 68,
    mood: 85,
    productivity: 72,
    goalProgress: 45,
    budgetUsage: 67
  };

  const todayHighlights = [
    { space: "Praca", event: "Prezentacja projektu", time: "14:00", status: "upcoming", icon: Target },
    { space: "Zdrowie", event: "Trening siłowy", time: "18:30", status: "planned", icon: Heart },
    { space: "Finanse", event: "Zapłata za media", time: "Do 16:00", status: "pending", icon: DollarSign },
    { space: "Uczelnia", event: "Deadline essay", time: "23:59", status: "critical", icon: AlertTriangle },
  ];

  const aiInsights = [
    "Na podstawie Twoich wzorców, najlepszą porą na kreatywną pracę jest przedpołudnie",
    "Wydatki w tym tygodniu są o 23% niższe niż zwykle - świetna robota!",
    "Twój poziom energii jest najwyższy po treningach - zaplanuj ważne zadania na ten czas"
  ];

  const quickStats = [
    { label: "Zadania dziś", value: "7/12", color: "text-blue-400" },
    { label: "Budżet dzienny", value: "67/100zł", color: "text-emerald-400" },
    { label: "Kroki", value: "8.2k", color: "text-purple-400" },
    { label: "Focus time", value: "4.2h", color: "text-orange-400" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header with time and greeting */}
      <Card className="bg-gradient-orange border-border overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <CardContent className="p-8 relative z-10">
          
          {/* Daily metrics */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: "Energia", value: dailyMetrics.energy, icon: Battery, color: "text-green-300" },
              { label: "Focus", value: dailyMetrics.focus, icon: Brain, color: "text-blue-300" },
              { label: "Nastrój", value: dailyMetrics.mood, icon: Star, color: "text-yellow-300" },
              { label: "Produktywność", value: dailyMetrics.productivity, icon: TrendingUp, color: "text-purple-300" },
              { label: "Cele", value: dailyMetrics.goalProgress, icon: Target, color: "text-red-300" },
              { label: "Budżet", value: dailyMetrics.budgetUsage, icon: DollarSign, color: "text-emerald-300" },
            ].map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="flex items-center justify-center mb-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {metric.value}%
                </div>
                <div className="text-xs text-white/70">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Today's Schedule */}
        <Card className="bg-gianni-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
              <Calendar className="h-5 w-5" />
              Harmonogram dnia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayHighlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gianni-card-hover">
                <div className={`p-2 rounded-lg ${
                  item.status === 'critical' ? 'bg-red-500/20' :
                  item.status === 'upcoming' ? 'bg-blue-500/20' :
                  item.status === 'pending' ? 'bg-orange-500/20' :
                  'bg-green-500/20'
                }`}>
                  <item.icon className={`h-4 w-4 ${
                    item.status === 'critical' ? 'text-red-400' :
                    item.status === 'upcoming' ? 'text-blue-400' :
                    item.status === 'pending' ? 'text-orange-400' :
                    'text-green-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gianni-text-primary">{item.event}</p>
                  <p className="text-sm text-gianni-text-secondary">{item.space}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gianni-text-primary">{item.time}</p>
                  <Badge variant={
                    item.status === 'critical' ? 'destructive' :
                    item.status === 'upcoming' ? 'default' :
                    'secondary'
                  } className="text-xs">
                    {item.status === 'critical' ? 'Pilne' :
                     item.status === 'upcoming' ? 'Nadchodzi' :
                     item.status === 'pending' ? 'Oczekuje' :
                     'Zaplanowane'}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              <Calendar className="h-4 w-4 mr-2" />
              Zobacz pełny kalendarz
            </Button>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gianni-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
              <Brain className="h-5 w-5" />
              Inteligentne spostrzeżenia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg bg-gianni-card-hover border-l-4 border-gianni-orange">
                <p className="text-sm text-gianni-text-secondary">
                  {insight}
                </p>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-gianni-text-primary mb-3">Dzisiejsze statystyki</h4>
              <div className="grid grid-cols-2 gap-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gianni-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}