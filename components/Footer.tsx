import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#111827] text-white pt-16 pb-8">
            {/* Sponsors Section */}
            <div className="container mx-auto px-4 mb-16">
                <p className="text-center text-gray-500 uppercase tracking-widest text-xs font-bold mb-8">Official Partners</p>
                <div className="flex flex-wrap justify-center gap-12 opacity-80 hover:opacity-100 transition-all duration-500">
                    <div className="h-24 w-48 relative flex items-center justify-center">
                        <Image
                            src="/asekosi-logo.png"
                            alt="Asekosi"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-gray-800 pt-16">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="Hillside FC Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-wide uppercase">Hillside FC</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        The premier community football club. Passion, pride, and performance on and off the pitch.
                    </p>
                    <div className="text-sm text-gray-400 space-y-1">
                        <p>📞 +254 769 752 124</p>
                        <p>✉️ tunchiwork@gmail.com</p>
                    </div>
                </div>

                {/* Links Columns */}
                <div>
                    <h4 className="font-bold uppercase tracking-wider mb-6 text-secondary">The Club</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                        <li><Link href="/teams" className="hover:text-white transition-colors">Teams</Link></li>
                        <li><Link href="/standings" className="hover:text-white transition-colors">Standings</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-wider mb-6 text-secondary">Fans</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/tickets" className="hover:text-white transition-colors">Tickets</Link></li>
                        <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
                        <li><Link href="/shop" className="hover:text-white transition-colors">Club Shop</Link></li>
                        <li><Link href="/hospitality" className="hover:text-white transition-colors">Hospitality</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold uppercase tracking-wider mb-6 text-secondary">Follow Us</h4>
                    <div className="flex gap-4">
                        {/* Social Icons Placeholders */}
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">X</div>
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">IG</div>
                        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">FB</div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Hillside Football Club. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white">Terms of Use</Link>
                </div>
            </div>
        </footer>
    );
}
