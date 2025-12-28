-- Fix Players Table: Add 'team_id' column
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS team_id UUID REFERENCES public.teams(id);
-- Reload schema cache just in case
NOTIFY pgrst,
'reload config';