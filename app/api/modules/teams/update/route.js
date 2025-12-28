import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function PUT(request) {
  try {
    const { id, name, description, category, logo_url } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Team ID is required" }),
        { status: 400 }
      );
    }

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (logo_url !== undefined) updates.logo_url = logo_url;

    const { data, error } = await supabase
      .from("teams")
      .update(updates)
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
        message: "Team updated successfully",
        team: data
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
