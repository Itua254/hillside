
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

async function inspectState() {
    console.log('--- Inspecting DB Players ---');
    const { data: players, error: dbError } = await supabase.from('players').select('*');
    if (dbError) console.error('DB Error:', dbError.message);
    else {
        console.log(`Count: ${players.length}`);
        players.forEach(p => console.log(` - ${p.full_name} (ID: ${p.id}, Image: ${p.image_url ? 'set' : 'null'})`));
    }

    console.log('\n--- Inspecting Storage "players" Bucket ---');
    const { data: files, error: storageError } = await supabase.storage.from('players').list();
    if (storageError) console.error('Storage Error:', storageError.message);
    else {
        console.log(`Count: ${files.length}`);
        files.forEach(f => console.log(` - ${f.name}`));
    }
}

inspectState();
