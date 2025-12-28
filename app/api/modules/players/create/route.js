import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, number, position, photo_url } = body;

    // Basic validation
    if (!full_name) {
      return new Response(
        JSON.stringify({ error: "full_name is required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("players")
      .insert([
        {
          full_name,
          number: number || null,
          position: position || null,
          photo_url: photo_url || null
        }
      ])
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
        message: "Player created successfully",
        player: data
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
