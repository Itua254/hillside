import Link from "next/link";
import { ArrowRight, Users, Shield, GraduationCap } from "lucide-react";

export default function TeamsLandingPage() {
    const teams = [
        {
            name: "Men's First Team",
            link: "/teams/mens-first-team",
            description: "The pride of Hillside. Follow the senior squad in the Premier Community League.",
            icon: <Users className="w-12 h-12 text-secondary" />,
            active: true,
        },
        {
            name: "Women's First Team",
            link: "/teams/womens-first-team",
            description: "Building a legacy. Our women's team is competing for the regional title.",
            icon: <Shield className="w-12 h-12 text-gray-400" />,
            active: false,
        },
        {
            name: "Academy",
            link: "/teams/academy",
            description: "The future stars. Developing local talent from U8s to U18s.",
            icon: <GraduationCap className="w-12 h-12 text-gray-400" />,
            active: false,
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-20 text-center text-white mb-12">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Club</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Our Teams</h1>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {teams.map((team) => (
                        <div
                            key={team.name}
                            className={`group relative bg-white p-8 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${team.active ? 'hover:shadow-xl hover:border-secondary/50 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                        >
                            <div className="mb-6 flex justify-center">
                                <div className={`p-4 rounded-full ${team.active ? 'bg-[#1e3a8a]/5' : 'bg-gray-100'}`}>
                                    {team.icon}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold uppercase text-center text-[#1e3a8a] mb-4">
                                {team.name}
                            </h2>
                            <p className="text-gray-500 text-center mb-8 h-12">
                                {team.description}
                            </p>

                            {team.active ? (
                                <Link href={team.link} className="block">
                                    <button className="w-full bg-[#1e3a8a] text-white font-bold uppercase tracking-widest py-4 hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                                        View Squad <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            ) : (
                                <button disabled className="w-full bg-gray-100 text-gray-400 font-bold uppercase tracking-widest py-4 cursor-not-allowed">
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
