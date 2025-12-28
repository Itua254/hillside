import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Fetch matches with home/away scores
    const { data: matches, error: matchErr } = await supabase
      .from("matches")
      .select("id, match_date, home_team_id, away_team_id, final_home_goals, final_away_goals")
      .order("match_date", { ascending: false });

    if (matchErr) {
      return new Response(JSON.stringify({ error: matchErr.message }), { status: 500 });
    }

    // Fetch teams (for names)
    const { data: teams, error: teamErr } = await supabase
      .from("teams")
      .select("id, name");

    if (teamErr) {
      return new Response(JSON.stringify({ error: teamErr.message }), { status: 500 });
    }

    // Build map for quick lookup
    const teamMap = {};
    teams.forEach(t => {
      teamMap[t.id] = t.name || "Unknown";
    });

    // Format matches
    const formatted = matches.map(m => ({
      id: m.id,
      match_date: m.match_date,
      home_team: {
        id: m.home_team_id,
        name: teamMap[m.home_team_id] || "Unknown"
      },
      away_team: {
        id: m.away_team_id,
        name: teamMap[m.away_team_id] || "Unknown"
      },
      final_score: {
        home: m.final_home_goals,
        away: m.final_away_goals
      }
    }));

    return new Response(JSON.stringify({ matches: formatted }, null, 2), {
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
