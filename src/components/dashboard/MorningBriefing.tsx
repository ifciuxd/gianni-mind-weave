import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, CloudSun, Target } from "lucide-react";
import { getPersonalizedMessage } from "@/lib/greetings";

export function MorningBriefing() {
  const currentTime = new Date().toLocaleTimeString("pl-PL", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
  
  const currentDate = new Date().toLocaleDateString("pl-PL", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const todayEvents = [
    { time: "09:00", title: "Wykład z Algorytmów", type: "Uczelnia" },
    { time: "14:00", title: "Spotkanie projektowe", type: "Praca" },
    { time: "18:00", title: "Trening siłownia", type: "Sport" },
  ];

  const priorities = [
    "Dokończyć projekt z React",
    "Przygotować się do egzaminu z matematyki",
    "Zadzwonić do Michała w sprawie weekendu"
  ];

  return (
    <Card className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200 animate-fade-in">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gianni-orange rounded-lg">
            <CloudSun className="h-5 w-5 text-gianni-dark" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gianni-text-primary">
              {getPersonalizedMessage()}
            </h2>
            <p className="text-gianni-text-secondary text-sm">
              {currentDate} • {currentTime}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-gianni-orange" />
              <h3 className="font-medium text-gianni-text-primary">Plan dnia</h3>
            </div>
            <div className="space-y-2">
              {todayEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gianni-dark/50 transition-colors duration-200">
                  <div className="flex items-center gap-1 text-gianni-orange text-sm font-mono">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-gianni-text-primary text-sm">{event.title}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Priorities */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-gianni-orange" />
              <h3 className="font-medium text-gianni-text-primary">Priorytety</h3>
            </div>
            <div className="space-y-2">
              {priorities.map((priority, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gianni-dark/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-gianni-orange rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gianni-text-primary text-sm">{priority}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-dark rounded-lg border border-gianni-orange/20">
          <p className="text-gianni-text-secondary text-sm">
            <span className="text-gianni-orange font-medium">Inspiracja dnia:</span> 
            {" "}„Każdy dzień to nowa szansa na rozwój i realizację swoich marzeń."
          </p>
        </div>
      </div>
    </Card>
  );
}