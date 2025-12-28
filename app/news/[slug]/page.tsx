
import { COMM_ARTICLES } from '@/lib/newsData';
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import CommentSection from '@/components/CommentSection';

// Helper to generate static params so Next.js knows which pages to build
export async function generateStaticParams() {
    return COMM_ARTICLES.map((article) => ({
        slug: article.slug,
    }));
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const article = COMM_ARTICLES.find((p) => p.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            {/* Header */}
            <div className={`relative py-32 text-white overflow-hidden ${!article.image || article.image === '#' ? 'bg-[#1e3a8a]' : ''}`}>
                {article.image && article.image !== '#' && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a] via-transparent to-transparent opacity-90" />
                    </div>
                )}

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <Link href="/news" className="inline-flex items-center text-gray-300 hover:text-white mb-8 uppercase text-xs font-bold tracking-widest transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                    </Link>
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block bg-secondary text-white text-xs font-bold px-3 py-1 uppercase tracking-wide rounded-sm mb-6 shadow-md">
                            {article.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold uppercase italic tracking-tight leading-tight mb-8 drop-shadow-xl">
                            {article.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-200 font-medium uppercase tracking-wider bg-black/30 inline-block px-6 py-3 rounded-lg backdrop-blur-sm">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
                            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Article Content */}
                    <article className="prose prose-lg prose-blue max-w-none">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                    </article>

                    {/* Share / Tags Placeholder */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900 uppercase tracking-widest text-sm">Share this Article</span>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#1e3a8a] hover:text-white cursor-pointer transition-colors">
                                    fb
                                </div>
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-[#1e3a8a] hover:text-white cursor-pointer transition-colors">
                                    x
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <CommentSection />

                {/* Related News Section */}
                <div className="mt-20 border-t border-gray-200 pt-16">
                    <h3 className="text-2xl font-extrabold uppercase text-[#1e3a8a] mb-8 tracking-tight">Related News</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {COMM_ARTICLES.filter(p => p.slug !== slug).slice(0, 3).map((rel) => (
                            <Link key={rel.id} href={`/news/${rel.slug}`} className="group flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-xl transition-shadow bg-white rounded-lg overflow-hidden">
                                <div className="aspect-video bg-gray-200 relative">
                                    {rel.image && rel.image !== '#' ? (
                                        <img
                                            src={rel.image}
                                            alt={rel.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">
                                            News Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-secondary text-white text-xs font-bold px-2 py-1 uppercase tracking-wide rounded-sm">{rel.category}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {rel.date}</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-[#1e3a8a] mb-2 leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                                        {rel.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                                        {rel.excerpt}
                                    </p>
                                    <span className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        Read More <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
