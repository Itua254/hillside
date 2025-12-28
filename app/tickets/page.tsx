'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function TicketsPage() {
    interface Match {
        id: number;
        date: string;
        location: string;
        status: string;
        home_team: { name: string } | null;
        away_team: { name: string } | null;
    }

    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMatches() {
            try {
                // Fetch scheduled matches
                const { data: matchesData, error } = await supabase
                    .from('matches')
                    .select(`
                        id,
                        match_date,
                        is_finished,
                        home_team:teams!home_team_id(name),
                        away_team:teams!away_team_id(name)
                    `)
                    .eq('is_finished', false)
                    .order('match_date', { ascending: true });

                if (error) throw error;

                const formattedMatches = (matchesData || []).map(match => ({
                    id: match.id,
                    date: match.match_date,
                    location: 'Hillside Stadium',
                    status: 'scheduled',
                    home_team: Array.isArray(match.home_team) ? match.home_team[0] : match.home_team,
                    away_team: Array.isArray(match.away_team) ? match.away_team[0] : match.away_team
                }));

                setMatches(formattedMatches);
            } catch (err) {
                console.error('Error loading matches:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchMatches();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Join The Roar</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight mb-4">Tickets & Membership</h1>
                    <p className="max-w-2xl mx-auto text-blue-100 text-lg">Secure your seat at Hillside Stadium and be part of the action.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Season Tickets Section */}
                <section>
                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-8 border-b-4 border-secondary inline-block pb-1 pr-8">
                        Season Tickets
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="border-t-4 border-t-[#1e3a8a] hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="uppercase text-xl font-bold text-[#1e3a8a]">Standard Season Pass</CardTitle>
                                <p className="text-3xl font-extrabold text-gray-900 mt-2">ksh 2,500 <span className="text-sm font-normal text-gray-500">/ season</span></p>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Ticket className="w-4 h-4 text-green-500" /> Entry to all home league matches</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Ticket className="w-4 h-4 text-green-500" /> Priority booking for cup games</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Ticket className="w-4 h-4 text-green-500" /> 10% Club Shop discount</li>
                                </ul>
                                <Button className="w-full uppercase font-bold tracking-wider">Buy Now</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-secondary hover:shadow-lg transition-shadow bg-[#1e3a8a] text-white">
                            <CardHeader>
                                <CardTitle className="uppercase text-xl font-bold text-white">Premium Membership</CardTitle>
                                <p className="text-3xl font-extrabold text-white mt-2">ksh 3,500 <span className="text-sm font-normal text-blue-200">/ season</span></p>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-blue-100"><Ticket className="w-4 h-4 text-secondary" /> All Standard benefits</li>
                                    <li className="flex items-center gap-2 text-sm text-blue-100"><Ticket className="w-4 h-4 text-secondary" /> Premium center-stand seating</li>
                                    <li className="flex items-center gap-2 text-sm text-blue-100"><Ticket className="w-4 h-4 text-secondary" /> Exclusive meet-the-team events</li>
                                    <li className="flex items-center gap-2 text-sm text-blue-100"><Ticket className="w-4 h-4 text-secondary" /> Complimentary match program</li>
                                </ul>
                                <Button variant="secondary" className="w-full uppercase font-bold tracking-wider">Join Premium</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-t-4 border-t-gray-400 hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="uppercase text-xl font-bold text-gray-700">Junior Hillside</CardTitle>
                                <p className="text-3xl font-extrabold text-gray-900 mt-2">ksh 1,500 <span className="text-sm font-normal text-gray-500">/ season</span></p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-4">For fans under 16 years old.</p>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Ticket className="w-4 h-4 text-green-500" /> Entry to all home league matches</li>
                                    <li className="flex items-center gap-2 text-sm text-gray-600"><Ticket className="w-4 h-4 text-green-500" /> Welcome pack & birthday card</li>
                                </ul>
                                <Button variant="outline" className="w-full uppercase font-bold tracking-wider">Details</Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Individual Matches Section */}
                <section>
                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-8 border-b-4 border-gray-300 inline-block pb-1 pr-8">
                        Upcoming Matches
                    </h2>

                    {loading ? (
                        <div className="flex justify-center p-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
                        </div>
                    ) : matches.length === 0 ? (
                        <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
                            <p className="text-xl text-gray-500 mb-4">No upcoming home matches scheduled.</p>
                            <Button variant="outline">Check Full Schedule</Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {matches.map(match => (
                                <div key={match.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#1e3a8a] flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="flex flex-col items-center justify-center bg-gray-100 p-3 rounded min-w-[80px]">
                                            <span className="text-sm font-bold text-gray-500 uppercase">{new Date(match.date).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-2xl font-extrabold text-[#1e3a8a]">{new Date(match.date).getDate()}</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                                                <Clock className="w-4 h-4" /> {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="text-xl font-bold uppercase text-[#1e3a8a] flex items-center gap-2">
                                                <span>{match.home_team?.name || 'Hillside'}</span>
                                                <span className="text-gray-400 text-sm">vs</span>
                                                <span>{match.away_team?.name || 'Opponent'}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                <MapPin className="w-3 h-3" /> {match.location}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                                        <Button variant="outline" className="flex-1 sm:flex-none">More Info</Button>
                                        <Button className="flex-1 sm:flex-none min-w-[140px]">Buy Tickets</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <div className="bg-gray-100 p-8 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">Need Help?</h3>
                    <p className="text-gray-600 mb-4">Contact our ticket office for assistance with bookings and accessibility.</p>
                    <p className="font-mono text-lg font-bold text-[#1e3a8a]">tickets@hillsidefc.com</p>
                </div>
            </div>
        </div>
    );
}
