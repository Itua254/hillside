import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="bg-[#1e3a8a] border-b-4 border-secondary text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <Image
                            src="https://pndmpusmzgiebvbvpmat.supabase.co/storage/v1/object/public/site-assets/logo.png"
                            alt="Hillside FC Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl tracking-wide uppercase leading-none">Hillside</span>
                        <span className="text-[10px] tracking-widest uppercase text-secondary font-bold">Football Club</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/tv" className="text-sm font-bold uppercase tracking-wider text-secondary hover:text-white transition-colors flex items-center gap-1">
                        <span className="bg-secondary text-white text-[10px] px-1 rounded-sm mr-1">TV</span> Hillside
                    </Link>
                    <Link href="/about" className="text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors">
                        About
                    </Link>
                    <Link href="/news" className="text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors">
                        News
                    </Link>
                    <Link href="/teams" className="text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors">
                        Teams
                    </Link>
                    <Link href="/standings" className="text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors">
                        Standings
                    </Link>
                    <Link href="/academy" className="text-sm font-bold uppercase tracking-wider hover:text-secondary transition-colors">
                        Academy
                    </Link>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link href="/shop" className="bg-secondary text-white px-6 py-2 rounded-none font-bold uppercase tracking-widest hover:bg-white hover:text-secondary transition-colors">
                        Shop
                    </Link>
                </div>
            </div>
        </nav>
    );
}
