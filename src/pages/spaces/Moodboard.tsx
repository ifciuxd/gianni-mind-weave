import { useState } from "react";
import { Layout } from "@/components/ui/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Image, 
  Type, 
  StickyNote,
  Download, 
  Share2, 
  Palette,
  Move,
  ZoomIn,
  ZoomOut,
  Grid,
  Users
} from "lucide-react";

const Moodboard = () => {
  const [selectedTool, setSelectedTool] = useState("select");
  const [zoom, setZoom] = useState(100);

  const tools = [
    { id: "select", icon: Move, label: "Wybierz" },
    { id: "image", icon: Image, label: "Obrazek" },
    { id: "text", icon: Type, label: "Tekst" },
    { id: "note", icon: StickyNote, label: "Notatka" },
  ];

  const templates = [
    { name: "Inspiracje designu", items: 12, color: "bg-purple-500/20" },
    { name: "Podróże 2024", items: 8, color: "bg-green-600/20" },
    { name: "Projekt mieszkania", items: 15, color: "bg-emerald-500/20" },
    { name: "Mood & Goals", items: 6, color: "bg-orange-500/20" },
  ];

  const canvasElements = [
    {
      id: 1,
      type: "image",
      x: 100,
      y: 100,
      width: 200,
      height: 150,
      content: "🏔️",
    },
    {
      id: 2,
      type: "text",
      x: 350,
      y: 120,
      content: "Inspiracje górskie",
      fontSize: 24,
    },
    {
      id: 3,
      type: "note",
      x: 150,
      y: 300,
      content: "Planować wyprawę na Tatry w maju",
      color: "bg-yellow-200",
    },
  ];

  return (
    <Layout title="Moodboard" showBreadcrumbs={true}>
      <div className="flex h-[calc(100vh-4rem)]">
        
        {/* Left Sidebar - Tools & Templates */}
        <div className="w-80 bg-gianni-card border-r border-border p-6 flex flex-col gap-6">
          
          {/* Tools */}
          <div>
            <h3 className="font-medium text-gianni-text-primary mb-3">Narzędzia</h3>
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <Button
                  key={tool.id}
                  variant={selectedTool === tool.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTool(tool.id)}
                  className="flex flex-col gap-1 h-16"
                >
                  <tool.icon className="h-5 w-5" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Canvas Controls */}
          <div>
            <h3 className="font-medium text-gianni-text-primary mb-3">Widok</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gianni-text-secondary flex-1 text-center">
                  {zoom}%
                </span>
                <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Grid className="h-4 w-4 mr-2" />
                Siatka
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-medium text-gianni-text-primary mb-3">Akcje</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Eksportuj
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                Udostępnij
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Współpraca
              </Button>
            </div>
          </div>

          {/* Templates */}
          <div className="flex-1">
            <h3 className="font-medium text-gianni-text-primary mb-3">Szablony</h3>
            <div className="space-y-2">
              {templates.map((template, index) => (
                <Card key={index} className="bg-gianni-card-hover border-border cursor-pointer hover:bg-gianni-card-elevated transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${template.color}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gianni-text-primary">
                          {template.name}
                        </p>
                        <p className="text-xs text-gianni-text-secondary">
                          {template.items} elementów
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Nowy moodboard
              </Button>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-background relative overflow-hidden">
          
          {/* Top Toolbar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-gianni-card border border-border rounded-lg px-4 py-2 shadow-card">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gianni-text-secondary">
                  Inspiracje górskie
                </span>
                <div className="w-px h-4 bg-border" />
                <Badge variant="secondary" className="text-xs">
                  Współpraca: 3 osoby
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Palette className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div 
            className="w-full h-full bg-white relative"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center',
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            
            {/* Canvas Elements */}
            {canvasElements.map((element) => (
              <div
                key={element.id}
                className="absolute border-2 border-transparent hover:border-green-600 cursor-move"
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.type === "image" ? element.width : "auto",
                  height: element.type === "image" ? element.height : "auto",
                }}
              >
                {element.type === "image" && (
                  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                    {element.content}
                  </div>
                )}
                
                {element.type === "text" && (
                  <div 
                    className="text-gray-800 font-medium whitespace-nowrap"
                    style={{ fontSize: element.fontSize }}
                  >
                    {element.content}
                  </div>
                )}
                
                {element.type === "note" && (
                  <div className={`${element.color} p-3 rounded-lg shadow-sm max-w-48`}>
                    <p className="text-sm text-gray-800">{element.content}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Empty State Hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">✨</div>
                <p className="text-lg">Twój kreatywny moodboard</p>
                <p className="text-sm">Dodaj obrazy, tekst i notatki, aby stworzyć inspirującą kompozycję</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Properties Panel */}
        <div className="w-72 bg-gianni-card border-l border-border p-6">
          <h3 className="font-medium text-gianni-text-primary mb-4">Właściwości</h3>
          
          <div className="text-center text-gianni-text-secondary py-8">
            <Type className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              Wybierz element, aby edytować jego właściwości
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Moodboard;