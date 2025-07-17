import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Friends from "./pages/spaces/Friends";
import University from "./pages/spaces/University";
import Work from "./pages/spaces/Work";
import Ambitions from "./pages/spaces/Ambitions";
import Health from "./pages/spaces/Health";
import Finances from "./pages/spaces/Finances";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/spaces/friends" element={<Friends />} />
          <Route path="/spaces/university" element={<University />} />
          <Route path="/spaces/work" element={<Work />} />
          <Route path="/spaces/ambitions" element={<Ambitions />} />
          <Route path="/spaces/health" element={<Health />} />
          <Route path="/spaces/finances" element={<Finances />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
