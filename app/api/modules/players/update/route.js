import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, full_name, number, position, photo_url } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Player ID is required" }),
        { status: 400 }
      );
    }

    const updateData = {};

    if (full_name !== undefined) updateData.full_name = full_name;
    if (number !== undefined) updateData.number = number;
    if (position !== undefined) updateData.position = position;
    if (photo_url !== undefined) updateData.photo_url = photo_url;

    const { data, error } = await supabase
      .from("players")
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
        message: "Player updated successfully",
        player: data
      }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
