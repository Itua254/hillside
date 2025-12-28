import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const { player_id } = await request.json();

    if (!player_id) {
      return new Response(JSON.stringify({ error: "player_id required" }), {
        status: 400
      });
    }

    const { error } = await supabase
      .from("player_team")
      .delete()
      .eq("player_id", player_id);

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: "Player removed from team" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Unknown error" }),
      { status: 500 }
    );
  }
}
