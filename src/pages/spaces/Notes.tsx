import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  FileText, 
  Tag, 
  Star, 
  Clock, 
  Filter,
  Grid,
  List,
  Bookmark,
  Archive,
  Trash2
} from "lucide-react";

const Notes = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Wszystkie", count: 42, color: "bg-gray-500/20" },
    { id: "work", name: "Praca", count: 15, color: "bg-blue-500/20" },
    { id: "personal", name: "Osobiste", count: 12, color: "bg-emerald-500/20" },
    { id: "ideas", name: "Pomysły", count: 8, color: "bg-purple-500/20" },
    { id: "travel", name: "Podróże", count: 7, color: "bg-orange-500/20" },
  ];

  const notes = [
    {
      id: 1,
      title: "Pomysły na projekt React",
      content: "1. Dodać dark mode\n2. Implementować PWA\n3. Optymalizacja performance...",
      category: "work",
      tags: ["react", "frontend", "projekt"],
      favorite: true,
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20"
    },
    {
      id: 2,
      title: "Lista książek do przeczytania",
      content: "• Atomic Habits - James Clear\n• Clean Code - Robert C. Martin\n• The Psychology of Money...",
      category: "personal",
      tags: ["książki", "rozwój"],
      favorite: false,
      createdAt: "2024-01-10",
      updatedAt: "2024-01-18"
    },
    {
      id: 3,
      title: "Planowanie wyjazdu do Barcelony",
      content: "Miejsca do odwiedzenia:\n- Sagrada Familia\n- Park Güell\n- Las Ramblas\n- Barrio Gótico...",
      category: "travel",
      tags: ["barcelona", "hiszpania", "podróże"],
      favorite: true,
      createdAt: "2024-01-08",
      updatedAt: "2024-01-16"
    },
    {
      id: 4,
      title: "Startup idea: App dla studentów",
      content: "Aplikacja łącząca studentów z różnych uczelni. Funkcje:\n- Dzielenie się notatkami\n- Grupowe uczenie...",
      category: "ideas",
      tags: ["startup", "edukacja", "app"],
      favorite: false,
      createdAt: "2024-01-05",
      updatedAt: "2024-01-12"
    },
    {
      id: 5,
      title: "Przepis na idealne risotto",
      content: "Składniki:\n- 300g ryżu arborio\n- 1l bulionu warzywnego\n- 100g parmezanu\n- Białe wino...",
      category: "personal",
      tags: ["przepisy", "gotowanie", "włoska"],
      favorite: false,
      createdAt: "2024-01-03",
      updatedAt: "2024-01-10"
    },
    {
      id: 6,
      title: "Meeting notes - Q1 Planning",
      content: "Kluczowe punkty:\n- Cele na Q1 2024\n- Budget allocation\n- Team assignments\n- Deadlines...",
      category: "work",
      tags: ["meeting", "planning", "q1"],
      favorite: false,
      createdAt: "2024-01-02",
      updatedAt: "2024-01-08"
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Layout title="Notatki" showBreadcrumbs={true}>
      <div className="flex h-[calc(100vh-4rem)]">
        
        {/* Left Sidebar */}
        <div className="w-80 bg-gianni-card border-r border-border p-6 flex flex-col gap-6">
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gianni-text-secondary" />
            <Input
              placeholder="Szukaj w notatkach..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button className="w-full bg-gradient-orange hover:shadow-orange">
              <Plus className="h-4 w-4 mr-2" />
              Nowa notatka
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-1" />
                Zapisane
              </Button>
              <Button variant="outline" size="sm">
                <Archive className="h-4 w-4 mr-1" />
                Archiwum
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-gianni-text-primary mb-3">Kategorie</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${category.color}`} />
                    {category.name}
                  </div>
                  <span className="text-xs">{category.count}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Recent Tags */}
          <div className="flex-1">
            <h3 className="font-medium text-gianni-text-primary mb-3">Popularne tagi</h3>
            <div className="flex flex-wrap gap-1">
              {["react", "projekt", "książki", "podróże", "przepisy", "meeting"].map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs cursor-pointer">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Toolbar */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-helvetica font-medium text-gianni-text-primary">
                  {selectedCategory === "all" ? "Wszystkie notatki" : 
                   categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="text-sm text-gianni-text-secondary">
                  {filteredNotes.length} notatek
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtruj
                </Button>
                <div className="flex rounded-lg border border-border">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Grid/List */}
          <div className="flex-1 p-6 overflow-y-auto">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="bg-gianni-card border-border hover:shadow-card-hover transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base line-clamp-2 text-gianni-text-primary">
                          {note.title}
                        </CardTitle>
                        <div className="flex gap-1">
                          {note.favorite && (
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          )}
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gianni-text-secondary line-clamp-4 mb-4">
                        {note.content}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {note.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gianni-text-secondary">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(note.updatedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {note.content.length} znaków
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="bg-gianni-card border-border hover:shadow-card-hover transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-medium text-gianni-text-primary line-clamp-1">
                              {note.title}
                            </h3>
                            <div className="flex items-center gap-2 ml-4">
                              {note.favorite && (
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              )}
                              <span className="text-xs text-gianni-text-secondary">
                                {formatDate(note.updatedAt)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gianni-text-secondary line-clamp-2 mb-2">
                            {note.content}
                          </p>
                          
                          <div className="flex items-center gap-2">
                            {note.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                            {note.tags.length > 3 && (
                              <span className="text-xs text-gianni-text-secondary">
                                +{note.tags.length - 3} więcej
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredNotes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gianni-text-secondary mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-gianni-text-primary mb-2">
                  Brak notatek
                </h3>
                <p className="text-gianni-text-secondary mb-4">
                  {searchQuery ? 
                    `Nie znaleziono notatek dla "${searchQuery}"` : 
                    "Nie masz jeszcze żadnych notatek w tej kategorii"
                  }
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Utwórz pierwszą notatkę
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notes;