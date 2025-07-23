-- Ensure enterprise quotes table exists
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
CREATE POLICY IF NOT EXISTS "Users can view their own enterprise quotes" 
ON public.enterprise_quotes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own enterprise quotes" 
ON public.enterprise_quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own enterprise quotes" 
ON public.enterprise_quotes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Ensure partner program table exists
CREATE TABLE IF NOT EXISTS public.partner_program (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  company_name TEXT,
  website TEXT,
  commission_rate NUMERIC NOT NULL DEFAULT 0.15,
  partner_tier TEXT DEFAULT 'bronze',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_program ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Users can view their own partner info" 
ON public.partner_program 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create their own partner info" 
ON public.partner_program 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own partner info" 
ON public.partner_program 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Ensure partner commissions table exists
CREATE TABLE IF NOT EXISTS public.partner_commissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES public.partner_program(id),
  user_id UUID REFERENCES auth.users(id),
  sale_id TEXT NOT NULL,
  sale_amount NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL,
  commission_amount NUMERIC NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.partner_commissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Users can view their own commissions" 
ON public.partner_commissions 
FOR SELECT 
USING (auth.uid() = user_id);