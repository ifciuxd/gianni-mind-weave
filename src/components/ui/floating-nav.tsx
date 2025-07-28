import { Button } from "@/components/ui/button";
import { Plus, Search, Settings, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTimeBasedGreeting } from "@/lib/greetings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function FloatingNav() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-glass-white backdrop-blur-xl border border-glass-border rounded-2xl px-6 py-3 shadow-glass">
        <div className="flex items-center gap-4">
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span className="text-gianni-text-primary font-helvetica font-medium text-sm">
                  {user?.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-glass-white border-glass-border backdrop-blur-xl">
              <div className="px-3 py-2">
                <p className="text-xs text-gianni-text-secondary">Zalogowany jako</p>
                <p className="text-sm font-medium text-gianni-text-primary truncate max-w-48">
                  {user?.email}
                </p>
              </div>
              <DropdownMenuSeparator className="bg-glass-border" />
              <DropdownMenuItem 
                onClick={() => navigate('/settings')}
                className="hover:bg-glass-orange hover:text-gianni-orange"
              >
                <Settings className="mr-2 h-4 w-4" />
                Ustawienia
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-glass-border" />
              <DropdownMenuItem 
                onClick={signOut}
                className="hover:bg-red-500/10 text-red-500 focus:text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Wyloguj
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="w-px h-4 bg-glass-border" />
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300"
              onClick={() => {/* TODO: Implement global search */}}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300"
              onClick={() => {/* TODO: Implement quick add */}}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}