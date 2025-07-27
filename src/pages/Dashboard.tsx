import { useState } from "react";
import { BarChart3, TrendingUp, Users, Target, DollarSign, Calendar, Activity, Brain, Zap, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";

const Dashboard = () => {
  // Mock data for analytics
  const productivityData = [
    { day: "Pon", productivity: 85, focus: 78, energy: 82 },
    { day: "Wt", productivity: 72, focus: 85, energy: 75 },
    { day: "Śr", productivity: 91, focus: 88, energy: 90 },
    { day: "Czw", productivity: 78, focus: 72, energy: 80 },
    { day: "Pt", productivity: 65, focus: 60, energy: 70 },
    { day: "Sob", productivity: 45, focus: 40, energy: 85 },
    { day: "Nie", productivity: 55, focus: 50, energy: 88 },
  ];

  const lifeSpaceActivity = [
    { space: "Praca", hours: 42, color: "#FF8000" },
    { space: "Uczelnia", hours: 28, color: "#22C55E" },
    { space: "Znajomi", hours: 18, color: "#3B82F6" },
    { space: "Zdrowie", hours: 12, color: "#EF4444" },
    { space: "Finanse", hours: 8, color: "#10B981" },
    { space: "Ambicje", hours: 15, color: "#8B5CF6" },
  ];

  const moodData = [
    { date: "01/01", mood: 8, stress: 3, motivation: 7 },
    { date: "01/02", mood: 7, stress: 4, motivation: 8 },
    { date: "01/03", mood: 9, stress: 2, motivation: 9 },
    { date: "01/04", mood: 6, stress: 6, motivation: 6 },
    { date: "01/05", mood: 8, stress: 3, motivation: 8 },
    { date: "01/06", mood: 7, stress: 4, motivation: 7 },
    { date: "01/07", mood: 9, stress: 2, motivation: 9 },
  ];

  const aiInsights = [
    {
      type: "productivity",
      insight: "Twoja wydajność jest o 23% wyższa w środy. Planuj ważne zadania na ten dzień.",
      confidence: 87,
      icon: Brain,
      color: "text-purple-400"
    },
    {
      type: "health",
      insight: "Regularne treningi poprawiły Twój poziom energii o 15% w tym tygodniu.",
      confidence: 92,
      icon: Activity,
      color: "text-emerald-400"
    },
    {
      type: "finance",
      insight: "Wydatki na jedzenie wzrosły o 18%. Rozważ meal prep na następny tydzień.",
      confidence: 78,
      icon: DollarSign,
      color: "text-blue-400"
    },
    {
      type: "time",
      insight: "Najproduktywniejsze godziny: 9:00-11:00 i 14:00-16:00. Zaplanuj fokus-work w tych przedziałach.",
      confidence: 91,
      icon: Clock,
      color: "text-orange-400"
    }
  ];

  const weeklyStats = {
    totalProductivity: 73,
    focusTime: 28,
    energyLevel: 79,
    goalCompletion: 67
  };

  const upcomingGoals = [
    { name: "Ukończ projekt React", deadline: "3 dni", progress: 78, priority: "high" },
    { name: "Przygotuj się do egzaminu", deadline: "1 tydzień", progress: 45, priority: "medium" },
    { name: "Oszczędź 1000 zł", deadline: "2 tygodnie", progress: 62, priority: "low" },
    { name: "Przebiegaj 50km", deadline: "5 dni", progress: 84, priority: "high" },
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      {/* Header */}
      <div className="border-b border-border bg-gianni-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light text-gianni-text-primary tracking-tight">
                Analytics Dashboard
              </h1>
              <p className="text-gianni-text-secondary mt-2">
                Kompleksowa analiza Twojego życia z AI insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-gianni-orange border-gianni-orange">
                <Zap className="h-3 w-3 mr-1" />
                AI Aktywne
              </Badge>
              <span className="text-sm text-gianni-text-secondary">
                Ostatnia aktualizacja: {new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Weekly Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Wydajność</CardTitle>
              <BarChart3 className="h-4 w-4 text-gianni-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">{weeklyStats.totalProductivity}%</div>
              <Progress value={weeklyStats.totalProductivity} className="mt-2" />
              <p className="text-xs text-emerald-400 flex items-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% vs. poprzedni tydzień
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Czas fokusa</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">{weeklyStats.focusTime}h</div>
              <Progress value={(weeklyStats.focusTime / 40) * 100} className="mt-2" />
              <p className="text-xs text-gianni-text-secondary mt-2">
                Cel: 40h tygodniowo
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Poziom energii</CardTitle>
              <Activity className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">{weeklyStats.energyLevel}%</div>
              <Progress value={weeklyStats.energyLevel} className="mt-2" />
              <p className="text-xs text-emerald-400 flex items-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs. poprzedni tydzień
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Realizacja celów</CardTitle>
              <Target className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">{weeklyStats.goalCompletion}%</div>
              <Progress value={weeklyStats.goalCompletion} className="mt-2" />
              <p className="text-xs text-gianni-text-secondary mt-2">
                8/12 celów ukończonych
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Productivity Trends */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary">Trendy wydajności</CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Analiza wydajności, fokusa i energii w ciągu tygodnia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                productivity: { label: "Wydajność", color: "hsl(var(--gianni-orange))" },
                focus: { label: "Fokus", color: "#3B82F6" },
                energy: { label: "Energia", color: "#10B981" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={productivityData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="productivity" 
                      stackId="1"
                      stroke="hsl(var(--gianni-orange))" 
                      fill="hsl(var(--gianni-orange))"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="focus" 
                      stackId="2"
                      stroke="#3B82F6" 
                      fill="#3B82F6"
                      fillOpacity={0.3}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stackId="3"
                      stroke="#10B981" 
                      fill="#10B981"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Life Space Time Allocation */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary">Alokacja czasu</CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Jak spędzasz czas w różnych przestrzeniach życia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lifeSpaceActivity} layout="horizontal">
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="space" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="hours" fill="hsl(var(--gianni-orange))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights & Mood Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Insights */}
          <Card className="lg:col-span-2 bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary flex items-center">
                <Brain className="h-5 w-5 mr-2 text-gianni-orange" />
                AI Insights & Rekomendacje
              </CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Personalizowane spostrzeżenia oparte na Twoich danych
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gianni-dark border border-border">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg bg-opacity-20 ${insight.color}`}>
                        <insight.icon className={`h-5 w-5 ${insight.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gianni-text-primary text-sm leading-relaxed">
                          {insight.insight}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <Badge variant="outline" className="text-xs">
                            {insight.type}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gianni-text-secondary">Pewność:</span>
                            <Badge variant="secondary" className="text-xs">
                              {insight.confidence}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mood & Goals */}
          <div className="space-y-6">
            {/* Mood Tracking */}
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Nastrój & samopoczucie</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  mood: { label: "Nastrój", color: "#10B981" },
                  stress: { label: "Stres", color: "#EF4444" },
                  motivation: { label: "Motywacja", color: "#3B82F6" }
                }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="motivation" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Upcoming Goals */}
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Nadchodzące cele</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gianni-text-primary">{goal.name}</span>
                        <Badge 
                          variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {goal.deadline}
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gianni-text-secondary">{goal.progress}%</span>
                        <span className={`
                          ${goal.priority === 'high' ? 'text-red-400' : 
                            goal.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'}
                        `}>
                          {goal.priority === 'high' ? 'Wysoki' : 
                           goal.priority === 'medium' ? 'Średni' : 'Niski'} priorytet
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;