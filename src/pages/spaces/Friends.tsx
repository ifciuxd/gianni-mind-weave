import { Users, Plus, Calendar, MessageCircle, Gift, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Friends() {
  const friends = [
    {
      name: "Michał",
      lastContact: "2 dni temu",
      birthday: "15 marca",
      notes: "Lubi gry wideo, pracuje w IT",
      status: "active",
      upcomingEvent: "Weekend w górach"
    },
    {
      name: "Anna",
      lastContact: "1 tydzień temu", 
      birthday: "8 czerwca",
      notes: "Studiuje psychologię",
      status: "birthday-soon",
      upcomingEvent: "Urodziny za 2 tygodnie"
    },
    {
      name: "Kuba",
      lastContact: "3 dni temu",
      birthday: "22 listopada", 
      notes: "Kolega z uczelni, matematyka",
      status: "active",
      upcomingEvent: null
    }
  ];

  return (
    <div className="min-h-screen bg-background font-helvetica">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Znajomi</h1>
          </div>
          <p className="text-gianni-text-secondary">Zarządzaj relacjami z najbliższymi osobami</p>
        </div>

        <div className="mb-6">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Dodaj znajomego
          </Button>
        </div>

        <div className="grid gap-6">
          {friends.map((friend) => (
            <Card key={friend.name} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium text-gianni-text-primary mb-1">{friend.name}</h3>
                    <p className="text-gianni-text-secondary text-sm">{friend.notes}</p>
                  </div>
                  <div className="flex gap-2">
                    {friend.status === 'birthday-soon' && (
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        Urodziny wkrótce
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gianni-orange" />
                    <span className="text-sm text-gianni-text-secondary">
                      Ostatni kontakt: {friend.lastContact}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-gianni-orange" />
                    <span className="text-sm text-gianni-text-secondary">
                      Urodziny: {friend.birthday}
                    </span>
                  </div>
                  {friend.upcomingEvent && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gianni-orange" />
                      <span className="text-sm text-gianni-text-secondary">
                        {friend.upcomingEvent}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="h-3 w-3" />
                    Zadzwoń
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageCircle className="h-3 w-3" />
                    Wiadomość
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calendar className="h-3 w-3" />
                    Spotkanie
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}