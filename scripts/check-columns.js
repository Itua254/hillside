const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local not found');
    process.exit(1);
}
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function checkColumns() {
    console.log('Checking Matches Table Columns...');
    const { error: matchesError } = await supabase
        .from('matches')
        .select('id, match_date, is_finished, final_home_goals, final_away_goals, home_team_id, away_team_id')
        .limit(1);

    if (matchesError) {
        console.error('Matches Table Issue:', matchesError.message);
    } else {
        console.log('Matches Table columns OK.');
    }

    console.log('Checking Teams Table Columns...');
    const { error: teamsError } = await supabase
        .from('teams')
        .select('name')
        .limit(1);

    if (teamsError) {
        console.error('Teams Table Issue:', teamsError.message);
    } else {
        console.log('Teams Table columns OK.');
    }
}

checkColumns();
