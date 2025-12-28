import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const team_id = searchParams.get("team_id");

  if (!team_id) {
    return NextResponse.json({ error: "team_id is required" }, { status: 400 });
  }

  // Step 1: Get all player_team membership rows
  const { data: memberships, error: mErr } = await supabase
    .from("player_team")
    .select("player_id")
    .eq("team_id", team_id);

  if (mErr) return NextResponse.json({ error: mErr.message }, { status: 500 });

  if (memberships.length === 0) {
    return NextResponse.json({ players: [] });
  }

  const playerIds = memberships.map(m => m.player_id);

  // Step 2: Fetch player details
  const { data: players, error: pErr } = await supabase
    .from("players")
    .select("*")
    .in("id", playerIds);

  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

  return NextResponse.json({ players });
}
