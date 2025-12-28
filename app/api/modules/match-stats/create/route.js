import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const body = await request.json();

    const { matchId, playerId, eventType, eventMinute, metadata, season } = body;

    // Basic validation
    if (!matchId || !eventType) {
      return new Response(
        JSON.stringify({ error: "matchId and eventType are required" }),
        { status: 400 }
      );
    }

    // Insert event into match_stats table
    const { data, error } = await supabase
      .from("match_stats")
      .insert([
        {
          match_id: matchId,
          player_id: playerId || null,
          event_type: eventType,
          event_minute: eventMinute || null,
          metadata: metadata || {}
        }
      ])
      .select();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      });
    }

    // If event involves a player and season, update stats
    if (playerId && season) {
      if (eventType === "goal" || eventType === "assist") {
        const isGoal = eventType === "goal";
        const isAssist = eventType === "assist";

        const goals = isGoal ? 1 : 0;
        const assists = isAssist ? 1 : 0;

        const { error: rpcError } = await supabase.rpc(
          "upsert_player_season_stat",
          {
            p_player_id: playerId,
            p_season: season,
            p_goals: goals,
            p_assists: assists
          }
        );

        if (rpcError) {
          return new Response(JSON.stringify({ error: rpcError.message }), {
            status: 500
          });
        }
      }
    }

    return new Response(
      JSON.stringify({
        message: "Event saved",
        inserted: data
      }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
