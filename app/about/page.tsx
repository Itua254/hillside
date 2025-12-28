
import { Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            {/* Header */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/about-hero.jpg"
                        alt="Hillside FC Team"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="container mx-auto px-4 relative z-10 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2 drop-shadow-lg">Our History</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight drop-shadow-xl">About Hillside FC</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Story Section */}
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-8">Our Story</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        Hillside Football Club is a rising force in Kenyan football, proudly representing Lodwar with passion, dedication, and a commitment to excellence. Currently competing in Division 1 of the Kenya Premier League after being crowned Division 2 champions last season, we continue to build on our success by developing top-tier talent and striving for greater achievements.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our club is more than just a football team—it is a community-driven initiative that nurtures young athletes, instills discipline, and promotes teamwork. Through hard work and determination, we have earned our place among Kenya’s top footballing ranks, and we are determined to keep pushing forward.
                    </p>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-[#1e3a8a]" />
                        </div>
                        <h3 className="text-xl font-bold uppercase text-[#1e3a8a] mb-4">Youth Development</h3>
                        <p className="text-gray-600">
                            The best players are thoroughly scouted and evaluated to ensure they possess the skills and potential to excel in their sport.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-8 h-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold uppercase text-[#1e3a8a] mb-4">Community Outreach</h3>
                        <p className="text-gray-600">
                            Stylish and high-quality football merchandise to showcase your team spirit. We are actively involved in community projects.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Target className="w-8 h-8 text-[#1e3a8a]" />
                        </div>
                        <h3 className="text-xl font-bold uppercase text-[#1e3a8a] mb-4">Competitive Drive</h3>
                        <p className="text-gray-600">
                            Quality coaching staff dedicated to fostering individual growth and enhancing team performance.
                        </p>
                    </div>
                </div>

                {/* Staff Section */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-extrabold uppercase text-[#1e3a8a] mb-12 text-center">Team Staff</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Staff 1 */}
                        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                            <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100">
                                <img src="/simon-logilae-portrait.png" alt="Mr. Simon Logilae" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a]">Mr. Simon Logilae</h3>
                            <span className="text-secondary font-bold text-sm uppercase block mb-2">Club Patron</span>
                        </div>
                        {/* Staff 2 */}
                        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                            <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100">
                                <img src="/khalid-ceo.png" alt="CEO Khalid" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a]">CEO Khalid</h3>
                            <span className="text-secondary font-bold text-sm uppercase block mb-2">Chief Executive Officer</span>
                        </div>
                        {/* Staff 3 */}
                        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                            <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100">
                                <img src="/juliano.jpg" alt="Juliano" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a]">Juliano</h3>
                            <span className="text-secondary font-bold text-sm uppercase block mb-2">Team Manager</span>
                        </div>
                        {/* Staff 4 */}
                        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-center">
                            <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100">
                                <img src="/henry-pep.jpg" alt="Henry Pep" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a]">Henry Pep</h3>
                            <span className="text-secondary font-bold text-sm uppercase block mb-2">Head Coach</span>
                        </div>

                        {/* Additional Staff (No Images yet) */}

                        <div className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white text-center flex flex-col justify-center">
                            <div className="aspect-square w-full mb-4 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-400 font-bold">No Image</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#1e3a8a]">CID Jeshi</h3>
                            <span className="text-secondary font-bold text-xs uppercase block mb-2">Club Ambassador</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
