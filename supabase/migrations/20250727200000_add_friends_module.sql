-- Add Friends Module Tables

-- 1. FRIENDS TABLE
CREATE TABLE public.friends (
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

-- 2. FRIEND_CONTACTS TABLE (contact history)
CREATE TABLE public.friend_contacts (
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

-- 3. FRIEND_EVENTS TABLE (upcoming events with friends)
CREATE TABLE public.friend_events (
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

-- 4. FRIEND_RATINGS TABLE (relationship quality tracking)
CREATE TABLE public.friend_ratings (
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

-- Enable RLS on all friends tables
ALTER TABLE public.friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friend_ratings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for friends module
CREATE POLICY "Users can manage their own friends" ON public.friends
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own friend contacts" ON public.friend_contacts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own friend events" ON public.friend_events
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own friend ratings" ON public.friend_ratings
  FOR ALL USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_friends_updated_at
  BEFORE UPDATE ON public.friends
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_friend_events_updated_at
  BEFORE UPDATE ON public.friend_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_friends_user_id ON public.friends(user_id);
CREATE INDEX idx_friends_status ON public.friends(status);
CREATE INDEX idx_friend_contacts_friend_id ON public.friend_contacts(friend_id);
CREATE INDEX idx_friend_contacts_date ON public.friend_contacts(contact_date);
CREATE INDEX idx_friend_events_user_id ON public.friend_events(user_id);
CREATE INDEX idx_friend_events_friend_id ON public.friend_events(friend_id);
CREATE INDEX idx_friend_events_date ON public.friend_events(event_date);
CREATE INDEX idx_friend_ratings_friend_id ON public.friend_ratings(friend_id);
CREATE INDEX idx_friend_ratings_date ON public.friend_ratings(rating_date);