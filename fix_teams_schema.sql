-- Fix Teams Table: Add 'category' column
ALTER TABLE public.teams
ADD COLUMN IF NOT EXISTS category TEXT;
-- Optional: ensure logo_url exists too as script uses it
ALTER TABLE public.teams
ADD COLUMN IF NOT EXISTS logo_url TEXT;
-- Verify if "Men's First Team" exists, if not script will create it, but good to have policy
-- Policies for teams (ensure insert is allowed if script runs as service role it bypasses RLS, but for good measure)