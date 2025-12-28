
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function checkStorageAndSchema() {
    console.log('Checking Storage Buckets...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) console.error('Error listing buckets:', bucketError.message);
    else console.log('Buckets:', buckets.map(b => b.name));

    console.log('Checking Players Table Schema...');
    // We can't easily check schema structure via JS client without selecting, trying to select a potential 'image_url' column
    const { data, error } = await supabase.from('players').select('image_url').limit(1);

    if (error) {
        console.log('Select "image_url" result:', error.message);
        if (error.message.includes('does not exist')) {
            console.log('Column "image_url" likely does NOT exist.');
        }
    } else {
        console.log('Column "image_url" exists.');
    }
}

checkStorageAndSchema();
