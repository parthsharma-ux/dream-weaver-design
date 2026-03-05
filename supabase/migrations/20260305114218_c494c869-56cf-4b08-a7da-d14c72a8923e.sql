
-- Fix: Drop restrictive policies and recreate as permissive

-- SERVICES
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
DROP POLICY IF EXISTS "Admins can insert services" ON public.services;
DROP POLICY IF EXISTS "Admins can update services" ON public.services;
DROP POLICY IF EXISTS "Admins can delete services" ON public.services;

CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- PORTFOLIO_PROJECTS
DROP POLICY IF EXISTS "Anyone can view portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can insert portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can update portfolio" ON public.portfolio_projects;
DROP POLICY IF EXISTS "Admins can delete portfolio" ON public.portfolio_projects;

CREATE POLICY "Anyone can view portfolio" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Admins can insert portfolio" ON public.portfolio_projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update portfolio" ON public.portfolio_projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete portfolio" ON public.portfolio_projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- LEADS
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;

CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- USER_ROLES
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
