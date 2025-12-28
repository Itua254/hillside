import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const { player_id, team_id } = await request.json();

    if (!player_id || !team_id) {
      return new Response(
        JSON.stringify({ error: "player_id and team_id required" }),
        { status: 400 }
      );
    }

    // Remove existing assignment (player can only belong to one team)
    await supabase
      .from("player_team")
      .delete()
      .eq("player_id", player_id);

    // Insert new assignment
    const { data, error } = await supabase
      .from("player_team")
      .insert([{ player_id, team_id }])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ assigned: data }), {
      status: 201
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
