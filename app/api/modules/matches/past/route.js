import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function GET() {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .lt("match_date", now)
    .order("match_date", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ past: data });
}
