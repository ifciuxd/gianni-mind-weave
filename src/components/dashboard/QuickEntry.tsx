import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Mic, FileText, Clock } from "lucide-react";

export function QuickEntry() {
  const [activeTab, setActiveTab] = useState<"note" | "task" | "voice">("note");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    // Here you would handle saving the content
    console.log(`Adding ${activeTab}:`, content);
    setContent("");
    
    // Show success animation (implementation depends on your toast system)
  };

  return (
    <Card className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200 animate-slide-up">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gianni-orange rounded-lg">
            <Plus className="h-5 w-5 text-gianni-dark" />
          </div>
          <h3 className="text-lg font-semibold text-gianni-text-primary">
            Szybki wpis
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === "note" ? "gianni" : "gianni-ghost"}
            size="sm"
            onClick={() => setActiveTab("note")}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Notatka
          </Button>
          <Button
            variant={activeTab === "task" ? "gianni" : "gianni-ghost"}
            size="sm"
            onClick={() => setActiveTab("task")}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Zadanie
          </Button>
          <Button
            variant={activeTab === "voice" ? "gianni" : "gianni-ghost"}
            size="sm"
            onClick={() => setActiveTab("voice")}
            className="flex items-center gap-2"
          >
            <Mic className="h-4 w-4" />
            Głos
          </Button>
        </div>

        {/* Content Input */}
        <div className="space-y-3">
          {activeTab === "voice" ? (
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-gianni-orange/30 rounded-lg">
              <div className="text-center">
                <Mic className="h-8 w-8 text-gianni-orange mx-auto mb-2" />
                <p className="text-gianni-text-secondary text-sm mb-3">
                  Kliknij aby nagrać notatkę głosową
                </p>
                <Button variant="gianni-outline" size="sm">
                  Rozpocznij nagrywanie
                </Button>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "task" && (
                <Input
                  placeholder="Tytuł zadania..."
                  className="bg-gianni-dark border-border/50 text-gianni-text-primary placeholder:text-gianni-text-secondary focus:border-gianni-orange"
                />
              )}
              <Textarea
                placeholder={
                  activeTab === "note" 
                    ? "Zapisz swoją myśl..." 
                    : "Opis zadania..."
                }
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-gianni-dark border-border/50 text-gianni-text-primary placeholder:text-gianni-text-secondary focus:border-gianni-orange resize-none"
                rows={3}
              />
            </>
          )}

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="gianni-ghost" size="sm">
                #praca
              </Button>
              <Button variant="gianni-ghost" size="sm">
                #osobiste
              </Button>
            </div>
            <Button 
              variant="gianni"
              size="sm"
              onClick={handleSubmit}
              disabled={!content.trim() && activeTab !== "voice"}
            >
              Dodaj
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}