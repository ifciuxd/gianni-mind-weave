import React, { useState } from 'react';
import { Layout } from '@/components/ui/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Star, 
  ShoppingBag,
  Palette,
  Calendar,
  TrendingUp,
  Image,
  Edit,
  Trash2
} from 'lucide-react';

export const Wardrobe = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const categories = [
    { id: 'all', name: 'Wszystkie', count: 127 },
    { id: 'tops', name: 'Góra', count: 45 },
    { id: 'bottoms', name: 'Dół', count: 32 },
    { id: 'shoes', name: 'Buty', count: 18 },
    { id: 'accessories', name: 'Akcesoria', count: 15 },
    { id: 'outerwear', name: 'Okrycia', count: 12 },
    { id: 'underwear', name: 'Bielizna', count: 5 }
  ];

  const wardrobeItems = [
    {
      id: '1',
      name: 'Biała koszula Oxford',
      category: 'tops',
      brand: 'Uniqlo',
      color: 'Biały',
      size: 'M',
      season: 'all-season',
      price: 129.99,
      timesWorn: 15,
      favorite: true,
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Czarne jeansy skinny',
      category: 'bottoms',
      brand: 'Zara',
      color: 'Czarny',
      size: '32',
      season: 'all-season',
      price: 199.99,
      timesWorn: 28,
      favorite: true,
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Białe sneakersy',
      category: 'shoes',
      brand: 'Nike',
      color: 'Biały',
      size: '42',
      season: 'all-season',
      price: 399.99,
      timesWorn: 22,
      favorite: false,
      image: '/placeholder.svg'
    }
  ];

  const outfits = [
    {
      id: '1',
      name: 'Casual Friday',
      occasion: 'Praca',
      season: 'all-season',
      rating: 5,
      items: ['Biała koszula Oxford', 'Czarne jeansy skinny', 'Białe sneakersy']
    },
    {
      id: '2',
      name: 'Weekend w mieście',
      occasion: 'Casual',
      season: 'summer',
      rating: 4,
      items: ['T-shirt basic', 'Szorty jeansowe', 'Sandały']
    }
  ];

  const stats = [
    { label: 'Łączna wartość', value: '12,450 zł', icon: ShoppingBag },
    { label: 'Najczęściej noszone', value: 'Czarne jeansy', icon: TrendingUp },
    { label: 'Ulubione rzeczy', value: '23', icon: Heart },
    { label: 'Nowe w tym miesiącu', value: '5', icon: Plus }
  ];

  const filteredItems = wardrobeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout title="Szafa" showBackButton>
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

        <Tabs value="items" className="w-full">
          <TabsList className="bg-gianni-surface border border-border">
            <TabsTrigger value="items">Rzeczy ({wardrobeItems.length})</TabsTrigger>
            <TabsTrigger value="outfits">Stylizacje ({outfits.length})</TabsTrigger>
            <TabsTrigger value="planning">Planowanie</TabsTrigger>
            <TabsTrigger value="analytics">Analityka</TabsTrigger>
          </TabsList>

          <TabsContent value="items" className="space-y-6">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-1 gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gianni-text-secondary" />
                  <Input
                    placeholder="Szukaj w szafie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gianni-surface border-border"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Dodaj rzecz
                </Button>
              </div>
            </div>

            <div className="flex gap-6">
              {/* Sidebar with categories */}
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

                <Card className="bg-gianni-card border-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gianni-text-primary">Szybkie akcje</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <Heart className="h-4 w-4" />
                      Ulubione
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <Star className="h-4 w-4" />
                      Najczęściej noszone
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <Calendar className="h-4 w-4" />
                      Sezonowe
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <Palette className="h-4 w-4" />
                      Kolorowa analiza
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main content */}
              <div className="flex-1">
                {filteredItems.length === 0 ? (
                  <Card className="bg-gianni-card border-border">
                    <CardContent className="text-center py-12">
                      <Image className="h-12 w-12 text-gianni-text-secondary mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gianni-text-primary mb-2">
                        Brak rzeczy w szafie
                      </h3>
                      <p className="text-sm text-gianni-text-secondary mb-4">
                        Zacznij budować swoją cyfrową szafę, dodając swoje rzeczy.
                      </p>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Dodaj pierwszą rzecz
                      </Button>
                    </CardContent>
                  </Card>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                      <Card key={item.id} className="bg-gianni-card border-border group hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {item.favorite && (
                              <Badge variant="secondary" className="bg-red-100 text-red-600">
                                <Heart className="h-3 w-3 fill-current" />
                              </Badge>
                            )}
                            <Badge variant="secondary" className="bg-gianni-surface text-gianni-text-primary">
                              {item.timesWorn}x
                            </Badge>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="flex gap-2">
                              <Button size="sm" variant="secondary">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="secondary">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-medium text-gianni-text-primary">{item.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gianni-text-secondary">
                              <span>{item.brand}</span>
                              <span>•</span>
                              <span>{item.size}</span>
                              <span>•</span>
                              <span>{item.color}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gianni-text-primary">
                                {item.price.toFixed(2)} zł
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {categories.find(c => c.id === item.category)?.name}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-gianni-card border-border">
                    <CardContent className="p-0">
                      <div className="divide-y divide-border">
                        {filteredItems.map((item) => (
                          <div key={item.id} className="p-4 hover:bg-gianni-surface transition-colors">
                            <div className="flex items-center gap-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-gianni-text-primary truncate">{item.name}</h3>
                                  {item.favorite && (
                                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                                  )}
                                </div>
                                <p className="text-sm text-gianni-text-secondary">
                                  {item.brand} • {item.size} • {item.color}
                                </p>
                                <div className="flex items-center gap-4 mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {categories.find(c => c.id === item.category)?.name}
                                  </Badge>
                                  <span className="text-xs text-gianni-text-secondary">
                                    Noszone {item.timesWorn} razy
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gianni-text-primary">
                                  {item.price.toFixed(2)} zł
                                </span>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="outfits" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gianni-text-primary">Moje stylizacje</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Utwórz stylizację
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {outfits.map((outfit) => (
                <Card key={outfit.id} className="bg-gianni-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base text-gianni-text-primary">{outfit.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{outfit.occasion}</Badge>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < outfit.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gianni-text-secondary">Elementy:</p>
                      <ul className="space-y-1">
                        {outfit.items.map((item, index) => (
                          <li key={index} className="text-sm text-gianni-text-primary">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Planowanie outfitów</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gianni-text-secondary mx-auto mb-4" />
                  <p className="text-gianni-text-secondary">
                    Funkcja planowania outfitów będzie dostępna wkrótce.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gianni-card border-border">
              <CardHeader>
                <CardTitle className="text-gianni-text-primary">Analityka szafy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gianni-text-secondary mx-auto mb-4" />
                  <p className="text-gianni-text-secondary">
                    Szczegółowa analityka Twojej szafy będzie dostępna wkrótce.
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