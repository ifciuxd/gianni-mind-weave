import { useState, useEffect } from "react";
import { Users, Plus, Calendar, MessageCircle, Gift, Phone, ArrowLeft, Edit, Trash2, Star, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/api/client";

interface Friend {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  birthday?: string;
  notes?: string;
  status: 'active' | 'inactive' | 'blocked';
  relationship_type?: 'friend' | 'family' | 'colleague' | 'acquaintance' | 'partner';
  last_contact_date?: string;
  favorite: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface FriendContact {
  id: string;
  friend_id: string;
  contact_type: 'call' | 'message' | 'meeting' | 'social_media' | 'other';
  contact_date: string;
  duration_minutes?: number;
  notes?: string;
  mood_rating?: number;
  created_at: string;
}

export default function Friends() {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    notes: '',
    relationship_type: 'friend' as const,
    status: 'active' as const
  });
  const [contactFormData, setContactFormData] = useState({
    contact_type: 'message' as const,
    contact_date: new Date().toISOString().split('T')[0],
    duration_minutes: '',
    notes: '',
    mood_rating: 5
  });

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('friends')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (error) throw error;
      setFriends(data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
      toast.error('Błąd podczas ładowania znajomych');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('friends')
        .insert([{
          ...formData,
          user_id: user.id
        }]);

      if (error) throw error;

      toast.success('Znajomy został dodany');
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        birthday: '',
        notes: '',
        relationship_type: 'friend',
        status: 'active'
      });
      fetchFriends();
    } catch (error) {
      console.error('Error adding friend:', error);
      toast.error('Błąd podczas dodawania znajomego');
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFriend) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('friend_contacts')
        .insert([{
          friend_id: selectedFriend.id,
          user_id: user.id,
          ...contactFormData,
          duration_minutes: contactFormData.duration_minutes ? parseInt(contactFormData.duration_minutes) : null
        }]);

      if (error) throw error;

      // Update last contact date
      await supabase
        .from('friends')
        .update({ last_contact_date: contactFormData.contact_date })
        .eq('id', selectedFriend.id);

      toast.success('Kontakt został dodany');
      setIsContactDialogOpen(false);
      setContactFormData({
        contact_type: 'message',
        contact_date: new Date().toISOString().split('T')[0],
        duration_minutes: '',
        notes: '',
        mood_rating: 5
      });
      fetchFriends();
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Błąd podczas dodawania kontaktu');
    }
  };

  const toggleFavorite = async (friendId: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('friends')
        .update({ favorite: !currentFavorite })
        .eq('id', friendId);

      if (error) throw error;
      fetchFriends();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Błąd podczas aktualizacji');
    }
  };

  const deleteFriend = async (friendId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tego znajomego?')) return;

    try {
      const { error } = await supabase
        .from('friends')
        .delete()
        .eq('id', friendId);

      if (error) throw error;
      toast.success('Znajomy został usunięty');
      fetchFriends();
    } catch (error) {
      console.error('Error deleting friend:', error);
      toast.error('Błąd podczas usuwania znajomego');
    }
  };

  const getDaysUntilBirthday = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = nextBirthday.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getLastContactText = (lastContactDate?: string) => {
    if (!lastContactDate) return 'Brak kontaktu';
    
    const lastContact = new Date(lastContactDate);
    const today = new Date();
    const diffTime = today.getTime() - lastContact.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Dzisiaj';
    if (diffDays === 1) return 'Wczoraj';
    if (diffDays < 7) return `${diffDays} dni temu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tygodni temu`;
    return `${Math.floor(diffDays / 30)} miesięcy temu`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-helvetica flex items-center justify-center">
        <div className="text-gianni-text-secondary">Ładowanie znajomych...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-helvetica">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-glass-orange hover:text-gianni-orange transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Znajomi</h1>
          </div>
          <p className="text-gianni-text-secondary">Zarządzaj relacjami z najbliższymi osobami</p>
        </div>

        <div className="mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Dodaj znajomego
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dodaj nowego znajomego</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddFriend} className="space-y-4">
                <div>
                  <Label htmlFor="name">Imię i nazwisko *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="birthday">Data urodzenia</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="relationship_type">Typ relacji</Label>
                  <Select
                    value={formData.relationship_type}
                    onValueChange={(value: any) => setFormData({ ...formData, relationship_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friend">Znajomy</SelectItem>
                      <SelectItem value="family">Rodzina</SelectItem>
                      <SelectItem value="colleague">Kolega z pracy</SelectItem>
                      <SelectItem value="acquaintance">Znajomy</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Notatki</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Dodaj znajomego
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {friends.map((friend) => {
            const daysUntilBirthday = friend.birthday ? getDaysUntilBirthday(friend.birthday) : null;
            const isBirthdaySoon = daysUntilBirthday && daysUntilBirthday <= 30;
            
            return (
              <Card key={friend.id} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="text-xl font-medium text-gianni-text-primary mb-1">{friend.name}</h3>
                        <p className="text-gianni-text-secondary text-sm">{friend.notes}</p>
                      </div>
                      {friend.favorite && (
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      {isBirthdaySoon && (
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          Urodziny za {daysUntilBirthday} dni
                        </Badge>
                      )}
                      <Badge className={friend.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                        {friend.status === 'active' ? 'Aktywny' : 'Nieaktywny'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-gianni-orange" />
                      <span className="text-sm text-gianni-text-secondary">
                        Ostatni kontakt: {getLastContactText(friend.last_contact_date)}
                      </span>
                    </div>
                    {friend.birthday && (
                      <div className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-gianni-orange" />
                        <span className="text-sm text-gianni-text-secondary">
                          Urodziny: {new Date(friend.birthday).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })}
                        </span>
                      </div>
                    )}
                    {friend.relationship_type && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gianni-orange" />
                        <span className="text-sm text-gianni-text-secondary">
                          {friend.relationship_type === 'friend' ? 'Znajomy' :
                           friend.relationship_type === 'family' ? 'Rodzina' :
                           friend.relationship_type === 'colleague' ? 'Kolega z pracy' :
                           friend.relationship_type === 'acquaintance' ? 'Znajomy' :
                           friend.relationship_type === 'partner' ? 'Partner' : friend.relationship_type}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => {
                        setSelectedFriend(friend);
                        setIsContactDialogOpen(true);
                      }}
                    >
                      <MessageCircle className="h-3 w-3" />
                      Dodaj kontakt
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => toggleFavorite(friend.id, friend.favorite)}
                    >
                      <Star className={`h-3 w-3 ${friend.favorite ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      {friend.favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 text-red-500 hover:text-red-600"
                      onClick={() => deleteFriend(friend.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                      Usuń
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Add Contact Dialog */}
        <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj kontakt z {selectedFriend?.name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <Label htmlFor="contact_type">Typ kontaktu</Label>
                <Select
                  value={contactFormData.contact_type}
                  onValueChange={(value: any) => setContactFormData({ ...contactFormData, contact_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Telefon</SelectItem>
                    <SelectItem value="message">Wiadomość</SelectItem>
                    <SelectItem value="meeting">Spotkanie</SelectItem>
                    <SelectItem value="social_media">Media społecznościowe</SelectItem>
                    <SelectItem value="other">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact_date">Data kontaktu</Label>
                <Input
                  id="contact_date"
                  type="date"
                  value={contactFormData.contact_date}
                  onChange={(e) => setContactFormData({ ...contactFormData, contact_date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="duration_minutes">Czas trwania (minuty)</Label>
                <Input
                  id="duration_minutes"
                  type="number"
                  value={contactFormData.duration_minutes}
                  onChange={(e) => setContactFormData({ ...contactFormData, duration_minutes: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="mood_rating">Ocena nastroju (1-5)</Label>
                <Input
                  id="mood_rating"
                  type="number"
                  min="1"
                  max="5"
                  value={contactFormData.mood_rating}
                  onChange={(e) => setContactFormData({ ...contactFormData, mood_rating: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notatki</Label>
                <Textarea
                  id="notes"
                  value={contactFormData.notes}
                  onChange={(e) => setContactFormData({ ...contactFormData, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                Dodaj kontakt
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}