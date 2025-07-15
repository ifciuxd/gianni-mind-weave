import { Users, GraduationCap, Briefcase, Target, Heart, Plus } from "lucide-react";
import { LifeSpaceCard } from "@/components/dashboard/LifeSpaceCard";
import { MorningBriefing } from "@/components/dashboard/MorningBriefing";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { QuickEntry } from "@/components/dashboard/QuickEntry";
import { Button } from "@/components/ui/button";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const Index = () => {
  const lifeSpaces = [
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
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={dashboardHero} 
          alt="Dashboard Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-gianni-text-primary mb-2">
            Gianni
          </h1>
          <p className="text-gianni-text-secondary">
            Twój personalny Second Brain
          </p>
        </div>
        <Button
          variant="gianni"
          size="sm"
          className="absolute bottom-6 right-6"
        >
          <Plus className="h-4 w-4 mr-2" />
          Dodaj przestrzeń
        </Button>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Morning Briefing */}
        <MorningBriefing />

        {/* Quick Stats */}
        <QuickStats />

        {/* Life Spaces Grid */}
        <div>
          <h2 className="text-2xl font-semibold text-gianni-text-primary mb-6">
            Przestrzenie życia
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeSpaces.map((space, index) => (
              <LifeSpaceCard
                key={space.title}
                {...space}
                className="animate-slide-up"
                onClick={() => console.log(`Opening ${space.title}`)}
              />
            ))}
          </div>
        </div>

        {/* Quick Entry */}
        <QuickEntry />

        {/* Footer */}
        <div className="text-center py-8 border-t border-border/30">
          <p className="text-gianni-text-secondary text-sm">
            Wykonane z ❤️ dla osobistego rozwoju
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
