import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function GET() {
  // Get all matches
  const { data: matches, error: matchErr } = await supabase
    .from("matches")
    .select("*")
    .order("match_date", { ascending: false });

  if (matchErr) return NextResponse.json({ error: matchErr.message }, { status: 500 });

  const results = [];

  for (const m of matches) {
    // For each match, fetch stats
    const { data: stats } = await supabase
      .from("match_stats")
      .select("event_type, player_id")
      .eq("match_id", m.id);

    // Count goals by team
    let homeGoals = 0;
    let awayGoals = 0;

    for (const s of stats) {
      if (s.event_type === "goal") {
        // figure out which team the scoring player belongs to
        const { data: playerTeam } = await supabase
          .from("player_team")
          .select("team_id")
          .eq("player_id", s.player_id)
          .single();

        if (playerTeam?.team_id === m.home_team_id) homeGoals++;
        if (playerTeam?.team_id === m.away_team_id) awayGoals++;
      }
    }

    results.push({
      match_id: m.id,
      home_team_id: m.home_team_id,
      away_team_id: m.away_team_id,
      home_goals: homeGoals,
      away_goals: awayGoals,
      match_date: m.match_date
    });
  }

  return NextResponse.json({ results });
}
