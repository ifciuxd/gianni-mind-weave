import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  RefreshCw, 
  Download, 
  Trash2, 
  Globe,
  Smartphone,
  Calendar,
  DollarSign,
  Database
} from "lucide-react";

const Settings = () => {
  return (
    <Layout title="Ustawienia" showBreadcrumbs={true}>
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {/* Profile Settings */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
                <User className="h-5 w-5" />
                Profil użytkownika
              </CardTitle>
              <CardDescription>
                Zarządzaj swoimi danymi osobowymi i preferencjami konta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Imię</Label>
                  <input 
                    id="name" 
                    defaultValue="Filip" 
                    className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <input 
                    id="email" 
                    type="email" 
                    defaultValue="filip@example.com" 
                    className="w-full px-3 py-2 mt-1 bg-background border border-border rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme & Appearance */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
                <Palette className="h-5 w-5" />
                Wygląd i motywy
              </CardTitle>
              <CardDescription>
                Personalizuj interfejs aplikacji według swoich preferencji
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="theme">Motyw aplikacji</Label>
                  <p className="text-sm text-gianni-text-secondary">Wybierz preferowany motyw kolorystyczny</p>
                </div>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Jasny</SelectItem>
                    <SelectItem value="dark">Ciemny</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact">Kompaktowy widok</Label>
                  <p className="text-sm text-gianni-text-secondary">Zwiększ gęstość informacji na ekranie</p>
                </div>
                <Switch id="compact" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Animacje</Label>
                  <p className="text-sm text-gianni-text-secondary">Włącz płynne przejścia i efekty</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
                <Bell className="h-5 w-5" />
                Powiadomienia
              </CardTitle>
              <CardDescription>
                Skonfiguruj sposób otrzymywania alertów i przypomnień
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push">Powiadomienia push</Label>
                  <p className="text-sm text-gianni-text-secondary">Otrzymuj alerty w czasie rzeczywistym</p>
                </div>
                <Switch id="push" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notif">Powiadomienia email</Label>
                  <p className="text-sm text-gianni-text-secondary">Cotygodniowe podsumowania i ważne alerty</p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="smart-notif">Inteligentne powiadomienia</Label>
                  <p className="text-sm text-gianni-text-secondary">AI dobierze optymalne czasy alertów</p>
                </div>
                <Switch id="smart-notif" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
                <RefreshCw className="h-5 w-5" />
                Integracje i synchronizacja
              </CardTitle>
              <CardDescription>
                Połącz aplikację z zewnętrznymi serwisami
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {[
                  { name: "Google Calendar", icon: Calendar, status: "connected", description: "Synchronizacja wydarzeń" },
                  { name: "Spotify", icon: Globe, status: "disconnected", description: "Integracja z muzyką" },
                  { name: "Bank API", icon: DollarSign, status: "connected", description: "Automatyczny import transakcji" },
                  { name: "Apple Health", icon: Smartphone, status: "connected", description: "Dane o zdrowiu i aktywności" },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <integration.icon className="h-5 w-5 text-gianni-text-secondary" />
                      <div>
                        <p className="font-medium text-gianni-text-primary">{integration.name}</p>
                        <p className="text-sm text-gianni-text-secondary">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={integration.status === "connected" ? "default" : "secondary"}>
                        {integration.status === "connected" ? "Połączono" : "Rozłączono"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {integration.status === "connected" ? "Rozłącz" : "Połącz"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-gianni-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gianni-text-primary">
                <Shield className="h-5 w-5" />
                Prywatność i bezpieczeństwo
              </CardTitle>
              <CardDescription>
                Kontroluj swoje dane i ustawienia bezpieczeństwa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="biometric">Uwierzytelnianie biometryczne</Label>
                  <p className="text-sm text-gianni-text-secondary">Używaj Face ID lub odcisku palca</p>
                </div>
                <Switch id="biometric" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics">Analityka użytkowania</Label>
                  <p className="text-sm text-gianni-text-secondary">Pomóż ulepszyć aplikację</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Eksportuj dane
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Kopia zapasowa
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Usuń konto
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default Settings;