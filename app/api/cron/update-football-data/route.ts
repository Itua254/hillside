import { NextResponse } from 'next/server';
import { scrapeAndSyncFootballData } from '@/lib/services/football-scraper';

// This route should be protected.
// For Vercel Cron, we can check for the Authorization header or specific Vercel headers.
// For simplicity here, we'll allow it but you should set up CRON_SECRET in environment variables.

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');

        // Simple Bearer token check if you set CRON_SECRET in .env
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('Triggering manual/cron football data sync...');
        const result = await scrapeAndSyncFootballData();

        return NextResponse.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Cron job failed:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
