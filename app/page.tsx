import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronRight, CreditCard } from "lucide-react";
import Partners from "@/components/Partners";

const PaymentIcons = () => (
  <div className="flex items-center gap-2 mt-2">
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center text-[7px] text-white font-bold">M</div>
    </div>
    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[7px] text-white font-bold italic">P</div>
    </div>
    <div className="flex items-center gap-1">
      <CreditCard className="w-3 h-3 text-gray-400" />
    </div>
    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">M-Pesa / PayPal / Card</span>
  </div>
);
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

async function getNextMatch() {
  try {
    const { data, error } = await supabase
      .from('fixtures')
      .select('*')
      .order('date', { ascending: true }) // Get the earliest future date (assuming table is cleared of old ones or filtered)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'not found'
    return data;
  } catch (e) {
    console.error('Error fetching next match:', e);
    return null;
  }
}

export default async function Home() {
  const nextMatch = await getNextMatch();

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. MATCH CENTER STRIP (Top Bar under nav) */}
      <section className="bg-gray-100 border-b border-gray-200 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            <span>Next Match</span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="text-primary">
              {nextMatch ? `${nextMatch.home_team} vs ${nextMatch.away_team}` : 'Hillside FC vs Next Opponent'}
            </span>
            <span className="text-gray-400">
              {nextMatch ? `${new Date(nextMatch.date).toLocaleDateString()} ${nextMatch.time || ''}` : 'Date TBD'}
            </span>
          </div>
          <Link href="/matches" className="text-xs font-bold uppercase tracking-wider text-primary hover:text-secondary flex items-center gap-1">
            Full Fixture List <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* 2. HERO SECTION (Split Layout) */}
      <section className="relative bg-[#111827] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Ideally this would be a real hero image */}
          <div className="w-full h-full bg-gradient-to-r from-[#1e3a8a] to-[#111827]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-12 items-center py-20 min-h-[500px]">
          <div className="space-y-6">
            <span className="inline-block py-1 px-3 bg-secondary text-white text-xs font-bold uppercase tracking-widest mb-2">
              Season 2024/25
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase italic leading-tight text-white drop-shadow-xl">
              Hillside <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-300">FC</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-md">
              Pride of Turkana. United by passion. Driven by community. Powered by talent.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold uppercase tracking-widest rounded-none h-12 px-8">
                  Shop Now
                </Button>
              </Link>
              <Link href="/standings">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-bold uppercase tracking-widest rounded-none h-12 px-8">
                  View Table
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Graphic side */}
          <div className="hidden md:flex justify-center relative">
            <div className="relative w-80 h-96 bg-secondary/20 rounded-lg transform rotate-3 backdrop-blur-sm border border-secondary/30">
              <div className="absolute inset-0 bg-primary/40 -rotate-6 rounded-lg -z-10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="https://pndmpusmzgiebvbvpmat.supabase.co/storage/v1/object/public/site-assets/logo.png"
                  alt="Hillside Crest"
                  width={200}
                  height={200}
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST NEWS GRID (Asymmetric) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-extrabold uppercase text-primary tracking-tight">Latest News</h2>
            <Link href="/news" className="text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
            {/* Main Feature Article (Large) */}
            <Link href="/news" className="md:col-span-2 md:row-span-2 group relative bg-gray-900 overflow-hidden cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              {/* Feature Image */}
              <img
                src="https://pndmpusmzgiebvbvpmat.supabase.co/storage/v1/object/public/site-assets/simon-logilae-home.jpg"
                alt="Simon Logilae at Soccerex"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-0 left-0 p-8 z-20">
                <span className="inline-block py-1 px-2 bg-secondary text-white text-xs font-bold uppercase tracking-wide mb-3">
                  Club News
                </span>
                <h3 className="text-3xl text-white font-bold mb-2 leading-tight">Hillside FC Patron Simon Logilae Represents Turkana at African Football Summit</h3>
                <p className="text-gray-300 line-clamp-2">Hillside Football Club is proud to celebrate a major milestone as our Patron and Founder, Simon Logilae, participated in the summit.</p>
              </div>
            </Link>

            {/* Secondary Article 1 */}
            <Link href="/news" className="md:col-span-2 md:row-span-1 group relative bg-gray-800 overflow-hidden cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src="https://pndmpusmzgiebvbvpmat.supabase.co/storage/v1/object/public/site-assets/fans.jpg"
                alt="Hillside FC Fans"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-0 left-0 p-6 z-20">
                <span className="text-secondary text-xs font-bold uppercase tracking-wide mb-1 block">Fans</span>
                <h3 className="text-xl text-white font-bold">Hillside FC Fans – The Heart of Our Success</h3>
              </div>
            </Link>

            {/* Secondary Article 2 (Condolences) - Expanded to fill row */}
            <Link href="/news" className="md:col-span-2 md:row-span-1 group relative bg-gray-800 overflow-hidden cursor-pointer block">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img
                src="https://pndmpusmzgiebvbvpmat.supabase.co/storage/v1/object/public/site-assets/condolence.jpg"
                alt="Condolence Candles"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20">
                <span className="text-secondary text-xs font-bold uppercase tracking-wide mb-1 block">Community</span>
                <h3 className="text-lg text-white font-bold leading-tight">Condolences: Hillside FC Stands with Todonyang</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SHOP CAROUSEL / TEASER */}
      <section className="py-20 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold uppercase text-primary tracking-tight mb-12">Visit the Club Shop</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white p-4 group cursor-pointer hover:shadow-xl transition-shadow border border-gray-200">
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl group-hover:scale-105 transition-transform text-center px-2">
                  WHITE JERSEY
                </div>
              </div>
              <h3 className="font-bold text-lg uppercase mb-1">White Jersey</h3>
              <p className="text-secondary font-bold">KSh 2,500.00</p>
              <PaymentIcons />
            </div>

            {/* Product 2 */}
            <div className="bg-white p-4 group cursor-pointer hover:shadow-xl transition-shadow border border-gray-200">
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl group-hover:scale-105 transition-transform text-center px-2">
                  BLUE JERSEY
                </div>
              </div>
              <h3 className="font-bold text-lg uppercase mb-1">Blue Jersey</h3>
              <p className="text-secondary font-bold">KSh 2,500.00</p>
              <PaymentIcons />
            </div>

            {/* Product 3 */}
            <div className="bg-white p-4 group cursor-pointer hover:shadow-xl transition-shadow border border-gray-200">
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold text-2xl group-hover:scale-105 transition-transform text-center px-2">
                  RED JERSEY
                </div>
              </div>
              <h3 className="font-bold text-lg uppercase mb-1">Red Jersey</h3>
              <p className="text-secondary font-bold">KSh 2,500.00</p>
              <PaymentIcons />
            </div>
          </div>
          <div className="mt-12">
            <Link href="/shop">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold uppercase tracking-widest rounded-none h-12 px-8">
                Shop All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Partners />
    </div>
  );
}
