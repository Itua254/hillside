import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Team ID is required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ team: data }), { status: 200 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
