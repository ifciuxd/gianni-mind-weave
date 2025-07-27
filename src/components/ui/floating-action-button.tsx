import { useState } from "react";
import { Plus, PenTool, Calendar, DollarSign, Camera, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getQuickActions = () => {
    const path = location.pathname;
    
    // Base actions available everywhere
    const baseActions = [
      { icon: PenTool, label: "Szybka notatka", action: () => navigate('/notes?quick=true') },
      { icon: Calendar, label: "Nowe wydarzenie", action: () => navigate('/calendar?new=true') },
      { icon: Camera, label: "Zrób zdjęcie", action: () => console.log('Camera') },
      { icon: Mic, label: "Nagranie głosowe", action: () => console.log('Voice') },
    ];

    // Context-specific actions
    if (path.includes('/finances')) {
      return [
        { icon: DollarSign, label: "Nowy wydatek", action: () => console.log('New expense') },
        ...baseActions
      ];
    }
    
    if (path.includes('/calendar')) {
      return [
        { icon: Calendar, label: "Nowe wydarzenie", action: () => console.log('New event') },
        ...baseActions.filter(a => a.label !== "Nowe wydarzenie")
      ];
    }

    return baseActions;
  };

  const actions = getQuickActions();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end">
          {actions.map((action, index) => (
            <div
              key={action.label}
              className={cn(
                "flex items-center gap-3 opacity-0 animate-fade-in",
                `animate-fade-in-delay-${Math.min(index, 3)}`
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="bg-gianni-card text-gianni-text-secondary text-sm px-3 py-1 rounded-lg border border-border shadow-card">
                {action.label}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className="h-10 w-10 p-0 rounded-full bg-gianni-card border-border hover:bg-gianni-card-hover shadow-card"
              >
                <action.icon className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant={isOpen ? "destructive" : "default"}
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-14 w-14 rounded-full shadow-orange-glow transition-all duration-300",
          isOpen 
            ? "bg-red-500 hover:bg-red-600 rotate-45" 
            : "bg-gradient-orange hover:shadow-orange animate-glow-pulse"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}