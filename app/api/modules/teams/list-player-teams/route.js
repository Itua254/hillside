import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const player_id = searchParams.get("player_id");

  if (!player_id) {
    return NextResponse.json({ error: "player_id is required" }, { status: 400 });
  }

  // Step 1: Get all memberships for this player
  const { data: memberships, error: mErr } = await supabase
    .from("player_team")
    .select("team_id")
    .eq("player_id", player_id);

  if (mErr) return NextResponse.json({ error: mErr.message }, { status: 500 });

  if (memberships.length === 0) {
    return NextResponse.json({ teams: [] });
  }

  const teamIds = memberships.map(m => m.team_id);

  // Step 2: Fetch team details
  const { data: teams, error: tErr } = await supabase
    .from("teams")
    .select("*")
    .in("id", teamIds);

  if (tErr) return NextResponse.json({ error: tErr.message }, { status: 500 });

  return NextResponse.json({ teams });
}
