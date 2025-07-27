import React, { useState } from 'react';
import { Layout } from '@/components/ui/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Search, 
  Clock, 
  Trophy, 
  Target, 
  TrendingUp,
  Star,
  Heart,
  Calendar,
  BarChart3,
  Play,
  Pause,
  Edit,
  BookOpen,
  Paintbrush,
  Music,
  Camera,
  Gamepad2,
  Dumbbell,
  Coffee
} from 'lucide-react';

export const Hobby = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  // Mock data
  const hobbies = [
    {
      id: '1',
      name: 'Gra na gitarze',
      category: 'Muzyka',
      description: 'Nauka gry na gitarze akustycznej',
      skillLevel: 'intermediate',
      totalHours: 145.5,
      favorite: true,
      lastSession: '2024-01-25',
      weeklyGoal: 10,
      weeklyProgress: 7.5,
      icon: Music,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Fotografia',
      category: 'Sztuka',
      description: 'Fotografia krajobrazowa i portretowa',
      skillLevel: 'advanced',
      totalHours: 289.0,
      favorite: true,
      lastSession: '2024-01-24',
      weeklyGoal: 8,
      weeklyProgress: 5.0,
      icon: Camera,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Czytanie książek',
      category: 'Edukacja',
      description: 'Czytanie literatury pięknej i science fiction',
      skillLevel: 'expert',
      totalHours: 567.5,
      favorite: false,
      lastSession: '2024-01-26',
      weeklyGoal: 15,
      weeklyProgress: 12.0,
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      id: '4',
      name: 'Malarstwo',
      category: 'Sztuka',
      description: 'Malarstwo akwarelowe i akrylowe',
      skillLevel: 'beginner',
      totalHours: 45.0,
      favorite: false,
      lastSession: '2024-01-20',
      weeklyGoal: 5,
      weeklyProgress: 2.5,
      icon: Paintbrush,
      color: 'bg-orange-500'
    }
  ];

  const categories = [
    { id: 'all', name: 'Wszystkie', count: hobbies.length },
    { id: 'Muzyka', name: 'Muzyka', count: 1 },
    { id: 'Sztuka', name: 'Sztuka', count: 2 },
    { id: 'Edukacja', name: 'Edukacja', count: 1 },
    { id: 'Sport', name: 'Sport', count: 0 },
    { id: 'Technologia', name: 'Technologia', count: 0 }
  ];

  const recentSessions = [
    {
      id: '1',
      hobbyId: '1',
      hobbyName: 'Gra na gitarze',
      duration: 45,
      date: '2024-01-25',
      notes: 'Ćwiczyłem nową piosenkę - „Wonderwall"',
      achievement: 'Pierwsza pełna zwrotka bez błędów',
      rating: 4
    },
    {
      id: '2',
      hobbyId: '2',
      hobbyName: 'Fotografia',
      duration: 120,
      date: '2024-01-24',
      notes: 'Sesja zdjęciowa w parku',
      achievement: 'Udało się zrobić 50 dobrych zdjęć',
      rating: 5
    },
    {
      id: '3',
      hobbyId: '3',
      hobbyName: 'Czytanie książek',
      duration: 90,
      date: '2024-01-23',
      notes: 'Przeczytałem 3 rozdziały „Diuny"',
      achievement: 'Ukończenie 1/3 książki',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Łączny czas', value: '1,047 h', icon: Clock },
    { label: 'Hobby tego miesiąca', value: 'Fotografia', icon: Trophy },
    { label: 'Cel tygodniowy', value: '85%', icon: Target },
    { label: 'Średnia sesja', value: '1.2 h', icon: BarChart3 }
  ];

  const filteredHobbies = hobbies.filter(hobby => {
    const matchesSearch = hobby.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hobby.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || hobby.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSkillLevelLabel = (level: string) => {
    const levels = {
      beginner: 'Początkujący',
      intermediate: 'Średniozaawansowany',
      advanced: 'Zaawansowany',
      expert: 'Ekspert'
    };
    return levels[level as keyof typeof levels] || level;
  };

  const getSkillLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-yellow-500',
      intermediate: 'bg-blue-500',
      advanced: 'bg-purple-500',
      expert: 'bg-green-500'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-500';
  };

  const startSession = (hobbyId: string) => {
    setCurrentSession(hobbyId);
    setIsTimerRunning(true);
  };

  const stopSession = () => {
    setCurrentSession(null);
    setIsTimerRunning(false);
  };

  return (
    <Layout title="Hobby" showBackButton>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gianni-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gianni-text-secondary">{stat.label}</p>
                    <p className="text-xl font-bold text-gianni-text-primary">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gianni-accent" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value="hobbies" className="w-full">
          <TabsList className="bg-gianni-surface border border-border">
            <TabsTrigger value="hobbies">Moje hobby ({hobbies.length})</TabsTrigger>
            <TabsTrigger value="sessions">Sesje ({recentSessions.length})</TabsTrigger>
            <TabsTrigger value="goals">Cele</TabsTrigger>
            <TabsTrigger value="analytics">Analityka</TabsTrigger>
          </TabsList>

          <TabsContent value="hobbies" className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gianni-text-secondary" />
                <Input
                  placeholder="Szukaj hobby..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gianni-surface border-border"
                />
              </div>

              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Dodaj hobby
              </Button>
            </div>

            <div className="flex gap-6">
              {/* Sidebar */}
              <div className="w-64 space-y-4">
                <Card className="bg-gianni-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gianni-text-primary">Kategorie</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-gianni-accent text-white'
                            : 'hover:bg-gianni-surface text-gianni-text-secondary'
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {currentSession && (
                  <Card className="bg-gianni-card border-border border-gianni-accent">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-gianni-text-primary flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        Aktywna sesja
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gianni-text-primary">
                          {hobbies.find(h => h.id === currentSession)?.name}
                        </p>
                        <div className="text-2xl font-bold text-gianni-accent">
                          00:15:23
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full"
                          onClick={stopSession}
                        >
                          <Pause className="h-4 w-4 mr-2" />
                          Zakończ sesję
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Main content */}
              <div className="flex-1">
                {filteredHobbies.length === 0 ? (
                  <Card className="bg-gianni-card border-border">
                    <CardContent className="text-center py-12">
                      <Coffee className="h-12 w-12 text-gianni-text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gianni-text-primary mb-2">
                        Brak hobby do wyświetlenia
                      </h3>
                      <p className="text-sm text-gianni-text-secondary mb-4">
                        Dodaj swoje pierwsze hobby, aby zacząć śledzić postępy.
                      </p>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Dodaj pierwsze hobby
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredHobbies.map((hobby) => (
                      <Card key={hobby.id} className="bg-gianni-card border-border group hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${hobby.color}`}>
                                <hobby.icon className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-base text-gianni-text-primary">{hobby.name}</CardTitle>
                                  {hobby.favorite && (
                                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                                  )}
                                </div>
                                <p className="text-sm text-gianni-text-secondary">{hobby.description}</p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Skill level and stats */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getSkillLevelColor(hobby.skillLevel)}`}></div>
                              <span className="text-sm text-gianni-text-secondary">
                                {getSkillLevelLabel(hobby.skillLevel)}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {hobby.category}
                            </Badge>
                          </div>

                          {/* Total hours */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gianni-text-secondary">Łączny czas:</span>
                            <span className="text-sm font-medium text-gianni-text-primary">
                              {hobby.totalHours.toFixed(1)} h
                            </span>
                          </div>

                          {/* Weekly progress */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gianni-text-secondary">Cel tygodniowy:</span>
                              <span className="text-sm font-medium text-gianni-text-primary">
                                {hobby.weeklyProgress} / {hobby.weeklyGoal} h
                              </span>
                            </div>
                            <Progress 
                              value={(hobby.weeklyProgress / hobby.weeklyGoal) * 100} 
                              className="h-2"
                            />
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button 
                              size="sm" 
                              className="flex-1 gap-2"
                              onClick={() => startSession(hobby.id)}
                              disabled={currentSession !== null}
                            >
                              <Play className="h-4 w-4" />
                              Rozpocznij sesję
                            </Button>
                            <Button size="sm" variant="outline">
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gianni-text-primary">Ostatnie sesje</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Dodaj sesję
              </Button>
            </div>

            <Card className="bg-gianni-card border-border">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="p-4 hover:bg-gianni-surface transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gianni-text-primary">{session.hobbyName}</h3>
                            <Badge variant="outline" className="text-xs">
                              {session.duration} min
                            </Badge>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < session.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          {session.notes && (
                            <p className="text-sm text-gianni-text-secondary mb-1">
                              {session.notes}
                            </p>
                          )}
                          {session.achievement && (
                            <p className="text-sm text-gianni-accent font-medium">
                              🏆 {session.achievement}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gianni-text-secondary">{session.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Cele i postępy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-gianni-text-secondary mx-auto mb-4" />
                  <p className="text-gianni-text-secondary">
                    Sekcja celów zostanie dodana w przyszłości.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Analityka hobby</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gianni-text-secondary mx-auto mb-4" />
                  <p className="text-gianni-text-secondary">
                    Szczegółowa analityka będzie dostępna wkrótce.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};