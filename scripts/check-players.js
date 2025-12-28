
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function checkPlayerNames() {
    console.log('Fetching player names...');
    const { data: players, error } = await supabase.from('players').select('id, full_name, position').limit(10);

    if (error) {
        console.error('Error fetching players:', error.message);
    } else {
        console.log('Sample Players:');
        players.forEach(p => console.log(`${p.full_name} (${p.position})`));
    }
}

checkPlayerNames();
