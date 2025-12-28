import { supabase } from "@/lib/supabase";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const matchId = url.searchParams.get("matchId");

        if (!matchId) {
            return new Response(
                JSON.stringify({ error: "matchId is required" }),
                { status: 400 }
            );
        }

        // 1. Fetch match
        const { data: match, error: matchErr } = await supabase
            .from("matches")
            .select("*")
            .eq("id", matchId)
            .single();

        if (matchErr || !match) {
            return new Response(
                JSON.stringify({ error: "Match not found" }),
                { status: 404 }
            );
        }

        // 2. Load home and away team names
        const { data: teams } = await supabase
            .from("teams")
            .select("id, name")
            .in("id", [match.home_team_id, match.away_team_id]);

        const teamMap = {};
        (teams || []).forEach(t => (teamMap[t.id] = t.name));

        const homeTeamName = teamMap[match.home_team_id] || "Unknown";
        const awayTeamName = teamMap[match.away_team_id] || "Unknown";

        // 3. Fetch events from match_stats
        const { data: events } = await supabase
            .from("match_stats")
            .select("*")
            .eq("match_id", matchId)
            .order("event_minute", { ascending: true });

        // Prepare for grouping
        const groupedByMinute = {};

        events.forEach((e) => {
            const minute = e.event_minute ?? 0;
            if (!groupedByMinute[minute]) groupedByMinute[minute] = [];
            groupedByMinute[minute].push(e);
        });

        const groupedEvents = Object.keys(groupedByMinute).map((minute) => ({
            minute: Number(minute),
            events: groupedByMinute[minute],
        }));

        // 4. Fetch players assigned to each team
        async function getTeamPlayers(teamId) {
            const { data: playerLinks } = await supabase
                .from("player_team")
                .select("player_id")
                .eq("team_id", teamId);

            if (!playerLinks || playerLinks.length === 0) return [];

            const playerIds = playerLinks.map((p) => p.player_id);

            const { data: players } = await supabase
                .from("players")
                .select("id, full_name, number, position, photo_url")
                .in("id", playerIds);

            return players || [];
        }

        const homePlayers = await getTeamPlayers(match.home_team_id);
        const awayPlayers = await getTeamPlayers(match.away_team_id);

        // 5. Format final score
        const score = {
            home: match.final_home_goals ?? 0,
            away: match.final_away_goals ?? 0
        };

        // Final result
        const response = {
            match: {
                id: match.id,
                match_date: match.match_date,
                home_team: {
                    id: match.home_team_id,
                    name: homeTeamName
                },
                away_team: {
                    id: match.away_team_id,
                    name: awayTeamName
                },
                score
            },
            events: {
                raw: events,
                grouped: groupedEvents
            },
            squads: {
                home: homePlayers,
                away: awayPlayers
            }
        };

        return new Response(JSON.stringify(response, null, 2), { status: 200 });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500 }
        );
    }
}
