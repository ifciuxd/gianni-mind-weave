import { Button } from "@/components/ui/button";
import { Plus, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingNav() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-glass-fade opacity-0">
      <div className="bg-glass-white backdrop-blur-xl border border-glass-border rounded-2xl px-6 py-3 shadow-glass">
        <div className="flex items-center gap-4">
          <div className="text-gianni-text-primary font-helvetica font-medium text-sm">
            Gianni
          </div>
          
          <div className="w-px h-4 bg-glass-border" />
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}