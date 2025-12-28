
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function checkMatchesSchema() {
    console.log('Checking Matches Table Schema...');
    // Try to select columns that might be missing
    const { data, error } = await supabase.from('matches').select('id, is_finished, final_home_goals, final_away_goals, season').limit(1);

    if (error) {
        console.log('Error selecting columns:', error.message);
        // Heuristic parsing
        if (error.message.includes('is_finished')) console.log('MISSING: is_finished');
        if (error.message.includes('final_home_goals')) console.log('MISSING: final_home_goals');
        if (error.message.includes('season')) console.log('MISSING: season');
    } else {
        console.log('All checked columns exist.');
    }
}

checkMatchesSchema();
