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
        "group relative overflow-hidden bg-gianni-card border border-border/30 cursor-pointer",
        "hover:border-gianni-orange/50 hover:bg-gianni-card-elevated",
        "transition-all duration-500 ease-spring",
        "hover:scale-[1.03] hover:shadow-card-hover",
        "before:absolute before:inset-0 before:bg-gradient-mesh before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        className
      )}
      onClick={onClick}
    >
      {/* Magnetic glow effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-all duration-700 ease-apple" />
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-glass-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div className={cn(
            "relative p-4 rounded-2xl transition-all duration-500 ease-spring",
            "group-hover:scale-110 group-hover:rotate-3",
            "group-hover:shadow-orange-glow",
            color
          )}>
            <Icon className="h-7 w-7 transition-all duration-300 group-hover:scale-110" />
            
            {/* Icon glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gianni-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {notificationCount && notificationCount > 0 && (
            <div className="relative bg-gianni-orange text-gianni-dark text-xs font-bold px-3 py-1.5 rounded-full min-w-[24px] text-center animate-orange-glow">
              {notificationCount > 99 ? "99+" : notificationCount}
              
              {/* Notification pulse ring */}
              <div className="absolute inset-0 rounded-full bg-gianni-orange animate-ping opacity-30" />
            </div>
          )}
        </div>
        
        <div className="space-y-3 mb-6">
          <h3 className="text-2xl font-helvetica font-medium text-gianni-text-primary leading-tight">
            {title.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 group-hover:text-gianni-orange"
                style={{ 
                  transitionDelay: `${index * 20}ms`,
                  transform: 'translateY(0px)'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h3>
          
          <p className="text-gianni-text-secondary leading-relaxed font-helvetica font-light">
            {description}
          </p>
        </div>
        
        {/* Asymmetric action area */}
        <div className="flex items-center justify-between">
          <Button
            variant="gianni-ghost"
            size="sm"
            className={cn(
              "opacity-0 group-hover:opacity-100",
              "transform translate-y-2 group-hover:translate-y-0",
              "transition-all duration-500 ease-spring",
              "hover:scale-105 hover:bg-gianni-orange/10",
              "font-helvetica text-sm"
            )}
          >
            Otwórz przestrzeń
          </Button>
          
          {/* Sophisticated progress indicator */}
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-gianni-text-tertiary" />
            <div className="w-1 h-1 rounded-full bg-gianni-text-tertiary" />
            <div className="w-2 h-1 rounded-full bg-gianni-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
      
      {/* Hover line accent */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-orange group-hover:w-full transition-all duration-700 ease-spring" />
    </Card>
  );
}