import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LifeSpaceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  notificationCount?: number;
  color: string;
  className?: string;
  onClick?: () => void;
}

export function LifeSpaceCard({
  title,
  description,
  icon: Icon,
  notificationCount,
  color,
  className,
  onClick,
}: LifeSpaceCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-gianni-card border-border/50 hover:bg-gianni-card-hover hover:border-gianni-orange/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-orange cursor-pointer animate-slide-up",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-200 group-hover:scale-110",
            color
          )}>
            <Icon className="h-6 w-6 text-gianni-dark" />
          </div>
          
          {notificationCount && notificationCount > 0 && (
            <div className="bg-gianni-orange text-gianni-dark text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center animate-glow-pulse">
              {notificationCount > 99 ? "99+" : notificationCount}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gianni-text-primary mb-2 group-hover:text-gianni-orange transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gianni-text-secondary text-sm leading-relaxed">
          {description}
        </p>
        
        <Button
          variant="gianni-ghost"
          size="sm"
          className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
        >
          Otwórz przestrzeń
        </Button>
      </div>
    </Card>
  );
}