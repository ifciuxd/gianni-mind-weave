import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TravelMap } from "@/components/ui/map";
import { 
  Plane, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Camera, 
  Heart,
  Star,
  Clock,
  Thermometer,
  Plus,
  Map
} from "lucide-react";

export const Travel = () => {
  const upcomingTrips = [
    {
      id: '1',
      title: 'Wakacje w Barcelonie',
      destination: 'Barcelona, Hiszpania',
      dates: '15-22 marca 2024',
      budget: '3500 zł',
      status: 'booked',
      latitude: 41.3851,
      longitude: 2.1734
    },
    {
      id: '2',
      title: 'Przygoda w Tokio',
      destination: 'Tokio, Japonia',
      dates: '10-25 maja 2024',
      budget: '8500 zł',
      status: 'planned',
      latitude: 35.6762,
      longitude: 139.6503
    },
    {
      id: '3',
      title: 'Eksploracja Islandii',
      destination: 'Reykjavik, Islandia',
      dates: '5-12 sierpnia 2024',
      budget: '4200 zł',
      status: 'planned',
      latitude: 64.1466,
      longitude: -21.9426
    }
  ];

  const dreamDestinations = [
    { name: "Tokio, Japonia", priority: "high", estimatedCost: 8000 },
    { name: "Islandia", priority: "medium", estimatedCost: 4500 },
    { name: "Nowa Zelandia", priority: "high", estimatedCost: 12000 },
    { name: "Patagonia", priority: "low", estimatedCost: 6000 }
  ];

  const travelStats = {
    countriesVisited: 12,
    totalTrips: 28,
    totalSpent: 25400,
    favoriteDestination: "Japonia"
  };

  return (
    <Layout title="Podróże" showBreadcrumbs={true}>
      <div className="container mx-auto px-6 py-8">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gianni-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gianni-text-primary">{travelStats.countriesVisited}</p>
                  <p className="text-sm text-gianni-text-secondary">Kraje odwiedzone</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Plane className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gianni-text-primary">{travelStats.totalTrips}</p>
                  <p className="text-sm text-gianni-text-secondary">Łącznie podróży</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gianni-text-primary">{travelStats.totalSpent.toLocaleString()}zł</p>
                  <p className="text-sm text-gianni-text-secondary">Wydane na podróże</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gianni-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Heart className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gianni-text-primary">{travelStats.favoriteDestination}</p>
                  <p className="text-sm text-gianni-text-secondary">Ulubione miejsce</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trips">Nadchodzące podróże</TabsTrigger>
            <TabsTrigger value="planning">Planowanie</TabsTrigger>
            <TabsTrigger value="wishlist">Lista marzeń</TabsTrigger>
            <TabsTrigger value="memories">Wspomnienia</TabsTrigger>
          </TabsList>

          {/* Upcoming Trips */}
          <TabsContent value="trips" className="space-y-6">
            {/* Interactive Map */}
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Mapa podróży</CardTitle>
              </CardHeader>
              <CardContent>
                <TravelMap travels={upcomingTrips} />
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-helvetica font-medium text-gianni-text-primary">
                Nadchodzące podróże
              </h3>
              <Button className="bg-gradient-orange hover:shadow-orange">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj podróż
              </Button>
            </div>

            <div className="grid gap-6">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="bg-gianni-card border-border overflow-hidden">
                  <div className="flex">
                    <div className="w-48 h-32 bg-gianni-card-hover flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gianni-text-secondary" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-medium text-gianni-text-primary mb-1">
                            {trip.destination}
                          </h4>
                          <div className="flex items-center gap-4 text-gianni-text-secondary">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {trip.dates}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {trip.budget}
                            </div>
                          </div>
                        </div>
                        <Badge variant={trip.status === "booked" ? "default" : "secondary"}>
                          {trip.status === "booked" ? "Zarezerwowane" : "Planowane"}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Map className="h-4 w-4 mr-2" />
                          Szczegóły
                        </Button>
                        <Button variant="outline" size="sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Budżet
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Harmonogram
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Planning Tools */}
          <TabsContent value="planning" className="space-y-6">
            <h3 className="text-2xl font-helvetica font-medium text-gianni-text-primary">
              Narzędzia planowania
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gianni-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5" />
                    Prognoza pogody
                  </CardTitle>
                  <CardDescription>
                    Sprawdź pogodę w miejscach docelowych
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Sprawdź pogodę
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gianni-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Kalkulator budżetu
                  </CardTitle>
                  <CardDescription>
                    Oszacuj koszty podróży
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Kalkulator
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gianni-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    Wyszukiwarka lotów
                  </CardTitle>
                  <CardDescription>
                    Znajdź najlepsze ceny biletów
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Szukaj lotów
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gianni-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Lista pakowania
                  </CardTitle>
                  <CardDescription>
                    Nie zapomnij o niczym ważnym
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Utwórz listę
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Dream Destinations */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-helvetica font-medium text-gianni-text-primary">
                Lista marzeń
              </h3>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj miejsce
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {dreamDestinations.map((destination, index) => (
                <Card key={index} className="bg-gianni-card border-border">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gianni-text-primary">
                        {destination.name}
                      </h4>
                      <Badge 
                        variant={
                          destination.priority === "high" ? "destructive" :
                          destination.priority === "medium" ? "default" : "secondary"
                        }
                      >
                        {destination.priority === "high" ? "Wysoki" :
                         destination.priority === "medium" ? "Średni" : "Niski"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gianni-text-secondary">
                        Szacowany koszt: {destination.estimatedCost.toLocaleString()}zł
                      </span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            className="h-4 w-4 text-yellow-400 fill-current" 
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Travel Memories */}
          <TabsContent value="memories" className="space-y-6">
            <h3 className="text-2xl font-helvetica font-medium text-gianni-text-primary">
              Wspomnienia z podróży
            </h3>
            
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gianni-text-secondary mx-auto mb-4" />
              <p className="text-gianni-text-secondary">
                Tutaj będą wyświetlane Twoje wspomnienia z podróży
              </p>
              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj wspomnienia
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Travel;