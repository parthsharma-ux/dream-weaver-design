
-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Building2',
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_projects table
CREATE TABLE public.portfolio_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  category TEXT NOT NULL DEFAULT 'Construction',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  city TEXT,
  contacted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Services: public read, admin write
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update services" ON public.services FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete services" ON public.services FOR DELETE TO authenticated USING (true);

-- Portfolio: public read, admin write
CREATE POLICY "Anyone can view portfolio" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert portfolio" ON public.portfolio_projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update portfolio" ON public.portfolio_projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete portfolio" ON public.portfolio_projects FOR DELETE TO authenticated USING (true);

-- Leads: public insert, admin read/update/delete
CREATE POLICY "Anyone can submit leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update leads" ON public.leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);

-- Storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

CREATE POLICY "Anyone can view portfolio images" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can upload portfolio images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can update portfolio images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "Authenticated users can delete portfolio images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');

-- Seed initial services data
INSERT INTO public.services (title, description, icon, features) VALUES
  ('Civil Construction', 'Complete house construction from foundation to rooftop with quality materials and expert craftsmanship.', 'Building2', ARRAY['Foundation Work', 'Structural Design', 'Finishing']),
  ('Interior Design', 'Transform your spaces with modern interior solutions that blend aesthetics with functionality.', 'Palette', ARRAY['Living Room', 'Bedroom Design', 'Custom Furniture']),
  ('Wooden Work', 'Premium wooden craftsmanship for doors, windows, wardrobes, and custom furniture pieces.', 'Hammer', ARRAY['Doors & Windows', 'Wardrobes', 'Custom Carpentry']),
  ('Modular Kitchen', 'Designer modular kitchens with smart storage solutions and premium finishes.', 'ChefHat', ARRAY['Modern Design', 'Smart Storage', 'Premium Materials']),
  ('Terrace Garden', 'Beautiful rooftop gardens and green spaces to bring nature closer to your home.', 'TreeDeciduous', ARRAY['Garden Design', 'Landscaping', 'Irrigation']),
  ('Modern Elevation', 'Contemporary elevation designs that make your home stand out with a modern aesthetic.', 'Castle', ARRAY['3D Design', 'Facade Work', 'Exterior Finish']),
  ('Dream Home Package', 'Complete end-to-end solution from construction to interior - your one-stop home builder.', 'Home', ARRAY['Turnkey Solution', 'Customization', 'Quality Assurance']);

-- Seed initial portfolio data
INSERT INTO public.portfolio_projects (title, description, category) VALUES
  ('Modern Villa - Vaishali Nagar', 'Complete 4BHK villa construction with contemporary design', 'Construction'),
  ('Luxury Living Room - Mansarovar', 'Premium interior design with Italian marble flooring', 'Interior'),
  ('Modular Kitchen - Malviya Nagar', 'Space-efficient modular kitchen with German fittings', 'Kitchen'),
  ('Custom Wardrobe - C-Scheme', 'Floor-to-ceiling wardrobe with premium teak finish', 'Wooden Work'),
  ('Rooftop Garden - Raja Park', 'Beautiful terrace garden with seating area', 'Terrace'),
  ('Modern Facade - Tonk Road', 'Contemporary elevation with 3D cladding design', 'Elevation');
