import { supabase } from "@/lib/supabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");

    if (!matchId) {
      return new Response(
        JSON.stringify({ error: "matchId is required" }),
        { status: 400 }
      );
    }

    // Fetch all events for this match
    const { data: events, error } = await supabase
      .from("match_stats")
      .select("*")
      .eq("match_id", matchId)
      .order("event_minute", { ascending: true });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    // Map player IDs
    const playerIds = events
      .map(e => e.player_id)
      .filter(id => id !== null);

    let playersMap = {};
    if (playerIds.length > 0) {
      const { data: players } = await supabase
        .from("players")
        .select("id, full_name")
        .in("id", playerIds);

      playersMap = (players || []).reduce((acc, p) => {
        acc[p.id] = p.full_name;
        return acc;
      }, {});
    }

    // Group events by minute
    const grouped = {};
    for (const e of events) {
      const key = e.event_minute === null ? "other" : String(e.event_minute);

      if (!grouped[key]) grouped[key] = [];

      grouped[key].push({
        id: e.id,
        event_type: e.event_type,
        minute: e.event_minute,
        player: playersMap[e.player_id] || null,
        metadata: e.metadata
      });
    }

    // Convert to sorted array
    const groupedArray = Object.keys(grouped)
      .sort((a, b) => {
        if (a === "other") return 1;
        if (b === "other") return -1;
        return Number(a) - Number(b);
      })
      .map(k => ({
        minute: k === "other" ? null : Number(k),
        events: grouped[k]
      }));

    return new Response(
      JSON.stringify({
        matchId,
        grouped: groupedArray,
        raw: events
      }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
