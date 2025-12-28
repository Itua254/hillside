-- 1. Fix Matches Table (Missing columns causing app errors)
ALTER TABLE public.matches
ADD COLUMN IF NOT EXISTS is_finished BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS final_home_goals INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS final_away_goals INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS season TEXT;
-- 2. Add image_url to Players (For image migration)
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS image_url TEXT;
-- 3. Create Storage Bucket for Players
INSERT INTO storage.buckets (id, name, public)
VALUES ('players', 'players', true) ON CONFLICT (id) DO NOTHING;
-- 4. Storage Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR
SELECT USING (bucket_id = 'players');
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (bucket_id = 'players');