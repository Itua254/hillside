'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function MatchesPage() {
    interface Match {
        id: number;
        date: string;
        location: string;
        status: string;
        home_team_score: number | null;
        away_team_score: number | null;
        home_team: { name: string } | null;
        away_team: { name: string } | null;
    }

    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMatches() {
            try {
                // Fetch matches from the scraped 'fixtures' table
                const { data: matchesData, error } = await supabase
                    .from('fixtures')
                    .select('*')
                    .order('date', { ascending: true });

                if (error) throw error;

                // Map database columns to the shape expected by the UI
                const formattedMatches = (matchesData || []).map(match => {
                    // unexpected date format handling
                    let dateStr = match.date;
                    if (match.time) {
                        dateStr = `${match.date}T${match.time}:00`;
                    }

                    return {
                        id: match.id,
                        date: dateStr,
                        location: match.venue || 'Hillside Stadium',
                        status: (match.status || 'Scheduled').toLowerCase(),
                        home_team_score: null, // Scraper doesn't currently provide scores
                        away_team_score: null,
                        home_team: { name: match.home_team },
                        away_team: { name: match.away_team }
                    };
                });

                setMatches(formattedMatches);
            } catch (err) {
                console.error('Error loading matches:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchMatches();
    }, []);

    const upcomingMatches = matches.filter(m => m.status === 'scheduled');
    const pastMatches = matches.filter(m => m.status === 'completed' || m.status === 'played');

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Fixtures & Results</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Match Center</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">

                {/* UPCOMING */}
                <div className="mb-16">
                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-8 border-b-4 border-secondary inline-block pb-1 pr-8">
                        Upcoming Fixtures
                    </h2>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading fixtures...</div>
                    ) : upcomingMatches.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                            No upcoming matches scheduled.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {upcomingMatches.map(match => (
                                <div key={match.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#1e3a8a] flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4 text-sm font-bold text-gray-500 uppercase tracking-widest w-full md:w-auto justify-center md:justify-start">
                                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(match.date).toLocaleDateString()}</div>
                                        <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>

                                    <div className="flex-grow flex items-center justify-center gap-8 text-xl md:text-2xl font-bold uppercase text-[#1e3a8a]">
                                        <span className="text-right w-1/3 truncate">{match.home_team?.name || 'Unknown'}</span>
                                        <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-500">VS</span>
                                        <span className="text-left w-1/3 truncate">{match.away_team?.name || 'Unknown'}</span>
                                    </div>

                                    <div className="w-full md:w-auto text-center md:text-right text-sm text-gray-500 flex items-center justify-center md:justify-end gap-2">
                                        <MapPin className="w-4 h-4" /> {match.location || 'Stadium'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RESULTS */}
                <div>
                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-8 border-b-4 border-gray-300 inline-block pb-1 pr-8">
                        Recent Results
                    </h2>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading results...</div>
                    ) : pastMatches.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                            No matches played yet this season.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pastMatches.map(match => (
                                <div key={match.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gray-400 flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 hover:opacity-100 transition-opacity">
                                    <div className="text-sm font-bold text-gray-400 uppercase tracking-widest w-full md:w-auto text-center md:text-left">
                                        {new Date(match.date).toLocaleDateString()}
                                    </div>

                                    <div className="flex-grow flex items-center justify-center gap-8 text-xl md:text-2xl font-bold uppercase text-gray-800">
                                        <span className="text-right w-1/3 truncate text-[#1e3a8a]">{match.home_team?.name}</span>
                                        <div className="bg-[#1e3a8a] text-white px-4 py-2 rounded font-mono">
                                            {match.home_team_score} - {match.away_team_score}
                                        </div>
                                        <span className="text-left w-1/3 truncate text-[#1e3a8a]">{match.away_team?.name}</span>
                                    </div>

                                    <div className="w-full md:w-auto text-center md:text-right text-sm text-secondary font-bold uppercase tracking-widest">
                                        Full Time
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
