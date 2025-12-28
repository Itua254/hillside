-- Run this in the Supabase SQL Editor to resolve the security warning
-- Issue: Function public.upsert_player_season_stat has a role mutable search_path
ALTER FUNCTION public.upsert_player_season_stat(uuid, text, integer, integer)
SET search_path = public;