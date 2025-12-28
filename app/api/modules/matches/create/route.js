import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { home_team_id, away_team_id, match_date } = body;

    if (!home_team_id || !away_team_id || !match_date) {
      return new Response(
        JSON.stringify({ error: "home_team_id, away_team_id, and match_date are required" }),
        { status: 400 }
      );
    }

    // Insert match
    const { data, error } = await supabase
      .from("matches")
      .insert([
        {
          home_team_id,
          away_team_id,
          match_date,
          final_home_goals: 0,
          final_away_goals: 0
        }
      ])
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ match: data }), { status: 201 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
