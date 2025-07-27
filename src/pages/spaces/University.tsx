import { useState, useEffect } from "react";
import { GraduationCap, Plus, Calendar, Book, Clock, CheckCircle, Edit, Trash2, ArrowLeft, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  credits?: number;
  semester?: string;
  academic_year?: string;
  professor?: string;
  room?: string;
  schedule?: string;
  status: 'active' | 'completed' | 'dropped';
  color: string;
  created_at: string;
  updated_at: string;
}

interface Assignment {
  id: string;
  subject_id: string;
  title: string;
  description?: string;
  due_date: string;
  due_time?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  assignment_type?: 'homework' | 'project' | 'exam' | 'presentation' | 'lab' | 'other';
  max_points?: number;
  earned_points?: number;
  weight_percentage?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface Grade {
  id: string;
  subject_id: string;
  assignment_id?: string;
  grade_type: 'assignment' | 'exam' | 'midterm' | 'final' | 'participation' | 'other';
  grade_value: number;
  max_grade: number;
  weight_percentage?: number;
  date_received: string;
  notes?: string;
  created_at: string;
}

export default function University() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjectFormData, setSubjectFormData] = useState({
    name: '',
    code: '',
    description: '',
    credits: '',
    semester: '',
    academic_year: '',
    professor: '',
    room: '',
    schedule: '',
    status: 'active' as const,
    color: '#3b82f6'
  });
  const [assignmentFormData, setAssignmentFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    due_time: '',
    priority: 'medium' as const,
    assignment_type: 'homework' as const,
    max_points: '',
    weight_percentage: '',
    notes: ''
  });

  useEffect(() => {
    fetchUniversityData();
  }, []);

  const fetchUniversityData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch subjects
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('subjects')
        .select('*')
        .eq('user_id', user.id)
        .order('name');

      if (subjectsError) throw subjectsError;

      // Fetch assignments
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('assignments')
        .select('*')
        .eq('user_id', user.id)
        .order('due_date');

      if (assignmentsError) throw assignmentsError;

      // Fetch grades
      const { data: gradesData, error: gradesError } = await supabase
        .from('grades')
        .select('*')
        .eq('user_id', user.id)
        .order('date_received', { ascending: false });

      if (gradesError) throw gradesError;

      setSubjects(subjectsData || []);
      setAssignments(assignmentsData || []);
      setGrades(gradesData || []);
    } catch (error) {
      console.error('Error fetching university data:', error);
      toast.error('Błąd podczas ładowania danych uczelni');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('subjects')
        .insert([{
          ...subjectFormData,
          user_id: user.id,
          credits: subjectFormData.credits ? parseInt(subjectFormData.credits) : null
        }]);

      if (error) throw error;

      toast.success('Przedmiot został dodany');
      setIsAddSubjectDialogOpen(false);
      setSubjectFormData({
        name: '',
        code: '',
        description: '',
        credits: '',
        semester: '',
        academic_year: '',
        professor: '',
        room: '',
        schedule: '',
        status: 'active',
        color: '#3b82f6'
      });
      fetchUniversityData();
    } catch (error) {
      console.error('Error adding subject:', error);
      toast.error('Błąd podczas dodawania przedmiotu');
    }
  };

  const handleAddAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('assignments')
        .insert([{
          ...assignmentFormData,
          subject_id: selectedSubject.id,
          user_id: user.id,
          max_points: assignmentFormData.max_points ? parseInt(assignmentFormData.max_points) : null,
          weight_percentage: assignmentFormData.weight_percentage ? parseFloat(assignmentFormData.weight_percentage) : null
        }]);

      if (error) throw error;

      toast.success('Zadanie zostało dodane');
      setIsAddAssignmentDialogOpen(false);
      setAssignmentFormData({
        title: '',
        description: '',
        due_date: '',
        due_time: '',
        priority: 'medium',
        assignment_type: 'homework',
        max_points: '',
        weight_percentage: '',
        notes: ''
      });
      fetchUniversityData();
    } catch (error) {
      console.error('Error adding assignment:', error);
      toast.error('Błąd podczas dodawania zadania');
    }
  };

  const deleteSubject = async (subjectId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten przedmiot?')) return;

    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', subjectId);

      if (error) throw error;
      toast.success('Przedmiot został usunięty');
      fetchUniversityData();
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast.error('Błąd podczas usuwania przedmiotu');
    }
  };

  const getSubjectAverageGrade = (subjectId: string) => {
    const subjectGrades = grades.filter(grade => grade.subject_id === subjectId);
    if (subjectGrades.length === 0) return null;
    
    const totalWeightedGrade = subjectGrades.reduce((sum, grade) => {
      const weight = grade.weight_percentage || 1;
      return sum + (grade.grade_value * weight);
    }, 0);
    
    const totalWeight = subjectGrades.reduce((sum, grade) => {
      return sum + (grade.weight_percentage || 1);
    }, 0);
    
    return totalWeight > 0 ? totalWeightedGrade / totalWeight : 0;
  };

  const getUpcomingAssignments = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return assignments
      .filter(assignment => {
        const dueDate = new Date(assignment.due_date);
        return dueDate >= today && dueDate <= nextWeek && assignment.status !== 'completed';
      })
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
      .slice(0, 5);
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-helvetica flex items-center justify-center">
        <div className="text-gianni-text-secondary">Ładowanie danych uczelni...</div>
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
            <div className="p-2 bg-green-500/20 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-400" />
            </div>
            <h1 className="text-3xl font-light text-gianni-text-primary">Uczelnia</h1>
          </div>
          <p className="text-gianni-text-secondary">Zarządzaj studiami i projektami akademickimi</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subjects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-gianni-text-primary">Przedmioty</h2>
              <Dialog open={isAddSubjectDialogOpen} onOpenChange={setIsAddSubjectDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-3 w-3" />
                    Dodaj przedmiot
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dodaj nowy przedmiot</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddSubject} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nazwa przedmiotu *</Label>
                      <Input
                        id="name"
                        value={subjectFormData.name}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="code">Kod przedmiotu *</Label>
                      <Input
                        id="code"
                        value={subjectFormData.code}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, code: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Opis</Label>
                      <Textarea
                        id="description"
                        value={subjectFormData.description}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="credits">ECTS</Label>
                        <Input
                          id="credits"
                          type="number"
                          value={subjectFormData.credits}
                          onChange={(e) => setSubjectFormData({ ...subjectFormData, credits: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="semester">Semestr</Label>
                        <Input
                          id="semester"
                          value={subjectFormData.semester}
                          onChange={(e) => setSubjectFormData({ ...subjectFormData, semester: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="professor">Wykładowca</Label>
                      <Input
                        id="professor"
                        value={subjectFormData.professor}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, professor: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="room">Sala</Label>
                      <Input
                        id="room"
                        value={subjectFormData.room}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, room: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="schedule">Harmonogram</Label>
                      <Input
                        id="schedule"
                        value={subjectFormData.schedule}
                        onChange={(e) => setSubjectFormData({ ...subjectFormData, schedule: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Dodaj przedmiot
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {subjects.map((subject) => {
                const averageGrade = getSubjectAverageGrade(subject.id);
                const subjectAssignments = assignments.filter(a => a.subject_id === subject.id);
                const pendingAssignments = subjectAssignments.filter(a => a.status !== 'completed');
                
                return (
                  <Card key={subject.id} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gianni-text-primary mb-1">{subject.name}</h3>
                          <p className="text-gianni-text-secondary text-sm">{subject.code}</p>
                        </div>
                        <div className="flex gap-2">
                          {averageGrade && (
                            <Badge className="bg-blue-500/20 text-blue-400">
                              Średnia: {averageGrade.toFixed(2)}
                            </Badge>
                          )}
                          <Badge className={subject.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                            {subject.status === 'active' ? 'Aktywny' : subject.status === 'completed' ? 'Zakończony' : 'Porzucony'}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {subject.professor && (
                          <div className="flex items-center gap-2 text-sm">
                            <Book className="h-4 w-4 text-gianni-orange" />
                            <span className="text-gianni-text-secondary">Wykładowca: {subject.professor}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-gianni-orange" />
                            <span className="text-sm text-gianni-text-secondary">
                              {pendingAssignments.length} zadań do oddania
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedSubject(subject);
                                setIsAddAssignmentDialogOpen(true);
                              }}
                            >
                              <Plus className="h-3 w-3" />
                              Zadanie
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => deleteSubject(subject.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <h2 className="text-xl font-medium text-gianni-text-primary mb-6">Nadchodzące terminy</h2>
            
            <div className="space-y-4">
              {getUpcomingAssignments().map((assignment) => {
                const subject = subjects.find(s => s.id === assignment.subject_id);
                const daysLeft = getDaysUntilDue(assignment.due_date);
                
                return (
                  <Card key={assignment.id} className="bg-gianni-card border-border/50 hover:bg-gianni-card-hover transition-all duration-200">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-medium text-gianni-text-primary">{assignment.title}</h3>
                        <Badge 
                          className={assignment.priority === 'urgent' || assignment.priority === 'high'
                            ? 'bg-red-500/20 text-red-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                          }
                        >
                          {assignment.priority === 'urgent' ? 'Krytyczne' : 
                           assignment.priority === 'high' ? 'Pilne' : 
                           assignment.priority === 'medium' ? 'Średnie' : 'Niskie'}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {subject && (
                          <div className="flex items-center gap-2 text-sm">
                            <Book className="h-4 w-4 text-gianni-orange" />
                            <span className="text-gianni-text-secondary">{subject.name}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gianni-orange" />
                          <span className="text-gianni-text-secondary">
                            Termin: {new Date(assignment.due_date).toLocaleDateString('pl-PL')}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-sm font-medium text-gianni-text-primary">
                            Zostało {daysLeft} dni
                          </span>
                          <Button variant="outline" size="sm" className="gap-2">
                            <CheckCircle className="h-3 w-3" />
                            Oznacz jako gotowe
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
              
              {getUpcomingAssignments().length === 0 && (
                <Card className="bg-gianni-card border-border/50">
                  <div className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 text-gianni-orange mx-auto mb-2" />
                    <p className="text-gianni-text-secondary">Brak nadchodzących terminów</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Add Assignment Dialog */}
        <Dialog open={isAddAssignmentDialogOpen} onOpenChange={setIsAddAssignmentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj zadanie do {selectedSubject?.name}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAssignment} className="space-y-4">
              <div>
                <Label htmlFor="title">Tytuł zadania *</Label>
                <Input
                  id="title"
                  value={assignmentFormData.title}
                  onChange={(e) => setAssignmentFormData({ ...assignmentFormData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={assignmentFormData.description}
                  onChange={(e) => setAssignmentFormData({ ...assignmentFormData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="due_date">Termin *</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={assignmentFormData.due_date}
                    onChange={(e) => setAssignmentFormData({ ...assignmentFormData, due_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="due_time">Godzina</Label>
                  <Input
                    id="due_time"
                    type="time"
                    value={assignmentFormData.due_time}
                    onChange={(e) => setAssignmentFormData({ ...assignmentFormData, due_time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priorytet</Label>
                  <Select
                    value={assignmentFormData.priority}
                    onValueChange={(value: any) => setAssignmentFormData({ ...assignmentFormData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Niski</SelectItem>
                      <SelectItem value="medium">Średni</SelectItem>
                      <SelectItem value="high">Wysoki</SelectItem>
                      <SelectItem value="urgent">Krytyczny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="assignment_type">Typ zadania</Label>
                  <Select
                    value={assignmentFormData.assignment_type}
                    onValueChange={(value: any) => setAssignmentFormData({ ...assignmentFormData, assignment_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Praca domowa</SelectItem>
                      <SelectItem value="project">Projekt</SelectItem>
                      <SelectItem value="exam">Egzamin</SelectItem>
                      <SelectItem value="presentation">Prezentacja</SelectItem>
                      <SelectItem value="lab">Laboratorium</SelectItem>
                      <SelectItem value="other">Inne</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max_points">Maksymalna liczba punktów</Label>
                  <Input
                    id="max_points"
                    type="number"
                    value={assignmentFormData.max_points}
                    onChange={(e) => setAssignmentFormData({ ...assignmentFormData, max_points: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="weight_percentage">Waga (%)</Label>
                  <Input
                    id="weight_percentage"
                    type="number"
                    step="0.01"
                    value={assignmentFormData.weight_percentage}
                    onChange={(e) => setAssignmentFormData({ ...assignmentFormData, weight_percentage: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notatki</Label>
                <Textarea
                  id="notes"
                  value={assignmentFormData.notes}
                  onChange={(e) => setAssignmentFormData({ ...assignmentFormData, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                Dodaj zadanie
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}