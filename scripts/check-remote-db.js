
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRemote() {
    console.log('Checking remote Supabase connection...');

    // 1. Check plain connection by selecting from a table (e.g. teams)
    const { data: teams, error: tableError } = await supabase
        .from('teams')
        .select('count', { count: 'exact', head: true });

    if (tableError) {
        console.error('Error connecting to remote DB (Table check):', tableError.message);
    } else {
        console.log('Successfully connected to remote DB.');
    }

    // 2. Check for the specific RPC function (using correct signature from schema.sql)
    console.log('Checking for "upsert_player_season_stat" function...');
    const { error: rpcError } = await supabase.rpc('upsert_player_season_stat', {
        p_player_id: '00000000-0000-0000-0000-000000000000',
        p_season: '2024-2025',
        p_goals: 0,
        p_assists: 0
    });

    if (rpcError) {
        console.log('RPC check result:', rpcError.message);
        if (rpcError.message.includes('function upsert_player_season_stat') && rpcError.message.includes('does not exist')) {
            console.error('CRITICAL ERROR: Function "upsert_player_season_stat" is MISSING on remote.');
        } else if (rpcError.code === 'PGRST202') { // Function not found code often
            console.error('CRITICAL ERROR: Function "upsert_player_season_stat" not found.');
        }
    } else {
        console.log('Function "upsert_player_season_stat" appears to exist (no invocation error, or parameter error which implies existence).');
    }
}

checkRemote();
