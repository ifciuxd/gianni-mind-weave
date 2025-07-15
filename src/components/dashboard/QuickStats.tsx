import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

function StatCard({ title, value, change, unit, trend = "neutral", className }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-green-400" : trend === "down" ? "text-red-400" : "text-gianni-text-secondary";

  return (
    <Card className={cn("bg-gianni-card border-border/50 hover:bg-gianni-card-hover hover:border-gianni-orange/30 transition-all duration-200 hover:scale-[1.02] group", className)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-gianni-text-secondary text-sm font-medium">{title}</h4>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 text-xs", trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gianni-text-primary group-hover:text-gianni-orange transition-colors duration-200">
            {value}
          </span>
          {unit && (
            <span className="text-gianni-text-secondary text-sm">{unit}</span>
          )}
        </div>
      </div>
    </Card>
  );
}

export function QuickStats() {
  const stats = [
    { title: "Ukończone zadania", value: 23, change: 15, trend: "up" as const },
    { title: "Aktywne projekty", value: 5, change: -2, trend: "down" as const },
    { title: "Dni do egzaminu", value: 12, trend: "neutral" as const },
    { title: "Treningi w tygodniu", value: 4, change: 8, trend: "up" as const },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}