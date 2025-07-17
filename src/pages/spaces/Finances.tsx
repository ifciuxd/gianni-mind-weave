import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Target, CreditCard, PiggyBank, Receipt, BarChart3, Calendar, Plus, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts";

const Finances = () => {
  // Mock data for charts
  const expenseData = [
    { month: "Sty", wydatki: 2400, przychód: 3200 },
    { month: "Lut", wydatki: 1800, przychód: 3200 },
    { month: "Mar", wydatki: 2200, przychód: 3200 },
    { month: "Kwi", wydatki: 2800, przychód: 3400 },
    { month: "Maj", wydatki: 2600, przychód: 3400 },
    { month: "Cze", wydatki: 3100, przychód: 3400 },
  ];

  const categoryData = [
    { name: "Jedzenie", value: 1200, color: "#FF6B6B" },
    { name: "Transport", value: 450, color: "#4ECDC4" },
    { name: "Rozrywka", value: 680, color: "#45B7D1" },
    { name: "Rachunki", value: 800, color: "#96CEB4" },
    { name: "Inne", value: 370, color: "#FFEAA7" },
  ];

  const predictionData = [
    { month: "Lip", predicted: 2900, actual: null },
    { month: "Sie", predicted: 3200, actual: null },
    { month: "Wrz", predicted: 2700, actual: null },
    { month: "Paź", predicted: 3000, actual: null },
  ];

  const savingsGoals = [
    { name: "Nowy laptop", current: 2800, target: 4500, progress: 62 },
    { name: "Wakacje", current: 1200, target: 2000, progress: 60 },
    { name: "Fundusz awaryjny", current: 5500, target: 10000, progress: 55 },
  ];

  const recentTransactions = [
    { id: 1, description: "Kaufland", amount: -89.50, category: "Jedzenie", date: "2024-01-15" },
    { id: 2, description: "Spotify Premium", amount: -19.99, category: "Rozrywka", date: "2024-01-14" },
    { id: 3, description: "Przelew od rodziców", amount: 500.00, category: "Przychód", date: "2024-01-14" },
    { id: 4, description: "Uber", amount: -24.30, category: "Transport", date: "2024-01-13" },
    { id: 5, description: "McDonald's", amount: -18.90, category: "Jedzenie", date: "2024-01-13" },
  ];

  const monthlyBudget = {
    total: 3200,
    spent: 2450,
    remaining: 750,
    progress: 76
  };

  return (
    <div className="min-h-screen bg-background font-helvetica">
      {/* Header */}
      <div className="border-b border-border bg-gianni-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light text-gianni-text-primary tracking-tight">
                Finanse
              </h1>
              <p className="text-gianni-text-secondary mt-2">
                Pełna kontrola nad Twoimi finansami
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Receipt className="h-5 w-5 mr-2" />
                Skanuj paragon
              </Button>
              <Button variant="gianni-premium" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Dodaj wydatek
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Saldo</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">8,450 zł</div>
              <p className="text-xs text-emerald-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% vs. poprzedni miesiąc
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Wydatki (styczeń)</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">2,450 zł</div>
              <p className="text-xs text-red-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% vs. poprzedni miesiąc
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Oszczędności</CardTitle>
              <PiggyBank className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">9,500 zł</div>
              <p className="text-xs text-blue-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Cel: 15,000 zł
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border hover:bg-gianni-card-hover transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gianni-text-secondary">Miesięczny budżet</CardTitle>
              <Target className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gianni-text-primary">{monthlyBudget.remaining} zł</div>
              <div className="mt-2">
                <Progress value={monthlyBudget.progress} className="h-2" />
                <p className="text-xs text-gianni-text-secondary mt-1">
                  {monthlyBudget.spent}/{monthlyBudget.total} zł wykorzystane
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Trends */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary">Trendy wydatków</CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Przychody vs wydatki w ostatnich miesiącach
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                wydatki: { label: "Wydatki", color: "hsl(var(--gianni-orange))" },
                przychód: { label: "Przychód", color: "hsl(var(--primary))" }
              }} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={expenseData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="wydatki" 
                      stroke="hsl(var(--gianni-orange))" 
                      strokeWidth={3} 
                      dot={{ fill: "hsl(var(--gianni-orange))", strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="przychód" 
                      stroke="hsl(28 100% 65%)" 
                      strokeWidth={3} 
                      dot={{ fill: "hsl(28 100% 65%)", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary">Kategorie wydatków</CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Podział wydatków w tym miesiącu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Predictions & Savings Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Expense Prediction */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-gianni-orange" />
                Predykcja wydatków AI
              </CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Przewidywane wydatki na najbliższe miesiące
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictionData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-gianni-dark border border-border">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gianni-text-secondary" />
                      <span className="text-gianni-text-primary">{item.month}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-purple-400 border-purple-400">
                        Predykcja: {item.predicted} zł
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm text-purple-400">
                    💡 AI przewiduje wzrost wydatków w sierpniu. Rozważ zaplanowanie budżetu z 15% buforem.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Savings Goals */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="text-gianni-text-primary">Cele oszczędnościowe</CardTitle>
              <CardDescription className="text-gianni-text-secondary">
                Postęp w realizacji celów finansowych
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {savingsGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gianni-text-primary font-medium">{goal.name}</span>
                      <span className="text-sm text-gianni-text-secondary">
                        {goal.current} / {goal.target} zł
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gianni-text-secondary">{goal.progress}% ukończone</span>
                      <span className="text-emerald-400">
                        Pozostało: {goal.target - goal.current} zł
                      </span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Target className="h-4 w-4 mr-2" />
                  Dodaj nowy cel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-gianni-card border-border">
          <CardHeader>
            <CardTitle className="text-gianni-text-primary">Ostatnie transakcje</CardTitle>
            <CardDescription className="text-gianni-text-secondary">
              Twoje najnowsze wydatki i przychody
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-gianni-dark border border-border hover:bg-gianni-card-hover transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'
                    }`}>
                      {transaction.amount > 0 ? (
                        <TrendingUp className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <CreditCard className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-gianni-text-primary font-medium">{transaction.description}</p>
                      <p className="text-sm text-gianni-text-secondary">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-semibold ${
                    transaction.amount > 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} zł
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">
              Zobacz wszystkie transakcje
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Finances;