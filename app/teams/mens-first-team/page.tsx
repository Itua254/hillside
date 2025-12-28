import { supabase } from "@/lib/supabase";
import Image from "next/image";

// Force dynamic rendering since we are fetching data
export const dynamic = 'force-dynamic';

interface Player {
    id: number;
    full_name: string;
    number: number;
    position: string;
    image_url: string;
}

const FALLBACK_PLAYERS = [
    { id: 1, full_name: "Nakos", number: 1, position: "Goalkeeper", image_url: "" },
    { id: 2, full_name: "Obare", number: 2, position: "Defender", image_url: "" },
    { id: 3, full_name: "Loko", number: 3, position: "Defender", image_url: "" },
    { id: 4, full_name: "Mavoco", number: 4, position: "Defender", image_url: "" },
    { id: 5, full_name: "Mario", number: 5, position: "Defender", image_url: "" },
    { id: 6, full_name: "Deng", number: 6, position: "Midfielder", image_url: "" },
    { id: 7, full_name: "Arika", number: 7, position: "Midfielder", image_url: "" },
    { id: 8, full_name: "Akoman", number: 8, position: "Midfielder", image_url: "" },
    { id: 9, full_name: "Alex (C)", number: 9, position: "Midfielder", image_url: "" },
    { id: 10, full_name: "KAUNDA", number: 10, position: "Forward", image_url: "" },
    { id: 11, full_name: "MWAS", number: 11, position: "Forward", image_url: "" },
    { id: 12, full_name: "DARREN", number: 12, position: "Forward", image_url: "" },
    { id: 13, full_name: "BASTIAN", number: 13, position: "Midfielder", image_url: "" },
    { id: 14, full_name: "DULLAH", number: 14, position: "Midfielder", image_url: "" },
    { id: 15, full_name: "WAJAH", number: 15, position: "Forward", image_url: "" },
    { id: 16, full_name: "ALABA", number: 16, position: "Defender", image_url: "" },
    { id: 17, full_name: "BARAZA", number: 17, position: "Goalkeeper", image_url: "" },
    { id: 18, full_name: "ISUZA", number: 18, position: "Midfielder", image_url: "" },
    { id: 19, full_name: "FUNDI", number: 19, position: "Midfielder", image_url: "" },
    { id: 20, full_name: "MUTURI", number: 20, position: "Defender", image_url: "" },
    { id: 21, full_name: "Samini", number: 21, position: "Forward", image_url: "" },
    { id: 22, full_name: "OJULU", number: 22, position: "Forward", image_url: "" }
];

async function getSquadData(): Promise<Player[]> {
    const { data, error } = await supabase
        .from('squad')
        .select('*')
        .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
        console.warn('Using fallback squad data due to DB error or empty table:', error);
        return FALLBACK_PLAYERS;
    }

    return data.map((p: any) => ({
        id: p.id,
        full_name: p.name,
        number: p.jersey_number ? parseInt(p.jersey_number) || 0 : 0,
        position: p.position || 'Unknown',
        image_url: p.image_url || ''
    }));
}

export default async function FirstTeamPage() {
    const players = await getSquadData();

    // Group players by position
    const groupedPlayers = {
        Goalkeepers: players.filter(p => p.position === 'Goalkeeper'),
        Defenders: players.filter(p => p.position === 'Defender'),
        Midfielders: players.filter(p => p.position === 'Midfielder'),
        Forwards: players.filter(p => p.position === 'Forward')
    };

    const sections = [
        { title: "Goalkeepers", data: groupedPlayers.Goalkeepers },
        { title: "Defenders", data: groupedPlayers.Defenders },
        { title: "Midfielders", data: groupedPlayers.Midfielders },
        { title: "Forwards", data: groupedPlayers.Forwards }
    ];

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Squad</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Men&apos;s First Team</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {sections.map((section) => (
                    section.data.length > 0 && (
                        <div key={section.title} className="mb-16">
                            <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-8 border-b-4 border-[#0e4bc4] inline-block pb-1 pr-8">
                                {section.title}
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {section.data.map((player) => (
                                    <div key={player.id} className="group relative bg-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                                        {/* Diagonal Background in Requested Color */}
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[#0e4bc4] transform skew-y-6 translate-y-12 z-0 group-hover:translate-y-8 transition-transform duration-500 origin-bottom-left" />

                                        {/* Image Container */}
                                        <div className="relative z-10 w-full aspect-[4/5] flex items-end justify-center overflow-hidden">
                                            {player.image_url ? (
                                                <Image
                                                    src={player.image_url}
                                                    alt={player.full_name}
                                                    fill
                                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex items-end justify-center w-full h-full bg-gray-200">
                                                    <span className="text-gray-400 font-bold uppercase tracking-widest mb-12">No Image</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <span className="block text-4xl font-extrabold leading-none opacity-20 group-hover:opacity-100 transition-opacity duration-300 absolute -top-8 left-4 text-white">
                                                        {player.number}
                                                    </span>
                                                    <span className="block text-4xl font-extrabold leading-none mb-1 shadow-black drop-shadow-md">
                                                        {player.number}
                                                    </span>
                                                    <h3 className="text-xl font-bold uppercase leading-tight drop-shadow-md">
                                                        {player.full_name?.split(' ')[0]} <br />
                                                        <span className="text-2xl">{player.full_name?.split(' ').slice(1).join(' ')}</span>
                                                    </h3>
                                                </div>
                                            </div>
                                            {/* Decorative Line */}
                                            <div className="h-1 w-full bg-secondary mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
