import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("number", { ascending: true });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        players: data
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
