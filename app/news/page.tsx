
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from 'next/link';
import { COMM_ARTICLES } from '@/lib/newsData';

export default function NewsPage() {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <div className="bg-[#1e3a8a] py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <span className="block text-secondary font-bold uppercase tracking-widest text-sm mb-2">Latest Updates</span>
                    <h1 className="text-5xl font-extrabold uppercase italic tracking-tight">Club News</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {COMM_ARTICLES.map((article) => (
                        <div key={article.id} className="group cursor-pointer flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-white rounded-lg overflow-hidden">
                            <div className="aspect-video bg-gray-200 relative">
                                {article.image && article.image !== '#' ? (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                                        News Image
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="bg-secondary text-white text-xs font-bold px-2 py-1 uppercase tracking-wide rounded-sm">{article.category}</span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                                </div>

                                <h2 className="text-xl font-bold text-[#1e3a8a] mb-3 leading-tight group-hover:text-secondary transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <Link href={`/news/${article.slug}`} className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform inline-flex">
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
