import { Users, GraduationCap, Briefcase, Target, Heart, Plus, ArrowUpRight, DollarSign, Calendar, BarChart, Plane, Palette, FileText, Shirt, Coffee } from "lucide-react";
import { LifeSpaceCard } from "@/components/dashboard/LifeSpaceCard";
import { UnifiedDailySummary } from "@/components/dashboard/UnifiedDailySummary";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { Button } from "@/components/ui/button";
import { FloatingNav } from "@/components/ui/floating-nav";
import { KineticTitle } from "@/components/ui/kinetic-title";
import { getTimeBasedGreeting, getTimeBasedSubtitle } from "@/lib/greetings";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const lifeSpaces = [
    {
      title: "Finanse",
      description: "Budżet, wydatki, inwestycje i planowanie finansowe",
      icon: DollarSign,
      notificationCount: 8,
      color: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "Znajomi",
      description: "Relacje, spotkania i wspólne plany z najbliższymi osobami",
      icon: Users,
      notificationCount: 3,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Uczelnia",
      description: "Wykłady, projekty, egzaminy i wszystko związane z nauką",
      icon: GraduationCap,
      notificationCount: 5,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Praca",
      description: "Projekty, zadania, spotkania i rozwój zawodowy",
      icon: Briefcase,
      notificationCount: 12,
      color: "bg-gianni-orange/20 text-gianni-orange",
    },
    {
      title: "Ambicje",
      description: "Cele, marzenia, nawyki i plany na przyszłość",
      icon: Target,
      notificationCount: 2,
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Zdrowie & Sport",
      description: "Treningi, dieta, samopoczucie i aktywność fizyczna",
      icon: Heart,
      notificationCount: 1,
      color: "bg-red-500/20 text-red-400",
    },
    {
      title: "Podróże",
      description: "Planowanie wyjazdów, budżet podróży i wspomnienia",
      icon: Plane,
      notificationCount: 4,
      color: "bg-cyan-500/20 text-cyan-400",
    },
    {
      title: "Moodboard",
      description: "Kreatywna przestrzeń wizualna i inspiracje",
      icon: Palette,
      notificationCount: 0,
      color: "bg-pink-500/20 text-pink-400",
    },
    {
      title: "Notatki",
      description: "Wszystkie notatki, pomysły i szybkie zapiski",
      icon: FileText,
      notificationCount: 6,
      color: "bg-indigo-500/20 text-indigo-400",
    },
    {
      title: "Szafa",
      description: "Organizacja garderoby i stylizacje",
      icon: Shirt,
      notificationCount: 2,
      color: "bg-pink-500/20 text-pink-400",
    },
    {
      title: "Hobby",
      description: "Śledzenie pasji i zainteresowań",
      icon: Coffee,
      notificationCount: 1,
      color: "bg-amber-500/20 text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Sophisticated Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gianni-orange/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gianni-orange-glow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <KineticTitle 
            text={getTimeBasedGreeting()}
            subtitle={getTimeBasedSubtitle()}
            className="mb-12"
          />
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="gianni-premium"
              size="lg"
              className="group"
              onClick={() => navigate('/dashboard')}
            >
              <BarChart className="h-5 w-5 mr-2 transition-transform group-hover:scale-110 duration-300" />
              Dashboard
              <ArrowUpRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-1 group-hover:translate-x-0" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group"
              onClick={() => navigate('/calendar')}
            >
              <Calendar className="h-5 w-5 mr-2 transition-transform group-hover:scale-110 duration-300" />
              Kalendarz
              <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-gradient-to-b from-gianni-orange to-transparent animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 space-y-24">
        {/* Unified Daily Summary */}
        <div>
          <UnifiedDailySummary />
        </div>

        {/* Quick Stats */}
        <div>
          <QuickStats />
        </div>

        {/* Life Spaces Grid */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-helvetica font-light text-gianni-text-primary mb-4 tracking-tight">
              Przestrzenie życia
            </h2>
            <p className="text-lg text-gianni-text-secondary font-light max-w-2xl mx-auto">
              Odkryj i zarządzaj wszystkimi aspektami swojego życia w jednym miejscu
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifeSpaces.map((space, index) => (
              <LifeSpaceCard
                key={space.title}
                {...space}
                onClick={() => {
                  const routes: { [key: string]: string } = {
                    'Finanse': '/spaces/finances',
                    'Znajomi': '/spaces/friends',
                    'Uczelnia': '/spaces/university', 
                    'Praca': '/spaces/work',
                    'Ambicje': '/spaces/ambitions',
                    'Zdrowie & Sport': '/spaces/health',
                    'Podróże': '/spaces/travel',
                    'Moodboard': '/spaces/moodboard',
                    'Notatki': '/spaces/notes',
                    'Szafa': '/spaces/wardrobe',
                    'Hobby': '/spaces/hobby'
                  };
                  navigate(routes[space.title] || '/');
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;
