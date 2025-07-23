-- Create enterprise quotes table
CREATE TABLE IF NOT EXISTS public.enterprise_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  company_size INTEGER NOT NULL,
  use_cases TEXT NOT NULL,
  estimated_value NUMERIC NOT NULL,
  implementation_timeline TEXT NOT NULL,
  custom_requirements TEXT,
  quote_total NUMERIC NOT NULL,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.enterprise_quotes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own enterprise quotes" 
ON public.enterprise_quotes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own enterprise quotes" 
ON public.enterprise_quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enterprise quotes" 
ON public.enterprise_quotes 
FOR UPDATE 
USING (auth.uid() = user_id);