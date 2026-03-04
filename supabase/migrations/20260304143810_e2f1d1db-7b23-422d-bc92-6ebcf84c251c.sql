
-- Add sort_order to portfolio_projects for drag-and-drop reordering
ALTER TABLE public.portfolio_projects 
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Add image column to services for service images
ALTER TABLE public.services 
  ADD COLUMN IF NOT EXISTS image text DEFAULT NULL;
