const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('Error: .env.local not found at', envPath);
        process.exit(1);
    }
    const envConfig = dotenv.parse(fs.readFileSync(envPath));

    if (!envConfig.NEXT_PUBLIC_SUPABASE_URL || !envConfig.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('Error: Missing Supabase keys in .env.local');
        process.exit(1);
    }

    const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

    async function checkTeamId() {
        console.log('Checking Players Table for team_id column...');
        const { data, error } = await supabase.from('players').select('team_id').limit(1);

        if (error) {
            console.log('Select "team_id" result:', error.message);
            if (error.message.includes('does not exist')) {
                console.log('Column "team_id" likely does NOT exist.');
            } else {
                console.log('Error selecting team_id:', error);
            }
        } else {
            console.log('Column "team_id" exists.');
        }
    }

    checkTeamId();
} catch (err) {
    console.error('Script failed:', err);
}
