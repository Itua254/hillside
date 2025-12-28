import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, event_type, event_minute, player_id, metadata } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "id is required" }),
        { status: 400 }
      );
    }

    // Build update object
    const updateData = {};

    if (event_type !== undefined) updateData.event_type = event_type;
    if (event_minute !== undefined) updateData.event_minute = event_minute;
    if (player_id !== undefined) updateData.player_id = player_id;
    if (metadata !== undefined) updateData.metadata = metadata;

    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({ error: "No fields provided to update" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("match_stats")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Update successful",
        updated: data
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
