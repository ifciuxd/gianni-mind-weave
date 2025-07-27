-- Inicjalizacja bazy danych Gianni Mind Weave
-- Wykonaj jako: psql -U gianni -d gianni_mind_weave -f scripts/init-database.sql

-- Włącz rozszerzenie UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TRAVELS TABLE
CREATE TABLE IF NOT EXISTS public.travels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'booked', 'completed', 'cancelled')),
  notes TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. FINANCES TABLE
CREATE TABLE IF NOT EXISTS public.finances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT,
  recurring BOOLEAN DEFAULT false,
  recurring_period TEXT CHECK (recurring_period IN ('daily', 'weekly', 'monthly', 'yearly')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. WARDROBE TABLE
CREATE TABLE IF NOT EXISTS public.wardrobe (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tops', 'bottoms', 'shoes', 'accessories', 'outerwear', 'underwear')),
  brand TEXT,
  color TEXT,
  size TEXT,
  season TEXT CHECK (season IN ('spring', 'summer', 'autumn', 'winter', 'all-season')),
  image_url TEXT,
  purchase_date DATE,
  price DECIMAL(10,2),
  times_worn INTEGER DEFAULT 0,
  favorite BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. OUTFITS TABLE
CREATE TABLE IF NOT EXISTS public.outfits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  occasion TEXT,
  season TEXT CHECK (season IN ('spring', 'summer', 'autumn', 'winter', 'all-season')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. OUTFIT_ITEMS TABLE (junction table)
CREATE TABLE IF NOT EXISTS public.outfit_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  outfit_id UUID NOT NULL REFERENCES public.outfits(id) ON DELETE CASCADE,
  wardrobe_item_id UUID NOT NULL REFERENCES public.wardrobe(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. HOBBIES TABLE
CREATE TABLE IF NOT EXISTS public.hobbies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  started_date DATE,
  skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  total_hours DECIMAL(10,2) DEFAULT 0,
  favorite BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. HOBBY_SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.hobby_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hobby_id UUID NOT NULL REFERENCES public.hobbies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  duration_minutes INTEGER NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  achievement TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. CALENDAR_EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  all_day BOOLEAN DEFAULT false,
  location TEXT,
  category TEXT,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  recurring BOOLEAN DEFAULT false,
  recurring_pattern TEXT,
  reminder_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. NOTES TABLE
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  tags TEXT[],
  pinned BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false,
  color TEXT DEFAULT '#ffffff',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. USER_SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  language TEXT DEFAULT 'pl' CHECK (language IN ('pl', 'en')),
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  timezone TEXT DEFAULT 'Europe/Warsaw',
  currency TEXT DEFAULT 'PLN',
  date_format TEXT DEFAULT 'DD/MM/YYYY',
  openai_api_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 11. FRIENDS TABLE
CREATE TABLE IF NOT EXISTS public.friends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  birthday DATE,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
  relationship_type TEXT CHECK (relationship_type IN ('friend', 'family', 'colleague', 'acquaintance', 'partner')),
  last_contact_date DATE,
  favorite BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 12. FRIEND_CONTACTS TABLE
CREATE TABLE IF NOT EXISTS public.friend_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID NOT NULL REFERENCES public.friends(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('call', 'message', 'meeting', 'social_media', 'other')),
  contact_date DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes INTEGER,
  notes TEXT,
  mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 13. FRIEND_EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.friend_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  friend_id UUID NOT NULL REFERENCES public.friends(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  event_type TEXT CHECK (event_type IN ('meeting', 'party', 'dinner', 'activity', 'other')),
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'confirmed', 'completed', 'cancelled')),
  reminder_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 14. FRIEND_RATINGS TABLE
CREATE TABLE IF NOT EXISTS public.friend_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID NOT NULL REFERENCES public.friends(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating_date DATE NOT NULL DEFAULT CURRENT_DATE,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 10),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 10),
  trust_rating INTEGER CHECK (trust_rating >= 1 AND trust_rating <= 10),
  fun_rating INTEGER CHECK (fun_rating >= 1 AND fun_rating <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 15. SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  credits INTEGER,
  semester TEXT,
  academic_year TEXT,
  professor TEXT,
  room TEXT,
  schedule TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 16. ASSIGNMENTS TABLE
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  due_time TIME,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  assignment_type TEXT CHECK (assignment_type IN ('homework', 'project', 'exam', 'presentation', 'lab', 'other')),
  max_points INTEGER,
  earned_points INTEGER,
  weight_percentage DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 17. GRADES TABLE
CREATE TABLE IF NOT EXISTS public.grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  grade_type TEXT NOT NULL CHECK (grade_type IN ('assignment', 'exam', 'midterm', 'final', 'participation', 'other')),
  grade_value DECIMAL(4,2) NOT NULL,
  max_grade DECIMAL(4,2) DEFAULT 5.0,
  weight_percentage DECIMAL(5,2),
  date_received DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 18. LECTURES TABLE
CREATE TABLE IF NOT EXISTS public.lectures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  lecture_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  room TEXT,
  attendance_status TEXT DEFAULT 'scheduled' CHECK (attendance_status IN ('scheduled', 'attended', 'missed', 'cancelled')),
  notes TEXT,
  materials_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 19. STUDY_SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  study_type TEXT CHECK (study_type IN ('reading', 'practice', 'review', 'research', 'group_study', 'other')),
  productivity_rating INTEGER CHECK (productivity_rating >= 1 AND productivity_rating <= 5),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Funkcja do aktualizacji timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery dla automatycznej aktualizacji timestamp
CREATE TRIGGER update_travels_updated_at
  BEFORE UPDATE ON public.travels
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_finances_updated_at
  BEFORE UPDATE ON public.finances
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wardrobe_updated_at
  BEFORE UPDATE ON public.wardrobe
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_outfits_updated_at
  BEFORE UPDATE ON public.outfits
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hobbies_updated_at
  BEFORE UPDATE ON public.hobbies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at
  BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON public.user_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_friends_updated_at
  BEFORE UPDATE ON public.friends
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_friend_events_updated_at
  BEFORE UPDATE ON public.friend_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at
  BEFORE UPDATE ON public.subjects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON public.assignments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lectures_updated_at
  BEFORE UPDATE ON public.lectures
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indeksy dla lepszej wydajności
CREATE INDEX IF NOT EXISTS idx_travels_user_id ON public.travels(user_id);
CREATE INDEX IF NOT EXISTS idx_travels_dates ON public.travels(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_finances_user_id ON public.finances(user_id);
CREATE INDEX IF NOT EXISTS idx_finances_date ON public.finances(date);
CREATE INDEX IF NOT EXISTS idx_finances_category ON public.finances(category);
CREATE INDEX IF NOT EXISTS idx_wardrobe_user_id ON public.wardrobe(user_id);
CREATE INDEX IF NOT EXISTS idx_wardrobe_category ON public.wardrobe(category);
CREATE INDEX IF NOT EXISTS idx_hobbies_user_id ON public.hobbies(user_id);
CREATE INDEX IF NOT EXISTS idx_hobby_sessions_user_id ON public.hobby_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_hobby_sessions_date ON public.hobby_sessions(date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_id ON public.calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON public.calendar_events(start_date);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON public.notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_tags ON public.notes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_notes_category ON public.notes(category);
CREATE INDEX IF NOT EXISTS idx_friends_user_id ON public.friends(user_id);
CREATE INDEX IF NOT EXISTS idx_friends_status ON public.friends(status);
CREATE INDEX IF NOT EXISTS idx_friend_contacts_friend_id ON public.friend_contacts(friend_id);
CREATE INDEX IF NOT EXISTS idx_friend_contacts_date ON public.friend_contacts(contact_date);
CREATE INDEX IF NOT EXISTS idx_friend_events_user_id ON public.friend_events(user_id);
CREATE INDEX IF NOT EXISTS idx_friend_events_friend_id ON public.friend_events(friend_id);
CREATE INDEX IF NOT EXISTS idx_friend_events_date ON public.friend_events(event_date);
CREATE INDEX IF NOT EXISTS idx_friend_ratings_friend_id ON public.friend_ratings(friend_id);
CREATE INDEX IF NOT EXISTS idx_friend_ratings_date ON public.friend_ratings(rating_date);
CREATE INDEX IF NOT EXISTS idx_subjects_user_id ON public.subjects(user_id);
CREATE INDEX IF NOT EXISTS idx_subjects_status ON public.subjects(status);
CREATE INDEX IF NOT EXISTS idx_assignments_subject_id ON public.assignments(subject_id);
CREATE INDEX IF NOT EXISTS idx_assignments_due_date ON public.assignments(due_date);
CREATE INDEX IF NOT EXISTS idx_assignments_status ON public.assignments(status);
CREATE INDEX IF NOT EXISTS idx_grades_subject_id ON public.grades(subject_id);
CREATE INDEX IF NOT EXISTS idx_grades_date ON public.grades(date_received);
CREATE INDEX IF NOT EXISTS idx_lectures_subject_id ON public.lectures(subject_id);
CREATE INDEX IF NOT EXISTS idx_lectures_date ON public.lectures(lecture_date);
CREATE INDEX IF NOT EXISTS idx_study_sessions_subject_id ON public.study_sessions(subject_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_date ON public.study_sessions(session_date);

-- Wstaw przykładowe dane
INSERT INTO public.user_settings (user_id, theme, language, notifications_enabled) 
VALUES ('local-user-id', 'dark', 'pl', true)
ON CONFLICT (user_id) DO NOTHING;

-- Komunikat o zakończeniu
SELECT 'Database initialization completed successfully!' as status;