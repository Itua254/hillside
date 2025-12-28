import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function PUT(request) {
    try {
        const body = await request.json();
        const {
            id,
            home_team_id,
            away_team_id,
            match_date,
            final_home_goals,
            final_away_goals
        } = body;

        if (!id) {
            return new Response(
                JSON.stringify({ error: "Match ID (id) is required" }),
                { status: 400 }
            );
        }

        const updates = {};

        if (home_team_id !== undefined) updates.home_team_id = home_team_id;
        if (away_team_id !== undefined) updates.away_team_id = away_team_id;
        if (match_date !== undefined) updates.match_date = match_date;
        if (final_home_goals !== undefined) updates.final_home_goals = final_home_goals;
        if (final_away_goals !== undefined) updates.final_away_goals = final_away_goals;

        if (Object.keys(updates).length === 0) {
            return new Response(
                JSON.stringify({ error: "No fields to update" }),
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("matches")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ updated: data }), { status: 200 });

    } catch (err) {
        return new Response(
            JSON.stringify({ error: err.message }),
            { status: 500 }
        );
    }
}

