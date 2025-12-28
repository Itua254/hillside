import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // 1. Load teams
    const { data: teams, error: teamErr } = await supabase
      .from("teams")
      .select("id, name");

    if (teamErr) {
      return new Response(
        JSON.stringify({ error: teamErr.message }),
        { status: 500 }
      );
    }

    // Build empty table
    const table = {};
    teams.forEach((t) => {
      table[t.id] = {
        team_id: t.id,
        team_name: t.name,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0
      };
    });

    // 2. Load all matches
    const { data: matches, error: matchErr } = await supabase
      .from("matches")
      .select("id, home_team_id, away_team_id, final_home_goals, final_away_goals");

    if (matchErr) {
      return new Response(
        JSON.stringify({ error: matchErr.message }),
        { status: 500 }
      );
    }

    // 3. Process
    for (const match of matches) {
      const home = match.home_team_id;
      const away = match.away_team_id;

      const homeGoals = match.final_home_goals ?? 0;
      const awayGoals = match.final_away_goals ?? 0;

      // Skip if team missing
      if (!table[home] || !table[away]) continue;

      // Home team
      table[home].played++;
      table[home].gf += homeGoals;
      table[home].ga += awayGoals;

      // Away team
      table[away].played++;
      table[away].gf += awayGoals;
      table[away].ga += homeGoals;

      // Result
      if (homeGoals > awayGoals) {
        table[home].wins++;
        table[away].losses++;
      } else if (homeGoals < awayGoals) {
        table[away].wins++;
        table[home].losses++;
      } else {
        table[home].draws++;
        table[away].draws++;
      }
    }

    // 4. Calculate gd + points
    Object.values(table).forEach((t) => {
      t.gd = t.gf - t.ga;
      t.points = t.wins * 3 + t.draws;
    });

    // Return sorted standings
    const standings = Object.values(table).sort((a, b) => b.points - a.points);

    return new Response(JSON.stringify({ standings }), { status: 200 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
