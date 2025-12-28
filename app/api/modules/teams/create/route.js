import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, category, logo_url } = body;

    if (!name) {
      return new Response(
        JSON.stringify({ error: "Team name is required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("teams")
      .insert([
        {
          name,
          description: description || "",
          category: category || "first-team",
          logo_url: logo_url || null
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
        message: "Team created successfully",
        team: data
      }),
      { status: 201 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
