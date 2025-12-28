
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function checkPlayersSchema() {
    console.log('Checking Players Table Schema...');
    const { data, error } = await supabase.from('players').select('id, full_name, team_id, image_url').limit(1);

    if (error) {
        console.log('Error selecting columns:', error.message);
    } else {
        console.log('Columns exist. Row count:', data.length);
        if (data.length > 0) console.log(data[0]);
    }
}

checkPlayersSchema();
