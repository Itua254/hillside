
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

function normalizePosition(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('keeper')) return 'Goalkeeper';
    if (lower.includes('defend')) return 'Defender';
    if (lower.includes('midfield')) return 'Midfielder';
    if (lower.includes('forward') || lower.includes('striker')) return 'Forward';
    return 'Unknown';
}

function cleanName(filename) {
    // Remove extension
    let name = filename.replace(/\.[^/.]+$/, "");
    // Replace underscores/multiple spaces with single space
    name = name.replace(/_+/g, ' ').replace(/\s+/g, ' ').trim();
    // Capitalize Text
    return name.replace(/\b\w/g, l => l.toUpperCase());
}

async function populatePlayers() {
    console.log('Starting player population...');

    // 1. Get Team ID for 'Men\'s First Team'
    let { data: teams } = await supabase.from('teams').select('*').eq('name', "Men's First Team");
    let teamId;
    if (!teams || teams.length === 0) {
        console.log('Creating "Men\'s First Team"...');
        const { data: newTeam, error } = await supabase.from('teams').insert({
            name: "Men's First Team",
            category: 'first-team',
            logo_url: '/logo.png' // generic
        }).select().single();
        if (error) { console.error('Failed to create team:', error); return; }
        teamId = newTeam.id;
    } else {
        teamId = teams[0].id;
    }
    console.log(`Using Team ID: ${teamId}`);

    // 2. Get existing players to avoid dupes
    const { data: existingPlayers } = await supabase.from('players').select('image_url');
    const existingUrls = new Set(existingPlayers.map(p => p.image_url).filter(Boolean));

    // 3. List Bucket Files
    const { data: files, error: listError } = await supabase.storage.from('players').list();
    if (listError) { console.error('List error:', listError); return; }

    const updates = [];

    for (const file of files) {
        if (file.name === '.emptyFolderPlaceholder') continue;

        const { data: publicUrlData } = supabase.storage.from('players').getPublicUrl(file.name);
        const publicUrl = publicUrlData.publicUrl;

        if (existingUrls.has(publicUrl)) {
            console.log(`Skipping ${file.name} (already assigned)`);
            continue;
        }

        const position = normalizePosition(file.name);
        const name = cleanName(file.name); // e.g. "Defender 1"
        // random number 1-99
        const number = Math.floor(Math.random() * 99) + 1;

        console.log(`Creating: ${name} (${position})`);

        updates.push({
            full_name: name,
            position: position,
            number: number,
            team_id: teamId,
            image_url: publicUrl
        });
    }

    if (updates.length > 0) {
        const { error: insertError } = await supabase.from('players').insert(updates);
        if (insertError) console.error('Insert error:', insertError);
        else console.log(`Successfully created ${updates.length} new players.`);
    } else {
        console.log('No new players to create.');
    }
}

populatePlayers();
