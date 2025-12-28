import { Play, Calendar, Clock } from "lucide-react";

export default function HillsideTV() {
    const featuredVideo = {
        title: "HIGHLIGHTS: Hillside FC vs Riverside Rangers",
        date: "12 Oct 2024",
        duration: "10:24",
        thumbnail: "/video-thumb-1.jpg", // Placeholder
        description: "Watch all the action from our emphatic 3-0 victory at home. Goals from Smith, Jones and Johnson secured the three points."
    };

    const recentVideos = [
        { id: 1, title: "POST-MATCH: Manager Reaction", date: "12 Oct 2024", duration: "04:15", category: "Interview" },
        { id: 2, title: "GOAL OF THE MONTH: September Contenders", date: "01 Oct 2024", duration: "03:30", category: "Highlights" },
        { id: 3, title: "INSIDE TRAINING: Preparing for the Derby", date: "09 Oct 2024", duration: "08:00", category: "Behind the Scenes" },
        { id: 4, title: "ACADEMY: U18s secure cup win", date: "08 Oct 2024", duration: "02:45", category: "Academy" },
    ];

    return (
        <div className="bg-[#111827] min-h-screen text-white pb-20">
            {/* Featured Video Section */}
            <section className="relative h-[60vh] md:h-[80vh] w-full bg-black group cursor-pointer overflow-hidden">
                {/* Placeholder for Video Player/Thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors z-0" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-secondary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-secondary/50">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-2" />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20">
                    <div className="container mx-auto">
                        <span className="inline-block py-1 px-3 bg-secondary text-white text-xs font-bold uppercase tracking-widest mb-4">
                            Featured
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold uppercase italic mb-4 max-w-3xl leading-tight">
                            {featuredVideo.title}
                        </h1>
                        <p className="text-gray-300 max-w-2xl mb-6 text-lg line-clamp-2">
                            {featuredVideo.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-wider">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredVideo.date}</span>
                            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {featuredVideo.duration}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories / Filter Strip */}
            <section className="border-b border-gray-800 bg-[#1f2937] sticky top-20 z-40 shadow-md">
                <div className="container mx-auto px-4 overflow-x-auto">
                    <div className="flex gap-8 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                        <button className="text-secondary border-b-2 border-secondary pb-1">All Videos</button>
                        <button className="text-gray-400 hover:text-white transition-colors">Highlights</button>
                        <button className="text-gray-400 hover:text-white transition-colors">Interviews</button>
                        <button className="text-gray-400 hover:text-white transition-colors">Behind the Scenes</button>
                        <button className="text-gray-400 hover:text-white transition-colors">Academy</button>
                    </div>
                </div>
            </section>

            {/* Recent Videos Grid */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-2xl font-extrabold uppercase text-white mb-8 flex items-center gap-2">
                    <span className="w-2 h-8 bg-secondary block"></span>
                    Latest Uploads
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {recentVideos.map((video) => (
                        <div key={video.id} className="group cursor-pointer">
                            <div className="aspect-video bg-gray-800 relative rounded-lg overflow-hidden mb-3 border border-gray-700 group-hover:border-secondary transition-colors">
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-bold rounded">
                                    {video.duration}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-secondary text-xs font-bold uppercase tracking-wide">{video.category}</span>
                                <h3 className="font-bold text-lg leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                                    {video.title}
                                </h3>
                                <p className="text-gray-500 text-xs font-medium">{video.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
