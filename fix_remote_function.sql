-- Function to upsert player season stats
-- Matches signature in app/api/modules/match-stats/create/route.js
CREATE OR REPLACE FUNCTION public.upsert_player_season_stat(
        p_player_id UUID,
        p_season TEXT,
        p_goals INTEGER,
        p_assists INTEGER
    ) RETURNS VOID AS $$ BEGIN
INSERT INTO public.player_season_stats (player_id, season, goals, assists)
VALUES (p_player_id, p_season, p_goals, p_assists) ON CONFLICT (player_id, season) DO
UPDATE
SET goals = player_season_stats.goals + EXCLUDED.goals,
    assists = player_season_stats.assists + EXCLUDED.assists;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;
GRANT EXECUTE ON FUNCTION public.upsert_player_season_stat(UUID, TEXT, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_player_season_stat(UUID, TEXT, INTEGER, INTEGER) TO service_role;