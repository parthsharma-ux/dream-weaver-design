
-- Add status, multiple images, and video support to portfolio_projects
ALTER TABLE public.portfolio_projects 
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'completed',
  ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS video_url text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS service_id uuid REFERENCES public.services(id) ON DELETE SET NULL DEFAULT NULL;

-- Drop all RESTRICTIVE policies and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Anyone can view portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can insert portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can update portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can delete portfolio" ON public.portfolio_projects;

CREATE POLICY "Anyone can view portfolio" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Admins can insert portfolio" ON public.portfolio_projects FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update portfolio" ON public.portfolio_projects FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete portfolio" ON public.portfolio_projects FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix services policies too
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;

CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix leads policies
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;

CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Fix user_roles policies
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;

CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
