import { useState } from "react";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, MapPin, Users, Video } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Wykład z Matematyki",
      time: "09:00 - 10:30",
      date: "2024-01-15",
      type: "university",
      location: "Sala 101, Wydział Matematyki",
      color: "bg-green-500/20 text-green-400 border-green-500/30"
    },
    {
      id: 2,
      title: "Spotkanie zespołu projektowego",
      time: "14:00 - 15:30",
      date: "2024-01-15",
      type: "work",
      location: "Online - Teams",
      color: "bg-gianni-orange/20 text-gianni-orange border-gianni-orange/30"
    },
    {
      id: 3,
      title: "Trening na siłowni",
      time: "18:00 - 19:30",
      date: "2024-01-15",
      type: "health",
      location: "Fitness Club",
      color: "bg-red-500/20 text-red-400 border-red-500/30"
    },
    {
      id: 4,
      title: "Kino z Anią",
      time: "20:00 - 22:30",
      date: "2024-01-16",
      type: "friends",
      location: "Cinema City",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    },
    {
      id: 5,
      title: "Deadline projektu React",
      time: "23:59",
      date: "2024-01-17",
      type: "ambitions",
      location: "",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    }
  ];

  const todayEvents = events.filter(event => 
    event.date === new Date().toISOString().split('T')[0]
  );

  const upcomingEvents = events.filter(event => 
    new Date(event.date) > new Date()
  ).slice(0, 5);

  const integrations = [
    { name: "Google Calendar", status: "connected", events: 12 },
    { name: "Apple Calendar", status: "connected", events: 8 },
    { name: "Outlook", status: "disconnected", events: 0 },
    { name: "Todoist", status: "connected", events: 24 }
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      {/* Header */}
      <div className="border-b border-border bg-gianni-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light text-gianni-text-primary tracking-tight">
                Kalendarz
              </h1>
              <p className="text-gianni-text-secondary mt-2">
                Zarządzaj czasem i planuj swoje dni
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex rounded-lg border border-border overflow-hidden">
                <Button 
                  variant={currentView === 'day' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentView('day')}
                  className="rounded-none"
                >
                  Dzień
                </Button>
                <Button 
                  variant={currentView === 'week' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentView('week')}
                  className="rounded-none border-x border-border"
                >
                  Tydzień
                </Button>
                <Button 
                  variant={currentView === 'month' ? 'secondary' : 'ghost'} 
                  size="sm"
                  onClick={() => setCurrentView('month')}
                  className="rounded-none"
                >
                  Miesiąc
                </Button>
              </div>
              <Button variant="gianni-premium" size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Nowe wydarzenie
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Component */}
          <div className="lg:col-span-1">
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {new Date().toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Quick Integrations */}
            <Card className="bg-gianni-card border-border mt-6">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Integracje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gianni-dark border border-border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          integration.status === 'connected' ? 'bg-emerald-400' : 'bg-red-400'
                        }`} />
                        <span className="text-gianni-text-primary text-sm">{integration.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {integration.events}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Calendar View */}
          <div className="lg:col-span-2">
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gianni-text-primary">
                    {currentView === 'month' && 'Widok miesięczny'}
                    {currentView === 'week' && 'Widok tygodniowy'}
                    {currentView === 'day' && 'Widok dzienny'}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dziś
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid - simplified for now */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'].map((day) => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gianni-text-secondary border-b border-border">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days - simplified grid */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNumber = ((i - 6) % 31) + 1;
                    const isToday = dayNumber === new Date().getDate() && i >= 6 && i < 37;
                    const hasEvent = [15, 16, 17, 20, 22].includes(dayNumber) && i >= 6 && i < 37;
                    
                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square p-2 text-sm border border-border/50 hover:bg-gianni-card-hover transition-colors cursor-pointer
                          ${i < 6 || i >= 37 ? 'text-gianni-text-tertiary bg-gianni-dark/50' : 'text-gianni-text-primary bg-gianni-dark'}
                          ${isToday ? 'bg-gianni-orange text-gianni-dark font-bold' : ''}
                          ${hasEvent ? 'ring-1 ring-gianni-orange/30' : ''}
                        `}
                      >
                        <div className="flex flex-col h-full">
                          <span className="text-xs">
                            {i < 6 ? dayNumber + 25 : i >= 37 ? dayNumber - 31 : dayNumber}
                          </span>
                          {hasEvent && (
                            <div className="mt-1 w-1 h-1 bg-gianni-orange rounded-full"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Events & Upcoming */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Schedule */}
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Dzisiaj</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todayEvents.length > 0 ? (
                    todayEvents.map((event) => (
                      <div key={event.id} className={`p-4 rounded-lg border ${event.color}`}>
                        <h4 className="font-medium mb-2">{event.title}</h4>
                        <div className="space-y-1 text-xs opacity-80">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                          {event.location && (
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gianni-text-secondary">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Brak wydarzeń na dziś</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Nadchodzące</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gianni-dark border border-border">
                      <div className={`w-3 h-3 rounded-full ${event.color.split(' ')[0]}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gianni-text-primary truncate">
                          {event.title}
                        </p>
                        <p className="text-xs text-gianni-text-secondary">
                          {new Date(event.date).toLocaleDateString('pl-PL', { 
                            month: 'short', 
                            day: 'numeric' 
                          })} • {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Szybkie akcje</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Zaplanuj spotkanie
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Połączenie online
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Blok czasowy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;