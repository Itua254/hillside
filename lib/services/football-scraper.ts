import * as cheerio from 'cheerio';
import { supabaseAdmin } from '@/lib/supabase-admin';

// CONFIGURATION
// Replace these with the actual URL(s) for the specific league/team page.
const SOURCES = {
    STANDINGS_URL: 'https://kenyafootballdata.com/tournament_stats.php?t=uftn0072&utm_source=chatgpt.com',
    FIXTURES_URL: 'https://kenyafootballdata.com/team_fixtures.php?t=uftm00073',
    SQUAD_URL: 'https://kenyafootballdata.com/team_players.php?t=uftm00073'
};

const TEAM_NAME = 'Hillside FC';

export async function scrapeAndSyncFootballData() {
    console.log('Starting football data sync...');
    const results = {
        standings: { success: false, count: 0 },
        fixtures: { success: false, count: 0 },
        squad: { success: false, count: 0 }
    };

    try {
        // 1. Scrape Standings
        results.standings = await syncStandings();

        // 2. Scrape Fixtures
        results.fixtures = await syncFixtures();

        // 3. Scrape Squad
        results.squad = await syncSquad();

    } catch (error) {
        console.error('Global scraping error:', error);
        throw error;
    }

    console.log('Sync completed:', results);
    return results;
}

// ----------------------------------------------------
// HELPER: DATE PARSER
// ----------------------------------------------------
function parseFixtureDateDetails(rawDateStr: string): { date: string, time: string, venue: string } {
    // Expected format example: "Sat, 21st Mar 26\n15:00, Nakamekwi Primary"
    // Or variations.

    let date = null;
    let time = '';
    let venue = '';

    try {
        const parts = rawDateStr.split('\n').map(s => s.trim());
        const datePart = parts[0]; // "Sat, 21st Mar 26"
        const timeVenuePart = parts.length > 1 ? parts[1] : ''; // "15:00, Nakamekwi Primary"

        // PARSE DATE: "Sat, 21st Mar 26"
        // Remove "Sat, " prefix if present
        let cleanDate = datePart;
        if (cleanDate.includes(',')) {
            cleanDate = cleanDate.split(',')[1].trim(); // "21st Mar 26"
        }

        // Regex to verify: (\d+)(st|nd|rd|th)? (\w+) (\d+)
        const dateMatch = cleanDate.match(/^(\d+)(?:st|nd|rd|th)?\s+(\w+)\s+(\d+)$/i);
        if (dateMatch) {
            const day = parseInt(dateMatch[1]);
            const monthStr = dateMatch[2]; // "Mar"
            const yearShort = dateMatch[3]; // "26"

            const year = 2000 + parseInt(yearShort);
            const monthIndex = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
                .indexOf(monthStr.toLowerCase().substring(0, 3));

            if (monthIndex >= 0) {
                // Format YYYY-MM-DD
                const m = (monthIndex + 1).toString().padStart(2, '0');
                const d = day.toString().padStart(2, '0');
                date = `${year}-${m}-${d}`;
            }
        }

        // PARSE TIME & VENUE: "15:00, Nakamekwi Primary"
        if (timeVenuePart) {
            // Try to split by comma first? 
            // Often "HH:MM, Venue"
            const tvParts = timeVenuePart.split(',');
            if (tvParts.length > 0) {
                // Check if first part looks like time
                const potentialTime = tvParts[0].trim();
                // Basic check for time format HH:MM
                if (potentialTime.includes(':') && potentialTime.length <= 5) {
                    time = potentialTime;
                    venue = tvParts.slice(1).join(',').trim();
                } else {
                    venue = timeVenuePart;
                }
            }
        }

    } catch (e) {
        console.error('Error parsing date string:', rawDateStr, e);
    }

    return {
        date: date || new Date().toISOString().split('T')[0], // Fallback to today if fail
        time: time || '15:00',
        venue: venue || 'TBD'
    };
}

// ----------------------------------------------------
// 1. STANDINGS SCRAPER
// ----------------------------------------------------
async function syncStandings() {
    const fallbackData = [
        {
            position: 10,
            team_name: 'Hillside FC',
            played: 17,
            won: 6,
            drawn: 4,
            lost: 7,
            goals_for: 15,
            goals_against: 18,
            goal_difference: -3,
            points: 22
        }
    ];

    try {
        console.log('Fetching standings from:', SOURCES.STANDINGS_URL);
        const response = await fetch(SOURCES.STANDINGS_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const $ = cheerio.load(html);
        const standingsData: any[] = [];

        $('table tr').each((i, row) => {
            const cols = $(row).find('td');
            if (cols.length >= 8) {
                const textCol0 = $(cols[0]).text().trim();
                let pos = parseInt(textCol0);
                const teamName = $(cols[1]).text().trim();

                if (!isNaN(pos) && pos > 0 && teamName) {
                    standingsData.push({
                        position: pos,
                        team_name: teamName,
                        played: parseInt($(cols[2]).text()) || 0,
                        won: parseInt($(cols[3]).text()) || 0,
                        drawn: parseInt($(cols[4]).text()) || 0,
                        lost: parseInt($(cols[5]).text()) || 0,
                        goals_for: parseInt($(cols[6]).text()) || 0,
                        goals_against: parseInt($(cols[7]).text()) || 0,
                        goal_difference: parseInt($(cols[8]).text()) || 0,
                        points: parseInt($(cols[9]).text()) || 0
                    });
                }
            }
        });

        const dataToInsert = standingsData.length > 0 ? standingsData : fallbackData;
        console.log(`Found ${standingsData.length} standing rows. Inserting ${dataToInsert.length} rows.`);

        if (dataToInsert.length > 0) {
            // TRUNCATE AND INSERT
            await supabaseAdmin.from('standings').delete().gt('id', 0);
            const { error } = await supabaseAdmin
                .from('standings')
                .insert(dataToInsert);
            if (error) throw error;
        }

        return { success: true, count: dataToInsert.length, source: standingsData.length > 0 ? 'scraped' : 'fallback' };

    } catch (e) {
        console.error('Error syncing standings:', e);
        // Fallback
        await supabaseAdmin.from('standings').delete().gt('id', 0);
        await supabaseAdmin.from('standings').insert(fallbackData);
        return { success: false, count: 1, error: e, source: 'fallback_error' };
    }
}

// ----------------------------------------------------
// 2. FIXTURES SCRAPER
// ----------------------------------------------------
async function syncFixtures() {
    try {
        console.log('Fetching fixtures from:', SOURCES.FIXTURES_URL);
        const response = await fetch(SOURCES.FIXTURES_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const $ = cheerio.load(html);
        const fixturesData: any[] = [];

        $('table tr').each((i, row) => {
            const cols = $(row).find('td').map((j, c) => $(c).text().trim()).get();

            // Expected cols length is usually 7 based on logs
            if (cols.length >= 6) {
                const homeTeam = cols[1];
                const awayTeam = cols[5];
                const rawDateInfo = cols[3];

                if (homeTeam && awayTeam && rawDateInfo) {
                    // Filter empty rows that might just match layout but have no content
                    if (!homeTeam.trim() || !awayTeam.trim()) return;

                    const { date, time, venue } = parseFixtureDateDetails(rawDateInfo);

                    fixturesData.push({
                        home_team: homeTeam,
                        away_team: awayTeam,
                        date: date,
                        time: time,
                        venue: venue,
                        status: 'Scheduled',
                        competition: 'FKF Division One'
                    });
                }
            }
        });

        console.log(`Found ${fixturesData.length} fixtures.`);

        if (fixturesData.length > 0) {
            await supabaseAdmin.from('fixtures').delete().neq('id', -1);
            const { error } = await supabaseAdmin
                .from('fixtures')
                .insert(fixturesData);

            if (error) throw error;
            return { success: true, count: fixturesData.length, source: 'scraped' };
        }

        return { success: false, count: 0, source: 'empty_scrape' };

    } catch (e) {
        console.error('Error syncing fixtures:', e);
        return { success: false, count: 0, error: e };
    }
}

// ----------------------------------------------------
// 3. SQUAD SCRAPER
// ----------------------------------------------------
async function syncSquad() {
    try {
        console.log('Fetching squad from:', SOURCES.SQUAD_URL);
        const response = await fetch(SOURCES.SQUAD_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const $ = cheerio.load(html);
        const squadData: any[] = [];

        $('table tr').each((i, row) => {
            const cols = $(row).find('td').map((j, c) => $(c).text().trim()).get();

            // Row: [Num, Image?, Name, Jersey, Position, ...]
            if (cols.length >= 5) {
                const rawName = cols[2];
                const jersey = cols[3];
                const position = cols[4];

                if (rawName && position) {
                    // Filter headers or empty rows
                    if (rawName === 'Name' || position === 'Position') return;

                    // Clean Name: "Chris\nOBARE" -> "Chris Obare"
                    const cleanName = rawName.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

                    // Simple Title Case fixer
                    const formattedName = cleanName.split(' ')
                        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                        .join(' ');

                    squadData.push({
                        name: formattedName,
                        position: position,
                        jersey_number: jersey,
                        image_url: ''
                    });
                }
            }
        });

        console.log(`Found ${squadData.length} squad members.`);

        if (squadData.length > 0) {
            await supabaseAdmin.from('squad').delete().gt('id', 0);
            const { error } = await supabaseAdmin
                .from('squad')
                .insert(squadData);
            if (error) throw error;
            return { success: true, count: squadData.length, source: 'scraped' };
        }

        return { success: false, count: 0, source: 'empty_scrape' };

    } catch (e) {
        console.error('Error syncing squad:', e);
        return { success: false, count: 0, error: e };
    }
}
