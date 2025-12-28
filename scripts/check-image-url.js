
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function checkImageUrl() {
    console.log('Checking image_url for players...');
    const { data: players, error } = await supabase.from('players').select('id, full_name, image_url');

    if (error) {
        console.error('Error:', error.message);
    } else {
        players.forEach(p => {
            console.log(`Player: ${p.full_name}`);
            console.log(`  image_url: ${p.image_url}`);
        });
    }
}

checkImageUrl();
