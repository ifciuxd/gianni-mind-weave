import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Friends from "./pages/spaces/Friends";
import University from "./pages/spaces/University";
import Work from "./pages/spaces/Work";
import Ambitions from "./pages/spaces/Ambitions";
import Health from "./pages/spaces/Health";
import Finances from "./pages/spaces/Finances";
import { Travel } from './pages/spaces/Travel';
import Moodboard from './pages/spaces/Moodboard';
import Notes from './pages/spaces/Notes';
import { Wardrobe } from './pages/spaces/Wardrobe';
import { Hobby } from './pages/spaces/Hobby';
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
            <Route path="/calendar" element={<AuthGuard><Calendar /></AuthGuard>} />
            <Route path="/spaces/friends" element={<AuthGuard><Friends /></AuthGuard>} />
            <Route path="/spaces/university" element={<AuthGuard><University /></AuthGuard>} />
            <Route path="/spaces/work" element={<AuthGuard><Work /></AuthGuard>} />
            <Route path="/spaces/ambitions" element={<AuthGuard><Ambitions /></AuthGuard>} />
            <Route path="/spaces/health" element={<AuthGuard><Health /></AuthGuard>} />
            <Route path="/spaces/finances" element={<AuthGuard><Finances /></AuthGuard>} />
            <Route path="/spaces/travel" element={<AuthGuard><Travel /></AuthGuard>} />
            <Route path="/spaces/moodboard" element={<AuthGuard><Moodboard /></AuthGuard>} />
            <Route path="/spaces/notes" element={<AuthGuard><Notes /></AuthGuard>} />
            <Route path="/spaces/wardrobe" element={<AuthGuard><Wardrobe /></AuthGuard>} />
            <Route path="/spaces/hobby" element={<AuthGuard><Hobby /></AuthGuard>} />
            <Route path="/settings" element={<AuthGuard><Settings /></AuthGuard>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
