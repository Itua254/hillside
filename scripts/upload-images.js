
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

const IMAGES_DIR = path.resolve(__dirname, '../public/images/players');

// Helper to normalize position names
function normalizePosition(pos) {
    if (!pos) return 'unknown';
    pos = pos.toLowerCase();
    if (pos.includes('keeper')) return 'goalkeeper';
    if (pos.includes('defend')) return 'defender';
    if (pos.includes('midfield')) return 'midfielder';
    if (pos.includes('forward') || pos.includes('striker')) return 'forward';
    return 'unknown';
}

async function uploadImages() {
    console.log('Starting image upload...');

    // 1. Get all images and categorize by position
    const files = fs.readdirSync(IMAGES_DIR).filter(f => !f.startsWith('.'));
    const imagesByPos = { goalkeeper: [], defender: [], midfielder: [], forward: [] };

    for (const file of files) {
        const pos = normalizePosition(file);
        if (imagesByPos[pos]) {
            imagesByPos[pos].push(file);
        }
    }

    console.log(`Found images: GK=${imagesByPos.goalkeeper.length}, DEF=${imagesByPos.defender.length}, MID=${imagesByPos.midfielder.length}, FWD=${imagesByPos.forward.length}`);

    // 2. Get all players from DB
    const { data: players, error } = await supabase.from('players').select('*');
    if (error) {
        console.error('Error fetching players:', error);
        return;
    }
    console.log(`Found ${players.length} players in DB.`);

    // 3. Assign images
    for (const player of players) {
        const pos = normalizePosition(player.position);
        const availableImages = imagesByPos[pos];

        if (availableImages && availableImages.length > 0) {
            // Pick an image (sequentially or random? Let's do random for variety if count mismatches)
            const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            const filePath = path.join(IMAGES_DIR, randomImage);
            const fileBuffer = fs.readFileSync(filePath);
            const storagePath = `${player.id}-${randomImage.replace(/\s+/g, '_')}`; // unique-ish name

            console.log(`Uploading for ${player.full_name} (${player.position}) -> ${storagePath}`);

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('players')
                .upload(storagePath, fileBuffer, {
                    contentType: 'image/jpeg',
                    upsert: true
                });

            if (uploadError) {
                console.error('  Upload failed:', uploadError.message);
                continue;
            }

            // Get Public URL
            const { data: publicUrlData } = supabase.storage
                .from('players')
                .getPublicUrl(storagePath);

            const publicUrl = publicUrlData.publicUrl;

            // Update Player Record
            const { error: updateError } = await supabase
                .from('players')
                .update({ image_url: publicUrl })
                .eq('id', player.id);

            if (updateError) {
                console.error('  DB Update failed:', updateError.message);
            } else {
                console.log('  Success!');
            }

        } else {
            console.log(`No images available for position: ${pos} (Player: ${player.full_name})`);
        }
    }
    console.log('Done!');
}

uploadImages();
