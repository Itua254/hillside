
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../.env.local')));
const supabase = createClient(envConfig.NEXT_PUBLIC_SUPABASE_URL, envConfig.SUPABASE_SERVICE_ROLE_KEY);

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const BUCKET_NAME = 'site-assets';

const IMAGES_TO_UPLOAD = [
    'logo.png',
    'fans.jpg',
    'condolence.jpg',
    'simon-logilae-home.jpg',
    'simon-logilae-portrait.png',
    'simon-logilae-soccerex.jpg',
    'simon-logilae-summit.jpg',
    'simon-logilae-detail.jpg',
    'about-hero.jpg',
    'asekosi-fuel.jpg',
    'asekosi-logo.png',
    'henry-pep.jpg',
    'juliano.jpg',
    'khalid-ceo.png'
];

async function uploadAssets() {
    console.log('Starting site assets upload...');

    // 0. Ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets.find(b => b.name === BUCKET_NAME)) {
        console.log(`Creating bucket: ${BUCKET_NAME}`);
        await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    }

    const mapping = {};

    for (const fileName of IMAGES_TO_UPLOAD) {
        const filePath = path.join(PUBLIC_DIR, fileName);
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }

        const fileBuffer = fs.readFileSync(filePath);
        const contentType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

        console.log(`Uploading ${fileName}...`);
        const { error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(fileName, fileBuffer, {
                contentType,
                upsert: true
            });

        if (uploadError) {
            console.error(`  Upload failed for ${fileName}:`, uploadError.message);
            continue;
        }

        const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

        mapping[fileName] = publicUrlData.publicUrl;
        console.log(`  Success: ${publicUrlData.publicUrl}`);
    }

    // Save mapping to a JSON for reference in the next step
    fs.writeFileSync(path.resolve(__dirname, 'image-mapping.json'), JSON.stringify(mapping, null, 2));
    console.log('\nDone! Mapping saved to scripts/image-mapping.json');
}

uploadAssets();
