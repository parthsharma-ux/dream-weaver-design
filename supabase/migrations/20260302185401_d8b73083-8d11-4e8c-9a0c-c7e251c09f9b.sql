
-- Create admin role system
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can read
CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Now update services/portfolio/leads write policies to require admin role
DROP POLICY "Authenticated users can insert services" ON public.services;
DROP POLICY "Authenticated users can update services" ON public.services;
DROP POLICY "Authenticated users can delete services" ON public.services;

CREATE POLICY "Admins can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated users can insert portfolio" ON public.portfolio_projects;
DROP POLICY "Authenticated users can update portfolio" ON public.portfolio_projects;
DROP POLICY "Authenticated users can delete portfolio" ON public.portfolio_projects;

CREATE POLICY "Admins can insert portfolio" ON public.portfolio_projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio" ON public.portfolio_projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio" ON public.portfolio_projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY "Authenticated users can view leads" ON public.leads;
DROP POLICY "Authenticated users can update leads" ON public.leads;
DROP POLICY "Authenticated users can delete leads" ON public.leads;

CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Update storage policies to require admin
DROP POLICY "Authenticated users can upload portfolio images" ON storage.objects;
DROP POLICY "Authenticated users can update portfolio images" ON storage.objects;
DROP POLICY "Authenticated users can delete portfolio images" ON storage.objects;

CREATE POLICY "Admins can upload portfolio images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio' AND public.has_role(auth.uid(), 'admin'));
